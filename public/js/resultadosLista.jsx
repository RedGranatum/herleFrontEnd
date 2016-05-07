var React = require('react');
var Filas = require('../js/resultadoIndividual.jsx');


module.exports = React.createClass({
		render: function () {
			
			var filas = [];
			this.props.resultados.forEach(function(resultado){
				filas.push(<Filas resultado={resultado}/>);
			});
	        
	        var divStyle = (filas.length >0) ? { display: 'block'} : {display: 'none'} ;
			return (
				<div className="bloque_resultados"  style ={divStyle}>
					{filas}
				</div>
			);  
		}
	});
