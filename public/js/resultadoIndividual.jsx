var React=require('react');

module.exports = React.createClass({
		onClick: function(){
			this.props.onClaveSeleccionada(this.props.resultado.id);
		},
		render: function () {
			return (
					<div className="resultado" key={this.props.resultado.id} >
						<span className="dsc_resultado" onClick ={this.onClick}>[{this.props.resultado.codigo}] {this.props.resultado.nombre}</span>
					</div>
				);  
	  	}
	});
