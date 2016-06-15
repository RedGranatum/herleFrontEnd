var React=require('react');
var Titulo       = require('../js/titulos.jsx');

module.exports = React.createClass({
getDefaultProps: function(){
	return{
		clase: 'caja_bloque',
	}
},
render: function () {
      return (      		
      		<div className={this.props.clase}>
				<div className="campos_bloque">
					<ul className="ul_bloque">
						{this.props.children}
					</ul>
				</div>
			</div>
			);  
		}
});



	