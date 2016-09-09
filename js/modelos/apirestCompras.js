var Backbone = require('backbone');
var moment      = require('moment');
var ColeccionCat  =  require('../modelos/coleccionBase');
var ModeloBase =  require('../modelos/modeloBase');


var apirestClientes = function(){
return {
    fec_inicial: function(fec_inicial){
        this.fec_inicial = fec_inicial;        
      },
    fec_final: function(fec_final){
        this.fec_final = fec_final;        
      },
    invoice: function(invoice){
        this.invoice = invoice;
    },
    modulo: function(modulo){
        this.modulo = modulo;        
    },  
    initialize: function(){
         this.fec_inicial = moment().format('DD/MM/YYYY');
         this.fec_final   = moment().format('DD/MM/YYYY');
         this.modulo ="";
         this.invoice ="";
      },
      buscarCompraPorInvoice: function(valor_buscar,funcion_exito,funcion_error){
          var ruta ='compras/buscar/' + valor_buscar + '';
          this.funcionBusqueda(ruta,funcion_exito,funcion_error);
       },
       buscarCompraPorPk: function(pk,funcion_exito,funcion_error){
         var ruta ='compras/'+pk+'/detalles/';
          this.funcionBusqueda(ruta,funcion_exito,funcion_error);
       }, 
       buscarComprasNoInventariadas: function(funcion_exito,funcion_error){
         var ruta ='compras/validadas/false/';
          this.funcionBusqueda(ruta,funcion_exito,funcion_error);
       }, 
       buscarComprasInventariadas: function(funcion_exito,funcion_error){
         var ruta ='compras/validadas/true/';
          this.funcionBusqueda(ruta,funcion_exito,funcion_error);
       },        
       consultaComprasPorFechas: function(funcion_exito,funcion_error){
        var valores = '?modulo=' + this.modulo;
        valores = valores + '&fec_inicial=' + this.fec_inicial;        
        valores = valores + '&fec_final=' + this.fec_final;
        valores = valores + '&invoice=' + this.invoice;   
        var ruta ='compras/consultas/' + valores;
          this.funcionBusqueda(ruta,funcion_exito,funcion_error);
       },        
      calendarioFechaAduana: function(funcion_exito,funcion_error){
            var ruta = 'compras/calendario_aduana/';         
            this.funcionBusqueda(ruta,funcion_exito,funcion_error);
        },
        calendarioAcumuladoFechaAduana: function(funcion_exito,funcion_error){
            var ruta = 'compras/calendario_acumulado_aduana/';         
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
    Eliminar: function(id,funcion_exito,funcion_error){
      var cliente = new ModeloBase();
      cliente.asignarRuta(this.ruta_modificar(id));
       
      cliente.destroy(null,{
        success: function(model,response){
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
