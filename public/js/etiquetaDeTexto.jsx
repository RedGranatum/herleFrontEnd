var React=require('react');
var Titulo       = require('../js/titulos.jsx');

module.exports = React.createClass({
getDefaultProps: function(){
	return{
		clase: 'etiquetas_bloque',
		titulo: '',
		valor: '',
	}
},
render: function () {
	  var estilo =  {display: this.props.estilo};
      return (      	
      		<li className="li_bloque">
				<label className="etiquetas_bloque" >{this.props.titulo}</label>
				<label className={this.props.clase} >{this.props.valor}</label>
			</li>
			);  
		}
});
