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
var ApiRestVentas 		= require('../js/modelos/apirestVentas');
var ApiRestCalendarioPagos = require('../js/modelos/apirestClientesPagos');

var ListadoGenerico     = require('../js/listadoGenerico.jsx');
var ReporteCompra 		= require('../js/reportesCompras.jsx');
var ReporteVenta        = require('../js/reportesCompras.jsx'); 
var ReportePagos        = require('../js/reportesCompras.jsx'); 

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
		columnas_decimales: {},
		columna_cabecero: '',
		fec_inicial:moment().format('DD/MM/YYYY'),
		fec_final:moment().format('DD/MM/YYYY'),
		invoice: '',
		producto: '',
		num_rollo: '',
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
			if(this.state.reporte_mostrar==="ventas"){
			   this.llenarconsultaVentas(this.state.reporte_mostrar);
			}
			else{				
		 	  this.llenarconsultaCompras(this.state.reporte_mostrar);
			}
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
onClickReporteVentas: function(){
	console.log("Reporte seleccionado")
	this.llenarconsultaVentas("ventas");
},
onClickReporteCalendarioPagos: function(){
	console.log("Reporte calendario de pagos")
	this.llenarconsultaCalendarioPagos("pagos");
},
onClickReporteCalendarioAduana: function(){
	console.log("Reporte calendario fecha de aduana")
	this.llenarconsultaCalendarioAduana("compras_aduana");
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
					 			   columnas_decimales={this.state.columnas_decimales}
								   datos={datos}
								   columna_cabecero={this.state.columna_cabecero}/> ,
					 document.getElementById("contenedor_reportes"));
},
agregarReporteExistencias: function(datos){

	 ReactDOM.render(<ReporteCompra id={this.state.columna_id} 
					               titulos={this.state.titulos_encabezado} 
					               columnas_decimales={this.state.columnas_decimales}
					 			   datos={datos}
					 			   columna_cabecero ={"num_rollo"} />,
					 document.getElementById("contenedor_reportes"));
},
agregarReporteVentas: function(datos){

	ReactDOM.render(<ReporteVenta id={this.state.columna_id} 
					               titulos={this.state.titulos_encabezado} 
					 			   titulos_secundarios={this.state.titulos_encabezado_secundario}	
					 			   columnas_decimales={this.state.columnas_decimales}
								   datos={datos}
								   columna_cabecero={this.state.columna_cabecero}/> ,
					 document.getElementById("contenedor_reportes"));
},
agregarReporteCalendarioPagos: function(datos){

	ReactDOM.render(<ReportePagos id={this.state.columna_id} 
					               titulos={this.state.titulos_encabezado} 
					 			   titulos_secundarios={this.state.titulos_encabezado_secundario}	
								   datos={datos}
								   columna_cabecero={this.state.columna_cabecero}/> ,
					 document.getElementById("contenedor_reportes"));
},
agregarReporteCalendarioAduana: function(datos){

	ReactDOM.render(<ReportePagos id={this.state.columna_id} 
					               titulos={this.state.titulos_encabezado} 
					 			   titulos_secundarios={this.state.titulos_encabezado_secundario}	
								   datos={datos}
								   columna_cabecero={this.state.columna_cabecero}/> ,
					 document.getElementById("contenedor_reportes"));
},

