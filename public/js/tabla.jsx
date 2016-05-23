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
var IconoTabla      = require('../js/iconoTabla.jsx');
var func = new FuncGenericas(); 





module.exports = React.createClass({
	render: function () {

      var self = this;
      var listado_detalles = [];
      var listado = this.props.listado;
  //    var titulosEncabezado=["Cat.Material","Desc.Material","Calibre","Ancho","Largo","Peso (Kgs)","Peso (Lbs)","No. Rollo","Precio","_","."];
 //      material_descripcion
       var Titulos ={material:"Cat.Material", dsc_material:"Desc.Materia",calibre:"Calibre",ancho:"Ancho",largo:"Largo",pesokg:"Peso (Kgs)",pesolbs: "Peso (Lbs)", norollo:"No. Rollo",precio:"Precio", icono1:"",icono2:"" }
       var fila_titulo =  <CompraDetalle key={"titulo"} datos ={Titulos} titulo={true} />

	   var ico_nuevo =  <IconoTabla  opcionGuardar={"guardar_renglon"} tipoIcono={"plus"}/>;
	   

	   var Primer ={material:"0050000", dsc_material:"",calibre:"",ancho:"",largo:"",pesokg:"",pesolbs: "", norollo:"",precio:"", icono1:ico_nuevo,icono2:"" }
       var fila_insercion =  <CompraDetalle key={"primera"} datos ={Primer}  primera={true}/>


       listado.forEach(function(detalle_compra){
            var detalle= <CompraDetalle key={detalle_compra.id} datos ={detalle_compra} />
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




