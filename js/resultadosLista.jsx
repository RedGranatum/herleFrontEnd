var React = require('react');
var ReactDOM         = require('react-dom');
var Filas = require('../js/resultadoIndividual.jsx');


module.exports = React.createClass({
	   getInitialState: function(){
			return{
				resultados : this.props.resultados,
			};		
		},
		componentWillReceiveProps: function(nuevas_props){
			this.setState({resultados: nuevas_props.resultados})  
		},
	    onClaveSeleccionada: function(pk){
	    	if(pk==="cerrar"){
            	this.setState({resultados: []})   
	    	}
	    	else{
	      	    this.props.onClaveSeleccionada(pk);
	        }
	    },
		render: function () {
			console.log(this.state.resultados);
			var self =this;
			var filas = [];
			
			filas.push(<Filas key={'cerrar'}  resultado={{id:'cerrar',codigo:'cerrar',nombre:'X'}} onClaveSeleccionada={self.onClaveSeleccionada}/>);

			this.state.resultados.forEach(function(resultado){
				filas.push(<Filas key={resultado.id}  resultado={resultado} onClaveSeleccionada={self.onClaveSeleccionada}/>);
			});
	        
	        var divStyle = (filas.length >1) ? { display: 'inline-block'} : {display: 'none'} ;
			return (
				<div className="bloque_resultados"  style ={divStyle}>
					{filas}
				</div>
			);  
		}
	});
