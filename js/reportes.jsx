var $                	= require('jquery');
global.jQuery           = require("jquery");
var jQuery              = require('jquery');
var moment 		    	= require('moment');
var ReactDOM 		    = require('react-dom');
var React  		     	= require('react');
var FuncGenericas       = require('../js/funcionesGenericas')
var TituloMenu 		 	= require('../js/titulos_menu.jsx');
var CajaDeTexto 	    = require('../js/cajaDeTextoSimple.jsx'); 
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
		fec_inicial:moment().format('DD/MM/YYYY'),
		fec_final:moment().format('DD/MM/YYYY'),
		invoice: '',
		reporte_mostrar: '',
	}
},
componentDidMount: function(){
		        var self= this;
				$("#fec_inicial,#fec_final").datepicker({dateFormat:"dd/mm/yy"})
						.on("input change", function(e){
							self.cambiarValorFecha(e.target.id,e.target.value);
		});
	},
cambiarValorFecha: function(control,valor){
			var update = {};
			update[control] = valor;
			update['invoice'] = '';
			this.setState(update);
			console.log("Cambio fecha a " + valor)
		   this.llenarconsultaCompras(this.state.reporte_mostrar);
	},
onBlurFecha: function(control,valor){  	
	    console.log("sali con el valor " + valor);
	},
onClickReporteExistencias: function(){
	this.llenarListaExistencias();
},
onClickReporteCompras: function(){
	console.log("Reporte seleccionado")
	this.llenarconsultaCompras("compras");
},
onClickReporteInventario: function(){
	console.log("Reporte seleccionado")
	this.llenarconsultaCompras("inventario");
},
onClickExcel: function(){
	//$('#customers').tableExport({type:'excel',escape:'false'});
	
	$('#reporte_tablas_listado').tableExport({type:'excel',escape:'false'});
	 // dt();

	//var codigo= '<table border="1" cellspacing="0" bordercolor="#222" id="list"> <tr class="header">  <th>user_id</th>          <th>firstname</th>          <th>lastname</th>       </tr>    <tr>          <td>1</td>          <td>Alex</td>          <td>Lahevin</td>        </tr>        <tr>          <td>2</td>          <td>Kostas</td>          <td>Krevatas</td>        </tr>        <tr>          <td>3</td>          <td>Alexander</td>          <td>Fakaris</td>        </tr>        </table>';
	// window.open('data:application/vnd.ms-excel,' + codigo);

},
agregarReporteCompras: function(datos){

	ReactDOM.render(<ReporteCompra id={this.state.columna_id} 
					               titulos={this.state.titulos_encabezado} 
					 			   titulos_secundarios={this.state.titulos_encabezado_secundario}	
								   datos={datos}
								   columna_cabecero={this.state.columna_cabecero}/> ,
					 document.getElementById("contenedor_reportes"));
},
agregarReporteExistencias: function(datos){

	 ReactDOM.render(<ReporteCompra id={this.state.columna_id} 
					               titulos={this.state.titulos_encabezado} 
					 			   datos={datos}
					 			   columna_cabecero ={"num_rollo"} />,
					 document.getElementById("contenedor_reportes"));
},
llenarListaExistencias: function(){
	var self = this;

//	 ReactDOM.render(<ListadoGenerico /> , document.getElementById("contenedor_reportes"));

	var titulosEncabezado={num_rollo:"Num.Rollo",codigo_producto: "Producto",calibre:"Milesimas",ancho:"Ancho",entradas_kg:"Entradas Kg",salidas_kg:"Salida Kg",existencia_kg:"Existencias Kg"};


	var existencias = new ApiRestExistencias();
	existencias.buscarExistenciaAgrupadasPorRollo(	
		function(data){
   				self.setState({lista_datos: data,
   				               titulos_encabezado: titulosEncabezado, 			               
   				               columna_id:"num_rollo",
   				                reporte_mostrar: "existencias",
   				           });
   				  self.agregarReporteExistencias(data);
   				
		},
		function(model,response,options){
				    self.setState({lista_datos : [] ,
				                   titulos_encabezado: titulosEncabezado,
				                   columna_id:"num_rollo",
   				                   reporte_mostrar: "existencias",
				                    });
				    self.agregarReporteExistencias(data);
				 
		}
	);
},
llenarconsultaCompras: function(modulo){
	var self = this;
//	 ReactDOM.render(<ListadoGenerico /> , document.getElementById("contenedor_reportes"));

	var titulosEncabezado={ invoice: "Invoice",
							fec_solicitud:"Fec.Solicitud",fec_real:"Fec.Real",
							proveedor_codigo:"CodigoProv",proveedor_nombre:"Proveedor",proveedor_pais:"Pais"
						};

	var titulosEncabezadoSecundario={detalle_validado:"Validado",dsc_material: "Dsc.Material",detalle_material:"Material",
							detalle_calibre:"Milesimas", detalle_ancho:"Ancho",detalle_largo:"Largo",
							detalle_peso_kg:"Peso Kg",detalle_peso_lb:"Peso Lb",detalle_precio:"Precio"}

	if(modulo =="inventario"){
		var titulosEncabezadoSecundario={inv_codigo_producto:"Codigo Producto",inv_num_rollo: "Num.Rollo",
							inv_calibre:"Milesimas", inv_ancho:"Ancho",inv_largo:"Largo",
							inv_peso_kg:"Peso Kg",inv_valor_final_kilo_pesos:"Kilo en Pesos"}	
	}
  
	var consulta = new ApiRestCompras();
	consulta.fec_inicial = this.state.fec_inicial;
	consulta.fec_final   = this.state.fec_final; 
	consulta.invoice     = this.state.invoice;
	consulta.modulo      = modulo;
	
	consulta.consultaComprasPorFechas(	
		function(data){
   				self.setState({lista_datos: data, 
   							   titulos_encabezado: titulosEncabezado, 
							   titulos_encabezado_secundario: 	titulosEncabezadoSecundario,
   							   columna_id:"num_rollo",
   							   columna_cabecero: "id_compra",
   							   reporte_mostrar: modulo,
   							    });
   				self.agregarReporteCompras(data);
		},
		function(model,response,options){
				 self.setState({lista_datos : [] ,
				 			    titulos_encabezado: titulosEncabezado, 
				 			    titulos_encabezado_secundario: titulosEncabezadoSecundario,
				 			    columna_id:"num_rollo",
				 			    columna_cabecero: "id_compra",
				 			    reporte_mostrar: modulo,
				 			      });
				 self.agregarReporteCompras([]);
		}
	);
},

