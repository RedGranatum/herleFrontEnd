var $        = require('jquery');
var React           = require('react');
var ReactDOM 		= require('react-dom');
var VentaDetalle   = require('../js/ventasDetalles.jsx');
var EtiquetaTexto     = require('../js/etiquetaDeTexto.jsx');

module.exports = React.createClass({
getDefaultProps: function(){
			return{
				activa: false,
				id_venta: -1,
				listado: [],
				iva: 0,
			};
		},
getInitialState: function(){
			return{
				listado: this.props.listado,	
			};
	},
componentWillMount: function(){
	this.num_con =-1;
},
componentDidUpdate: function(){
	this.sumatoria();
},
componentWillReceiveProps: function(nextProps){
	this.num_con = -1;
	if(nextProps.listado !== undefined){
		this.setState({listado: nextProps.listado});
	 }
 	  else{
 	  	this.setState({listado: []})
  }
},
clickOperacion: function(operacion,fila,errores){
	if(operacion === "nuevo" && errores === false){
		var nuevo = this.state.listado.slice()
		this.num_con =  this.num_con - 1;
		var nueva_fila = fila;
		// nueva_fila["num_consecutivo"] = this.num_con;  
		 nueva_fila["id"] = this.num_con;
		 nueva_fila.venta = this.state.listado.venta;
		 nuevo.push(nueva_fila);
		 this.setState({listado: nuevo })
		 if(this.refs.NuevoDetalleVenta !== undefined){
			 this.refs.NuevoDetalleVenta.limpiarFila(); 
		 }
	}
		if(operacion == "eliminar"){
				var filas = this.state.listado.slice()
				var self = this;
				console.log("*** " + fila.id + " &&&& " + fila.venta);
				if(fila.id<=-1){
					var nuevas = filas.filter(function(datos){
			 		return datos.id !== fila.id;
			 		});

				 this.setState({listado: nuevas})
			 	 console.log("Quiere eliminar una fila " + fila.id);
			 }
			}
},
sumatoria: function(){
		 var self = this;
		 var suma = 0.0; 
		 this.state.listado.forEach(function(detalle_venta){
		 	var detalle = self.refs["detalle_" + detalle_venta.id];
		 	var precio = detalle.state.precio_neto;
		 	var cantidad = detalle.state.peso_kg;
		 	suma = parseFloat(suma) + (parseFloat(precio) * parseFloat(cantidad));
		 });
	
		suma = parseFloat(suma).toFixed(2)
		ReactDOM.render( <EtiquetaTexto titulo="Neto Venta: " valor={suma} clase="etiqueta_especial" key ="suma_venta" />,document.getElementById("venta_neto_venta"));

},
valoresDetallesVenta: function(){
	 var self = this;
	 var detalles = this.state.listado.map(function(datos){
	 	var fila =self.refs["detalle_" + datos.id].valoresFila();
	 	delete fila.existencia; 
	 	delete fila.venta
	 	return fila;
	 })
	 return detalles;
},
render: function () {
		var self = this;
        var listado_detalles = [];

    	var Titulos ={busqueda:"busqueda", num_rollo:"Num.Rollo",existencia:"Existencia" ,peso_kg:"Peso Kg",precio_neto:"Precio Neto",tipo_rollo:"Tipo"}
        if(this.props.id_venta > 0){
        	delete Titulos["busqueda"];
        	delete Titulos["existencia"]
        }
        var fila_titulo =  <VentaDetalle key={"titulo"} datos ={Titulos} titulo={true} />
        var fila_insercion =  <VentaDetalle ref="NuevoDetalleVenta" key={"primera"}  primera={true} clickOperacion={this.clickOperacion}/> ;
        fila_insercion = (this.props.id_venta > 0) ?  <td></td> : fila_insercion;
      this.state.listado.forEach(function(detalle_venta){   
      	    var tipo_rollo = detalle_venta.tipo_rollo.cdu_catalogo === undefined ?  detalle_venta.tipo_rollo : detalle_venta.tipo_rollo.cdu_catalogo;
            var detalle= <VentaDetalle ref={"detalle_" + detalle_venta.id } 
            						key={"venta_det_" + detalle_venta.id} 
            						datos = {detalle_venta} 
            						id = {detalle_venta.id} 
									venta = {detalle_venta.venta} 
									num_rollo = {detalle_venta.num_rollo} 
									tipo_rollo = {tipo_rollo}
									peso_kg = {detalle_venta.peso_kg} 
									precio_neto = {detalle_venta.precio_neto} 
									existencia = {detalle_venta.existencia}
            						clickOperacion={self.clickOperacion} 
            						sumatoria = {self.sumatoria}
            						id_venta={self.props.id_venta} />
             listado_detalles.push(detalle);
          });
          $('#impresion_registro').attr('src', '');
         
		   return(  
		   	     <article className="bloque">
	          <div className="bloque_catalogo" id="ampliar_tabla">
				<table className="tabla_catalogo">	
				 <tbody>					
					{fila_titulo}
					{fila_insercion}
					{listado_detalles}					
				  </tbody>
				</table>
				 {this.props.id_venta>0 && this.props.activa ? <button onClick={this.props.generarPDF}>Imprimir Nota de Remisión</button> : ''}
				 <iframe id="impresion_registro"  
				         className="preview-pane" 
		       		     type="application/pdf" 
		       		     width="100%" 
		       		     height="750" 
		       		     frameBorder="0" 
		       		     style={{position:"relative",zIndex:"5"}}>
				</iframe>
				<div className="error_mostrar_grid">mensaje de error del campo</div>
			</div>		
            </article>
			);  
		}
});