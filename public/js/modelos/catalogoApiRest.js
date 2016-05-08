var RutasApiRest   = require('../modelos/rutaApiRest');

var catalogoApiRest = function(){
return {
 

    DetallesPorCatalogo: function(catalogo,funcion,funcion_error){
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
   DetallesPorCduDefault: function(cdu_default,funcion,funcion_error){
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
    },

};
}
module.exports = catalogoApiRest;