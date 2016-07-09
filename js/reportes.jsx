var $                	= require('jquery');
global.jQuery = require("jquery");
var jQuery              = require('jquery');
var React  		     	= require('react');
var TituloMenu 		 	= require('../js/titulos_menu.jsx'); 
var CeldaTabla       	= require('../js/celdaTabla.jsx');
var FilaTabla        	= require('../js/filaTabla.jsx');
var ApiRestInventario   = require('../js/modelos/apirestInventarios');
var ApiRestExistencias  = require('../js/modelos/apirestExistencias');
var ApiRestCompras 		= require('../js/modelos/apirestCompras');
var ListadoGenerico     = require('../js/listadoGenerico.jsx');
var ReporteCompra 		= require('../js/reportesCompras.jsx');
var tableExport = require( '../js/ex/tableExport' );
var Base64 = require( '../js/ex/jquery.base64' );

module.exports = React.createClass({
getDefaultProps: function(){
	return{
		clase: 'caja_bloque',
	}
},
getInitialState: function(){
	return {
		columna_id: 'Id',
		lista_datos: [],
		titulos_encabezado: {},
		titulos_encabezado_secundario: {},
		columna_cabecero: '',
	}
},
onClickReporte: function(){
	console.log("Reporte seleccionado")
	//this.llenarListaExistencias();
	this.llenarconsultaCompras();
},
onClickExcel: function(){
	//$('#customers').tableExport({type:'excel',escape:'false'});
	
	$('#reporte_compras').tableExport({type:'excel',escape:'false'});
	 // dt();

	//var codigo= '<table border="1" cellspacing="0" bordercolor="#222" id="list"> <tr class="header">  <th>user_id</th>          <th>firstname</th>          <th>lastname</th>       </tr>    <tr>          <td>1</td>          <td>Alex</td>          <td>Lahevin</td>        </tr>        <tr>          <td>2</td>          <td>Kostas</td>          <td>Krevatas</td>        </tr>        <tr>          <td>3</td>          <td>Alexander</td>          <td>Fakaris</td>        </tr>        </table>';
	// window.open('data:application/vnd.ms-excel,' + codigo);

},
llenarListaExistencias: function(){
	var self = this;
	var titulosEncabezado={num_rollo:"Num.Rollo",codigo_producto: "Producto",calibre:"Milesimas",ancho:"Ancho",entradas_kg:"Entradas Kg",salidas_kg:"Salida Kg",existencia_kg:"Existencias Kg"};


	var existencias = new ApiRestExistencias();
	existencias.buscarExistenciaAgrupadasPorRollo(	
		function(data){
   				self.setState({lista_datos: data,
   				               titulos_encabezado: titulosEncabezado, 			               
   				               columna_id:"num_rollo" });
		},
		function(model,response,options){
				    self.setState({lista_datos : [] ,
				                   titulos_encabezado: titulosEncabezado,
				                   columna_id:"num_rollo" });
		}
	);
},
llenarconsultaCompras: function(){
	var self = this;
	var titulosEncabezado={ invoice: "Invoice",
							fec_solicitud:"Fec.Solicitud",fec_real:"Fec.Real",
							proveedor_codigo:"CodigoProv",proveedor_nombre:"Proveedor",proveedor_pais:"Pais"
						};

	var titulosEncabezadoSecundario={detalle_validado:"Validado",dsc_material: "Dsc.Material",detalle_material:"Material",
							detalle_calibre:"Milesimas", detalle_ancho:"Ancho",detalle_largo:"Largo",
							detalle_peso_kg:"Peso Kg",detalle_peso_lb:"Peso Lb",detalle_precio:"Precio"}

	var consulta = new ApiRestCompras();
	consulta.consultaComprasPorFechas(	
		function(data){
   				self.setState({lista_datos: data, 
   							   titulos_encabezado: titulosEncabezado, 
							   titulos_encabezado_secundario: 	titulosEncabezadoSecundario,
   							   columna_id:"num_rollo",
   							   columna_cabecero: "id_compra" });
		},
		function(model,response,options){
				 self.setState({lista_datos : [] ,
				 			    titulos_encabezado: titulosEncabezado, 
				 			    titulos_encabezado_secundario: titulosEncabezadoSecundario,
				 			    columna_id:"num_rollo",
				 			    columna_cabecero: "id_compra"  });
		}
	);
},
render: function () {
	var self= this;
	var estilo = {cursor:"pointer"};

 
		//<ListadoGenerico id={this.state.columna_id} titulos={this.state.titulos_encabezado} datos={this.state.lista_datos}/>

	  return (      		
			<section className="contenido">
				<article className="caja_lista_reporte">
					<TituloMenu titulo="Inventario" onClick={this.onClickReporte}/>
					<TituloMenu titulo="Excel" onClick={this.onClickExcel}/>
				</article>
				<article className="bloque">
					<div className="bloque_catalogo" id="ampliar_tabla2">
						<ReporteCompra id={this.state.columna_id} 
									   titulos={this.state.titulos_encabezado} 
									   titulos_secundarios={this.state.titulos_encabezado_secundario}	
									   datos={this.state.lista_datos}
									   columna_cabecero={this.state.columna_cabecero}/>
					</div>

				</article>
			</section>
			);  
		}
});

