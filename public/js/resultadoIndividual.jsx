var React=require('react');

module.exports = React.createClass({
		onClick: function(){
			this.props.onClaveSeleccionada(this.props.resultado.id);
		},
		render: function () {
			var codigo= this.props.resultado.codigo===undefined ? this.props.resultado.invoice : this.props.resultado.codigo;
			var nombre= this.props.resultado.nombre===undefined ? this.props.resultado.fec_solicitud : this.props.resultado.nombre;
			
						return (
					<div className="resultado" key={this.props.resultado.id} >
						<span className="dsc_resultado" onClick ={this.onClick}> [{codigo}] {nombre}</span>
					</div>
				);  
	  	}
	});
