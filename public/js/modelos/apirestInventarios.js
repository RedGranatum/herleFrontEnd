var Backbone      = require('backbone');
var ColeccionInv  =  require('../modelos/coleccionBase');

var inventariosApiRest =function(){
	return{
		rango : function(rango){
      		this.rango  = rango;
  		},
		cdu_material : function(cdu_material){
      		this.cdu_material  = cdu_material;
  		},

		ancho : function(ancho){
      		this.ancho  = ancho;
  		},
		largo : function(largo){
      		this.largo  = largo;
  		},
		initialize: function(){
  			 this.rango = '0';
  			 this.cdu_material = ''
  			 this.ancho = '0'
  			 this.largo = '0'
  		},
		obtenerCodigoDelProducto: function(funcion_exito,funcion_error){
			var valores = '?rango=' + this.rango;
			valores = valores + '&cdu_material=' + this.cdu_material;
			valores = valores + '&ancho=' + this.ancho;
			valores = valores + '&largo=' + this.largo;
			var ruta = 'inventarios/codigo_producto/';
			ruta = ruta + valores;			
			this.funcionCalculos(ruta,funcion_exito,funcion_error);
		},
		funcionBusqueda: function(ruta,funcion_exito,funcion_error){
			var datosInventario = new ColeccionInv();
			datosInventario.asignarRuta(ruta);
				 datosInventario.fetch({
                 success: function(data,data2){
                 		 funcion_exito(data.toJSON());
                    },
                 error: function(model,response, options) {
               	     funcion_error(model,response,options);				
                  },
                }); 

		},
		funcionCalculos: function(ruta,funcion_exito,funcion_error){
			var datosInventario = new ColeccionInv();
			datosInventario.asignarRuta(ruta);
				 datosInventario.fetch({
                 success: function(data,data2){
                 		 funcion_exito(data2);
                    },
                 error: function(model,response, options) {
               	     funcion_error(model,response,options);				
                  },
                }); 

		},
};
}
		
module.exports = inventariosApiRest;