var React = require('react');
var Filas = require('../js/resultadoIndividual.jsx');


module.exports = React.createClass({
	    onClaveSeleccionada: function(pk){
	    	this.props.onClaveSeleccionada(pk);
	    },
		render: function () {
			var self =this;
			var filas = [];
			this.props.resultados.forEach(function(resultado){
				filas.push(<Filas key={resultado.id}  resultado={resultado} onClaveSeleccionada={self.onClaveSeleccionada}/>);
			});
	        
	        var divStyle = (filas.length >0) ? { display: 'block'} : {display: 'none'} ;
			return (
				<div className="bloque_resultados"  style ={divStyle}>
					{filas}
				</div>
			);  
		}
	});
