var React     =require('react');
var BotonMenu =require('../js/botonMenu.jsx');

module.exports  = React.createClass({
	getDefaultProps: function(){
	return{
		permisos_menu: [],
		aviso_ventas: 0,
		aviso_compras: 0,
		}
	},
	mostraMenu: function(menu,icono,color,avisos){
		if (menu==="logout" || this.props.permisos_menu.indexOf("*")>=0 || this.props.permisos_menu.indexOf(menu)>=0){
			return <BotonMenu colorLink={color} icono={icono} avisos={avisos} tam={"3x"} ruta={"/" + menu}/>;
		}
		return '';
	},
//("compras_avisos",null,"ico_avisos_c")
	render: function () {
			return (
    <nav>
		<ul className="menu">
		    {this.mostraMenu("proveedores","truck","ico_nav",null)} 
		    {this.mostraMenu("clientes","group","ico_nav",null)}
			{this.mostraMenu("compras","shopping-cart","ico_nav",null)} 
			{this.mostraMenu("inventarios","info","ico_nav",null)}  
			{this.mostraMenu("ventas","money","ico_nav",null)}
			{this.mostraMenu("pagos","check-square","ico_nav",null)}
			{this.mostraMenu("costos","dollar","ico_nav",null)}
			{this.mostraMenu("reportes","th","ico_nav",null)}
			{this.mostraMenu("logout","sign-out","ico_logout",null)} 

			{this.mostraMenu("compras_avisos",null,"ico_avisos_c",this.props.aviso_compras)} 
			{this.mostraMenu("ventas_avisos",null,"ico_avisos_v",this.props.aviso_ventas)} 
		</ul>	

	</nav>
			);  
		}
	});
