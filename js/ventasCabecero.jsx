var React=require('react');
var $ = require('jquery');
var moment 			= require('moment');
var FuncGenericas   = require('../js/funcionesGenericas');
var CajaDeTexto 	= require('../js/cajaDeTexto.jsx');
var EtiquetaTexto   = require('../js/etiquetaDeTexto.jsx');
var Combo 			= require('../js/combo.jsx');
var AreaTexto       = require('../js/areaTexto.jsx');
var CajaConCampos     = require('../js/cajaConCampos.jsx');
var Titulo          = require('../js/titulos.jsx')
var ListaResultados  = require('../js/resultadosLista.jsx');
var ApiRestCliente = require('../js/modelos/apirestClientes');
var ApiRestVentas = require('../js/modelos/apirestVentas');
var ApiRestCalendarioPagos = require('../js/modelos/apirestClientesPagos');


module.exports = React.createClass({
	componentWillMount:function(){
         this.llenarCombos();
	},
	componentDidMount: function(){
		        var self= this;
				$("#fec_inventario, #fec_venta").datepicker({dateFormat:"dd/mm/yy"})
						.on("input change", function(e){
							self.cambiarValorFecha(e.target.id,e.target.value);
							console.log("Date changed: ", e.target.value);
						});
				this.asignarNumeroConsecutivoDocumento(this.state.empresa,-1);

	},
cambiarValorFecha: function(control,valor){
	var update = {};
	update[control] = valor;
	this.setState(update);
},
componentWillReceiveProps: function(nextProps) {
	 console.log("** Esta recibiendo nuevas propiedades **");
 	 if(nextProps.datos.id !== undefined){
 	 	var cabecero = nextProps.datos; 
  		var cliente_id     =  cabecero.cliente.id;
	    var cliente_codigo =  cabecero.cliente.codigo;
		var banco_cliente  =  cabecero.cliente.banco;
		var cliente_limite_credito = cabecero.cliente.limite_credito
	    	
        var cliente_nombre = "[" + cliente_codigo + "] " + cabecero.cliente.nombre;
        this.asignarNumeroConsecutivoDocumento( cabecero.empresa,cabecero.id);
		this.setState({
 					   id :     	   cabecero.id,	
 					   tipo_doc:       cabecero.tipo_doc,
 					   num_documento:  cabecero.num_documento,
 					   bln_activa:     cabecero.bln_activa,
 					   fec_inventario: cabecero.fec_inventario,
 					   fec_venta: 	   cabecero.fec_venta,
 					   cliente: 	   cliente_id,
	   				   cliente_codigo: cliente_codigo,
					   cliente_nombre: cliente_nombre,
 					   metodo_pago:    cabecero.metodo_pago,
					   banco_cliente:  banco_cliente,
					   limite_credito: cliente_limite_credito,
 					   periodo_pago:   cabecero.periodo_pago,
 					   cantidad_pago:  cabecero.cantidad_pago,
 					   observaciones:  cabecero.observaciones,
 					   empresa:        cabecero.empresa,
 					});
					 
		this.BuscarClienteLimiteCred(cliente_id)
		console.log("id de la venta: " + self.id);

	 }
 	  else{
 	  	this.setState(this.getInitialState())
 	  	this.asignarNumeroConsecutivoDocumento("0140000",-1);
  }
 },
getInitialState: function(){
	return{
	   	id: -1,
		tipo_doc:'0100000',
		num_documento:  '0',
		bln_activa: 'true',
		fec_inventario: moment().format('DD/MM/YYYY'),
		fec_venta: moment().format('DD/MM/YYYY'),
		cliente: "0",
	    cliente_codigo: "",
		cliente_nombre:'',
		metodo_pago: '0110000',
		banco_cliente: "0030000",
		periodo_pago: '0120000',
		cantidad_pago: "0",
		limite_credito: "0",
		limite_actual: "0",
		observaciones :'',
		empresa: "0140000",
		busqueda_clientes : [],
		errores:[],
	}
},
llenarCombos: function(){
	    var func = new FuncGenericas();      
		this.tipos_docs = func.llenarComboGenerico(appmvc.Datos.TIPO_DOCUMENTO);
        this.metodos_pago = func.llenarComboGenerico(appmvc.Datos.METODO_PAGO);
        this.periodos_pago = func.llenarComboGenerico(appmvc.Datos.PERIODO_PAGO);
        this.bancos = func.llenarComboGenerico(appmvc.Datos.BANCOS);
        this.empresa = func.llenarComboGenerico(appmvc.Datos.EMPRESA);
        
        var status = [{cdu_catalogo: "true",descripcion1: "Activo"},{cdu_catalogo: "false",descripcion1: "Cancelado"}]
        this.STATUS = func.llenarComboGenerico(status);
},
validarCampoErrores: function(control, valor){
	var dic_err = this.relacionCampoErrores();

	if(control === undefined ||  dic_err[control]=== undefined){
			return;
		}
	
  //  var valorVal  = dic_err[control].valor;

    var exp    = dic_err[control].expreg;
    var requer = dic_err[control].requerido;
    var mens   = dic_err[control].mensaje;
    var nuevos_errores = this.state.errores;


    if(exp.test(valor) || (valor==="" && requer===false)){
		nuevos_errores[control] = "";
	}
	else{
		nuevos_errores[control] = mens;
	}

	   this.setState({errores: nuevos_errores});
},
onBlurCaja: function(control,valor){  				
	var valVal = valor;
	if(control==="cliente_nombre")
	 {				
		 var codigo_caja  = valor.substring(1,valor.indexOf("]"))
	    var codigo_state = this.state.cliente_codigo;
	    valVal=codigo_caja;
	    if(valVal==="0"){
	    	valVal="";
	    }
	    
		if(codigo_caja !== codigo_state)
		{
			valVal ="";
			var valdef = this.getInitialState();
			    this.setState({cliente: valdef.cliente,cliente_codigo:valdef.cliente_codigo, cliente_nombre: valdef.cliente_nombre,banco_cliente:valdef.banco_cliente,limite_credito: valdef.limite_credito});						
		}
		}

	this.validarCampoErrores(control,valVal);		  			
},
onValorCambio:function(campo,valor){
	 var campos ={};
	 campos[campo] = valor;
	 this.setState(campos);	
	 if(campo === "empresa"){
			this.asignarNumeroConsecutivoDocumento(valor,this.state.id);
	     	console.log("cambio la empresa a:" + valor)
		 }
},
asignarNumeroConsecutivoDocumento: function(empresa,id){
	   if(id>0){
	   	return;
	   }
       var self = this;
	   var venta = new ApiRestVentas();
	   venta.empresa = empresa
	   venta.buscarSiguienteConsecutivo(empresa,	
						function(data){
									self.setState({num_documento :data[0].Siguiente});
								},
						function(model,response,options){
								}
			    );
},
relacionCampoErrores: function(){
	var dic_errores = {
		fec_venta:      {valor:this.state.fec_venta,   expreg:/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,    requerido: true,  mensaje:"No es un formato de fecha correcto"},	
		cliente_nombre: {valor:this.state.cliente,     expreg:/^[ñÑa-zA-Z0-9\-().\s]{1,110}$/,    requerido: true,  mensaje:"Selecciona un cliente"},
		cantidad_pago:  {valor:this.state.cantidad_pago,   expreg:/^[\d.]+$/,    requerido: true,  mensaje:"El valor debe ser entero o decimal"},				
		num_documento:  {valor:this.state.num_documento,   expreg:/^[\d]+$/,    requerido: true,  mensaje:"El valor debe ser entero"},				
		 }
    return dic_errores;
},
onBuscarCliente: function(control,valor){
	       var self = this;
	      var cliente = new ApiRestCliente();
          funcionBusqueda = cliente.buscarClientePorValor.bind(cliente);
          funcionBusqueda(valor,
              function(data){
                 self.setState({busqueda_clientes: data});
                  
              },
              function(model,response, options) {
                 self.setState({busqueda_clientes: []});
              }
          );
	},
 BuscarClientePorPk: function(pk){
 	 var self = this;
   var cliente = new ApiRestCliente();
   
   cliente.buscarClientePorPk(pk,	
					function(data){
						    var id = data[0].id;
						    var codigo =  data[0].codigo;
						    var nombre ="[" + codigo + "] " + data[0].nombre; 
							var banco = data[0].banco;
							var limite = data[0].limite_credito
							self.setState({cliente: id, cliente_codigo:codigo,cliente_nombre: nombre,banco_cliente:banco, limite_credito: limite ,busqueda_clientes:[]});
						    self.validarCampoErrores("cliente_nombre","123");
							self.BuscarClienteLimiteCred(id)
						
						},
					function(model,response,options){
							var valdef = self.getInitialState();
							   self.setState({cliente: valdef.cliente,cliente_codigo:valdef.cliente_codigo, cliente_nombre: valdef.cliente_nombre,banco_cliente:valdef.banco_cliente,limite_credito: valdef.limite_credito,
								busqueda_clientes:[]});
							self.validarCampoErrores("cliente_nombre",'');
							}
		    );
 },
 BuscarClienteLimiteCred: function(cliente){
	var self = this;
	var calpagos = new ApiRestCalendarioPagos();

	calpagos.clientesLimiteCredito(cliente,
		function(data){
				console.log(data)
				var limite_act = data.length>0 ? data[0].limite_actual :"0";
				self.setState({limite_actual: limite_act });
				
   				// self.setState({lista_datos: data, 
				// 				titulos_encabezado: titulosEncabezado, 
				// 				titulos_encabezado_secundario: 	titulosEncabezadoSecundario,
				// 			    columnas_decimales: columnas_decimales,
				// 				columna_id:"cliente_id",
				// 				columna_cabecero:"limite",
   				// 			   reporte_mostrar: modulo,
   				// 			    });
		},
		function(model,response,options){
			self.setState({ limite_actual: "0"});

				//  self.setState({lista_datos : [] ,
				// 				 titulos_encabezado: titulosEncabezado, 
				// 				 titulos_encabezado_secundario: 	titulosEncabezadoSecundario,
				//  			     columnas_decimales: {},
				// 				 columna_id:"cliente_id",
				// 				 columna_cabecero:"limite",
				//  			    reporte_mostrar: modulo,
				//  			      });
		}
	);

 },
onClaveSeleccionada: function(pk){
	this.BuscarClientePorPk(pk)
		console.log("la pk :" +pk);
	},
cambio: function(v,a){
		
	},
valoresCabeceroVenta: function(){
	  var fec_cance = (this.state.bln_activa === 'false') ? moment().format('DD/MM/YYYY') : '01/01/1900';
	  return{   
	    id: this.state.id,
        fec_venta: this.state.fec_venta,
        tipo_doc: this.state.tipo_doc,
        num_documento:this.state.num_documento,
        bln_activa: this.state.bln_activa,
        fec_inventario: this.state.fec_inventario,
        fec_venta: this.state.fec_venta,
        cliente: this.state.cliente,
        metodo_pago: this.state.metodo_pago,
        banco_cliente: this.state.banco_cliente,
        periodo_pago: this.state.periodo_pago,
        cantidad_pago: this.state.cantidad_pago,
        observaciones: this.state.observaciones,
        empresa:       this.state.empresa,
        fec_cancelacion: fec_cance,

	  };
},
llenarListaClientes: function(lista){
 	 return  (lista.length >0) ?  <div className="caja_busqueda" ref="busqueda_clientes_compras"> <ListaResultados ref="ListaResultadosBusqueda"	resultados={lista} onClaveSeleccionada={this.onClaveSeleccionada}/></div> :[];
      
},
		render: function () {
             var func = new FuncGenericas();
			
	        var dic1 =                               ["id",           "titulo",            "textoIndicativo" ,    "valor",                  "onChange"          ,"onEnter",              "onBlur"                 ,"error"];
            var FEC_VENTA = func.zipCol(dic1,["fec_venta","Fecha Venta",  "Fecha Venta", this.state.fec_venta ,       this.onValorCambio,      "",                     this.onBlurCaja,	this.state.errores.fec_venta]);
       
            var FEC_INVENTARIO = func.zipCol(dic1,["fec_inventario","Fecha Inventario",  "Fecha Inventario", this.state.fec_inventario ,       this.onValorCambio,      "",                     this.onBlurCaja,	this.state.errores.fec_inventario]);
            var CANTIDAD_PAGO = func.zipCol(dic1,["cantidad_pago","Dias",  "Cantidad Pago", this.state.cantidad_pago ,       this.onValorCambio,      "",                     this.onBlurCaja,	this.state.errores.cantidad_pago]);
            var OBSERVACIONES = func.zipCol(dic1,["observaciones","Observaciones",  "Observaciones", this.state.observaciones ,       this.onValorCambio,      "",                     this.onBlurCaja,	this.state.errores.observaciones]);

            var CLIENTE       = func.zipCol(dic1,["cliente_nombre","Cliente",         "Cliente",         this.state.cliente_nombre,this.onValorCambio,    this.onBuscarCliente, this.onBlurCaja,	this.state.errores.cliente_nombre ]);
 
            var dic2 =                      ["id",         "titulo",               "children" ,   "seleccionado",        "onChange"     ];
		   	var TIPOS_DOCUMENTOS = func.zipCol(dic2,["tipo_doc",   "Tipo de documento",    this.tipos_docs,      this.state.tipo_doc,    this.onValorCambio]);
			//var NUM_DOCUMENTO = func.zipCol(dic1,["num_documento","Id Documento",  "Id Documento", this.state.num_documento ,       this.onValorCambio,      "",                     this.onBlurCaja,	this.state.errores.num_doc]);
            var NUMERO_DOCUMENTO = func.zipCol(dic1,["num_documento",   "Documento",    "Numero Documento",      this.state.num_documento,    this.onValorCambio]);
            
            var METODOS_PAGO = func.zipCol(dic2,["metodo_pago",   "Metodo Pago",    this.metodos_pago,      this.state.metodo_pago,    this.onValorCambio]);
            var STATUS = func.zipCol(dic2,["bln_activa",   "Status",    this.STATUS,      this.state.bln_activa,    this.onValorCambio]); 
            var PERIODO_PAGO = func.zipCol(dic2,["periodo_pago",   "Periodo Pago",    this.periodos_pago,      this.state.periodo_pago,    this.onValorCambio]); 

	        var BANCOS = func.zipCol(dic2,["banco_cliente",   "Banco",    this.bancos,      this.state.banco_cliente,    this.onValorCambio]); 
	        var EMPRESA = func.zipCol(dic2,["empresa",   "Empresa",    this.empresa,      this.state.empresa,    this.onValorCambio]); 

   			var busqueda_clientes = this.llenarListaClientes(this.state.busqueda_clientes)
       
			return (
       		
<article className="bloque">
	<Titulo titulo='Venta' clase ="titulo_bloque" />
	<CajaConCampos clase={"resaltar_caja_bloque"}>
				<Combo propiedades={EMPRESA} />	
				<CajaDeTexto propiedades={FEC_VENTA}/>
				{/*<CajaDeTexto propiedades={FEC_INVENTARIO}/>*/}
				<Combo propiedades={TIPOS_DOCUMENTOS} />
				<CajaDeTexto propiedades={NUMERO_DOCUMENTO} />

				{/*<EtiquetaTexto titulo="Id Documento" valor={this.state.num_documento} clase="etiqueta_especial" />*/}
				<br/>
				<Combo propiedades={STATUS}/>
	</CajaConCampos>
	<br/>

    <Titulo titulo='Cliente' clase ="titulo_bloque" />
    <CajaConCampos clase={"caja_bloque"}>
   				  <CajaDeTexto propiedades={CLIENTE} />
			      {busqueda_clientes}
				  <Combo propiedades={METODOS_PAGO} />
				  <Combo propiedades={BANCOS} />
    </CajaConCampos>
	<div className="titulo_resalta" id="venta_neto_venta">
	</div>
	<br/>
	<Titulo titulo='Crédito' clase ="resaltar_titulo_caja" />
	<CajaConCampos clase={"resaltar_caja_bloque"}>
		{/*<Combo propiedades={PERIODO_PAGO}/>*/}
		<CajaDeTexto propiedades={CANTIDAD_PAGO} />					
		<AreaTexto propiedades={OBSERVACIONES} />
	</CajaConCampos>
	<div className="caja_bloque">
		<div className="campos_bloque">
			<ul className="ul_bloque">
				<EtiquetaTexto titulo="Limite Cred" valor={this.state.limite_credito} clase="etiqueta_especial" />
				<EtiquetaTexto titulo="Limite Act" valor={this.state.limite_actual} clase="etiqueta_especial" />	 
			</ul>
		</div>
	</div>
	
</article>
		



			);  
		}
});


