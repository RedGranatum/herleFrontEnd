var React         = require('react');
var MenuPrincipal = require('../js/menuPrincipal.jsx');
var MenuAcciones  = require('../js/menuAcciones.jsx');
var Proveedores   = require('../js/proveedores.jsx');

module.exports = React.createClass({
		
		render: function () {
		return (

  <div>
	<header>
	</header>
	<MenuPrincipal/>
	<MenuAcciones/>
	<section className="contenido">
		<Proveedores/>
	</section>
  </div>


			);  
		}

	
	});