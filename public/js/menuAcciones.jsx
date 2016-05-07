var React           =require('react');
var BotonMenu       =require('../js/botonMenu.jsx');
var CajaDeBusqueda  =require('../js/cajaDeBusqueda.jsx');
var ListaResultados =require('../js/resultadosLista.jsx');
var RutasApiRest   = require('../js/modelos/rutaApiRest');

module.exports = React.createClass({
	 getInitialState: function(){
 	 	return{
 	 		listado:[],		
 			};
 		},
 		componentDidMount:function(){
		 	this.rutaBusqueda  = new RutasApiRest();
		 	console.log("estoy iniciando");
 		},
 		componentWillReceiveProps: function(next_props){

 				this.setState({listado: 
 					(this.props.formActivo !== next_props.formActivo) ? [] : this.state.listado});
 		},
 		manejadorValorBuscado: function(valor_buscado) {
 				console.log("la caja de busqueda esta buscando el valor: " + valor_buscado + "el formulario activo es: " + this.props.formActivo);
  			    this.buscarDatos(this.props.formActivo,valor_buscado);
  		},
  		buscarDatos: function(formulario,valor_buscado){
  				selfAcc= this;
  			    this.seleccionarRuta(formulario,valor_buscado);
  			    this.rutaBusqueda.fetch({
			         success: function(data){
	                      console.log("Datos encontrados ", data);
	                      selfAcc.setState({	listado: data.toJSON() });
	                },
    	         	 error: function(model,response, options) {
    	         	 	  selfAcc.setState({	listado:[] });
                          console.log(response.responseText);
        	        }
        	    });
  		},
  		seleccionarRuta: function(formulario,valor_buscado){
  			if(formulario === "formProveedores"){
  				 this.rutaBusqueda.buscarProveedorPorValor(valor_buscado);
  			}
  			if(formulario === "formClientes"){
  				 this.rutaBusqueda.buscarClientesPorValor(valor_buscado);
  			}
  		},
		render: function () {
			var indicativo = this.props.formActivo.trim().substring(4) + "..."
 		    var cajaBusqueda = this.props.formActivo.trim()!=="" ? 
 		    		<CajaDeBusqueda 
 		    			textoIndicativo ={indicativo}
 		    			onValorBuscado  = {this.manejadorValorBuscado}
 		    			/> 
 		    		: '';

 		    var resultadosBusqueda  =  (cajaBusqueda !=="") ?  <ListaResultados	resultados={this.state.listado} />:'';

		return (
	<div className="caja_acciones">
		<ul className="menu_acciones">
		    <BotonMenu colorLink={"ico_acciones"} icono={"file"} tam={"2x"}/>
		    <BotonMenu colorLink={"ico_acciones"} icono={"remove"} tam={"2x"}/>
		    <BotonMenu colorLink={"ico_acciones"} icono={"save"} tam={"2x"}/>
		     {cajaBusqueda}
 		     {resultadosBusqueda}
		</ul>
	
	</div>

			);  
		}
	});
