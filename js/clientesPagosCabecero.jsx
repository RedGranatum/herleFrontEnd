var React           = require('react');
var $	            = require('jquery');
var moment 			= require('moment');
var FuncGenericas   = require('../js/funcionesGenericas');
var CajaConCampos     = require('../js/cajaConCampos.jsx');
var Titulo          = require('../js/titulos.jsx')
var Combo 			= require('../js/combo.jsx');
var CajaDeTexto 	= require('../js/cajaDeTexto.jsx');
var AreaTexto       = require('../js/areaTexto.jsx');

module.exports = React.createClass({
getInitialState: function(){
	return{
	   	id: -1,
	   	num_documento:  '',
	   	cliente_codigo: '',
	   	cliente_nombre: '',
	   	cliente_rfc: '',

		tipo_movimiento: 'Abono',
	   	fecha: moment().format('DD/MM/YYYY'),
	   	monto: "0.0",
	   	observaciones: "",
	   	errores:[],
	}
},
componentWillMount:function(){
     this.llenarCombos();
},
componentDidMount: function(){
        var self= this;
		$("#fecha").datepicker({dateFormat:"dd/mm/yy"})
				.on("input change", function(e){
					self.cambiarValorFecha(e.target.id,e.target.value);
					console.log("Date changed: ", e.target.value);
				});

},
cambiarValorFecha: function(control,valor){
	var update = {};
	update[control] = valor;
	this.setState(update);
},
componentWillReceiveProps: function(nextProps) {
 	 if(nextProps.datos.id !== undefined){
 	 	var cabecero = nextProps.datos; 
  		var cliente_id     =  cabecero.cliente.id;
	    var cliente_codigo =  cabecero.cliente.codigo;	    	
        var cliente_nombre =  cabecero.cliente.nombre;
        var cliente_rfc    =  cabecero.cliente.rfc;

		this.setState({
 					   id :     	   cabecero.id,	
 					   num_documento:  cabecero.num_documento,
 					   cliente_codigo: cliente_codigo,
 					   cliente_nombre: cliente_nombre,
 					   cliente_rfc:    cliente_rfc,
 					   monto: "0.0",
 					   tipo_movimiento: 'Abono',
 					   observaciones: "",
 					});

	 }
 	  else{
 	  	this.setState(this.getInitialState())
  }
 },
 llenarCombos: function(){
	    var func = new FuncGenericas();      
		var tipo_movimiento = [{cdu_catalogo: "Abono",descripcion1: "Abono"},{cdu_catalogo: "Cargo",descripcion1: "Cargo"}]
		this.TIPO_MOVIMIENTO = func.llenarComboGenerico(tipo_movimiento);
},
hayErrores: function(){
	for(var key in this.state.errores){
		if(this.state.errores[key].trim() !==""){
			return true;
		}
	}
	return false;
},

relacionCampoErrores: function(){
	var dic_errores = {
		fecha:      {valor:this.state.fecha,   expreg:/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,    requerido: true,  mensaje:"No es un formato de fecha correcto"},	
		monto:  {valor:this.state.monto,   expreg:/^[\d.]+$/,    requerido: true,  mensaje:"El valor debe ser entero o decimal"},				
		 }
    return dic_errores;
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
	this.validarCampoErrores(control,valVal);		  			
},
onValorCambio:function(campo,valor){
	 var campos ={};
	 campos[campo] = valor;
	 this.setState(campos);	
},
nuevosDatos: function(){
	datosNuevos ={}
	datosNuevos["id"] = -1;
	datosNuevos["ventas"] = this.state.id;
	datosNuevos["fecha"] = this.state.fecha;
	datosNuevos["cargo"] = this.state.tipo_movimiento==="Cargo" ? this.state.monto : "0.0";
	datosNuevos["abono"] = this.state.tipo_movimiento==="Abono" ?  this.state.monto : "0.0";
	datosNuevos["observaciones"] = this.state.observaciones;
	return datosNuevos;
},
render: function () {
	var estilo =  {display: this.props.estilo};

	var func = new FuncGenericas();
			
    var dic1 =                   ["id",        "titulo",          "textoIndicativo" ,    "valor",                  "onChange"          ,"onEnter",              "onBlur"                 ,"error"];
	var FECHA 		  = func.zipCol(dic1,["fecha",     "Fecha Movimiento",       "Fecha",     this.state.fecha ,       this.onValorCambio,      "",                     this.onBlurCaja,	this.state.errores.fecha]);
	var MONTO 		  = func.zipCol(dic1,["monto",     "Monto",       "Monto",     this.state.monto ,       this.onValorCambio,      "",                     this.onBlurCaja,	this.state.errores.monto]);
	var OBSERVACIONES = func.zipCol(dic1,["observaciones", "Observaciones",   "Observaciones",     this.state.observaciones ,       this.onValorCambio,      "",                     this.onBlurCaja,	this.state.errores.observaciones]);

    var dic2 =                      ["id",         "titulo",               "children" ,   "seleccionado",        "onChange"     ];
   	var TIPOS_MOVIMIENTO = func.zipCol(dic2,["tipo_movimiento",   "",    this.TIPO_MOVIMIENTO,      this.state.tipo_movimiento,    this.onValorCambio]);


      return (      		
	<div>
			<div className="formula">
				<figure className="formula_foto">
					<p><img className="img_factura" src="images/factura.png" /></p>
				</figure>
				<div className="formula_datos">
					<h3>Documento: {this.state.num_documento}</h3>
					<h3>Id Venta: {this.state.id}</h3>
					<h3>Cliente:</h3>
					<h3>{this.state.cliente_codigo}</h3>
					<h5>{this.state.cliente_rfc}</h5>
					<h5>{this.state.cliente_nombre}</h5>
				</div>
			</div>
			<br />
			<Titulo titulo='Movimiento' clase ="titulo_bloque" />
			<CajaConCampos clase={"caja_bloque"}>
				<Combo propiedades={TIPOS_MOVIMIENTO} />
				<CajaDeTexto propiedades={FECHA}/>
				<CajaDeTexto propiedades={MONTO}/>
				<AreaTexto   propiedades={OBSERVACIONES} />
			</CajaConCampos>
		</div>
			);  
  }
});
