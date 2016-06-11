var $ 		 = require('jquery') ;
var React    = require('react') ;
var ReactDOM = require('react-dom') ;
var App    	 = require('../js/app.jsx');
var ApiRestCatalogo  = require('../js/modelos/apirestCatalogos');

$(function() {
			
	appmvc = {};

	appmvc ={
		Catalogos : {},
		Datos  	  : {},
		Forms     : {},
		Menu      : {},
		MenuForms : {},
		Url       : {}
	}


	var url_local = 'http://localhost:8000/'
	//var url_local ='http://192.168.0.15:8000/';
	//var url_local = 'http://107.170.1.182:8000/'

	datosCatalogo = new  ApiRestCatalogo();

	appmvc.Url.API_REST =  url_local;


	appmvc.Menu.PROVEEDORES = 'Proveedores';
	appmvc.Menu.CLIENTES = 'Clientes';
	appmvc.Menu.COMPRAS = 'Compras';
	appmvc.Menu.INVENTARIOS = 'Inventarios';
	appmvc.Menu.VENTAS = 'Ventas';
	appmvc.Menu.COSTOS = 'Costos';
	
	
    
	appmvc.Forms.PROVEEDORES=null;
	appmvc.Forms.CLIENTES=null;
	appmvc.Forms.COMPRAS=null;
	appmvc.Forms.INVENTARIOS=null;
	appmvc.Forms.VENTAS=null;
	appmvc.Forms.COSTOS=null;
	appmvc.MenuForms = {
		 'Proveedores' : appmvc.Forms.PROVEEDORES,
		 'Clientes'	   : appmvc.Forms.CLIENTES,
		 'Compras'	   : appmvc.Forms.COMPRAS,
		 'Inventarios' : appmvc.Forms.INVENTARIOS,
		 'Ventas'      : appmvc.Forms.VENTAS,
		 'Costos'      : appmvc.Forms.COSTOS, 
	};

	appmvc.Catalogos.PAISES = 1;
	appmvc.Catalogos.ESTADOS = 2;
	appmvc.Catalogos.BANCOS = 3;
	appmvc.Catalogos.MONEDAS = 4;
	appmvc.Catalogos.MATERIALES = 5;
	appmvc.Catalogos.PARAMETROS_CALCULOS = 9;

	appmvc.Datos.PAISES = null; 
    datosCatalogo.buscarDetallesPorNumCatalogo(appmvc.Catalogos.PAISES, 
                        function(data){
                            appmvc.Datos.PAISES =  data; 
                                      },
                        function(model,response,options){
                            console.log("hay errores " + response.statusText)
                                      }
                        )

    appmvc.Datos.BANCOS = null; 
    datosCatalogo.buscarDetallesPorNumCatalogo(appmvc.Catalogos.BANCOS, 
                        function(data){
                            appmvc.Datos.BANCOS =  data; 
                                      },
                        function(model,response,options){
                            console.log("hay errores " + response.statusText)
                                      }
                        )

    appmvc.Datos.MONEDAS = null; 
    datosCatalogo.buscarDetallesPorNumCatalogo(appmvc.Catalogos.MONEDAS, 
                        function(data){
                            appmvc.Datos.MONEDAS =  data; 
                                      },
                        function(model,response,options){
                            console.log("hay errores " + response.statusText)
                                      }
                        )
    
    appmvc.Datos.MATERIALES = null; 
    datosCatalogo.buscarDetallesPorNumCatalogo(appmvc.Catalogos.MATERIALES, 
                        function(data){
                            appmvc.Datos.MATERIALES =  data; 
                                      },
                        function(model,response,options){
                            console.log("hay errores " + response.statusText)
                                      }
                        )

	
	ReactDOM.render(<App/>,document.getElementById("app"));
	
  	


});

