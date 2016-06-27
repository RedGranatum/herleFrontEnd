var React=require('react');
var $ = require('jquery');
var moment 			= require('moment');
var FuncGenericas   = require('../js/funcionesGenericas');
var CajaDeTexto 	= require('../js/cajaDeTexto.jsx');
var Combo 			= require('../js/combo.jsx');
var AreaTexto       = require('../js/areaTexto.jsx');
var CajaConCampos     = require('../js/cajaConCampos.jsx');
var Titulo          = require('../js/titulos.jsx')

module.exports = React.createClass({
	componentWillMount:function(){
         this.llenarCombos();
	},
	componentDidMount: function(){
		        var self= this;
				$("#fec_inventario").datepicker({dateFormat:"dd/mm/yy"})
						.on("input change", function(e){
							//self.cambiarValorFecha(e.target.id,e.target.value);
							console.log("Date changed: ", e.target.value);
						});

	},
componentWillReceiveProps: function(nextProps) {
 	// if(nextProps.datos.id === undefined){
 	 	var cabecero = nextProps.datos; 
 	// 	var lista_nueva = this.filtrarFilasSinValidar(nextProps.datos.compra_detalles)
  //       var detalle = this.seleccionarPrimeraFila(lista_nueva)     

 		this.setState({
 					   id :     	   cabecero.id,	
 					   tipo_doc:       cabecero.tipo_doc,
 					   num_documento:  cabecero.num_documento,
 					   bln_activa:     cabecero.bln_activa,
 					   fec_inventario: cabecero.fec_inventario,
 					   metodo_pago:    cabecero.metodo_pago,
 					   cantidad_pago:  cabecero.cantidad_pago,
 					   observaciones:  cabecero.observaciones,
 					});

// 	 }
 	//  else{
 	//  	this.setState(this.getInitialState())
  // }
 },
getInitialState: function(){
	return{
	   	"id": -1,
		"tipo_doc":'0100000',
		num_documento:  '',
		"bln_activa": 'False',
		"fec_inventario": moment().format('DD/MM/YYYY'),
		"cliente": '',
		"metodo_pago": '0110000',
		"banco_cliente": "0030000",
		"periodo_pago": '0120000',
		"cantidad_pago": "0.0",
		"observaciones" :'',
		"errores":[],
	}
},
llenarCombos: function(){
	    var func = new FuncGenericas();      
		this.tipos_docs = func.llenarComboGenerico(appmvc.Datos.TIPO_DOCUMENTO);
        this.metodos_pago = func.llenarComboGenerico(appmvc.Datos.METODO_PAGO);
        this.periodos_pago = func.llenarComboGenerico(appmvc.Datos.PERIODO_PAGO);
        
		var status = [{cdu_catalogo: "True",descripcion1: "Activo"},{cdu_catalogo: "False",descripcion1: "Cancelado"}]
		this.STATUS = func.llenarComboGenerico(status);
},
onBlurCaja: function(campo,valor){

},
onValorCambio:function(campo,valor){
	 var campos ={};
	 campos[campo] = valor;
	 this.setState(campos);	

},
		render: function () {
             var func = new FuncGenericas();
			
	        var dic1 =                               ["id",           "titulo",            "textoIndicativo" ,    "valor",                  "onChange"          ,"onEnter",              "onBlur"                 ,"error"];
			var NUM_DOCUMENTO = func.zipCol(dic1,["num_documento","Id Documento",  "Id Documento", this.state.num_documento ,       this.onValorCambio,      "",                     this.onBlurCaja,	this.state.errores.num_doc]);
            var FEC_INVENTARIO = func.zipCol(dic1,["fec_inventario","Fecha Inventario",  "Fecha Inventario", this.state.fec_inventario ,       this.onValorCambio,      "",                     this.onBlurCaja,	this.state.errores.num_doc]);
            var CANTIDAD_PAGO = func.zipCol(dic1,["cantidad_pago","Cantidad Pago",  "Cantidad Pago", this.state.cantidad_pago ,       this.onValorCambio,      "",                     this.onBlurCaja,	this.state.errores.num_doc]);
            var OBSERVACIONES = func.zipCol(dic1,["observaciones","Observaciones",  "Observaciones", this.state.observaciones ,       this.onValorCambio,      "",                     this.onBlurCaja,	this.state.errores.num_doc]);

            var dic2 =                      ["id",         "titulo",               "children" ,   "seleccionado",        "onChange"     ];
		   	var TIPOS_DOCUMENTOS = func.zipCol(dic2,["tipo_doc",   "Tipo de documento",    this.tipos_docs,      this.state.tipo_doc,    this.onValorCambio]);
            var METODOS_PAGO = func.zipCol(dic2,["metodo_pago",   "Metodo Pago",    this.metodos_pago,      this.state.metodo_pago,    this.onValorCambio]);
            var STATUS = func.zipCol(dic2,["bln_activa",   "Status",    this.STATUS,      this.state.bln_activa,    this.onValorCambio]); 
            var PERIODO_PAGO = func.zipCol(dic2,["periodo_pago",   "Periodo Pago",    this.periodos_pago,      this.state.periodo_pago,    this.onValorCambio]); 

            //debugger;
			return (
       
		
		<article className="bloque">
	<Titulo titulo='Venta' clase ="titulo_bloque" />
			<CajaConCampos clase={"resaltar_caja_bloque"}>
						<CajaDeTexto propiedades={FEC_INVENTARIO}/>
						<Combo propiedades={TIPOS_DOCUMENTOS} />
						 <CajaDeTexto propiedades={NUM_DOCUMENTO} />
						<Combo propiedades={STATUS}/>
			</CajaConCampos>
			<br/>
		    <Titulo titulo='Cliente' clase ="titulo_bloque" />
		    <CajaConCampos clase={"caja_bloque"}>
						<li className="li_bloque">
							<label className="etiquetas_bloque" for="proveedor">Cliente</label>
							<input className="inputs_bloque" type="text" placeholder="Código, Nombre" />
							<div className="viñeta">*</div>
							<div className="bloque_resultados_proveedor">
								<div className="resultado_proveedor">
									<span className="dsc_resultado_proveedor">Resultado A</span>
								</div>
								<div className="resultado_proveedor">
									<span className="dsc_resultado_proveedor">Resultado B</span>
								</div>
								<div className="resultado_proveedor">
									<span className="dsc_resultado_proveedor">Resultado C</span>
								</div>
								<div className="resultado_proveedor">
									<span className="dsc_resultado_proveedor">Resultado D</span>
								</div>
							</div>
							<div className="error_mostrar">mensaje de error del campo</div>
						</li>
						<Combo propiedades={METODOS_PAGO} />
						<li className="li_bloque">
							<label className="etiquetas_bloque" for="invoice">Banco</label>
							<label className="etiqueta_especial" for="">Banco cliente</label>
						</li>
						<li className="li_bloque">
							<label className="etiquetas_bloque" for="invoice">Estatus</label>
							<label className="etiqueta_especial" for="">Debe, No Debe</label>
						</li>
            </CajaConCampos>
			<div className="titulo_resalta">
				$ Neto Venta
			</div>
		<br/>
	<Titulo titulo='Crédito' clase ="resaltar_titulo_caja" />
	<CajaConCampos clase={"resaltar_caja_bloque"}>
		<Combo propiedades={PERIODO_PAGO}/>
		<CajaDeTexto propiedades={CANTIDAD_PAGO} />
		<AreaTexto propiedades={OBSERVACIONES} />
	</CajaConCampos>
		</article>
		



			);  
		}
});


