var React=require('react');
var CajaDeTexto 	= require('../js/cajaDeTexto.jsx');
var ApiRestCatalogo  = require('../js/modelos/apirestCatalogos');
var ApiRestExterna  = require('../js/modelos/apirestExternas');

var Titulo          = require('../js/titulos.jsx');
var CajaConCampos   = require('../js/cajaConCampos.jsx')
var CajaCalculos    = require('../js/inventarioCalculos.jsx')


module.exports = React.createClass({
componentDidMount: function(){
	this.cargarParametrosCalculo();
	//this.cargarPrecioDolar();
},
getDefaultProps: function(){
	return{
		pais:  '0010000',
		precio_dolar: '0.00',
		conComercializadora: 'False',
	}
},
getInitialState: function(){
	return{
	    precio_libra 	: "0.0",
	    factor       	: "0.0",
	    precio_dolar 	: this.props.precio_dolar,
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
        					//precio_dolar: dicParametros.precio_dolar,
        					impuesto:     dicParametros.factor_impuesto_eu,
        					porc_comercializadora: dicParametros.porc_comercializadora,
        					precio_tonelada_dolar : dicParametros.precio_tonelada,
        					impuesto_china: dicParametros.factor_impuesto_china
        				})
        });
 },
 cargarPrecioDolar: function(){
 	var self = this;
	datosExternos = new  ApiRestExterna();
    datosExternos.buscarPrecioDolar( 
    	function(data){
    		self.setState({precio_dolar:data[0].Rate});
    	},
   		 function(model,response, options){
	    });
 },
onValorCambio: function(campo,valor){
	var campos ={};
	campos[campo] = valor;
	this.setState(campos);
},
onBlurCaja: function(control, valor){
	 console.log("saliendo de la caja");
},
mostrarContenedores: function(){
   	this.estilo_china = this.props.pais ==="0010002" ? 'block' : 'none';
	this.estilo_eu = this.props.pais	==="0010001" ? 'block' : 'none';
	this.estilo_eu_con_comer = this.props.pais	==="0010001" && this.props.conComercializadora==='True' ? 'block' : 'none';
},
onGuardar: function(){
    var impuesto = this.props.pais === "0010002" ? this.state.impuesto_china : this.state.impuesto;

	datos_parametros = {"precio_libra":this.state.precio_libra,"factor":this.state.factor,"precio_dolar":this.state.precio_dolar,
				"precio_tonelada_dolar":this.state.precio_tonelada_dolar,"factor_impuesto":impuesto,"con_comercializadora":this.props.conComercializadora,
				"porc_comercializadora":this.state.porc_comercializadora}
	
	this.props.onGuardar(datos_parametros);	
},
render: function () {
	this.mostrarContenedores();

    var dic1 			=                    ["id",      "titulo",      "textoIndicativo" ,    "valor",             "onChange"      , "onBlur"				 , "error"];
	var PRECIO_LIBRA  	= func.zipCol(dic1,["precio_libra",  "Precio en libra", 	"precio_libra", this.state.precio_libra,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.precio_libra ]);
	var FACTOR        	= func.zipCol(dic1,["factor",  		 "Factor", 	"factor", this.state.factor,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.factor ]);
	var PRECIO_DOLAR    = func.zipCol(dic1,["precio_dolar",  "Precio", 	"precio_dolar", this.state.precio_dolar,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.precio_dolar ]);
	var IMPUESTO 		= func.zipCol(dic1,["impuesto",  "Factor impuesto", "factor_impuesto", this.state.impuesto,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.impuesto ]);
	var PRECIO_TONELADA = func.zipCol(dic1,["precio_tonelada_dolar",  "Precio Tonelada dll", 	"precio_tonelada", this.state.precio_tonelada_dolar,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.precio_tonelada_dolar ]);
	var IMPUESTO_CHINA  = func.zipCol(dic1,["impuesto_china",  "Impuesto China", "factor_impuesto", this.state.impuesto_china,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.impuesto_china ]);

	var PORC_COMERCIALIZADORA  = func.zipCol(dic1,["porc_comercializadora",  "Porcentaje (%)", "porc_comercializadora", this.state.porc_comercializadora,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.porc_comercializadora ]);
   
      return (
      	<article className="bloque">
			<Titulo titulo='Dolar' clase='resaltar_titulo_caja_f' />			
      		<CajaConCampos clase="resaltar_caja_bloque" >
      		<CajaDeTexto propiedades = {PRECIO_DOLAR} ref="cajaPrecioDolar"/>
      		</CajaConCampos>
			<br />
      		<Titulo titulo='Sin Comercializadora' clase='resaltar_titulo_caja_f' estilo={this.estilo_eu}  />
			<CajaConCampos clase="resaltar_caja_bloque"  estilo={this.estilo_eu} >
				<CajaDeTexto propiedades = {PRECIO_LIBRA} ref="cajaPrecioLibra"/>
				<CajaDeTexto propiedades = {FACTOR} ref="cajaFactor"/>
				<CajaDeTexto propiedades = {IMPUESTO} ref="cajaFactorImpuesto" />
			</CajaConCampos>
			{this.estilo_eu==='none' ? '' : <br />}
      		<Titulo titulo='Con Comercializadora' clase='resaltar_titulo_caja_f'  estilo={this.estilo_eu_con_comer} />
			<CajaConCampos clase="resaltar_caja_bloque"  estilo={this.estilo_eu_con_comer}>
				<CajaDeTexto propiedades = {PORC_COMERCIALIZADORA} ref="cajaPorcentajeComerzializadora"/>
			</CajaConCampos>
			{this.estilo_eu==='none' ? '' : <br />}
			<Titulo titulo='China' clase='resaltar_titulo_caja_f'  estilo={this.estilo_china} />
			<CajaConCampos clase="resaltar_caja_bloque" estilo={this.estilo_china}>
				<CajaDeTexto propiedades = {PRECIO_TONELADA} ref="cajaPrecioToneladaDolar"/>
				<CajaDeTexto propiedades = {IMPUESTO_CHINA} ref="cajaPorcentajeComerzializadora"/>
			</CajaConCampos>
	      	{this.estilo_china==='none' ? '' : <br />}
	      	<CajaCalculos   pais         ={this.props.pais} 
	      				    precio_libra ={this.state.precio_libra}
	      				    factor       ={this.state.factor}
							precio_dolar ={this.state.precio_dolar}
							impuesto ={this.state.impuesto}
							impuesto_china ={this.state.impuesto_china}
							porc_comercializadora ={this.state.porc_comercializadora}
							precio_tonelada_dolar ={this.state.precio_tonelada_dolar}
							con_comercializadora ={this.props.conComercializadora}
							actualizar_calculos = {this.actualizar_calculos }
							onGuardar = {this.onGuardar}
	      				  />
		</article>
			);  
		}
});
