var React           =require('react');
var BotonMenu       =require('../js/botonMenu.jsx');
var CajaDeBusqueda  =require('../js/cajaDeBusqueda.jsx');
var ListaResultados =require('../js/resultadosLista.jsx');
var RutasApiRest   = require('../js/modelos/rutaApiRest');
var ReactDOM      = require('react-dom');

module.exports = React.createClass({
	 getInitialState: function(){
 	 	return{
 	 		listado:[]
 			};
 		},
 		componentDidMount:function(){
		 	this.rutaBusqueda  = new RutasApiRest();
		},
 		componentWillReceiveProps: function(next_props){

 				this.setState({listado: 
 					(this.props.formActivo !== next_props.formActivo) ? [] : this.state.listado});
 		},
 		manejadorValorBuscado: function(valor_buscado) {
 			   var forma =  ReactDOM.findDOMNode(this.refs.ListaResultadosBusqueda);
    			forma.style.display='block';
  			    this.buscarDatos(this.props.formActivo,valor_buscado);
  		},
  		buscarDatos: function(formulario,valor_buscado){
  				selfAcc= this;
  			    this.seleccionarRuta(formulario,valor_buscado);
  			    this.rutaBusqueda.fetch({
			         success: function(data){
	                      selfAcc.setState({	listado: data.toJSON() });
	                },
    	         	 error: function(model,response, options) {
    	         	 	  selfAcc.setState({	listado:[] });
                          console.log(response.responseText);
        	        }
        	    });
  		},
      
  		seleccionarRuta: function(formulario,valor_buscado){
  			if(formulario === appmvc.Menu.PROVEEDORES){
  				 this.rutaBusqueda.buscarProveedorPorValor(valor_buscado);
  			}
  			if(formulario === appmvc.Menu.CLIENTES){
  				 this.rutaBusqueda.buscarClientesPorValor(valor_buscado);
  			}
  		},
  		onClaveSeleccionada: function(pk){
  			this.props.onClaveSeleccionada(pk);
  			var forma =  ReactDOM.findDOMNode(this.refs.ListaResultadosBusqueda);
  			forma.style.display='none';
  		},
  		onBlurCajaDeBusqueda: function(){
  			var forma =  ReactDOM.findDOMNode(this.refs.ListaResultadosBusqueda);
  			//forma.style.display='none';
  		},
      onClickNuevo: function(event){
        event.preventDefault();
        this.props.onClickNuevo();
      },
		render: function () {
			var indicativo = this.props.formActivo.trim() + "..."
 		    var cajaBusqueda = this.props.formActivo.trim()!=="" ? 
 		    		<CajaDeBusqueda 
 		    			textoIndicativo ={indicativo}
 		    			onValorBuscado  = {this.manejadorValorBuscado}
 		    			onBlur  = {this.onBlurCajaDeBusqueda}
 		    			/> 
 		    		: '';

 		    var resultadosBusqueda  =  (cajaBusqueda !=="") ?  <ListaResultados ref="ListaResultadosBusqueda"	resultados={this.state.listado} onClaveSeleccionada={this.onClaveSeleccionada}/>:[];
        var rutaNuevo = this.props.formActivo.toLowerCase() + "/nuevo";  
        var rutaGuardar = this.props.formActivo.toLowerCase() + "/guardar";  
              
  
    return (
	<div className="caja_acciones">
		<ul className="menu_acciones">
		    <BotonMenu colorLink={"ico_acciones"} icono={"file"} tam={"2x"} ruta= {rutaNuevo}/>
		    <BotonMenu colorLink={"ico_acciones"} icono={"remove"} tam={"2x"}/>
		    <BotonMenu colorLink={"ico_acciones"} icono={"save"} tam={"2x"} ruta={rutaGuardar}/>
		     {cajaBusqueda} 
 		     {resultadosBusqueda}
		</ul>
	
	</div>

			);  
		}
	});
