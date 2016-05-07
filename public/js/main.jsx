var $=require('jquery') ;
var React = require('react') ;
var ReactDOM = require('react-dom') ;
var App    = require('../js/app.jsx');

$(function() {
			
	appmvc = {};

	appmvc ={
		Forms :{},
		Menu: {},
		MenuForms: {},
	}

	appmvc.Menu.PROVEEDORES = 'Proveedores';
	appmvc.Menu.CLIENTES = 'Clientes';
    
	appmvc.Forms.PROVEEDORES=null;
	appmvc.Forms.CLIENTES=null;
	appmvc.MenuForms = {
		 'Proveedores' : appmvc.Forms.PROVEEDORES,
		 'Clientes':  appmvc.Forms.CLIENTES,
	};

	ReactDOM.render(<App/>,document.getElementById("app"));
	
  
});

