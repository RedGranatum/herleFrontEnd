var React     =require('react');
var BotonMenu =require('../js/botonMenu.jsx');


module.exports  = React.createClass({
		
		render: function () {
			return (
    <nav>
		<ul className="menu">
		    <BotonMenu colorLink={"ico_nav"} icono={"truck"} tam={"3x"} ruta={"/proveedores"}/>
		    <BotonMenu colorLink={"ico_nav"} icono={"group"}  tam={"3x"} ruta={"/clientes"}/>
			<BotonMenu colorLink={"ico_nav"} icono={"shopping-cart"}  tam={"3x"} ruta={"/compras"}/>
			<BotonMenu colorLink={"ico_nav"} icono={"dollar"}  tam={"3x"} ruta={"/inventarios"}/>
			<BotonMenu colorLink={"ico_nav"} icono={"money"}  tam={"3x"} ruta={"/ventas"}/>
			<BotonMenu colorLink={"ico_nav"} icono={"info"}  tam={"3x"} ruta={"/costos"}/>
			<BotonMenu colorLink={"ico_nav"} icono={"th"}  tam={"3x"} ruta={"/reportes"}/>
			<BotonMenu colorLink={"ico_logout"} icono={"sign-out"}  tam={"2x"}/>
		</ul>
	</nav>
			);  
		}
	});
