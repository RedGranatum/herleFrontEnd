var $                 = require('jquery');
var React       	  = require('react');
var ReactDOM 		  = require('react-dom');
var FuncGenericas     = require('../js/funcionesGenericas');
var InventarioParam   = require('../js/inventarioParametros.jsx');
var CajaDeTexto 	  = require('../js/cajaDeTexto.jsx');
var Combo 	    	  = require('../js/combo.jsx');
var Titulo            = require('../js/titulos.jsx');
var AreaTexto         = require('../js/areaTexto.jsx');
var CajaConCampos     = require('../js/cajaConCampos.jsx');
var EtiquetaTexto     = require('../js/etiquetaDeTexto.jsx');
var InventarioLista   = require('../js/inventarioListadoProductos.jsx');
var InventarioDetalle = require('../js/inventarioDetalleProducto.jsx');
var ApiRestInventario = require('../js/modelos/apirestInventarios.js');
var ApiRestCompras 	  = require('../js/modelos/apirestCompras');
var ListadoCompras    = require('../js/comboCompras.jsx');
var ReporteCompra 	  = require('../js/reportesCompras.jsx');


module.exports = React.createClass({
onClaveCompraSeleccionada: function(id_compra){
	this.props.onClaveCompraSeleccionada(id_compra);
},
seleccionarPrimeraFila: function(listado){
		var detalle = {}
	   if(listado.length > 0){
            detalle = listado[0]; 	       	
        }
        return detalle;
},
filtrarFilasSinValidar: function(listado)
{
	var lista_nueva = []
	var lista_nueva = listado.filter(function(detalle_compra) {        		
        		return (detalle_compra.validado === false)
        });
	return lista_nueva;
        	
},
componentWillReceiveProps: function(nextProps) {

 	if(nextProps.datos.id !== undefined){
 		var lista_nueva = this.filtrarFilasSinValidar(nextProps.datos.compra_detalles)
        var detalle = this.seleccionarPrimeraFila(lista_nueva)     
        this.setState({
 					   id :     	nextProps.datos.id,	
 					   invoice:     nextProps.datos.invoice,
 					   precio_dolar:nextProps.datos.precio_dolar,
 					   pais:   	    nextProps.datos.proveedor.pais,
 					   comentarios: nextProps.datos.comentarios,
 					   descripcion: nextProps.datos.descripcion,
 					   listado_compra: lista_nueva,
 					   transporte:  nextProps.datos.transporte,
 					   detalle_compra: detalle,
 					});
	 	

 	}
 	else{
 		this.setState(this.getInitialState())
	}

 },
 componentDidUpdate: function(prevProps, prevState){
 	this.llenarconsultaComprasInvetariadas();
 	var pk_sel_filas = this.refs.listadoFilasInventario.seleccionarPrimeraFila();
 	if(pk_sel_filas>0 && prevState.id !=this.state.id){
 		this.onSeleccionFila(pk_sel_filas); 		
 	}
 },
componentWillMount: function() { 
	this.llenarCombos();
},
getInitialState: function(){
	return{
	   	"id": -1,
		"invoice":'',
		"pais":  '0010000',
		"precio_dolar": "0.00",
		"comentarios": '',
		"descripcion": '',
		"tentrada": 'False',
		"listado_compra": [],
		"transporte": "",
		"detalle_compra": {},
		"errores" :{},
	}
},
onValorCambio: function(campo,valor){
	var campos ={};
	campos[campo] = valor;
	this.setState(campos);
},
llenarCombos: function(){
	   	    var func = new FuncGenericas();      
			this.Paises = func.llenarComboGenerico(appmvc.Datos.PAISES);

			var entradas = [{cdu_catalogo: "",descripcion1: "NO ESPECIFICADO"},{cdu_catalogo: "True",descripcion1: "Con Comercializadora"},{cdu_catalogo: "False",descripcion1: "Sin Comercializadora"}]
			this.TipoEntrada = func.llenarComboGenerico(entradas);
  },
 onSeleccionFila: function(pk_detalle){
	console.log("Se selecciono una fila del hijo " + pk_detalle );
	var detalle = this.buscarDetalleEnFila(pk_detalle);	
	console.log("se selecciono la fila " + pk_detalle);
	this.setState({detalle_compra: detalle});
	
	//id: 9, compra: 14, material: Object, dsc_material: "material 2", calibre: "1.000", ancho: "4.00", largo: 54, peso_kg: "6.00", peso_lb: "65.00", num_rollo:
},
buscarDetalleEnFila: function(pk_detalle){
	var detalle = {}
	this.state.listado_compra.filter(function(datos){

     if(datos.id === pk_detalle){
        detalle =datos;
      }
  });
	return detalle;
},
onGuardar: function(datos_parametros)
{
	var self = this;
	datos_cabecero = {"invoice_compra": this.state.invoice,"descripcion":this.state.descripcion,"comentarios":this.state.comentarios}
	var datos_producto = this.refs.InventarioPorDetalleProducto.datosGuardar();
	var datos_guardar = Object.assign(datos_producto, datos_parametros, datos_cabecero)
	datos_guardar["pais"] = this.state.pais;
	//datos_guardar["precio_dolar"] = this.state.precio_dolar;
	datos_guardar["id"] = -1;

    var inventario = new ApiRestInventario();
 
	inventario.Guardar(datos_guardar,
        function(datos,response){        	
        	
        	lista_nueva = self.state.listado_compra.filter(function(detalle_compra) {        		
        		return (detalle_compra.id !== response.compra_detalle)
        	});
        	  var detalle = self.seleccionarPrimeraFila(lista_nueva)     
        	
        	self.setState({listado_compra: lista_nueva, detalle_compra: detalle});
        	self.props.consularAvisosCompras();
            $("#notify_success").text("Los datos fueron modificados con exito");
            $("#notify_success").notify();
        },
        function(model,response,options){
            $("#notify_error").text(response.responseText);
            $("#notify_error").notify();
        });
    console.log("Vas a guardar el detalle del inventario");              
},
agregarReporteComprasInvetariadas: function(id,titulos,titulos_secundarios,columnas_decimales,datos,columna_cabecero){

	ReactDOM.render(<ReporteCompra id={id} 
					               titulos={titulos} 
					 			   titulos_secundarios={titulos_secundarios}	
					 			   columnas_decimales={columnas_decimales}
								   datos={datos}
								   columna_cabecero={columna_cabecero}/> ,
					 document.getElementById("contenedor_detalle_compra_inventariada"));
},
llenarconsultaComprasInvetariadas: function(invoice){
	var self = this;

	var titulosEncabezado={ invoice: "Invoice Compra",
							fec_solicitud:"Fec.Solicitud",fec_real:"Fec.Real",
							proveedor_codigo:"CodigoProv",proveedor_nombre:"Proveedor",proveedor_pais:"Pais"
						};

    var columnas_decimales = {detalle_ancho:0,detalle_largo:0,detalle_calibre:3,entradas_kg:4,salidas_kg:4,existencia_kg:4,
    					      detalle_peso_kg:4,detalle_peso_lb:4,detalle_precio:4}

	var titulosEncabezadoSecundario={inv_codigo_producto:"Codigo Producto",inv_num_rollo: "Num.Rollo",
							inv_calibre:"Milesimas", inv_ancho:"Ancho",inv_largo:"Largo",
							inv_peso_kg:"Peso Kg",inv_valor_final_kilo_pesos:"Kilo en Pesos"}
	
	columnas_decimales = {inv_calibre:3,inv_ancho:0,inv_largo:0,inv_peso_kg:4,inv_valor_final_kilo_pesos:4,inv_valor_final_kilo_pesos:4}
	
	var consulta = new ApiRestCompras();
	consulta.fec_inicial = '01/01/1900';
	consulta.fec_final   = '01/01/1900'; 
	consulta.invoice     = this.state.invoice;
	consulta.modulo      = 'inventario';
    
	consulta.consultaComprasPorFechas(	
		function(data){
   				self.agregarReporteComprasInvetariadas("num_rollo",titulosEncabezado,titulosEncabezadoSecundario,columnas_decimales,data,"id_compra")
		},
		function(model,response,options){
				self.agregarReporteComprasInvetariadas("num_rollo",titulosEncabezado,titulosEncabezadoSecundario,columnas_decimales,[],"id_compra")
		}
	);
	console.log("se actualizo **********");
},


 render: function () {  
	func = new FuncGenericas();
	var dic1 =         			            ["id",      "titulo", "textoIndicativo" ,    "valor",             "onChange"      , "onBlur"				 , "error"];
    var DESCRIPCION    = func.zipCol(dic1,["descripcion",    "Descripción",       "Descripción",       this.state.descripcion ,   this.onValorCambio,      "",						this.onBlurCaja,	this.state.errores.descripcion]);        
    var COMENTARIOS    = func.zipCol(dic1,["comentarios",    "Comentarios",       "Comentarios",       this.state.comentarios ,   this.onValorCambio,      "",						this.onBlurCaja,	this.state.errores.comentarios]);        

	var dic2 =                   ["id",       "titulo",               "children" ,      "seleccionado",            "onChange"     ];
	var PAIS 	 = func.zipCol(dic2,["pais",     "Origen producto",    this.Paises,       this.state.pais,        this.onValorCambio]);
	var TENTRADA = func.zipCol(dic2,["tentrada", "Tipo de entrada",    this.TipoEntrada,  this.state.tentrada,    this.onValorCambio]);

    var mostrar =   (this.state.id >= 1 && this.state.listado_compra.length>0 );
 	var estilo = (mostrar) ? { display: 'inline-block'} : {display: 'none'} ;
 
    var mensaje_inventariado = (this.state.id >= 1 && this.state.listado_compra.length === 0 ) ? 
    	<div className="caja_mensaje_solo" style ={{ display: 'inline-block'}} >
			<div className="mensaje_solo">
				<h1>ESTE INVOICE YA SE ENCUENTRA INVENTARIADO</h1>
			</div>
		</div>
		: '';
 return (
 	<div >
			<div className="caja_acciones" >
	 	       <ListadoCompras name="listado_compras_inventario" onClaveCompraSeleccionada={this.onClaveCompraSeleccionada} />
			</div>
		<article className="bloque" style={estilo}>	
			<Titulo titulo='Invoice' />
			<CajaConCampos >
				<EtiquetaTexto titulo="Invoice" valor={this.state.invoice} clase="etiqueta_especial" />	
				<Combo 	propiedades = {PAIS}   ref="ComboPais" key="Pais" />	
				<Combo 	propiedades = {TENTRADA}  ref="ComboTEntrada" key="TEntrada" />	
			</CajaConCampos>
			<br />
			<Titulo titulo='Otros Datos' />
			<CajaConCampos >
				<AreaTexto propiedades={DESCRIPCION} />
				<AreaTexto propiedades={COMENTARIOS} />
			</CajaConCampos>
			<br />
			<br />
			<InventarioLista ref="listadoFilasInventario" listado_compra={this.state.listado_compra} onSeleccionFila={this.onSeleccionFila} />			
		</article>
		{mostrar ? <InventarioDetalle detalle_compra={this.state.detalle_compra}  pais={this.state.pais} transporte={this.state.transporte} ref="InventarioPorDetalleProducto" estilo={estilo}/> : []}

		{mostrar ? <InventarioParam precio_libra={this.state.detalle_compra.precio}  pais={this.state.pais} precio_dolar={this.state.precio_dolar} conComercializadora={this.state.tentrada} onGuardar={this.onGuardar}/> : '' }
		{mensaje_inventariado}
		{mostrar ? [] : <div id="contenedor_detalle_compra_inventariada" className="campos_bloque"></div>}
	</div>
		);  
	}
});