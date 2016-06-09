var React            = require('react');
var ReactDOM         = require('react-dom');
var MenuPrincipal    = require('../js/menuPrincipal.jsx');
var MenuAcciones     = require('../js/menuAcciones.jsx');
var Proveedores      = require('../js/proveedores.jsx');
var Clientes         = require('../js/clientes.jsx');
var Compras          = require('../js/compras.jsx');
var SeccionUnoInv    = require('../js/tablaYFormula.jsx');  
var SeccionDosInv    = require('../js/formsDeInventarios.jsx');    
var Ventas           = require('../js/ventas.jsx');               
var Page             = require("page");
var Notificaciones   = require('../js/notificaciones');
var $                = require('jquery');
var ApiRestCatalogo  = require('../js/modelos/apirestCatalogos');
var ApiRestCliente   = require('../js/modelos/apirestClientes');
var ApiRestProveedor = require('../js/modelos/apirestProveedores');
var ApiRestCompras   = require('../js/modelos/apirestCompras');
 


module.exports = React.createClass({
		getInitialState: function(){
	 	 return {
    	 	 	formMostrar:"",
    	 	 	datosProveedor: {},
    	 	 	datosCliente: {},
    	 	 	datosCompra: {},
          datosInventarios: {},
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
              
              $("#notify_success").text("Los datos fueron modificados con exito");

              if(self.refs[appmvc.Menu.PROVEEDORES].hayErrores()){
                    $("#notify_error").text("Hay errores en algunos campos");
                    $("#notify_error").notify();
              }
              else{
                var datosNuevos=  self.refs[appmvc.Menu.PROVEEDORES].nuevosDatos(); 
                var prov = new ApiRestProveedor();    
                prov.Guardar(datosNuevos,
                    function(datos,response){
                      self.setState({actualizarForm:true});
                      self.setState({datosProveedor:[]});
                        $("#notify_success").text("Los datos fueron modificados con exito");
                        $("#notify_success").notify();
                    },
                    function(model,response,options){
                           $("#notify_error").text(response.responseText);
                           $("#notify_error").notify();
                    });
              }
            });
            Page('/proveedores/eliminar',function(){     
                var proveedor = new ApiRestProveedor();   
                 var datosNuevos=  self.refs[appmvc.Menu.PROVEEDORES].nuevosDatos();  
                  proveedor.Eliminar(datosNuevos.id,
                    function(model,response){
                        self.setState({actualizarForm:true});
                        self.setState({datosProveedor:[]});
                        $("#notify_success").text("Los datos del proveedor fueron eliminados con exito");
                        $("#notify_success").notify();
                    },
                    function(model,response,options){
                        $("#notify_error").text("No se puede eliminar el proveedor");
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
             if(self.refs[appmvc.Menu.CLIENTES].hayErrores()){
                    $("#notify_error").text("Hay errores en algunos campos");
                    $("#notify_error").notify();
              }
              else{    
                var datosNuevos=  self.refs[appmvc.Menu.CLIENTES].nuevosDatos(); 
                var cliente = new ApiRestCliente();    
                cliente.Guardar(datosNuevos,
                    function(datos,response){
                        self.setState({actualizarForm:true});
                        self.setState({datosCliente:datos});
                        $("#notify_success").text("Los datos fueron modificados con exito");
                        $("#notify_success").notify();
                    },
                    function(model,response,options){
                           $("#notify_error").text(response.responseText);
                           $("#notify_error").notify();
                    });
                }                
            });
              Page('/clientes/eliminar',function(){     
                var cliente = new ApiRestCliente();   
                 var datosNuevos=  self.refs[appmvc.Menu.CLIENTES].nuevosDatos();  
                  cliente.Eliminar(datosNuevos.id,
                    function(model,response){
                        self.setState({actualizarForm:true});
                        self.setState({datosCliente:[]});
                        $("#notify_success").text("Los datos del cliente fueron eliminados con exito");
                        $("#notify_success").notify();
                    },
                    function(model,response,options){
                        $("#notify_error").text("No se puede eliminar el cliente");
                        $("#notify_error").notify();
                   });
                         
            });

           Page('/compras',function(){
              self.mostrarMenu(appmvc.Menu.COMPRAS);
              console.log("menu de compras");                    
             });
            Page('/compras/nuevo',function(){
                self.setState({datosCompra:[],actualizarForm:true});
                console.log("Vas a dar de alta una nueva compra");              
            });
            Page('/compras/guardar',function(){
             if(self.refs[appmvc.Menu.COMPRAS].hayErrores()){
                    $("#notify_error").text("Hay errores en algunos campos");
                    $("#notify_error").notify();
                    return;
              }

              var datosNuevos=  self.refs[appmvc.Menu.COMPRAS].nuevosDatos(); 
              var compra = new ApiRestCompras();
             
             compra.Guardar(datosNuevos,
                    function(datos,response){
                         self.setState({actualizarForm:true});
                         self.setState({datosCompra:datos});
                        $("#notify_success").text("Los datos fueron modificados con exito");
                        $("#notify_success").notify();
                    },
                    function(model,response,options){
                           $("#notify_error").text(response.responseText);
                           $("#notify_error").notify();
                    });
                console.log("Vas a guardar la compra");              
            });
            Page('/compras/eliminar',function(){

              var compra = new ApiRestCompras();
              
              compra.Eliminar(21,
                    function(datos,response){
                         //self.setState({actualizarForm:true});
                         //self.setState({datosCompra:datos});
                        $("#notify_success").text("Los datos fueron modificados con exito");
                        $("#notify_success").notify();
                    },
                    function(model,response,options){
                           $("#notify_error").text(response.responseText);
                           $("#notify_error").notify();
                    });
                console.log("Vas a eliminar la compra");              
            });
           
            Page('/inventarios',function(){
              self.mostrarMenu(appmvc.Menu.INVENTARIOS);
              console.log("menu de inventarios");                    
             });
      

             Page('*',function(){
             	console.log("no conosco la ruta");
             	Page.redirect('/');
             	self.mostrarMenu('');
             });

             Page({hashbang:true});

             Page();

               this.mostrarForm();
               
              // this.CalalogoPaises = [];
               this.CalalogoBancos = [];

		},
  
		mostrarMenu:function(nomform){
         this.setState({actualizarForm:false});
          this.setState({formMostrar:nomform});
    },
    llenarDatosProveedor: function(pk){
         	 var self = this;
           var prov = new ApiRestProveedor();
           prov.buscarProveedorPorPk(pk,	
      					function(data){
      			   				self.setState({datosProveedor: data[0] });
      							},
      					function(model,response,options){
      	 					    self.setState({datosProveedor : [] });
      							}
				    );
         },

    llenarDatosCliente: function(pk){
            var self = this;
            var cliente = new ApiRestCliente();
            cliente.buscarClientePorPk(pk,  
                function(data){
                      self.setState({datosCliente: data[0] });
                    },
                function(model,response,options){
                      self.setState({datosCliente : [] });
                    }
            );
         },
    llenarDatosCompra: function(pk){
           var self = this;
           var comp = new ApiRestCompras();
           comp.buscarCompraPorPk(pk,	
      					function(data){
      							self.setState({datosCompra: data[0] });
      							},
      					function(model,response,options){
      	 					    self.setState({datosCompra : [] });
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
      var estilo = 'inline-block';
      if(menu === appmvc.Menu.COMPRAS){
       estilo = 'inline';
      }
			 return (menu === this.state.formMostrar) ? estilo : 'none';
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
 			if(this.state.formMostrar===appmvc.Menu.COMPRAS){
        this.setState({datosCompra:[],actualizarForm:true});
 				this.llenarDatosCompra(pk);
 			}
      if(this.state.formMostrar===appmvc.Menu.INVENTARIOS){
        this.setState({datosCompra:[],actualizarForm:true});
      }      
 		},
    llenarCombos: function(){
        console.log("buscando datos");
    },
		 render: function () {
			this.crearFormulario(appmvc.Menu.PROVEEDORES,<Proveedores ref={appmvc.Menu.PROVEEDORES}  datos={this.state.datosProveedor}/>);
			this.crearFormulario(appmvc.Menu.CLIENTES,<Clientes  ref={appmvc.Menu.CLIENTES}  datos={this.state.datosCliente}/>);		
      this.crearFormulario(appmvc.Menu.COMPRAS,<Compras ref={appmvc.Menu.COMPRAS} datos={this.state.datosCompra} />);
      this.crearFormulario(appmvc.Menu.INVENTARIOS,<SeccionUnoInv ref={appmvc.Menu.INVENTARIOS} datos={this.state.datosInventarios} />);   
      
          var style = {
      margin: "0px",
     padding: "0px"
    };
		return (
    
  <div style={style}>
	<header>
	</header>
	<MenuPrincipal/>
	<MenuAcciones formActivo = {this.state.formMostrar} onClaveSeleccionada={this.onClaveSeleccionada} />
	<section className="contenido">
		{appmvc.MenuForms[appmvc.Menu.PROVEEDORES]}
		{appmvc.MenuForms[appmvc.Menu.CLIENTES]}
	  {appmvc.MenuForms[appmvc.Menu.COMPRAS]}
    {appmvc.MenuForms[appmvc.Menu.INVENTARIOS]}
    <Ventas/>
	</section>
  
  </div>


			);  
		}

	
	});



// function mostrar(estado,reff){
// 	var estilo= estado==="formProveedores" ? 'inline-block' : 'none';
// 	var forma = ReactDOM.findDOMNode(reff);   
// 	forma.style.display=estilo;
// }