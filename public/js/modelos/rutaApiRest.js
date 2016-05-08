var Backbone        = require('backbone');

module.exports = Backbone.Collection.extend({

  buscarProveedores: function(){
  	this.ruta = 'proveedores/'
  },
  buscarProveedorPorPk: function(pk){
    this.ruta = 'proveedores/' + pk;
  },
  buscarProveedorPorValor: function(valor_buscar){
     this.ruta ='proveedores/buscar/' + valor_buscar + '';
  },
  buscarClientes: function(){
  	this.ruta ='clientes/'
  },
  buscarClientesPorValor: function(valor_buscar){
     this.ruta ='clientes/buscar/' + valor_buscar + '';
  },

  url : function(){
    if(this.ruta.toLowerCase().indexOf("http:")===-1){  
        this.ruta = appmvc.Url.API_REST + this.ruta
        console.log(this.ruta)
    }
   return this.ruta;
  },

});