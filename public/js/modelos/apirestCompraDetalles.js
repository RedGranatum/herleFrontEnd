var Backbone = require('backbone');
var ColeccionCat  =  require('../modelos/coleccionBase');
var ModeloBase =  require('../modelos/modeloBase');


var apirestCompraDetalles = function(){
return {
     ruta_modificar: function(pk){
        return 'compras_detalles/' + pk + '/'; 
     },
    Eliminar: function(id,funcion_exito,funcion_error){
      var compra_det = new ModeloBase({
              id: id 
          });

      compra_det.asignarRuta(this.ruta_modificar(id));
     
      compra_det.destroy({
              success: function(model,response){

           funcion_exito(model,response);
        },
        error: function(model,response,options){
           funcion_error(model,response,options);
        }
      });  
     
    },

};
}

module.exports = apirestCompraDetalles;