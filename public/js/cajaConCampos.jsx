var React=require('react');
var Titulo       = require('../js/titulos.jsx');

module.exports = React.createClass({

render: function () {
      return (      		
      		<div className="caja_bloque">
				<div className="campos_bloque">
					<ul className="ul_bloque">
						{this.props.children}
					</ul>
				</div>
			</div>
			);  
		}
});



	