var RutasApiRest   = require('../modelos/rutaApiRest');

var proveedoresApiRest = function(){
return {
     NuevoProveedor: function(datos_guardar){
//nuevoProveedor
     },
     ProveedorPorPk: function(pk,funcion,funcion_error){
         this.rutaBusqueda  = new RutasApiRest();
               this.rutaBusqueda.buscarProveedorPorPk(pk);
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
module.exports = proveedoresApiRest;