var React=require('react');

module.exports = React.createClass({
		handleChange: function(event) {
        	if(event.charCode == 13)  {
        		console.log("Estoy buscando: " +this.refs.cajaBusqueda.value);
                this.props.onValorBuscado(this.refs.cajaBusqueda.value);
        	}
  		},
		render: function () {
			return (
             	<li>
             	<input 
             		ref = "cajaBusqueda"
             		type="text" 
             		placeholder={this.props.textoIndicativo} 
             		className="buscar" 
             		onKeyPress ={this.handleChange} 
             	/>
             	</li>
			);  
		}
	});

