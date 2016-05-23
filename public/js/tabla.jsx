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
	clickOperacion: function(operacion){
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


       listado.forEach(function(detalle_compra){
            var detalle= <CompraDetalle key={detalle_compra.id} datos ={detalle_compra} clickOperacion={self.clickOperacion} />
             listado_detalles.push(detalle);
          });
           return (
		      <table className="tabla_catalogo">
		       <tbody>
		          {fila_titulo}
		          {fila_insercion}
		          {listado_detalles}
				</tbody>
				</table>
			);  
		}
});




