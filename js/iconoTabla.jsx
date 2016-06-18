
var React= require('react');


module.exports = React.createClass({

		onClick: function(){
			this.props.clickOperacion(this.props.id)
		},
		render: function () {

           return (
				<button className={this.props.opcionGuardar} onClick={this.onClick}><i className={"fa fa-"+this.props.tipoIcono+" fa-2x"}></i></button>
			);  
		}
});