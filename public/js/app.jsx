var React         = require('react');
var ReactDOM      = require('react-dom');
var MenuPrincipal = require('../js/menuPrincipal.jsx');
var MenuAcciones  = require('../js/menuAcciones.jsx');
var Proveedores   = require('../js/proveedores.jsx');
var Clientes      = require('../js/clientes.jsx');
var Page          = require("page");
var CatalogoApiRest   = require('../js/modelos/catalogoApiRest');
var ProveedorApiRest   = require('../js/modelos/proveedoresApiRest');
var ClienteApiRest   = require('../js/modelos/clientesApiRest');
var OperacionesApiRest   = require('../js/modelos/operacionesApiRest');
var Notificaciones =require('../js/notificaciones')
var    $               = require('jquery');
var ApiRestProveedor   = require('../js/modelos/apirestProveedores');

module.exports = React.createClass({
		getInitialState: function(){
	 	 return {
	 	 	formMostrar:"",
	 	 	datosProveedor: {},
	 	 	datosCliente : {},
            actualizarForm: false,
     		};
	 	},
		componentWillMount:function(){
		

			 //Para que self sea this dentro de las funciones de Page
			 var self=this;
	
			 //Rutas del navegador
             Page('/',function(){
                   self.mostrarMenu('');
                 
                 console.log("Estas en el indice");
             });

             Page('/proveedores',function(){
               self.mostrarMenu(appmvc.Menu.PROVEEDORES);
             	console.log("Estas en el menu de proveedores");
              
            });
             Page('/proveedores/nuevo',function(){
             	self.setState({actualizarForm:true});
             	self.setState({datosProveedor:[]});
             	console.log("Vas a dar de alta un nuevo proveedor");              
            });
             Page('/proveedores/guardar',function(){             
             	console.log("Vas a guardar un proveedor");
                var datosNuevos=  self.refs[appmvc.Menu.PROVEEDORES].nuevosDatos(); 
                debugger;
                prov = new ApiRestProveedor();    
                prov.Guardar(datosNuevos,
                    function(datos,response){
                        self.setState({actualizarForm:true});
                        self.setState({datosProveedor:datos});
                        $("#notify_success").text("Los datos fueron modificados con exito");
                        $("#notify_success").notify();
                    },
                    function(model,response,options){
                           $("#notify_error").text(response.responseText);
                           $("#notify_error").notify();
                    });
            });
             Page('/clientes',function(){
             	self.mostrarMenu(appmvc.Menu.CLIENTES);
             	console.log("menu de clientes");                    
             });
             Page('/clientes/nuevo',function(){
                self.setState({actualizarForm:true});
                self.setState({datosCliente:[]});
                console.log("Vas a dar de alta un nuevo cliente");              
            });
           Page('/clientes/guardar',function(){             
                console.log("Vas a guardar un cliente");
                var datosNuevos=  self.refs[appmvc.Menu.CLIENTES].nuevosDatos(); 
                nuevoCliente =  new OperacionesApiRest();
                nuevoCliente.set(datosNuevos);
                if(datosNuevos.id >0){
                    
                    nuevoCliente.modificarCliente(datosNuevos.id);

                    nuevoCliente.save(null,{
                        type: 'PUT',
                        success: function(datos,response){
                            console.log("exito");
                             $("#notify_success").text("Los datos fueron modificados con exito");
                             $("#notify_success").notify();
                        },
                         error: function(model,response, options) {
                                 $("#notify_error").text(response.responseText);
                                 $("#notify_error").notify();
                              console.log(response.responseText);
                        }
                    });
                    console.log("Vamos a modificar un proveedor");
                }
                if(datosNuevos.id ===-1){
                    nuevoCliente.nuevoCliente();

                    nuevoCliente.save(null,{
                        type: 'POST',
                        success: function(datos,response){
                             $("#notify_success").text("Nuevo cliente guardado con exito");
                             $("#notify_success").notify();
                        },
                         error: function(model,response, options) {
                              // $("#notify_error").text(response.responseText);
                             // $("#notify_error").notify();
                              console.log(response.responseText);
                                 $("#notify_error").text(response.responseText);
                                 $("#notify_error").notify();
                        }
                    });
                    console.log("Vamos a guardar un nuevo cliente");
                }

                
                //console.log("hay datos nuevos " + datosNuevos);
            });
             Page('*',function(){
             	console.log("no conosco la ruta");
             	Page.redirect('/');
             	self.mostrarMenu('');
             });

             Page({hashbang:true});

             Page();


               this.mostrarForm();
               
               this.CalalogoPaises = [];
               this.CalalogoBancos = [];

               this.CatalogoApiRest = new CatalogoApiRest();
               this.ProveedorApiRest = new ProveedorApiRest();
               this.ClienteApiRest = new ClienteApiRest();
		},
		mostrarMenu:function(nomform){
		    this.setState({actualizarForm:false});
	        this.setState({
              	formMostrar:nomform
             });

          },
         llenarDatosProveedor: function(pk){
         	var self = this;
         	this.ProveedorApiRest.ProveedorPorPk(pk,	
					function(data){
							self.setState({datosProveedor: data[0] });
							},
					function(model,response,options){
	 					    self.setState({datosProveedor : [] });
							console.log("hay errores " + response.statusText)
							}
				);
         },
          llenarDatosCliente: function(pk){
         	var self = this;
         	this.ClienteApiRest.ClientePorPk(pk,	
					function(data){
							self.setState({datosCliente: data[0] });
							},
					function(model,response,options){
	 					    self.setState({datosCliente : [] });
							console.log("hay errores " + response.statusText)
							}
				);
         },
          buscarPaises: function(formulario,valor_buscado){
          	var self = this;
          	this.CatalogoApiRest.DetallesPorCatalogo(appmvc.Catalogos.PAISES,	
					function(data){
							self.CalalogoPaises =  data;
                          
                    		},
					function(model,response,options){
							console.log("hay errores " + response.statusText)
                    		}
				);
      },
        buscarBancos:function(){
        	var self = this;
        	this.CatalogoApiRest.DetallesPorCatalogo(appmvc.Catalogos.BANCOS ,
        		function(data){
                    self.CalalogoBancos=data;      
        		 },
        		 function(model,response,options){
        		 	console.log("hay errores " + response.statusText);
        		 }
        		);
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
			   if(this.state.actualizarForm ===true || appmvc.MenuForms[menu] === undefined ||  appmvc.MenuForms[menu] === null){
	           	    appmvc.MenuForms[menu] = componente;
               }
           }
 		},
 		onClaveSeleccionada: function(pk){ 	
 			this.setState({actualizarForm:true});
 			if( this.state.formMostrar === appmvc.Menu.PROVEEDORES){
 				this.llenarDatosProveedor(pk)
 			}
 			if( this.state.formMostrar === appmvc.Menu.CLIENTES){
 				this.llenarDatosCliente(pk)
 			}
 		},
		 render: function () {
           
           if(this.CalalogoPaises.length===0){this.buscarPaises();}
           if(this.CalalogoBancos.length===0){this.buscarBancos();}

			this.crearFormulario(appmvc.Menu.PROVEEDORES,<Proveedores ref={appmvc.Menu.PROVEEDORES} paises={this.CalalogoPaises} datos={this.state.datosProveedor}/>);
			this.crearFormulario(appmvc.Menu.CLIENTES,<Clientes  ref={appmvc.Menu.CLIENTES} bancos={this.CalalogoBancos} paises={this.CalalogoPaises} datos={this.state.datosCliente}/>)			

		return (

  <div>
	<header>
	</header>
	<MenuPrincipal/>
	<MenuAcciones formActivo = {this.state.formMostrar} onClaveSeleccionada={this.onClaveSeleccionada} />
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