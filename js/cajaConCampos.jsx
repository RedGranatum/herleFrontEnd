var React=require('react');
var Titulo       = require('../js/titulos.jsx');

module.exports = React.createClass({
getDefaultProps: function(){
	return{
		clase: 'caja_bloque',
		estilo: 'block'
	}
},
render: function () {
	  var estilo =  {display: this.props.estilo};
      return (      		
      		<div className={this.props.clase} style={estilo}>
				<div className="campos_bloque">
					<ul className="ul_bloque">
						{this.props.children}
					</ul>
				</div>
			</div>
			);  
		}
});



	