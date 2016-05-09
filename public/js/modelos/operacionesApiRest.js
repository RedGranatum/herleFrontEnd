var Backbone = require('backbone');


module.exports = Backbone.Model.extend({
  nuevoProveedor:function(){
    this.ruta = 'proveedores/'; 
  },
  modificarProveedor:function(pk){
    this.ruta = 'proveedores/' + pk + '/';   
  },
  url : function(){
    if(this.ruta.toLowerCase().indexOf("http:")===-1){  
        this.ruta = appmvc.Url.API_REST + this.ruta
        console.log(this.ruta)
    }
   return this.ruta;
  },

});