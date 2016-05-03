var React=require('react');
var BotonMenu=require('../js/botonMenu.jsx');
var CajaDeBusqueda=require('../js/cajaDeBusqueda.jsx');
module.exports = React.createClass({
		
		render: function () {
			return (

	<div className="caja_acciones">
		<ul className="menu_acciones">
		    <BotonMenu colorLink={"ico_acciones"} icono={"file"} tam={"2x"}/>
		    <BotonMenu colorLink={"ico_acciones"} icono={"remove"} tam={"2x"}/>
		    <BotonMenu colorLink={"ico_acciones"} icono={"save"} tam={"2x"}/>
		    <CajaDeBusqueda textoIndicativo={"Proveedor..."}/>
		</ul>
	</div>

			);  
		}
	});
