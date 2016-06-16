var React=require('react');
var FuncGenericas   = require('../js/funcionesGenericas');
var ApirestInventarioCalculo   = require('../js/modelos/apirestInventarioCalculo');
var Combo 	    	= require('../js/combo.jsx');
var Titulo          = require('../js/titulos.jsx');
var CajaConCampos     = require('../js/cajaConCampos.jsx');
var CajaDeTexto 	= require('../js/cajaDeTexto.jsx');
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
	     num_rollo: "0.0",
	     transporte: "",
	     codigo_producto: "",
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
	  				   transporte: nextProps.transporte,
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
	if(campo==="peso_kg" || campo==="peso_lb"){
		this.calcularKgLb(this.props.pais,this.state.peso_kg,this.state.peso_lb)
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
llenarCombos: function(){
	    var func = new FuncGenericas();      
		this.Materiales = func.llenarComboGenerico(appmvc.Datos.MATERIALES);

		var largo = [{cdu_catalogo: "0",descripcion1: "0"},{cdu_catalogo: "10",descripcion1: "10"},{cdu_catalogo: "12",descripcion1: "12"}]
		this.Largos = func.llenarComboGenerico(largo);
},
datosGuardar: function(){
	datos_producto = {"compra_detalle":this.state.id,"material":this.state.material,"calibre":this.state.calibre,
			"ancho":this.state.ancho,"largo":this.state.largo,"num_rollo":this.state.num_rollo,
			"peso_kg":this.state.peso_kg,"peso_lb":this.state.peso_lb,"transporte":this.state.transporte,
			}
	return datos_producto;
},
render: function () {
    func = new FuncGenericas();
    var dic1 =                      ["id",      "titulo",      "textoIndicativo" ,    "valor",             "onChange"      , "onBlur"				 , "error"];
	var CALIBRE   = func.zipCol(dic1,["calibre",  "Calibre", 	 "calibre", 		  this.state.calibre,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.calibre ] );
	var ANCHO    = func.zipCol(dic1,["ancho",     "Ancho",  	 "ancho",	          this.state.ancho ,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.calibre ]);
	var NUM_ROLLO = func.zipCol(dic1,["num_rollo",  "num_rollo", 	"num_rollo", this.state.num_rollo,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.num_rollo ]);
	var PESO_KG = func.zipCol(dic1,["peso_kg",  "peso_kg", 	"peso_kg", this.state.peso_kg,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.peso_kg ]);
	var PESO_LB = func.zipCol(dic1,["peso_lb",  "peso_lb", 	"peso_lb", this.state.peso_lb,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.peso_lb ]);
	var TRANSPORTE = func.zipCol(dic1,["transporte",  "transporte", 	"Transporte", this.state.transporte,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.transporte ]);

    var dic2 =                      ["id",       "titulo",   "children" ,              "seleccionado",        "onChange"     ];
   	var MATERIAL     = func.zipCol(dic2,["material",     "Material",    this.Materiales,  this.state.material,    this.onValorCambio]);
    var LARGO        = func.zipCol(dic2,["largo",     "Largo",    this.Largos,  this.state.largo,    this.onValorCambio]);

	//var estilo = (this.state.id >= 1) ? { display: 'inline-block'} : {display: 'none'} ;
    
      return (
		<article className="bloque" style={this.props.estilo} >	
			<Titulo titulo='Producto' clase ="resaltar_titulo_caja" />
			<CajaConCampos >
				<Combo 		 propiedades = {MATERIAL}   ref="ComboMaterial" key="Material" />	
				<CajaDeTexto propiedades = {CALIBRE} ref="cajaCalibre"/>
				<CajaDeTexto propiedades = {ANCHO} ref="cajaAncho"/>
				<Combo 		 propiedades = {LARGO}   ref="ComboLargo"/>	
			</CajaConCampos>
			<CodigoProducto  calibre={this.state.calibre} material={this.state.material} ancho={this.state.ancho} largo={this.state.largo} />
			<br />
			<Titulo titulo='Rollo' clase ="resaltar_titulo_caja" />
			<CajaConCampos >
				<CajaDeTexto propiedades = {NUM_ROLLO} ref="cajaNumRollo"/>
				<CajaDeTexto propiedades = {PESO_KG} ref="cajaPesKg"/>
				<CajaDeTexto propiedades = {PESO_LB} ref="cajaPesoLb"/>
				<CajaDeTexto propiedades = {TRANSPORTE} ref="cajaPesoLb"/>
			</CajaConCampos>
		</article>
			);  
		}
});

