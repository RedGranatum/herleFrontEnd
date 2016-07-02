var Backbone      = require('backbone');
var ColeccionExist  =  require('../modelos/coleccionBase');

var clientesPagosApiRest =function(){
	return{
		detallesPagosPorVenta: function(venta,funcion_exito,funcion_error){
			var ruta = 'clientes_pagos/detalles/' + venta ;			
			this.funcionBusqueda(ruta,funcion_exito,funcion_error);
		},
	
		funcionBusqueda: function(ruta,funcion_exito,funcion_error){
			var datosExist = new ColeccionExist();
			datosExist.asignarRuta(ruta);
				 datosExist.fetch({
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
		
module.exports = clientesPagosApiRest;
