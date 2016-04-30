var React=require('react');

module.exports = React.createClass({
		
		render: function () {
			var MenuPrincipal= appmvc.Componentes.menuprincipal;
			var MenuAcciones= appmvc.Componentes.menuacciones;
			var Proveedores= appmvc.Componentes.proveedores;
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