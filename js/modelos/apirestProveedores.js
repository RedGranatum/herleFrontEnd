var Backbone = require('backbone');
var ColeccionCat  =  require('../modelos/coleccionBase');
var ModeloBase =  require('../modelos/modeloBase');


var apirestProveedores = function(){
return {

      buscarProveedores: function(funcion_exito,funcion_error){
          var ruta = 'proveedores/';
          this.funcionBusqueda(ruta,funcion_exito,funcion_error);
       },
       buscarProveedorPorPk: function(pk,funcion_exito,funcion_error){
          var ruta = 'proveedores/' + pk + '/';
          this.funcionBusqueda(ruta,funcion_exito,funcion_error);
       },
       buscarProveedorPorValor: function(valor_buscar,funcion_exito,funcion_error){
          var ruta ='proveedores/buscar/' + valor_buscar + '/';
          this.funcionBusqueda(ruta,funcion_exito,funcion_error);
       },
      funcionBusqueda: function(ruta,funcion_exito,funcion_error){
               var datosCatalogo = new ColeccionCat();
               datosCatalogo.asignarRuta(ruta);
                     datosCatalogo.fetch({
                        headers: {'Authorization' :localStorage.token},
                 success: function(data){
                          funcion_exito(data.toJSON());
                    },
                 error: function(model,response, options) {
                         funcion_error(model,response,options);                 
                  },
                }); 

          },

     ruta_insertar: function(){
		return 'proveedores/';
     },
     ruta_modificar: function(pk){
     	return 'proveedores/' + pk + '/'; 
     },
     Guardar: function(datos,funcion_exito,funcion_error){
     	var proveedor = new ModeloBase();
     	
     	proveedor.set(datos);
     	var operacion =''
     	if (datos.id===-1){
     		proveedor.asignarRuta(this.ruta_insertar());
     		operacion = 'POST';
     	} 
     	if(datos.id > 0){
     		proveedor.asignarRuta(this.ruta_modificar(datos.id));
     		operacion = 'PUT'
     	} 
     	proveedor.save(null,{
     		type: operacion,
     		success: function(datos,response){
     			 funcion_exito(datos.toJSON(),response);
     		},
     		error: function(model,response,options){
     			 funcion_error(model,response,options);
     		}
     	});
    },
    Eliminar: function(id,funcion_exito,funcion_error){
          var proveedor = new ModeloBase({
              id: id 
          });
          proveedor.asignarRuta(this.ruta_modificar(id));

          proveedor.destroy({
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

module.exports = apirestProveedores;
