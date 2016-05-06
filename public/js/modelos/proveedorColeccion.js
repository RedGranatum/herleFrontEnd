var Backbone        = require('backbone');
var ProveedorModelo = require('../modelos/proveedorModelo.js');

module.exports = Backbone.Collection.extend({
  url : function(){
   //var ruta ='http://192.168.0.10:8000/proveedores/';
   var ruta ='http://localhost:8000/proveedores/';
   return ruta;
  },
  
  model: ProveedorModelo,


});