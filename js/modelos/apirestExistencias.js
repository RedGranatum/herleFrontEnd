var Backbone      = require('backbone');
var ColeccionExist  =  require('../modelos/coleccionBase');

var existenciasApiRest =function(){
	return{
		producto: function(producto){
        	this.producto = producto;
    	},
    	num_rollo: function(num_rollo){
        	this.num_rollo = num_rollo;
    	},
		buscarExistenciaPorNumRollo: function(num_rollo,funcion_exito,funcion_error){
			var ruta = 'existencias/agrupadas/' + num_rollo ;			
			this.funcionBusqueda(ruta,funcion_exito,funcion_error);
		},
		buscarExistenciaAgrupadasPorRollo: function(funcion_exito,funcion_error){
			var valores = '?producto=' + this.producto;
       		valores = valores + '&num_rollo=' + this.num_rollo;   
       		if(this.producto === '' && this.num_rollo ===''){
       			valores ='';
       		}     
        	var ruta = 'existencias/agrupadas/' + valores;	
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
		
module.exports = existenciasApiRest;
