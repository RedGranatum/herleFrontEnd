var $=require('jquery') ;
var React = require('react') ;
var ReactDOM = require('react-dom') ;
var App    = require('../js/app.jsx');

$(function() {
			
	appmvc = {};

	appmvc ={
		Componentes: {},
		Modelos:{},
		Colecciones:{}
	}

	ReactDOM.render(<App/>,document.getElementById("app"));
	
   
});

