var React         = require('react');
var MenuPrincipal = require('../js/menuPrincipal.jsx');
var MenuAcciones  = require('../js/menuAcciones.jsx');
var Proveedores   = require('../js/proveedores.jsx');
var Clientes      = require('../js/clientes.jsx');
var Page          = require("page");
module.exports = React.createClass({
		componentDidMount:function(){
             Page('/',function(){
             	console.log("Estas en el indice");
             });

             Page('/proveedores',function(){
             	console.log("Estas en el menu de proveedores");
             });
             Page('/clientes',function(){
             	console.log("Estas en el menu de clientes");
             });
             Page();
		},
		render: function () {
		return (

  <div>
	<header>
	</header>
	<MenuPrincipal/>
	<MenuAcciones/>
	<section className="contenido">
		<Proveedores/>
		<Clientes/>
	</section>
  </div>


			);  
		}

	
	});