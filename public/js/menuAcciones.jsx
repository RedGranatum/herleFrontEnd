var React=require('react');

module.exports = React.createClass({
		
		render: function () {
			return (

	<div className="caja_acciones">
		<ul className="menu_acciones">
			<li><a className="ico_acciones" href="#"><i className="fa fa-file fa-2x"></i></a></li>
			<li><a className="ico_acciones" href="#"><i className="fa fa-remove fa-2x"></i></a></li>
			<li><a className="ico_acciones" href="#"><i className="fa fa-save fa-2x"></i></a></li>
			<li><input type="text" placeholder="Proveedor..." className="buscar"/></li>
		</ul>
	</div>

			);  
		}
	});
