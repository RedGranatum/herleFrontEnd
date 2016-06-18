var Backbone      = require('backbone');
var ColeccionCat  =  require('../modelos/coleccionBase');

var catalogosApiRest =function(){
	return{
		buscarPrecioDolar: function(funcion_exito,funcion_error){
			var ruta = 'http://rate-exchange.herokuapp.com/fetchRate?from=USD&to=MXN';	
			this.funcionBusqueda(ruta,funcion_exito,funcion_error);
		},
		funcionBusqueda: function(ruta,funcion_exito,funcion_error){
			var datosCatalogo = new ColeccionCat();
			datosCatalogo.externa = true;
			
			datosCatalogo.asignarRuta(ruta);
				 datosCatalogo.fetch({
                 success: function(data){
                 		 funcion_exito(data.toJSON());
                    },
                 error: function(model,response, options) {
               	     funcion_error(model,response,options);				
                  },
                }); 

		},

};
}
		
module.exports = catalogosApiRest;
