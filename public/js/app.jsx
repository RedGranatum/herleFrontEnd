var React         = require('react');
var MenuPrincipal = require('menuPrincipal');
//var MenuAcciones  = require('menuAcciones');
var Proveedores   = require('proveedores');

module.exports = React.createClass({
		
		render: function () {
		return (

  <div>
	<header>
	</header>
	<MenuPrincipal/>
	
	<section className="contenido">
		<Proveedores/>
	</section>
  </div>


			);  
		}

	
	});