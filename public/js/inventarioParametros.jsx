var React=require('react');
var CajaDeTexto 	= require('../js/cajaDeTexto.jsx');

module.exports = React.createClass({
componentDidMount: function(){

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
	   	impuesto_china : "0.0",
		"errores" :{},
	}
},
render: function () {
    var dic1 			=                    ["id",      "titulo",      "textoIndicativo" ,    "valor",             "onChange"      , "onBlur"				 , "error"];
	var PRECIO_LIBRA  	= func.zipCol(dic1,["precio_libra",  "Precio en libra", 	"precio_libra", this.state.precio_libra,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.precio_libra ]);
	var FACTOR        	= func.zipCol(dic1,["factor",  		 "Factor", 	"factor", this.state.factor,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.factor ]);
	var PRECIO_DOLAR    = func.zipCol(dic1,["precio_dolar",  "Precio en dolar", 	"precio_dolar", this.state.precio_dolar,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.precio_dolar ]);
	var IMPUESTO = func.zipCol(dic1,["factor_impuesto",  "Factor impuesto", "factor_impuesto", this.state.impuesto,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.impuesto ]);
	var IMPUESTO_CHINA = func.zipCol(dic1,["factor_impuesto",  "Factor impuesto China", "factor_impuesto", this.state.impuesto_china,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.impuesto_china ]);

	var PORC_COMERCIALIZADORA  = func.zipCol(dic1,["porc_comercializadora",  "Porcentaje (%)", "porc_comercializadora", this.state.porc_comercializadora,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.porc_comercializadora ]);
      return (      		
      	<article className="bloque">
			<div className="titulo_bloque" id="resaltar_titulo_caja_f">
				Sin Comercializadora
			</div>
			<div className="caja_bloque" id="resaltar_caja_bloque">
				<div className="campos_bloque">
					<ul className="ul_bloque">
						<CajaDeTexto propiedades = {PRECIO_LIBRA} ref="cajaPrecioLibra"/>
						<CajaDeTexto propiedades = {FACTOR} ref="cajaFactor"/>
						<CajaDeTexto propiedades = {PRECIO_DOLAR} ref="cajaPrecioDolar"/>
						<CajaDeTexto propiedades = {IMPUESTO} ref="cajaFactorImpuesto" />
					</ul>
				</div>
			</div>
			<br />
			<div className="titulo_bloque" id="resaltar_titulo_caja_f">
				Con Comercializadora
			</div>
			<div className="caja_bloque" id="resaltar_caja_bloque">
				<div className="campos_bloque">
					<ul className="ul_bloque">
						<CajaDeTexto propiedades = {PORC_COMERCIALIZADORA} ref="cajaPorcentajeComerzializadora"/>
					</ul>
				</div>
			</div>
			<br />		
			<div className="titulo_bloque" id="resaltar_titulo_caja_f">
				Factor Impuesto China
			</div>
			<div className="caja_bloque" id="resaltar_caja_bloque">
				<div className="campos_bloque">
					<ul className="ul_bloque">
						<CajaDeTexto propiedades = {IMPUESTO_CHINA} ref="cajaPorcentajeComerzializadora"/>
					</ul>
				</div>
			</div>
		</article>
			);  
		}
});



	