var Backbone      = require('backbone');
var ColeccionExist  =  require('../modelos/coleccionBase');
var ModeloBase =  require('../modelos/modeloBase');

var clientesPagosApiRest =function(){
	return{
		detallesPagosPorVenta: function(venta,funcion_exito,funcion_error){
			var ruta = 'clientes_pagos/detalles/' + venta ;			
			this.funcionBusqueda(ruta,funcion_exito,funcion_error);
		},
		ventasConAdeudos: function(funcion_exito,funcion_error){
			var ruta = 'clientes_pagos/agrupados/adeudos/';			
			this.funcionBusqueda(ruta,funcion_exito,funcion_error);
		},
        calendarioPagos: function(funcion_exito,funcion_error){
            var ruta = 'calendario_pagos/';         
            this.funcionBusqueda(ruta,funcion_exito,funcion_error);
        },
        calendarioAcumuladoPagos: function(funcion_exito,funcion_error){
            var ruta = 'calendario_acumulado_pagos/';         
            this.funcionBusqueda(ruta,funcion_exito,funcion_error);
        },
        clientesLimiteCredito: function(cliente,funcion_exito,funcion_error){
            var ruta = 'clientes_limite_credito/' + cliente;         
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
    ruta_insertar: function(){
		return 'clientes_pagos/';
     },
     Guardar: function(datos,funcion_exito,funcion_error){
     	var pago = new ModeloBase();
     	
     	pago.set(datos);
     	var operacion =''

   		if (datos.id===-1){
     		pago.asignarRuta(this.ruta_insertar());
     		operacion = 'POST';
     	} 
     	if(datos.id > 0){
     		pago.asignarRuta(this.ruta_modificar(datos.id));
     		operacion = 'PUT'
     	} 
     	pago.save(null,{
     		type: operacion,
     		success: function(datos,response){
     			 funcion_exito(datos.toJSON(),response);
     		},
     		error: function(model,response,options){
     			 funcion_error(model,response,options);
     		}
     	})
    },

};
}
		
module.exports = clientesPagosApiRest;
