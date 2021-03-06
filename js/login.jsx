var $        = require('jquery');
var React    = require('react');
var ApiLogin = require('../js/modelos/apirestLogin');

module.exports = React.createClass({
getDefaultProps: function(){
	return{
		estilo: 'block',
		permiso: false
	}
},
TeclaPresionada: function(event) {
          if(event.charCode == 13)  {
               this.login();
          }
      },
login: function(){
	          var self = this; 
			  var login = new ApiLogin();
	        
	          login.usuario  = this.refs.Usuario.value;
	          login.password = this.refs.Password.value;

              login.EnviarCredenciales(
                    function(datos,response){
                    	self.props.onLogin(true);
                        $("#notify_success").text("Bienvenido");
                        $("#notify_success").notify();
                    },
                    function(model,response,options){
                        self.props.onLogin(false);
     			        $("#notify_error").text(response.responseText);
                        $("#notify_error").notify();
                    });
           
},
render: function () {
	  if(this.props.permiso === true){
      	return(<div></div>);
      }
      return (  
    <div> 	
		<div className="login" >
			<div className="bloque_login" >
				<div className="form">
					<p className="field">
						<input ref="Usuario" type="text" name="login" placeholder="usuario" />
						<i className="fa fa-user fa-1x"></i>
					</p>
					<p className="field">
						<input ref="Password" type="password" name="password" placeholder="contraseña"    onKeyPress ={this.TeclaPresionada} />
						<i className="fa fa-lock fa-1x"></i>
					</p>
					<a >
					<p className="submit">
						<button type="submit" name="submit" onClick={this.login}>
							<i className="fa fa-arrow-right"></i>
						</button>
					</p>
					</a>
				</div>
			</div>
	   	</div>
		<div className="caja_foto">
			<figure className="foto">
				<p/><img src="images/collage-herle.png" alt="logos" />
			</figure>
		</div>
	</div>
			);  
		}
});
