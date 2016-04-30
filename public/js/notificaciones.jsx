var React=require('react');

module.exports =  React.createClass({
		
		render: function () {
			return (
<div>
    <div className="info message" id="notify_info">
		<h3>Hey, esto te puede interesar!</h3>
		<p>Descripción de información adicional</p>
	</div>
	<div className="error message" id="notify_error">
		<h3>Oops, un error ha ocurrido</h3>
		<p>Descripción del error</p>
	</div>
	<div className="warning message" id="notify_warning">
		<h3>Espera, esto es importante!</h3>
		<p>Descripción de advertencia</p>
	</div>
	<div className="success message" id="notify_success">
		<h3>Felicidades, esta hecho!</h3>
		<p>Descripción del éxito</p>
	</div>
</div>	

						);  
		}
	});
