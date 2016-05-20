
var React= require('react');


module.exports = React.createClass({

		render: function () {

           return (
	
			<a className={this.props.opcionGuardar} title={this.props.mensajeIndicador} href="#"><i className={"fa fa-"+this.props.tipoIcono+" fa-2x"}></i></a>
			);  
		}
});