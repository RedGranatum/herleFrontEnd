var React=require('react');

module.exports = React.createClass({
		
		render: function () {
			return (
					<div className="resultado" key={this.props.resultado.id}>
						<span className="dsc_resultado">{this.props.resultado.nombre}</span>
					</div>
				);  
	  	}
	});
