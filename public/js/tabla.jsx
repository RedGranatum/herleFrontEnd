var ApiRestCatalogo = require('../js/modelos/apirestCatalogos');
var CajaDeTexto 	= require('../js/cajaDeTexto.jsx');
var ComboSimple 			= require('../js/combo_simple.jsx');
var FuncGenericas   = require('../js/funcionesGenericas')
var OpcionCombo 	= require('../js/opcionCombo.jsx');
var React 			= require('react');
var ReactDOM 		= require('react-dom') ;
var FilaTabla       = require('../js/filaTabla.jsx');
var CeldaTabla      = require('../js/celdaTabla.jsx');
var CompraDetalle    = require('../js/compraDetalles.jsx');
var func = new FuncGenericas(); 

module.exports = React.createClass({
	componentWillReceiveProps: function(nuevas_props){
		this.num_con =1
		for(i=0; i< nuevas_props.listado.length; i++){
			nuevas_props.listado[i]["num_consecutivo"] = this.num_con
			this.num_con ++;
		}
         
		 this.setState({detalles_lista:nuevas_props.listado })  
	  },
	getInitialState: function(){
			return {
				detalles_lista : [],
			}
			
	},
	clickOperacion: function(operacion){
		debugger;
		var nuevo = this.state.detalles_lista.slice()
		this.num_con = this.num_con === undefined ? 1 : this.num_con + 1
		console.log("nuevo con " + this.num_con)
		nuevos_valores = {num_consecutivo:this.num_con, ancho: "1", calibre:"2", compra:"3",dsc_material:"4", largo:"5",material:"0050001",peso_kg:"6",peso_lb:"7"
		,num_rollo:"8",precio:"9"}
		nuevo.push(nuevos_valores);
		this.setState({detalles_lista: nuevo })
		console.log("nueva operacion: " + operacion);
	},
	render: function () {

      var self = this;
      var listado_detalles = [];
      var listado = this.props.listado;
 
       var Titulos ={material:"Cat.Material", dsc_material:"Desc.Materia",calibre:"Calibre",ancho:"Ancho",largo:"Largo",pesokg:"Peso (Kgs)",pesolbs: "Peso (Lbs)", norollo:"No. Rollo",precio:"Precio", icono1:"",icono2:"" }
       var fila_titulo =  <CompraDetalle key={"titulo"} datos ={Titulos} titulo={true} />

	   

	   var Primer ={material:"0050000", dsc_material:"",calibre:"",ancho:"",largo:"",peso_kg:"",peso_lb: "", num_rollo:"",precio:""}
       var fila_insercion =  <CompraDetalle key={"primera"} datos ={Primer}  primera={true} clickOperacion={this.clickOperacion}/>


       this.state.detalles_lista.forEach(function(detalle_compra){
            var detalle= <CompraDetalle ref={"detalle_" + detalle_compra.num_consecutivo } key={detalle_compra.num_consecutivo} datos ={detalle_compra} clickOperacion={self.clickOperacion} />
             listado_detalles .push(detalle);
          });


           return (
		      <table className="tabla_catalogo">
		       <tbody>
		          {fila_titulo}
		          {fila_insercion}
		          {listado_detalles }
				</tbody>
				</table>
			);  
		}
});




