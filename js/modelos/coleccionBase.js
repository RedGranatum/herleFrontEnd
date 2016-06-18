var Backbone        = require('backbone');

module.exports =  Backbone.Collection.extend({
		externa: function(externa){
			this.externa = false;
		},
		initialize: function(){
			this.externa = false;
		},
		asignarRuta: function(ruta){
			this.ruta = ruta;
		},
		url : function(){
	    		if(this.externa === true){
	    			return this.ruta;
	    		}
	    		if(this.ruta.toLowerCase().indexOf("http:")===-1){  
	        		this.ruta = appmvc.Url.API_REST + this.ruta
	       			 console.log(this.ruta)
	    		}
	  			 return this.ruta;
	  	}
})