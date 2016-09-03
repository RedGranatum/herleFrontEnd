var Backbone      = require('backbone');
var ColeccionCat  =  require('../modelos/coleccionBase');

var permisosApiRest =function(){
	return{
		permisoAdministrador: function(funcion_exito,funcion_error){
			var ruta = 'permiso_administrador/';
			
			this.funcionBusqueda(ruta,funcion_exito,funcion_error);
		},

		funcionBusqueda: function(ruta,funcion_exito,funcion_error){
			var datosPermiso = new ColeccionCat();
			datosPermiso.asignarRuta(ruta);
				 datosPermiso.fetch({
				 	headers: {'Authorization' :localStorage.token},
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
		
module.exports = permisosApiRest;

