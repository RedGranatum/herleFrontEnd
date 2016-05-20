var Backbone = require('backbone');
var ColeccionCat  =  require('../modelos/coleccionBase');
var ModeloBase =  require('../modelos/modeloBase');


var apirestClientes = function(){
return {
      buscarCompraPorInvoice: function(valor_buscar,funcion_exito,funcion_error){
          var ruta ='compras/buscar/' + valor_buscar + '';
          this.funcionBusqueda(ruta,funcion_exito,funcion_error);
       },
       buscarCompraPorPk: function(pk,funcion_exito,funcion_error){
         var ruta ='compras/'+pk+'/detalles/';
          this.funcionBusqueda(ruta,funcion_exito,funcion_error);
       },
      funcionBusqueda: function(ruta,funcion_exito,funcion_error){
               var datosCatalogo = new ColeccionCat();
               datosCatalogo.asignarRuta(ruta);
                     datosCatalogo.fetch({

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

module.exports = apirestClientes;
