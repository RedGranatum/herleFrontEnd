var Backbone      = require('backbone');
var ColeccionInv  =  require('../modelos/coleccionBase');

var inventariosCalculoApiRest =function(){
	return{
		cdu_pais : function(cdu_pais){
      		this.cdu_pais  = cdu_pais;
  		},
		precio_tonelada_dolar : function(precio_tonelada_dolar){
      		this.precio_tonelada_dolar  = precio_tonelada_dolar;
  		},
		con_comercializadora : function(con_comercializadora){
      		this.con_comercializadora  = con_comercializadora;
  		},
		precio_libra_centavos : function(precio_libra_centavos){
      		this.precio_libra_centavos  = precio_libra_centavos;
  		},
		factor : function(factor){
		      		this.factor  = factor;
		},
		precio_dolar : function(precio_dolar){
      		this.precio_dolar  = precio_dolar;
  		},
		factor_impuesto : function(factor_impuesto){
      		this.factor_impuesto  = factor_impuesto;
  		},
		porc_comercializadora : function(porc_comercializadora){
      		this.porc_comercializadora  = porc_comercializadora;
  		},
  		kilogramos: function(kilogramos){
  			this.kilogramos = kilogramos;
  		}, 		
  		libras: function(libras){
  			this.libras = libras;
  		},
		initialize: function(){
  			 this.cdu_pais = '0010000';
  			 this.precio_tonelada_dolar = '0'
  			 this.con_comercializadora = 'False'
  			 this.precio_libra_centavos = '0.27'
  			 this.factor = '2.2045'
  			 this.precio_dolar = '18.03'
  			 this.factor_impuesto = '2.13'
  			 this.porc_comercializadora = '4'
  			 this.kilogramos = '0'
  			 this.libras = '0'
		},
		obtenerCalculos: function(funcion_exito,funcion_error){
			var valores = '?cdu_pais=' + this.cdu_pais;
			valores = valores + '&precio_tonelada_dolar=' + this.precio_tonelada_dolar;
			valores = valores + '&factor_impuesto_china=' + this.factor_impuesto;
			valores = valores + '&con_comercializadora=' + this.con_comercializadora;
			valores = valores + '&precio_libra_centavos=' + this.precio_libra_centavos;
			valores = valores + '&factor=' + this.factor;
			valores = valores + '&precio_dolar=' + this.precio_dolar;
			valores = valores + '&factor_impuesto=' + this.factor_impuesto;
			valores = valores + '&porc_comercializadora=' + this.porc_comercializadora;
			
			var ruta = 'inventarios/calculo_precios/';
			ruta = ruta + valores;			
			this.funcionCalculos(ruta,funcion_exito,funcion_error);
		},
		convertirValores: function(funcion_exito,funcion_error){
			var valores = '?pais=' + this.cdu_pais;
			valores = valores + '&kilogramo=' + this.kilogramo;
			valores = valores + '&libra=' + this.libra;

			var ruta = 'inventarios/conversor/';
			ruta = ruta + valores;			
			this.funcionCalculos(ruta,funcion_exito,funcion_error);
		},
		funcionCalculos: function(ruta,funcion_exito,funcion_error){
			var datosInventario = new ColeccionInv();
			datosInventario.asignarRuta(ruta);
				 datosInventario.fetch({
                 success: function(data,data2){
                 		 funcion_exito(data2);
                    },
                 error: function(model,response, options) {
               	     funcion_error(model,response,options);				
                  },
                }); 

		},
};
}
		
module.exports = inventariosCalculoApiRest;