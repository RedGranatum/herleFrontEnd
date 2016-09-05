var React     =require('react');
var BotonMenu =require('../js/botonMenu.jsx');

module.exports  = React.createClass({
	getDefaultProps: function(){
	return{
		permisos_menu: [],
		}
	},
	mostraMenu: function(menu,icono,color){
		if (menu==="logout" || this.props.permisos_menu.indexOf("*")>=0 || this.props.permisos_menu.indexOf(menu)>=0){
			return <BotonMenu colorLink={color} icono={icono} tam={"3x"} ruta={"/" + menu}/>;
		}
		return '';
	},
	render: function () {
			return (
    <nav>
		<ul className="menu">
		    {this.mostraMenu("proveedores","truck","ico_nav")} 
		    {this.mostraMenu("clientes","group","ico_nav")}
			{this.mostraMenu("compras","shopping-cart","ico_nav")} 
			{this.mostraMenu("inventarios","info","ico_nav")}  
			{this.mostraMenu("ventas","money","ico_nav")}
			{this.mostraMenu("pagos","check-square","ico_nav")}
			{this.mostraMenu("costos","dollar","ico_nav")}
			{this.mostraMenu("reportes","th","ico_nav")}
			{this.mostraMenu("logout","sign-out","ico_logout")} 
		</ul>
	</nav>
			);  
		}
	});
