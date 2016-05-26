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

     ruta_insertar: function(){
        return 'compras_con_detalles/';
     },
     ruta_modificar: function(pk){
        return 'compras_con_detalles/' + pk + '/'; 
     },
     Guardar: function(datos,funcion_exito,funcion_error){
      var cliente = new ModeloBase();
      
      cliente.set(datos);
      var operacion =''
      if (datos.id===-1){
        cliente.asignarRuta(this.ruta_insertar());
        operacion = 'POST';
      } 
      if(datos.id > 0){
        cliente.asignarRuta(this.ruta_modificar(datos.id));
        operacion = 'PUT'
      } 
      cliente.save(null,{
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

module.exports = apirestClientes;
