var React=require('react');
var CajaDeTexto 	= require('../js/cajaDeTexto.jsx');
var ApiRestCatalogo  = require('../js/modelos/apirestCatalogos');
var Titulo          = require('../js/titulos.jsx');
var CajaConCampos   = require('../js/cajaConCampos.jsx')
var CajaCalculos    = require('../js/inventarioCalculos.jsx')


module.exports = React.createClass({
componentDidMount: function(){
	this.cargarParametrosCalculo();
},
getDefaultProps: function(){
	return{
		pais:  '0010000',
		conComercializadora: false,
	}
},
getInitialState: function(){
	return{
	    precio_libra 	: "0.0",
	    factor       	: "0.0",
	    precio_dolar 	: "0.0",
	    impuesto : "0.0",
	    porc_comercializadora: "0.0",
	    precio_tonelada_dolar : '0.0',
	   	impuesto_china : "0.0",
		"errores" :{},
	}
},
cargarParametrosCalculo: function(){
	var self = this;
	dicParametros = {};

	datosCatalogo = new  ApiRestCatalogo();
    datosCatalogo.buscarDetallesPorNumCatalogo(appmvc.Catalogos.PARAMETROS_CALCULOS, 
        function(data){
        	var dicParametros = {}
        	var lista_parametros = data.filter(function(catalogo){
        		var cduParametros = {"0090000":"precio_libra",
        							 "0090001": "factor",
        						 	 "0090006": "precio_dolar",
        						 	 "0090002": "factor_impuesto_eu",
        						 	 "0090003": "porc_comercializadora",
        						 	 "0090004": "precio_tonelada",
        						 	 "0090005": "factor_impuesto_china",
        						 	};
        		if(catalogo.cdu_catalogo in cduParametros){
        			var nom_parametro = cduParametros[catalogo.cdu_catalogo];
        			dicParametros[nom_parametro] = catalogo.monto1;
        			return dicParametros
        		}
        	});
        	self.setState({precio_libra: dicParametros.precio_libra,
        					factor     : dicParametros.factor,
        					precio_dolar: dicParametros.precio_dolar,
        					impuesto:     dicParametros.factor_impuesto_eu,
        					porc_comercializadora: dicParametros.porc_comercializadora,
        					precio_tonelada_dolar : dicParametros.precio_tonelada,
        					impuesto_china: dicParametros.factor_impuesto_china
        				})
        });
 },
onValorCambio: function(campo,valor){
	var campos ={};
	campos[campo] = valor;
	this.setState(campos);
},
onBlurCaja: function(control, valor){
		//var camposCodigo = ["calibre", "ancho", "largo", "material"];
		//var indice = camposCodigo.indexOf(control); 
		//if(indice>=0){
		//	this.calcularCodigoDelProductoConStates();
		//}
},
render: function () {
    var dic1 			=                    ["id",      "titulo",      "textoIndicativo" ,    "valor",             "onChange"      , "onBlur"				 , "error"];
	var PRECIO_LIBRA  	= func.zipCol(dic1,["precio_libra",  "Precio en libra", 	"precio_libra", this.state.precio_libra,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.precio_libra ]);
	var FACTOR        	= func.zipCol(dic1,["factor",  		 "Factor", 	"factor", this.state.factor,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.factor ]);
	var PRECIO_DOLAR    = func.zipCol(dic1,["precio_dolar",  "Precio en dolar", 	"precio_dolar", this.state.precio_dolar,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.precio_dolar ]);
	var IMPUESTO 		= func.zipCol(dic1,["impuesto",  "Factor impuesto", "factor_impuesto", this.state.impuesto,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.impuesto ]);
	var PRECIO_TONELADA = func.zipCol(dic1,["precio_tonelada_dolar",  "Precio Tonelada dll", 	"precio_tonelada", this.state.precio_tonelada_dolar,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.precio_tonelada_dolar ]);
	var IMPUESTO_CHINA  = func.zipCol(dic1,["impuesto_china",  "Impuesto China", "factor_impuesto", this.state.impuesto_china,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.impuesto_china ]);

	var PORC_COMERCIALIZADORA  = func.zipCol(dic1,["porc_comercializadora",  "Porcentaje (%)", "porc_comercializadora", this.state.porc_comercializadora,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.porc_comercializadora ]);
      return (
      	<article className="bloque">
	      	<CajaCalculos />
	      	<br />
      		<Titulo titulo='Sin Comercializadora' id='resaltar_titulo_caja_f' />
			<CajaConCampos >
				<CajaDeTexto propiedades = {PRECIO_LIBRA} ref="cajaPrecioLibra"/>
				<CajaDeTexto propiedades = {FACTOR} ref="cajaFactor"/>
				<CajaDeTexto propiedades = {PRECIO_DOLAR} ref="cajaPrecioDolar"/>
				<CajaDeTexto propiedades = {IMPUESTO} ref="cajaFactorImpuesto" />
			</CajaConCampos>
			<br />
      		<Titulo titulo='Con Comercializadora' id='resaltar_titulo_caja_f' />
			<CajaConCampos >
				<CajaDeTexto propiedades = {PORC_COMERCIALIZADORA} ref="cajaPorcentajeComerzializadora"/>
			</CajaConCampos>
			<br />		
			<Titulo titulo='China' id='resaltar_titulo_caja_f' />
			<CajaConCampos >
				<CajaDeTexto propiedades = {PRECIO_TONELADA} ref="cajaPrecioToneladaDolar"/>
				<CajaDeTexto propiedades = {IMPUESTO_CHINA} ref="cajaPorcentajeComerzializadora"/>
			</CajaConCampos>
		</article>
			);  
		}
});



	