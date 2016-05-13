var Backbone        = require('backbone');

module.exports =  Backbone.Model.extend({
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