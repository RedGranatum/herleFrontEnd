var RutasApiRest   = require('../modelos/rutaApiRest');

var catalogo = [];

var consultasApiRest = function(){
return {
    buscarCatalogoDetallesPorCatalogo: function(catalogo,funcion,funcion_error){
         this.rutaBusqueda  = new RutasApiRest();
               this.rutaBusqueda.buscarDetallesPorNumCatalalogo(catalogo);
               this.rutaBusqueda.fetch({
                 success: function(data){
                     funcion(data.toJSON());
                    },
                 error: function(model,response, options) {
                     funcion_error(model,response,options);       
                  },
                });
    },
   buscarCatalogoDetallesPorCduDefault: function(cdu_default,funcion,funcion_error){
  			 this.rutaBusqueda  = new RutasApiRest();
               this.rutaBusqueda.buscarDetallesPorCduDefault(cdu_default);
               this.rutaBusqueda.fetch({
                 success: function(data){
                 		 funcion(data.toJSON());
                    },
                 error: function(model,response, options) {
  	        		     funcion_error(model,response,options);				
                  },
                });
         }
};
}
module.exports = consultasApiRest;