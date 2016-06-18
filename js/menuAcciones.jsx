var React            = require('react');
var BotonMenu        = require('../js/botonMenu.jsx');
var CajaDeBusqueda   = require('../js/cajaDeBusqueda.jsx');
var ListaResultados  = require('../js/resultadosLista.jsx');
var ReactDOM         = require('react-dom');
var ApiRestCliente   = require('../js/modelos/apirestClientes');
var ApiRestProveedor = require('../js/modelos/apirestProveedores');
var ApirestCompra    = require('../js/modelos/apirestCompras');


module.exports = React.createClass({
	 getInitialState: function(){
 	 	return{
 	 		listado:[]
 			};
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
  		      var self = this;
            var funcionBusqueda ='';
           
            if(formulario === appmvc.Menu.PROVEEDORES){
                  var proveedor = new ApiRestProveedor();
                  //bind(proveedor) le indica que this dentro de la funcion sera el proveedor y no el contexto actual
                  funcionBusqueda = proveedor.buscarProveedorPorValor.bind(proveedor);
            }
            if(formulario === appmvc.Menu.CLIENTES){
                  var cliente = new ApiRestCliente();
                  funcionBusqueda = cliente.buscarClientePorValor.bind(cliente);
            }
            if(formulario === appmvc.Menu.COMPRAS){
                   var compra= new ApirestCompra();
                   funcionBusqueda = compra.buscarCompraPorInvoice.bind(compra);
            }
            if(formulario === appmvc.Menu.INVENTARIOS){
                   var compra= new ApirestCompra();
                   funcionBusqueda = compra.buscarCompraPorInvoice.bind(compra);
            }


            funcionBusqueda(valor_buscado,
                      function(data){
                          self.setState({  listado: data });
                      },
                      function(model,response, options) {
                            self.setState({  listado:[] });
                            console.log(response.responseText);
                      }
                  );
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
        var rutaEliminar = this.props.formActivo.toLowerCase() + "/eliminar";  
        
      var estilo = (this.props.formActivo.trim() !== appmvc.Menu.INVENTARIOS) ? { display: 'inline-block'} : {display: 'none'} ;
  
    return (
<div>
  <div className="caja_busqueda">
  <ul className="menu_busqueda">
      {cajaBusqueda} 
   </ul>
  
      {resultadosBusqueda}
    
  </div>   
	<div className="caja_acciones" >
		<ul className="menu_acciones" style={estilo}>
		    <BotonMenu colorLink={"ico_acciones"} icono={"file"} tam={"2x"} ruta= {rutaNuevo}/>
		    <BotonMenu colorLink={"ico_acciones"} icono={"remove"} tam={"2x"} ruta={rutaEliminar}/>
		    <BotonMenu colorLink={"ico_acciones"} icono={"save"} tam={"2x"} ruta={rutaGuardar}/>
		     
 		     
		</ul>
	
	</div>
</div>
			);  
		}
	});