onValorCambio: function(campo,valor) {
	if(campo=== "invoice")  {
		var campos ={};
		campos[campo] = valor;
		this.setState(campos);
	}
},
onEnter: function(campo, valor){
		if(campo=== "invoice"){
			this.setState({'invoice': valor});
		    this.llenarconsultaCompras(this.state.reporte_mostrar);
			console.log("cambio el invoice a: " + valor)
		}
},
render: function () {
	var self= this;
	var estilo = {cursor:"pointer"};
	var estilo_fechas = {display: 'none'};

		func = new FuncGenericas();
			
	        var dic1 =                               ["id",           "titulo",            "textoIndicativo" ,    "valor",          "onChange"   , "onBlur" ,"onEnter"];
		    var INVOICE    = func.zipCol(dic1,["invoice",  "Invoice",   "Invoice",   this.state.invoice , this.onValorCambio,  this.onBlurInvoice  , this.onEnter ]);
            var FECHA_INI  = func.zipCol(dic1,["fec_inicial",  "Fecha Inicial",   "Fecha Inicial",   this.state.fec_inicial , this.onValorCambio,  this.onBlurFecha, this.onEnter  ]);
            var FECHA_FIN  = func.zipCol(dic1,["fec_final",  "Fecha Final",   "Fecha Final",   this.state.fec_final , this.onValorCambio,          this.onBlurFecha, this.onEnter  ]);
 
            var fec_ini =[];
			var fec_fin =[];
			console.log("Aqui esta: " + this.state.reporte_mostrar);
			if(this.state.reporte_mostrar === "compras"){
					FECHA_INI["titulo"] ="Fec.Solicitud Inicial"
					FECHA_FIN["titulo"] ="Fec.Solicitud Final"
					estilo_fechas["display"] = 'inline';
				}
			if(this.state.reporte_mostrar === "inventario"){
					FECHA_INI["titulo"] ="Fec.Real Inicial"
					FECHA_FIN["titulo"] ="Fec.Real Final"
					estilo_fechas["display"] = 'inline';
					
				}
	  return (      		
			<section className="contenido">
				<article className="caja_lista_reporte">
					<div style={estilo_fechas}>
						 <CajaDeTexto propiedades={FECHA_INI} ref="cajaFechaSolicitudIni" />
						 <CajaDeTexto propiedades={FECHA_FIN} ref="cajaFechaSolicitudFin" />
						 <CajaDeTexto propiedades={INVOICE} ref="cajaInvoiceIni" />
						  <br/>
						  <label className="etiquetas_bloque">     Fec.Inicial Fec.Final</label>      
					</div> 		
					<TituloMenu titulo="Existencias" onClick={this.onClickReporteExistencias}/>
					<TituloMenu titulo="Orden de Compra" onClick={this.onClickReporteCompras}/>
					<TituloMenu titulo="Compra inventariada" onClick={this.onClickReporteInventario}/>
					<TituloMenu titulo="Excel" onClick={this.onClickExcel}/>
				</article>
			{/*	<article className="bloque">
				<div style={estilo_fechas}>
				 <CajaDeTexto propiedades={INVOICE} ref="cajaInvoiceIni" />
				 <CajaDeTexto propiedades={FECHA_INI} ref="cajaFechaSolicitudIni" />
				 <CajaDeTexto propiedades={FECHA_FIN} ref="cajaFechaSolicitudFin" />
				</div> */}
					<article className="bloque_grid" id="contenedor_reportes">

					</article>
				{/*</article>*/}
			</section>
			);  
		}
});

