var app = app || {};

(function () {
	'use strict';
	appmvc.Componentes.menuprincipal = React.createClass({
		
		render: function () {
			return (
    <nav>
		<ul className="menu">
			<li className="li_menu"><a className="ico_nav" href="#"><i className="fa fa-truck fa-3x"></i></a></li>
			<li className="li_menu"><a className="ico_nav" href="#"><i className="fa fa-group fa-3x"></i></a></li>
			<li className="li_menu"><a className="ico_nav" href="#"><i className="fa fa-shopping-cart fa-3x"></i></a></li>
			<li className="li_menu"><a className="ico_nav" href="#"><i className="fa fa-dollar fa-3x"></i></a></li>
			<li className="li_menu"><a className="ico_nav" href="#"><i className="fa fa-money fa-3x"></i></a></li>
			<li className="li_menu"><a className="ico_nav" href="#"><i className="fa fa-info fa-3x"></i></a></li>
			<li className="li_menu"><a className="ico_nav" href="#"><i className="fa fa-th fa-3x"></i></a></li>
			<li className="li_menu"><a className="ico_logout" href=""><i className="fa fa-sign-out fa-2x"></i></a></li>
		</ul>
	</nav>
			);  
		}
	});
})();