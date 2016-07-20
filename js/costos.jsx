var $                	= require('jquery');
global.jQuery           = require("jquery");
var jQuery              = require('jquery');
var moment 		    	= require('moment');
var ReactDOM 		    = require('react-dom');
var React  		     	= require('react');
var FuncGenericas       = require('../js/funcionesGenericas')
var TituloMenu 		 	= require('../js/titulos_menu.jsx');
var CajaDeTexto 	    = require('../js/cajaDeTexto.jsx'); 
var CeldaTabla       	= require('../js/celdaTabla.jsx');
var FilaTabla        	= require('../js/filaTabla.jsx');
var ApiRestVentas       = require('../js/modelos/apirestVentas');

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

agregarReporteCostos: function(){
	ReactDOM.render(<ReporteCompra id_reporte= {'reporte_tablas_reporte_costos'}
				   id={this.state.columna_id} 
	               titulos={this.state.titulos_encabezado} 
	 			   titulos_secundarios={this.state.titulos_encabezado_secundario}	
				   datos={this.state.lista_datos}
				   columna_cabecero={this.state.columna_cabecero}/>,
			 document.getElementById("contenedor_reportes_costos"));
},

onClickReporteCostosDetallado: function(){
	console.log("Reporte de costos seleccionado")
	var titulosEncabezadoSecundario = {num_documento:"Num.Doc",fec_venta:"Fecha",nombre_cliente:"Cliente"
									,venta_peso_kg:"Venta Kg",precio_kg_venta:"Precio Venta",utilidad:"Utilidad" }
  
	this.llenarListaExistenciasCostos(titulosEncabezadoSecundario);

},
onClickReporteCostosResumen: function(){
	console.log("Reporte de costos seleccionado")
	var titulosEncabezadoSecundario = {}
	this.llenarListaExistenciasCostos(titulosEncabezadoSecundario);
},
onClickExcel: function(){
	$('#reporte_tablas_reporte_costos').tableExport({type:'excel',escape:'false'});
},
llenarListaExistenciasCostos: function(titulosSecundarios){
  var self = this;

	var titulosEncabezado={num_rollo: "Num.Rollo",	codigo_producto:"Codigo Producto",nombre_proveedor:"Proveedor"
				  ,fec_compra:"Fecha",compra_peso_kg:"Entrada Kg",precio_kg_compra:"Precio Compra"
				  ,total_salida_kg:"Salidas Kg",existencia_kg:"Existencia Kg",costo_inventario:"Costo Inventario"
				};
  
  var ventas = new ApiRestVentas();
  ventas.costoAgrupado(  
    function(data){
          self.setState({     lista_datos: data, 
   							  titulos_encabezado: titulosEncabezado, 
							  titulos_encabezado_secundario: 	titulosSecundarios,
   							  columna_id:"id",
   							  columna_cabecero: "num_rollo",
   							    });
          self.agregarReporteCostos();
    },
    function(model,response,options){
          self.setState({ lista_datos: [], 
							   titulos_encabezado: titulosEncabezado, 
						       titulos_encabezado_secundario: {},
							   columna_id:"id",
							   columna_cabecero: "num_rollo",
							    });
          self.agregarReporteCostos();
    }
  );
},

render: function () {
	  return (      		
			<section className="contenido">
				<article className="caja_lista_reporte">
					<TituloMenu titulo="Costos Detallado" onClick={this.onClickReporteCostosDetallado}/>
					<TituloMenu titulo="Costos Resumen" onClick={this.onClickReporteCostosResumen}/>
					<TituloMenu titulo="Excel" onClick={this.onClickExcel}/>
				</article>
				<article className="bloque">
					<div className="bloque_catalogo" id="contenedor_reportes_costos">	
					</div>
				</article>
			</section>
			);  
		}
});


