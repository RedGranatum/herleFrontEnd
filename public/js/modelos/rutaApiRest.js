var Backbone        = require('backbone');

module.exports = Backbone.Collection.extend({
  buscarProveedores: function(){
  	this.ruta ='http://localhost:8000/proveedores/'
  },
  buscarProveedorPorValor: function(valor_buscar){
     this.ruta ='http://localhost:8000/proveedores/buscar/' + valor_buscar + '';
  },
  buscarClientes: function(){
  	this.ruta ='http://localhost:8000/clientes/'
  },
  buscarClientesPorValor: function(valor_buscar){
     this.ruta ='http://localhost:8000/clientes/buscar/' + valor_buscar + '';
  },

  url : function(){
   return this.ruta;
  },

});