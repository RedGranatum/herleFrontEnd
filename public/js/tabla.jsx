var ApiRestCatalogo = require('../js/modelos/apirestCatalogos');
var CajaDeTexto 	= require('../js/cajaDeTexto.jsx');
var Combo 			= require('../js/combo.jsx');
var FuncGenericas   = require('../js/funcionesGenericas')
var OpcionCombo 	= require('../js/opcionCombo.jsx');
var React 			= require('react');
var ReactDOM 		= require('react-dom') ;
var FilaTabla       = require('../js/filaTabla.jsx');
var CeldaTabla      = require('../js/celdaTabla.jsx');
var IconoTabla      = require('../js/iconoTabla.jsx');
var func = new FuncGenericas(); 


var titulosEncabezado=["Material","Kalibre","Ancho","Largo","Peso (Kgs)","Peso (Lbs)","No. Rollo","Precio","  ",""];


var encabezado=titulosEncabezado.map(function(titulo){
     return (
           <CeldaTabla contenido={titulo} />
     	);
});

var fila1=[
  {editable:"true",contenido:""},
  {editable:"true",contenido:""},
  {editable:"true",contenido:""},
  {editable:"true",contenido:""},
  {editable:"true",contenido:""},
  {editable:"true",contenido:""},
  {editable:"true",contenido:""},
  {editable:"true",contenido:""},
  {editable:"false",contenido:<IconoTabla  opcionGuardar={"guardar_renglon"} tipoIcono={"plus"}/>},
  {editable:"true",contenido:""}
];
var fila2=[
  {editable:"true",contenido:""},
  {editable:"true",contenido:""},
  {editable:"true",contenido:""},
  {editable:"true",contenido:""},
  {editable:"true",contenido:""},
  {editable:"true",contenido:""},
  {editable:"true",contenido:""},
  {editable:"true",contenido:""},
  {editable:"false",contenido:<IconoTabla  opcionGuardar={"eliminar_renglon"} tipoIcono={"remove"}/>},
  {editable:"false",contenido:<IconoTabla  opcionGuardar={"actualizar_renglon"} tipoIcono={"refresh"}/>}
  
];
var fila3=[
  {editable:"true",contenido:""},
  {editable:"true",contenido:""},
  {editable:"true",contenido:""},
  {editable:"true",contenido:""},
  {editable:"true",contenido:""},
  {editable:"true",contenido:""},
  {editable:"true",contenido:""},
  {editable:"true",contenido:""},
  {editable:"false",contenido:<IconoTabla  opcionGuardar={"eliminar_renglon"} tipoIcono={"remove"}/>},
  {editable:"false",contenido:<IconoTabla  opcionGuardar={"actualizar_renglon"} tipoIcono={"refresh"}/>}
];
var fila4=[
  {editable:"true",contenido:""},
  {editable:"true",contenido:""},
  {editable:"true",contenido:""},
  {editable:"true",contenido:""},
  {editable:"true",contenido:""},
  {editable:"true",contenido:""},
  {editable:"true",contenido:""},
  {editable:"true",contenido:""},
  {editable:"false",contenido:<IconoTabla  opcionGuardar={"eliminar_renglon"} tipoIcono={"remove"}/>},
  {editable:"false",contenido:<IconoTabla  opcionGuardar={"actualizar_renglon"} tipoIcono={"refresh"}/>}
];
var fila5=[
  {editable:"true",contenido:""},
  {editable:"true",contenido:""},
  {editable:"true",contenido:""},
  {editable:"true",contenido:""},
  {editable:"true",contenido:""},
  {editable:"true",contenido:""},
  {editable:"true",contenido:""},
  {editable:"true",contenido:""},
  {editable:"false",contenido:<IconoTabla  opcionGuardar={"eliminar_renglon"} tipoIcono={"remove"}/>},
  {editable:"false",contenido:<IconoTabla  opcionGuardar={"actualizar_renglon"} tipoIcono={"refresh"}/>}
];

var celdas1=func.llenarCeldasDeFila(fila1);
var celdas2=func.llenarCeldasDeFila(fila2);
var celdas3=func.llenarCeldasDeFila(fila3);
var celdas4=func.llenarCeldasDeFila(fila4);
var celdas5=func.llenarCeldasDeFila(fila5);
module.exports = React.createClass({

		render: function () {

           return (
		      <table className="tabla_catalogo">
		       <tbody>
					<FilaTabla childrens={encabezado}/>
					<FilaTabla childrens={celdas1} />
					<FilaTabla childrens={celdas2} />
					<FilaTabla childrens={celdas3} />
					<FilaTabla childrens={celdas4} />
					<FilaTabla childrens={celdas5} />
				  </tbody>
				</table>
			);  
		}
});




