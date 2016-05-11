var Backbone = require('backbone');
var modelo = Backbone.Model.extend({
		asignarRuta: function(ruta){
			this.ruta = ruta;
		},
		url : function(){
	    		if(this.ruta.toLowerCase().indexOf("http:")===-1){  
	        		this.ruta = appmvc.Url.API_REST + this.ruta
	       			 console.log(this.ruta)
	    		}
	  			 return this.ruta;
	  	}
	});


var apirestProveedores = function(){
return {
     ruta_insertar: function(){
		return 'proveedores/';
     },
     ruta_modificar: function(pk){
     	return 'proveedores/' + pk + '/'; 
     },
     Guardar: function(datos,funcion_exito,funcion_error){
     	var proveedor = new modelo();
     	
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
     	})
     	
    },

};
}

module.exports = apirestProveedores;
