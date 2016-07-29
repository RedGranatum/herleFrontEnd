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
var CajaDeTexto 	    = require('../js/cajaDeTextoSimple.jsx'); 

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
		num_rollo: '',
	}
},
componentDidMount: function(){
	this.reporte_mostrar = 'costo_detallado';
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
	this.setState({'num_rollo': ''})
	this.reporte_mostrar = 'costo_detallado';
    this.llenarListaExistenciasCostos();

},
onClickReporteCostosResumen: function(){
	console.log("Reporte de costos seleccionado")
	this.setState({'num_rollo': ''})
	this.reporte_mostrar = 'costo_resumen';
	this.llenarListaExistenciasCostos();
},
onClickExcel: function(){
	$('#reporte_tablas_reporte_costos').tableExport({type:'excel',escape:'false'});
},
llenarListaExistenciasCostos: function(){
  var self = this;
  var titulosEncabezadoSecundario = {}
  if(this.reporte_mostrar  === "costo_detallado"){
  	 titulosEncabezadoSecundario = {num_documento:"Num.Doc",fec_venta:"Fecha",nombre_cliente:"Cliente"
									,venta_peso_kg:"Venta Kg",precio_kg_venta:"Precio Venta",utilidad:"Utilidad" }
	
  }
	var titulosEncabezado={num_rollo: "Num.Rollo",	codigo_producto:"Codigo Producto",fec_compra:"Fecha Real",nombre_proveedor:"Proveedor"
				  ,compra_peso_kg:"Entrada Kg",precio_kg_compra:"Precio Compra"
				  ,total_salida_kg:"Salidas Kg",existencia_kg:"Existencia Kg",costo_inventario:"Costo Inventario"
				};
  
  var ColumnasDecimales = {costo_inventario: 5}


  var ventas = new ApiRestVentas();
  ventas.num_rollo = this.state.num_rollo;
  ventas.costoAgrupado(  
    function(data){
          self.setState({     lista_datos: data, 
   							  titulos_encabezado: titulosEncabezado, 
							  titulos_encabezado_secundario: 	titulosEncabezadoSecundario,
							  columnas_decimales: ColumnasDecimales,
   							  columna_id:"id",
   							  columna_cabecero: "num_rollo",
   							    });
          self.agregarReporteCostos();
    },
    function(model,response,options){
          self.setState({ lista_datos: [], 
							   titulos_encabezado: titulosEncabezado, 
						       titulos_encabezado_secundario: titulosEncabezadoSecundario,
							   columna_id:"id",
							   columna_cabecero: "num_rollo",
							    });
          self.agregarReporteCostos();
    }
  );
},
onValorCambio: function(campo,valor) {
	if(campo=== "num_rollo")  {
		var campos ={};
		campos[campo] = valor;
		this.setState(campos);
	}
},
onEnter: function(campo, valor){
		if(campo=== "num_rollo"){
			this.setState({'num_rollo': valor});
		    this.llenarListaExistenciasCostos();
			console.log("cambio el num_rollo de costos a: " + valor)
		}
},
render: function () {

	func = new FuncGenericas();
			
	  var dic1 =                               ["id",           "titulo",            "textoIndicativo" ,    "valor",          "onChange"   , "onEnter"];
      var NUM_ROLLO    = func.zipCol(dic1,["num_rollo",  "num_rollo",   "Num.rollo",   this.state.num_rollo , this.onValorCambio,   this.onEnter ]);


	  return (      		
			<section className="contenido">
				<article className="caja_lista_reporte">
					<CajaDeTexto propiedades={NUM_ROLLO} ref="cajaInvoiceIni" />
					<TituloMenu titulo="Costos Detallado" onClick={this.onClickReporteCostosDetallado}/>
					<TituloMenu titulo="Costos Resumen" onClick={this.onClickReporteCostosResumen}/>
					<TituloMenu titulo="Excel" onClick={this.onClickExcel}/>
				</article>
				<article className="bloque_grid" id="contenedor_reportes_costos">
				</article>
			</section>
			);  
		}
});


