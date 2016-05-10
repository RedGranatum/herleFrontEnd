var RutasApiRest   = require('../modelos/rutaApiRest');

var clientesApiRest = function(){
return {
     NuevoCliente: function(datos_guardar){
//nuevoProveedor
     },
     ClientePorPk: function(pk,funcion,funcion_error){
         this.rutaBusqueda  = new RutasApiRest();
               this.rutaBusqueda.buscarClientesPorPk(pk);
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
module.exports = clientesApiRest;