llenarListaExistencias: function(){
	var self = this;

//	 ReactDOM.render(<ListadoGenerico /> , document.getElementById("contenedor_reportes"));

	var titulosEncabezado={num_rollo:"Num.Rollo",codigo_producto: "Producto",calibre:"Milesimas",ancho:"Ancho",entradas_kg:"Entradas Kg",salidas_kg:"Salida Kg",existencia_kg:"Existencias Kg"};
     
     var ColumnasDecimales = {ancho:0,calibre:3,entradas_kg:4,salidas_kg:4,existencia_kg:4}


	var existencias = new ApiRestExistencias();
	existencias.producto = this.state.producto;
	existencias.num_rollo   = this.state.num_rollo; 
	
	existencias.buscarExistenciaAgrupadasPorRollo(	
		function(data){
   				self.setState({lista_datos: data,
   				               titulos_encabezado: titulosEncabezado, 
   				               columnas_decimales: ColumnasDecimales,			               
   				               columna_id:"num_rollo",
   				                reporte_mostrar: "existencias",
   				           });
   				  self.agregarReporteExistencias(data);
   				
		},
		function(model,response,options){
				    self.setState({lista_datos : [] ,
				                   titulos_encabezado: titulosEncabezado,
				                   columnas_decimales: columnas_decimales,
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

	var titulosEncabezado={ estatus:"Estatus",invoice: "Invoice Compra",
							fec_solicitud:"Fec.Solicitud",fec_real:"Fec.Real",
							proveedor_codigo:"CodigoProv",proveedor_nombre:"Proveedor",proveedor_pais:"Pais"
						};

	var titulosEncabezadoSecundario={detalle_validado:"Validado",dsc_material: "Dsc.Material",detalle_material:"Material",
							detalle_calibre:"Milesimas", detalle_ancho:"Ancho",detalle_largo:"Largo",
							detalle_peso_kg:"Peso Kg",detalle_peso_lb:"Peso Lb",detalle_precio:"Precio"}


    var columnas_decimales = {detalle_ancho:0,detalle_largo:0,detalle_calibre:3,entradas_kg:4,salidas_kg:4,existencia_kg:4,
    					      detalle_peso_kg:4,detalle_peso_lb:4,detalle_precio:4}

	if(modulo =="inventario"){
		var titulosEncabezadoSecundario={inv_codigo_producto:"Codigo Producto",inv_num_rollo: "Num.Rollo",
							inv_calibre:"Milesimas", inv_ancho:"Ancho",inv_largo:"Largo",
							inv_peso_kg:"Peso Kg",inv_valor_final_kilo_pesos:"Kilo en Pesos"}
		 columnas_decimales = {inv_calibre:3,inv_ancho:0,inv_largo:0,inv_peso_kg:4,inv_valor_final_kilo_pesos:4,inv_valor_final_kilo_pesos:4}
	
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
							    columnas_decimales: columnas_decimales,
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
				 			     columnas_decimales: {},
				 			    columna_id:"num_rollo",
				 			    columna_cabecero: "id_compra",
				 			    reporte_mostrar: modulo,
				 			      });
				 self.agregarReporteCompras([]);
		}
	);
},
llenarconsultaVentas: function(modulo){
	var self = this;

	var titulosEncabezado={estatus:"Estatus", num_documento: "Num.Documento",
							fec_venta:"Fec.Venta",cliente_codigo:"Cod.Cliente",cliente:"Cliente",venta_neta:"Venta Neta",total:"0.0"
						};

	var titulosEncabezadoSecundario={id_detalle:"Id Detalle",venta_id:"Con",num_rollo: "Num.Rollo",inventario_codigo_producto:"Codigo.Producto",
						  	         peso_kg:"Peso Kg",precio_neto:"Precio"}


    var columnas_decimales = {peso_kg:4,precio_neto:4,venta_neta:4}
  
	var consulta = new ApiRestVentas();
	consulta.fec_inicial   = this.state.fec_inicial;
	consulta.fec_final     = this.state.fec_final; 
	consulta.num_documento = this.state.invoice;
	
	consulta.consultaVentasPorFechas(	
		function(data){
			
			var total = 0.0
			var venta_id =[]

			  data.forEach(function (venta) {
					
					var i = venta_id.indexOf(venta.venta_id);
					if(i < 0){
						total = total + venta.venta_neta;
						venta_id.push(venta.venta_id)
					}
			});

			func = new FuncGenericas();
			titulosEncabezado["total"] = func.redondearValores(total,4);

   				self.setState({lista_datos: data, 
   							   titulos_encabezado: titulosEncabezado, 
							   titulos_encabezado_secundario: 	titulosEncabezadoSecundario,
							    columnas_decimales: columnas_decimales,
   							   columna_id:"id_detalle",
   							   columna_cabecero: "venta_id",
   							   reporte_mostrar: modulo,
   							    });
   				self.agregarReporteVentas(data);
		},
		function(model,response,options){
				 self.setState({lista_datos : [] ,
				 			    titulos_encabezado: titulosEncabezado, 
				 			    titulos_encabezado_secundario: titulosEncabezadoSecundario,
				 			     columnas_decimales: {},
				 			    columna_id:"id_detalle",
				 			    columna_cabecero: "venta_id",
				 			    reporte_mostrar: modulo,
				 			      });
				 self.agregarReporteVentas([]);
		}
	);
},
llenarconsultaCalendarioPagos: function(modulo){
	var self = this;

	var titulosEncabezado={ estatus: "Estatus"
						};

	var titulosEncabezadoSecundario={fec_vencimiento:"Fec.Vencimiento",num_documento:"Num.Documento",
					cliente:"Cliente",dias:"Dias",fec_venta:"Fec.Venta",saldo:"Saldo" }

  
	var consulta = new ApiRestCalendarioPagos();
	
	consulta.calendarioPagos(	
		function(data){
   				self.setState({lista_datos: data, 
   							   titulos_encabezado: titulosEncabezado, 
							   titulos_encabezado_secundario: 	titulosEncabezadoSecundario,
							   columnas_decimales: {},
   							   columna_id:"num_documento",
   							   columna_cabecero: "estatus",
   							   reporte_mostrar: modulo,
   							    });
   				self.agregarReporteCalendarioPagos(data);
		},
		function(model,response,options){
				 self.setState({lista_datos : [] ,
				 			    titulos_encabezado: titulosEncabezado, 
				 			    titulos_encabezado_secundario: titulosEncabezadoSecundario,
				 			     columnas_decimales: {},
				 			    columna_id:"num_documento",
				 			    columna_cabecero: "estatus",
				 			    reporte_mostrar: modulo,
				 			      });
				 self.agregarReporteCalendarioPagos([]);
		}
	);
},
llenarconsultaCalendarioAduana: function(modulo){
	var self = this;

	var titulosEncabezado={ estatus: "Estatus"};

	var titulosEncabezadoSecundario={fec_aduana:"Fec.Aduana",invoice:"Invoice",
					proveedor_nombre:"Proveedor",fec_solicitud:"Fec.Solicitud"}

  
	var consulta = new ApiRestCompras();
	
	consulta.calendarioFechaAduana(	
		function(data){
   				self.setState({lista_datos: data, 
   							   titulos_encabezado: titulosEncabezado, 
							   titulos_encabezado_secundario: 	titulosEncabezadoSecundario,
							   columnas_decimales: {},
   							   columna_id:"num_documento",
   							   columna_cabecero: "estatus",
   							   reporte_mostrar: modulo,
   							    });
   				self.agregarReporteCalendarioPagos(data);
		},
		function(model,response,options){
				 self.setState({lista_datos : [] ,
				 			    titulos_encabezado: titulosEncabezado, 
				 			    titulos_encabezado_secundario: titulosEncabezadoSecundario,
				 			     columnas_decimales: {},
				 			    columna_id:"invoice",
				 			    columna_cabecero: "estatus",
				 			    reporte_mostrar: modulo,
				 			      });
				 self.agregarReporteCalendarioAduana([]);
		}
	);
},
onValorCambio: function(campo,valor) {
	if(campo=== "invoice" )  {
		var campos ={};
		campos[campo] = valor;
		this.setState(campos);
	}
	if(campo ==="producto")  {
		var campos ={};
		campos[campo] = valor;
		campos["num_rollo"] = '';
		this.setState(campos);
	}
	if(campo==="num_rollo")  {
		var campos ={};
		campos[campo] = valor;
		campos["producto"] = '';
		this.setState(campos);
	}

},
onEnter: function(campo, valor){
		if(campo=== "invoice"){
			this.setState({'invoice': valor});
			if(this.state.reporte_mostrar==="ventas"){
			    this.llenarconsultaVentas(this.state.reporte_mostrar);
			 }
			 else{
			    this.llenarconsultaCompras(this.state.reporte_mostrar);
			 }   
			console.log("cambio el invoice a: " + valor)
		}
		if(campo=== "producto" || campo=== "num_rollo"){
			this.setState({campo: valor});
		    this.llenarListaExistencias();
			console.log("cambio el " + campo + " a: " + valor)
		}
},
render: function () {
    var solo_reportes = false;
	if(this.props.permisos_menu.length===1 && this.props.permisos_menu.indexOf("reportes")===0){
		solo_reportes = true;
	}
	var self= this;
	var estilo = {cursor:"pointer"};
	var estilo_filtros = {display: 'none'};
	var estilo_filtro_compras = {display: 'none'};
    var estilo_filtro_existencias = {display: 'none'}
	
		func = new FuncGenericas();
			
	        var dic1 =                               ["id",           "titulo",            "textoIndicativo" ,    "valor",          "onChange"   , "onBlur" ,"onEnter"];
		    var INVOICE    = func.zipCol(dic1,["invoice",  "Invoice",   this.state.reporte_mostrar==="ventas" ? "Documento" : "Invoice" ,   this.state.invoice , this.onValorCambio,  this.onBlurInvoice  , this.onEnter ]);
            var FECHA_INI  = func.zipCol(dic1,["fec_inicial",  "Fecha Inicial",   "Fecha Inicial",   this.state.fec_inicial , this.onValorCambio,  this.onBlurFecha, this.onEnter  ]);
            var FECHA_FIN  = func.zipCol(dic1,["fec_final",  "Fecha Final",   "Fecha Final",   this.state.fec_final , this.onValorCambio,          this.onBlurFecha, this.onEnter  ]);
		    var PRODUCTO    = func.zipCol(dic1,["producto",  "Producto",   "Producto",   this.state.producto , this.onValorCambio,  this.onBlurInvoice  , this.onEnter ]);
		    var NUM_ROLLO    = func.zipCol(dic1,["num_rollo",  "Num.Rollo",   "Num.Rollo",   this.state.num_rollo , this.onValorCambio,  this.onBlurInvoice  , this.onEnter ]);
 
            var fec_ini =[];
			var fec_fin =[];
			console.log("Aqui esta: " + this.state.reporte_mostrar);
			if(this.state.reporte_mostrar === "existencias"){
				estilo_filtro_existencias["display"] = 'inline';
				estilo_filtros["display"] = 'inline';
			}
			if(this.state.reporte_mostrar === "compras"){
					FECHA_INI["titulo"] ="Fec.Solicitud Inicial"
					FECHA_FIN["titulo"] ="Fec.Solicitud Final"
					estilo_filtro_compras["display"] = 'inline';
					estilo_filtros["display"] = 'inline';
				}
			if(this.state.reporte_mostrar === "inventario"){
					FECHA_INI["titulo"] ="Fec.Real Inicial"
					FECHA_FIN["titulo"] ="Fec.Real Final"
					estilo_filtro_compras["display"] = 'inline';
					estilo_filtros["display"] = 'inline';					
				}
			if(this.state.reporte_mostrar === "ventas"){
					FECHA_INI["titulo"] ="Fec.Solicitud Inicial"
					FECHA_FIN["titulo"] ="Fec.Solicitud Final"
					estilo_filtro_compras["display"] = 'inline';
					estilo_filtros["display"] = 'inline';
				}
	  return (      		
			<section className="contenido">
			<article className="caja_filtro_reporte" style={estilo_filtros} >
			    <ul class="ul_filtro" id="filtro_reportes_compras" style={estilo_filtro_compras}>
				   <li class="li_filtro">
					  <label className="etiquetas_filtro">Fec.Inicial</label>      
					  <CajaDeTexto propiedades={FECHA_INI} ref="cajaFechaSolicitudIni" />
				   </li>	
 				   <li class="li_filtro">
 				     <label className="etiquetas_filtro">Fec.Final </label>
					 <CajaDeTexto propiedades={FECHA_FIN} ref="cajaFechaSolicitudFin" />
				   </li>
					<li class="li_filtro">
					<label className="etiquetas_filtro">{this.state.reporte_mostrar==="ventas" ? "Documento" : "Invoice" }</label>
					 <CajaDeTexto propiedades={INVOICE} ref="cajaInvoiceIni" />
					 </li>
				</ul>
				 <ul class="ul_filtro" id="filtro_reportes_existencias" style={estilo_filtro_existencias}>
					<li class="li_filtro">
					  <label className="etiquetas_filtro">Producto</label>
					  <CajaDeTexto propiedades={PRODUCTO} />
					</li>
					<li class="li_filtro">
					  <label className="etiquetas_filtro">Num.Rollo</label>
					  <CajaDeTexto propiedades={NUM_ROLLO} />
					</li>
				</ul>
			</article>
			<article className="caja_lista_reporte">
				<TituloMenu titulo="Existencias" onClick={this.onClickReporteExistencias}/>
  			    {solo_reportes===true ? '' : <TituloMenu titulo="Orden de Compra" onClick={this.onClickReporteCompras}/>}
				{solo_reportes===true ? '' : <TituloMenu titulo="Compra inventariada" onClick={this.onClickReporteInventario}/>}
				<TituloMenu titulo="Ventas" onClick={this.onClickReporteVentas}/>
				{solo_reportes===true ? '' :<TituloMenu titulo="Calendario Pagos" onClick={this.onClickReporteCalendarioPagos}/>}
				{solo_reportes===true ? '' : <TituloMenu titulo="Compras en espera" onClick={this.onClickReporteCalendarioAduana}/>}
			
				<TituloMenu titulo="Excel" onClick={this.onClickExcel}/>
			</article>
			{/*	<article className="bloque">
				<div style={estilo_fechas}>
				 <CajaDeTexto propiedades={INVOICE} ref="cajaInvoiceIni" />
				 <CajaDeTexto propiedades={FECHA_INI} ref="cajaFechaSolicitudIni" />
				 <CajaDeTexto propiedades={FECHA_FIN} ref="cajaFechaSolicitudFin" />
				</div> */}
					<article className="bloque_grid" id="contenedor_reportes" >

					</article>
				{/*</article>*/}
			</section>
			);  
		}
});

