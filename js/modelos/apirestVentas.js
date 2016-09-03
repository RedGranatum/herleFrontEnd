var Backbone = require('backbone');
var ColeccionVenta  =  require('../modelos/coleccionBase');
var ModeloBase =  require('../modelos/modeloBase');


var apirestVentas = function(){
return {
      num_rollo: function(num_rollo){
        this.num_rollo = num_rollo;        
      },
    fec_inicial: function(fec_inicial){
        this.fec_inicial = fec_inicial;        
      },
    fec_final: function(fec_final){
        this.fec_final = fec_final;        
      },
    num_documento: function(num_documento){
        this.num_documento = num_documento;
    },
	  buscarVentaPorPk: function(pk,funcion_exito,funcion_error){
         var ruta ='ventas/'+pk+'/detalles/';
          this.funcionBusqueda(ruta,funcion_exito,funcion_error);
       }, 
      buscarVentaPorIdDocumento: function(valor_buscar,funcion_exito,funcion_error){
          var ruta ='ventas/buscar/' + valor_buscar + '';
          this.funcionBusqueda(ruta,funcion_exito,funcion_error);
       },
      costoAgrupado: function(funcion_exito,funcion_error){
          var valores = '?num_rollo=' + this.num_rollo;
          var ruta ='costos/agrupado/' + valores;
          this.funcionBusqueda(ruta,funcion_exito,funcion_error);
       },
      consultaVentasPorFechas: function(funcion_exito,funcion_error){
        var valores =  '?fec_inicial=' + this.fec_inicial;        
        valores = valores + '&fec_final=' + this.fec_final;
        valores = valores + '&num_documento=' + this.num_documento;   
        var ruta ='ventas/consultas/' + valores;
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
      ruta_insertar: function(){
        return 'ventas_con_detalles/';
     },
     ruta_modificar: function(pk){
        return 'ventas/' + pk +'/';
     },

     Guardar: function(datos,funcion_exito,funcion_error){
      var venta = new ModeloBase();
      
      venta.set(datos);
      var operacion =''
      if (datos.id===-1){
        venta.asignarRuta(this.ruta_insertar());
        operacion = 'POST';
      } 
      if(datos.id > 0){
        venta.asignarRuta(this.ruta_modificar(datos.id));
        operacion = 'PUT'
      } 
      venta.save(null,{
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

module.exports = apirestVentas;
