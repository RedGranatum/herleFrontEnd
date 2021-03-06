var $                = require('jquery');
var ApiRestCatalogo = require('../js/modelos/apirestCatalogos');
var CajaDeTexto 	= require('../js/cajaDeTexto.jsx');
var EtiquetaTexto     = require('../js/etiquetaDeTexto.jsx');
var ComboSimple 			= require('../js/combo_simple.jsx');
var FuncGenericas   = require('../js/funcionesGenericas')
var OpcionCombo 	= require('../js/opcionCombo.jsx');
var React 			= require('react');
var ReactDOM 		= require('react-dom');
var FilaTabla       = require('../js/filaTabla.jsx');
var CeldaTabla      = require('../js/celdaTabla.jsx');
var CompraDetalle    = require('../js/compraDetalles.jsx');
var ApiRestCompraDetalles = require('../js/modelos/apirestCompraDetalles');
var Notificaciones   = require('../js/notificaciones')

var func = new FuncGenericas(); 

module.exports = React.createClass({
	componentWillReceiveProps: function(nuevas_props){
		this.num_con =1
		for(i=0; i< nuevas_props.listado.length; i++){
			nuevas_props.listado[i]["num_consecutivo"] = this.num_con
			this.num_con ++;
		}
         
		 this.setState({detalles_lista:nuevas_props.listado })  
		 this.refs.NuevoDetalle.limpiarFila(); 

	  },
	componentDidUpdate: function(){
		this.sumatoria();
	},
	getInitialState: function(){
			return {
				detalles_lista : [],
			}
			
	},
	valoresDetallesCompra: function(){
		 var self = this;


		 var detalles = this.state.detalles_lista.map(function(datos){
		 	var fila =self.refs["detalle_" + datos.num_consecutivo].valoresFila();
		 	fila["dsc_material"]=fila["material_descripcion"];
		 	delete fila.compra; 
		 	return fila;
		 })
		 return detalles;
	},
	HayErrores: function(){
		 var self = this;
		 var errores = false;
		 this.state.detalles_lista.forEach(function(datos){
          if (self.refs["detalle_" + datos.num_consecutivo].validarCampos()){
		 		errores = true;
		 	}
          });
		
		 return errores;
	},
	clickOperacion: function(operacion,fila,errores){
		if(operacion === "nuevo" && errores === false){
			var nuevo = this.state.detalles_lista.slice()
			this.num_con = this.num_con === undefined ? 1 : this.num_con + 1
			var nueva_fila = fila;
			nueva_fila["num_consecutivo"] = this.num_con;  
			nueva_fila["dsc_material"] = nueva_fila["material_descripcion"];
			nueva_fila.compra = this.props.id_compra;
			nuevo.push(nueva_fila);
			this.setState({detalles_lista: nuevo })
			this.refs.NuevoDetalle.limpiarFila(); 
			console.log("*** " + nueva_fila.id + " &&&& " + nueva_fila.compra);
		}
		if(operacion == "eliminar"){
				var filas = this.state.detalles_lista.slice()
				var self = this;
				console.log("*** " + fila.id + " &&&& " + fila.compra);
				if(fila.id!==-1){
				 var comDet = new ApiRestCompraDetalles();   
	                  comDet.Eliminar(fila.id,
	                    function(model,response){
	                     	var nuevas = filas.filter(function(datos){
			 					return datos.num_consecutivo !== fila.num_consecutivo;
			 				 });

		  				 	self.setState({detalles_lista: nuevas})

	                        $("#notify_success").text("Los datos del detalle fueron eliminados");
	                        $("#notify_success").notify();
	                    },
	                    function(model,response,options){
	                        $("#notify_error").text(response.responseText);
	                        $("#notify_error").notify();
	                   });
				}
            else{
				var nuevas = filas.filter(function(datos){
			 		return datos.num_consecutivo !== fila.num_consecutivo;
			 	});

				 this.setState({detalles_lista: nuevas})
			 	 console.log("Quiere eliminar una fila " + fila.num_consecutivo);
			 }
			}
	},
	obtenerPais: function(){
		return this.props.obtenerPais();
	},
	sumatoria: function(){
		 var self = this;
		 
		 var pais = "0010000";

		 if(this.props.obtenerPais !== undefined){
		  pais = this.props.obtenerPais();
		 	console.log("el pais es: " + pais);		 	
		 }

		 var suma = 0.0; 
		 this.state.detalles_lista.forEach(function(detalle_compra){
		 	//Si es china o EU
		 	var detalle = self.refs["detalle_" + detalle_compra.num_consecutivo];
		 
		 	peso = (pais === "0010001" || pais === "0010002") ? detalle.state.peso_lb :  detalle.state.peso_kg;

		 	var precio = detalle.state.precio;

		 	suma = parseFloat(suma) + (parseFloat(precio) * parseFloat(peso));
		 });
	
		suma = parseFloat(suma).toFixed(2)
		ReactDOM.render( <EtiquetaTexto titulo="IMPORTE: " valor={suma} clase="etiqueta_especial" key ="dd" />,document.getElementById("suma_detalle_compra"));

	},
	render: function () {
      var self = this;
      var listado_detalles = [];
      var listado = this.props.listado;
 
       var Titulos ={material:"Cat.Material", dsc_material:"Material",calibre:"Milesimas",ancho:"Ancho",largo:"Largo",pesokg:"Peso (Kgs)",pesolbs: "Peso (Lbs)", norollo:"No. Rollo",precio:"Precio", icono1:"",icono2:"" }
       


       var fila_titulo =  <CompraDetalle key={"titulo"} datos ={Titulos} titulo={true} />

	   var fila_insercion =  <CompraDetalle ref="NuevoDetalle" key={"primera"}  primera={true} clickOperacion={this.clickOperacion} obtenerPais={this.obtenerPais} />


       this.state.detalles_lista.forEach(function(detalle_compra){
            var detalle= <CompraDetalle ref={"detalle_" + detalle_compra.num_consecutivo } key={"xx" + detalle_compra.num_consecutivo} datos ={detalle_compra} clickOperacion={self.clickOperacion} obtenerPais={self.obtenerPais} sumatoria={self.sumatoria} />
             listado_detalles.push(detalle);
          });

           return (
		      <div>
		      <div id="suma_detalle_compra">

		      </div>  			  
		      <table className="tabla_catalogo">
		       <tbody>		         
		          {fila_titulo}
		          {fila_insercion}
		          {listado_detalles }
				</tbody>
				</table>
				</div>
			);  
		}
});




