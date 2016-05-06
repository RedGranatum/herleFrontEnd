var Backbone = require('backbone');

module.exports = Backbone.Model.extend({

 claves : function(claves){
      this.claves  = claves;
  },
  url : function(){
    return  ('http://192.168.0.10:8000/proveedores/' + this.claves + '/');
  },
});