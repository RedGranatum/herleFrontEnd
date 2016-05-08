var $=require('jquery') ;
var React = require('react') ;
var ReactDOM = require('react-dom') ;
var App    = require('../js/app.jsx');

$(function() {
			
	appmvc = {};

	appmvc ={
		Catalogos : {},
		Forms :{},
		Menu: {},
		MenuForms: {},
		Url : {}
	}


	var url_local = 'http://localhost:8000/'

	appmvc.Url.API_REST =  url_local;


	appmvc.Menu.PROVEEDORES = 'Proveedores';
	appmvc.Menu.CLIENTES = 'Clientes';
    
	appmvc.Forms.PROVEEDORES=null;
	appmvc.Forms.CLIENTES=null;
	appmvc.MenuForms = {
		 'Proveedores' : appmvc.Forms.PROVEEDORES,
		 'Clientes':  appmvc.Forms.CLIENTES,
	};

	appmvc.Catalogos.PAISES = 1;
	appmvc.Catalogos.ESTADOS = 2;
	appmvc.Catalogos.BANCOS = 3;
	
	ReactDOM.render(<App/>,document.getElementById("app"));
	
  	


});

