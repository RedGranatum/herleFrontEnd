var React=require('react');
module.exports = React.createClass({
getDefaultProps: function(){
	return{
		estilo: 'block',
		permiso: false
	}
},
render: function () {
	  if(this.props.permiso === true){
      	return(<div></div>);
      }
      return (   	
		<div className="login" >
			<div className="bloque_login" >
				<div className="form">
					<p className="field">
						<input type="text" name="login" placeholder="usuario" />
						<i className="fa fa-user fa-1x"></i>
					</p>
					<p className="field">
						<input type="password" name="password" placeholder="contraseña" />
						<i className="fa fa-lock fa-1x"></i>
					</p>
					<a >
					<p className="submit">
						<button type="submit" name="submit">
							<i className="fa fa-arrow-right"></i>
						</button>
					</p>
					</a>
				</div>
			</div>
		</div>
			);  
		}
});
