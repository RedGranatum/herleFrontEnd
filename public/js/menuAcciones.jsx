var React           =require('react');
var BotonMenu       =require('../js/botonMenu.jsx');
var CajaDeBusqueda  =require('../js/cajaDeBusqueda.jsx');
var ListaResultados =require('../js/resultadosLista.jsx');

var ProveedoresColeccion = require('../js/modelos/proveedorColeccion');

module.exports = React.createClass({
	 getInitialState: function(){
 	 	return{
 	 		listado:[],		
 			};
 		},
   	 componentDidMount:function(){
   	 	    var self = this;
   	 		var ProveedorC = new ProveedoresColeccion()	
          	  ProveedorC.fetch({
			         success: function(data){
	                      self.setState({listado:  data.toJSON()});
	                },
    	         	 error: function(model,response, options) {
                      console.log(response.responseText);
        	        }
        	    });
 		},
		render: function () {
		
		return (
	<div className="caja_acciones">
		<ul className="menu_acciones">
		    <BotonMenu colorLink={"ico_acciones"} icono={"file"} tam={"2x"}/>
		    <BotonMenu colorLink={"ico_acciones"} icono={"remove"} tam={"2x"}/>
		    <BotonMenu colorLink={"ico_acciones"} icono={"save"} tam={"2x"}/>
		    <CajaDeBusqueda textoIndicativo={"Proveedor..."}/>
		</ul>
		<ListaResultados resultados={this.state.listado}/>
	</div>

			);  
		}
	});
