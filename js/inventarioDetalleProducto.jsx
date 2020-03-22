var React=require('react');
var FuncGenericas   = require('../js/funcionesGenericas');
var ApirestInventarioCalculo   = require('../js/modelos/apirestInventarioCalculo');
var Combo 	    	= require('../js/combo.jsx');
var Titulo          = require('../js/titulos.jsx');
var CajaConCampos     = require('../js/cajaConCampos.jsx');
var CajaDeTexto 	= require('../js/cajaDeTexto.jsx');
var EtiquetaTexto   = require('../js/etiquetaDeTexto.jsx')
var CodigoProducto  = require('../js/inventarioCodigoProducto.jsx');

module.exports = React.createClass({

getInitialState: function(){
	return{
	     id: -1,
	     material: "0050000",	
	     calibre: "0.0",
	     ancho: "0.0",
	     largo: "0",
	     peso_kg: "0.0",
	     peso_lb: "0.0",
	     num_rollo: "",
	     transporte: "",
	     precio: "0.0",
	     codigo_producto: "",
	     pais: "0010000",
	     sucursal:"0140000",
	     "errores" :{},
	}
},
getDefaultProps: function(){
			return{
				pais: "0010000",
				detalle_compra: {},
			}
},
componentWillMount: function() { 
	this.llenarCombos();
},
componentWillReceiveProps: function(nextProps) {
	  var det = nextProps.detalle_compra;


	  if(det.id !== undefined){

	  	this.setState({ id: det.id,
	  					material: det.material.cdu_catalogo,
	  				   calibre: det.calibre,
	  				   ancho: det.ancho,
	  				   largo: det.largo,
	  				   peso_kg: det.peso_kg,
	  				   peso_lb:  det.peso_lb,
	  				   num_rollo: det.num_rollo,
	  				   sucursal: "0140000",
	  				   precio: det.precio,
	  				   transporte: nextProps.transporte,
	  				   pais: nextProps.pais,

	  	})	  	

	  	this.calcularKgLb(this.props.pais,det.peso_kg,det.peso_lb)
	  }
 },
onValorCambio: function(campo,valor){
	var campos ={};
	campos[campo] = valor;
	this.setState(campos);	
},
onBlurCaja: function(campo,valor){
	var nuevos_errores = this.state.errores;

	if(campo==="peso_kg" || campo==="peso_lb"){
		this.calcularKgLb("0010000",this.state.peso_kg,this.state.peso_lb)
	}
	if(campo === "calibre"){
			if(this.state.largo > 0){
				nuevos_errores[campo] = "";
			}
			else{
				nuevos_errores[campo] = "";
				if(valor < 0.008 || valor > 0.025){
					nuevos_errores[campo] = "El rango debe estar entre 0.008 y 0.025";
				}
			}	
		    this.setState({errores: nuevos_errores});
	}
	if(campo === "ancho"){
			if(this.state.largo > 0){
				nuevos_errores[campo] = "";
			}
			else{
				nuevos_errores[campo] = "";
				if(valor < 35 || valor > 54){
					nuevos_errores[campo] = "El ancho debe estar entre 35 y 54";
				}
			}	
		    this.setState({errores: nuevos_errores});
	}
	if(campo === "num_rollo"){
		nuevos_errores[campo] = "";
		if(this.state.num_rollo.trim().length === 0){
			nuevos_errores[campo] = "El numero de rollo no puede estar vacio";
		}
	}
},
calcularKgLb: function(pais,kg,lb){
	   	var self = this;
	   	var invCal = new ApirestInventarioCalculo();
	  
	   	invCal.cdu_pais = pais;
   		invCal.libra = lb; 
   		invCal.kilogramo = kg; 

   invCal.convertirValores( 
        function(data){
        		self.setState({peso_lb: data.libra, peso_kg: data.kilogramo }) 
            },
        function(model,response,options){        		
            }
    );
 },
relacionCampoErrores: function(){
	var dic_errores = {
			calibre:  {valor:this.state.calibre,  expreg:/^[0-9\-().\s]{1,10}$/,    requerido: true,  mensaje:"Numerico ,longitud [0-10]"},		
		    ancho:    {valor:this.state.ancho,    expreg:/^[0-9\-().\s]{10,15}$/,   requerido: true, mensaje:"Numerico  ,longitud [0-15]"},
		    num_rollo: {valor:this.state.num_rollo,  expreg:/^[ñÑa-zA-Z0-9\-().\s]{1,30}$/,   requerido: true, mensaje:"Alfanumerico  ,longitud [1-30]"},
			 }
	    return dic_errores;
	},
llenarCombos: function(){
	    var func = new FuncGenericas();      
		this.Materiales = func.llenarComboGenerico(appmvc.Datos.MATERIALES);

		this.Sucursales = func.llenarComboGenerico(appmvc.Datos.EMPRESA);


		var largo = [{cdu_catalogo: "0",descripcion1: "0"},{cdu_catalogo: "10",descripcion1: "10"},{cdu_catalogo: "12",descripcion1: "12"}]
		this.Largos = func.llenarComboGenerico(largo);
},
datosGuardar: function(){
	datos_producto = {"compra_detalle":this.state.id,"material":this.state.material,"calibre":this.state.calibre,
			"ancho":this.state.ancho,"largo":this.state.largo,"num_rollo":this.state.num_rollo,
			"peso_kg":this.state.peso_kg,"peso_lb":this.state.peso_lb,"transporte":this.state.transporte,valor_final_kilo_pesos:this.state.precio,
			"sucursal": this.state.sucursal,
			}
	return datos_producto;
},
render: function () {
    func = new FuncGenericas();
    var dic1 =                      ["id",      "titulo",      "textoIndicativo" ,    "valor",             "onChange"      , "onBlur"				 , "error"];
	var CALIBRE   = func.zipCol(dic1,["calibre",  "Milesimas", 	 "Milesimas", 		  this.state.calibre,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.calibre ] );
	var ANCHO    = func.zipCol(dic1,["ancho",     "Ancho",  	 "ancho",	          this.state.ancho ,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.ancho ]);
	var NUM_ROLLO = func.zipCol(dic1,["num_rollo",  "num_rollo", 	"num_rollo", this.state.num_rollo,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.num_rollo ]);
	var PESO_KG = func.zipCol(dic1,["peso_kg",  "peso_kg", 	"peso_kg", this.state.peso_kg,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.peso_kg ]);
	var PESO_LB = func.zipCol(dic1,["peso_lb",  "peso_lb", 	"peso_lb", this.state.peso_lb,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.peso_lb ]);
	var TRANSPORTE = func.zipCol(dic1,["transporte",  "transporte", 	"Transporte", this.state.transporte,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.transporte ]);
	var PRECIO_KG = func.zipCol(dic1,["precio",  "Precio Kg", 	"Precio Kg", this.state.precio,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.precio ]);

    var dic2 =                      ["id",       "titulo",   "children" ,              "seleccionado",        "onChange"     ];
   	var MATERIAL     = func.zipCol(dic2,["material",     "Material",    this.Materiales,  this.state.material,    this.onValorCambio]);
    var LARGO        = func.zipCol(dic2,["largo",     "Largo",    this.Largos,  this.state.largo,    this.onValorCambio]);
    
    var SUCURSAL     = func.zipCol(dic2,["sucursal",     "Sucursal",    this.Sucursales,  this.state.sucursal,    this.onValorCambio]);
    
	//var estilo = (this.state.id >= 1) ? { display: 'inline-block'} : {display: 'none'} ;
	ver_largo = (this.state.largo > 0);
      return (
		<article className="bloque" style={this.props.estilo} >	
			<Titulo titulo='Productos' clase ="resaltar_titulo_caja" />
			<CajaConCampos >
				<Combo 		 propiedades = {SUCURSAL}   ref="ComboSucursal" key="Sucursal" />
				<Combo 		 propiedades = {MATERIAL}   ref="ComboMaterial" key="Material" />	
				{(ver_largo === true) ? '' : <CajaDeTexto propiedades = {CALIBRE}   ref="cajaCalibre" /> }
				{(ver_largo === true) ? '' : <label className="etiquetas_bloque">[0.008 - 0.025]</label> }      
				{(ver_largo === true) ? '' : <CajaDeTexto propiedades = {ANCHO} ref="cajaAncho"/> }
				{(ver_largo === true) ? '' : <label className="etiquetas_bloque">[35 - 54]</label>  }    
				{(ver_largo === true) ? <Combo 		 propiedades = {LARGO}   ref="ComboLargo"/> : '' }	
			</CajaConCampos>
			<CodigoProducto  calibre={this.state.calibre} material={this.state.material} ancho={this.state.ancho} largo={this.state.largo} />
			<br />
			<Titulo titulo='Rollo' clase ="resaltar_titulo_caja" />
			<CajaConCampos >
				<CajaDeTexto propiedades = {NUM_ROLLO} ref="cajaNumRollo"/>
				<CajaDeTexto propiedades = {PESO_KG} ref="cajaPesKg"/>
				<EtiquetaTexto titulo="peso_lb" valor={this.state.peso_lb} clase="etiqueta_especial" />
				<CajaDeTexto propiedades = {TRANSPORTE} ref="cajaPesoLb"/>
				{this.state.pais === "0010000" ? <CajaDeTexto propiedades = {PRECIO_KG} ref="cajaPesoLb"/> : ""}
				
			</CajaConCampos>
		</article>
			);  
		}
});


