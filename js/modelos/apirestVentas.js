var Backbone = require('backbone');
var ColeccionVenta  =  require('../modelos/coleccionBase');
var ModeloBase =  require('../modelos/modeloBase');


var apirestVentas = function(){
return {
	  buscarVentaPorPk: function(pk,funcion_exito,funcion_error){
         var ruta ='ventas/'+pk+'/detalles/';
          this.funcionBusqueda(ruta,funcion_exito,funcion_error);
       }, 
      buscarVentaPorIdDocumento: function(valor_buscar,funcion_exito,funcion_error){
          var ruta ='ventas/buscar/' + valor_buscar + '';
          this.funcionBusqueda(ruta,funcion_exito,funcion_error);
       },
      funcionBusqueda: function(ruta,funcion_exito,funcion_error){
               var datosVentas = new ColeccionVenta();
               datosVentas.asignarRuta(ruta);
                     datosVentas.fetch({

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

module.exports = apirestVentas;
