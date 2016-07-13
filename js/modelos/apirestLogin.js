var Backbone = require('backbone');
var ColeccionCat  =  require('../modelos/coleccionBase');
var ModeloBase =  require('../modelos/modeloBase');


var apirestLogin = function(){
return {

    usuario: function(usuario){
        this.usuario = usuario;        
      },
    password: function(password){
        this.password = password;        
      },  
    initialize: function(){
         this.usuario   = "";
         this.password  = "";
      },

     ruta_login: function(){
		return 'api-token-auth/';
     },
     EnviarCredenciales: function(funcion_exito,funcion_error){
     	var data ={"username": this.usuario, "password": this.password};
     	
     	var ruta_login = new ModeloBase();
     	
     	ruta_login.set(data);
     	ruta_login.asignarRuta(this.ruta_login());
   
     	ruta_login.save(null,{
     		type: 'POST',
     		success: function(datos,response){
     			 localStorage.setItem("token",'Token ' + response.token);
     			 funcion_exito(datos.toJSON(),response);
     		},
     		error: function(model,response,options){
     			 funcion_error(model,response,options);
     		}
     	});
    },
  }
};

module.exports = apirestLogin;
