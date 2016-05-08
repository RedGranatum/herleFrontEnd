var React         = require('react');
var ReactDOM      = require('react-dom');
var MenuPrincipal = require('../js/menuPrincipal.jsx');
var MenuAcciones  = require('../js/menuAcciones.jsx');
var Proveedores   = require('../js/proveedores.jsx');
var Clientes      = require('../js/clientes.jsx');
var Page          = require("page");
var RutasApiRest   = require('../js/modelos/rutaApiRest');



module.exports = React.createClass({
		getInitialState: function(){
	 	 return {
	 	 	formMostrar:"",
	 	 	datosProveedor: {nombre: "Juan"},
	 	 	datosCliente : {nombre: "Andres"},
	 	 	actualizarForm: false,
	 		};
	 	},
		componentWillMount:function(){
			 //Para que self sea this dentro de las funciones de Page
			 var self=this;
			 this.rutaBusqueda  = new RutasApiRest();

			 //Rutas del navegador
             Page('/',function(){
                   self.mostrarMenu('');
                 
                 console.log("Estas en el indice");
             });

             Page('/proveedores',function(){
               self.mostrarMenu(appmvc.Menu.PROVEEDORES);
             	console.log("Estas en el menu de proveedores");
              
            });

             Page('/proveedores/:pk',function(ctx){
             	console.log("Buscas un proveedor por la pk :" + (ctx.params.pk) || "no encontrado" )
             	
            });

             Page('/clientes',function(){
             	self.mostrarMenu(appmvc.Menu.CLIENTES);
             	console.log("menu de clientes");                    
             });
             Page('*',function(){
             	console.log("no conosco la ruta");
             	Page.redirect('/');
             	self.mostrarMenu('');
             });

             Page({hashbang:true});

             Page();


               this.mostrarForm();
		},
		componentDidMount: function(){
				console.log("Estoy montandome en el proyecto");
		},
		mostrarMenu:function(nomform){
			//  this.setState({actualizarForm: false});
              this.setState({
              	formMostrar:nomform
             });
          },
         llenarDatosProveedor: function(pk){
         	var self = this;
         	self.setState({actualizarForm: true});
         	 this.rutaBusqueda.buscarProveedorPorPk(pk);
	  			   this.rutaBusqueda.fetch({
				         success: function(data){
				            //  self.setState({datosProveedor:{nombre:"Ana"}});
				              self.setState({datosProveedor: data.toJSON()[0] });
				             // console.log(data.toJSON()[0])
		                },
	    	         	 error: function(model,response, options) {
							 self.setState({datosProveedor:{nombre:"Anita"}});
	    	         	 	  self.setState({datosProveedor : [] });
	                          console.log(response.responseText);
	        	        }
	        	    });
         },

		componentDidUpdate:function(prev_props,prev_state){
               this.mostrarForm();

		},

		mostrarForm:function(){
                 for(var menu in  appmvc.MenuForms){		
                 	estilo = this.mostrar_ocultar_Formulario(menu)
                 	this.aplicar_estilo_Formulario(menu,estilo)
                 }                                                                                           
		},
		mostrar_ocultar_Formulario: function(menu){
			 return (menu === this.state.formMostrar) ? 'inline-block' : 'none';
		},
		aplicar_estilo_Formulario: function(menu, estilo){
			 var forma =  ReactDOM.findDOMNode(this.refs[menu]);
             if(forma!== null){
			        forma.style.display=estilo;
			    }
		},
		crearFormulario: function(menu,componente){

			if (this.state.formMostrar===menu)
			{
			   if(this.state.actualizarForm || appmvc.MenuForms[menu] === undefined ||  appmvc.MenuForms[menu] === null){
	           	    appmvc.MenuForms[menu] = componente;
               }
           }
 		},
 		onClaveSeleccionada: function(pk){
 	
 			//this.setState({actualizarForm:true});
 			console.log("cambiando datos del proveedor");
 			this.llenarDatosProveedor(pk)
 		},

		 render: function () {
		 // 	if (this.state.formMostrar===appmvc.Menu.PROVEEDORES)
			// {
			//    if(this.state.actualizarForm || appmvc.MenuForms[appmvc.Menu.PROVEEDORES] === undefined ||  appmvc.MenuForms[appmvc.Menu.PROVEEDORES] === null){
			//    	 console.log("me rendesriso");
			   	    appmvc.MenuForms[appmvc.Menu.PROVEEDORES] = <Proveedores ref={appmvc.Menu.PROVEEDORES} datos={this.state.datosProveedor}/>;
   //             }
   //         }
           
   //         if (this.state.formMostrar===appmvc.Menu.CLIENTES)
			// {
			//    if(this.state.actualizarForm || appmvc.MenuForms[appmvc.Menu.CLIENTES] === undefined ||  appmvc.MenuForms[appmvc.Menu.CLIENTES] === null){
			   	    appmvc.MenuForms[appmvc.Menu.CLIENTES] = <Clientes ref={appmvc.Menu.CLIENTES}/>;
           //     }
           // }

			//this.crearFormulario(appmvc.Menu.PROVEEDORES,<Proveedores ref={appmvc.Menu.PROVEEDORES} datos={this.state.datosProveedor}/>);
			//this.crearFormulario(appmvc.Menu.CLIENTES,<Clientes  ref={appmvc.Menu.CLIENTES}/>)


			

		return (

  <div>
	<header>
	</header>
	<MenuPrincipal/>
	<MenuAcciones formActivo = {this.state.formMostrar} onClaveSeleccionada={this.onClaveSeleccionada}/>
	<section className="contenido">
		{appmvc.MenuForms[appmvc.Menu.PROVEEDORES]}
		{appmvc.MenuForms[appmvc.Menu.CLIENTES]}
	</section>
  </div>


			);  
		}

	
	});



function mostrar(estado,reff){
	var estilo= estado==="formProveedores" ? 'inline-block' : 'none';
	var forma = ReactDOM.findDOMNode(reff);   
	forma.style.display=estilo;
}