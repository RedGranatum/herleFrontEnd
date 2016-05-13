var Backbone      = require('backbone');
var ColeccionCat  =  require('../modelos/coleccionBase');

var catalogosApiRest =function(){
	return{
		buscarDetallesPorNumCatalogo: function(num_catalogo,funcion_exito,funcion_error){
			var ruta = 'catalogos/' + num_catalogo + '/catalogo_detalles/';
			
			this.funcionBusqueda(ruta,funcion_exito,funcion_error);
		},
		buscarDetallesPorCduDefault: function(cdu_default,funcion_exito,funcion_error){
			var ruta =  'catalogo_detalles/'+cdu_default+'/catalogo_detalles/';
						
			this.funcionBusqueda(ruta,funcion_exito,funcion_error);
		},


		funcionBusqueda: function(ruta,funcion_exito,funcion_error){
			var datosCatalogo = new ColeccionCat();
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
