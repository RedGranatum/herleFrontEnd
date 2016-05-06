var React = require('react');
var Filas = require('../js/resultadoIndividual.jsx');


module.exports = React.createClass({
		render: function () {
			
			var filas = [];
			this.props.resultados.forEach(function(resultado){
				filas.push(<Filas resultado={resultado}/>);
			});
	
		
			return (
				<div className="bloque_resultados">
					{filas}
				</div>
			);  
		}
	});
