var React            = require('react');
var ReactDOM         = require('react-dom');
var Login            = require('../js/login.jsx');

var MenuPrincipal    = require('../js/menuPrincipal.jsx');
var MenuAcciones     = require('../js/menuAcciones.jsx');
var Proveedores      = require('../js/proveedores.jsx');
var Clientes         = require('../js/clientes.jsx');
var Compras          = require('../js/compras.jsx');
//var SeccionUnoInv    = require('../js/tablaYFormula.jsx');  
//var SeccionDosInv    = require('../js/formsDeInventarios.jsx');    
var Ventas           = require('../js/ventas.jsx');  
var ClientesPagos           = require('../js/clientesPagos.jsx');  

var Costos           = require('../js/costos.jsx');            
var Inventarios      = require('../js/inventarioCabecero.jsx');            
var Reportes         = require('../js/reportes.jsx');  
var Page             = require("page");
var Notificaciones   = require('../js/notificaciones');
var $                = require('jquery');
var ApiRestCatalogo  = require('../js/modelos/apirestCatalogos');
var ApiRestCliente   = require('../js/modelos/apirestClientes');
var ApiRestProveedor = require('../js/modelos/apirestProveedores');
var ApiRestCompras   = require('../js/modelos/apirestCompras');
var ApiRestVentas    = require('../js/modelos/apirestVentas');
var ApiRestPagos     = require('../js/modelos/apirestClientesPagos');
var ApiRestPermisos  = require('../js/modelos/apirestPermisos');
var ApiRestCalendarioPagos = require('../js/modelos/apirestClientesPagos');

module.exports = React.createClass({
		getInitialState: function(){
	 	 return {
    	 	 	formMostrar:"",
    	 	 	datosProveedor: {},
    	 	 	datosCliente: {},
    	 	 	datosCompra: {},
          datosInventarios: {},
          datosVentas: {},
          datosCostos: {},
          datosPagos: {},
          actualizarForm: false,
          permiso: false,
          permisos_menu: [],
          aviso_ventas: 0,
          aviso_compras: 0,
     		};
	 	},
		componentWillMount:function(){
      
   		 //Para que self sea this dentro de las funciones de Page
			 var self=this;
	     console.log("se montara");
			 //Rutas del navegador
             Page('/',function(){
                   self.mostrarMenu('');
                 
                 console.log("Estas en el indice");
             });
             Page('/#target-item-3',function(){
                 console.log("Este es el carrusel");
             });

            Page('/logout',function(){
                 appmvc.Forms.REPORTES=null;
                 appmvc.MenuForms["Reportes"] = null;
                 self.setState({permiso: false,formMostrar:""});
                 console.log("Cerrando sesion");
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
                         self.consularAvisosCompras();
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
                        self.consularAvisosCompras();
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

            Page('/ventas',function(){
              self.mostrarMenu(appmvc.Menu.VENTAS);
              console.log("menu de ventas");                    
             });
            Page('/ventas/nuevo',function(){
                self.setState({datosVentas:[],actualizarForm:true});
                console.log("Vas a dar de alta una nueva venta");              
            });
            Page('/ventas/eliminar',function(){
                 $("#notify_info").text("La venta no se puede Eliminar. \r\n para cancelar la venta: \r\n  cambie el status de la venta a cancelado, y guarde los datos.");
                 $("#notify_info").notify();             
            });
            Page('/ventas/guardar',function(){
             // if(self.refs[appmvc.Menu.COMPRAS].hayErrores()){
             //        $("#notify_error").text("Hay errores en algunos campos");
             //        $("#notify_error").notify();
             //        return;
             //  }
              var datosNuevos=  self.refs[appmvc.Menu.VENTAS].nuevosDatos(); 
              var venta = new ApiRestVentas();
             venta.Guardar(datosNuevos,
                    function(datos,response){
                         self.setState({actualizarForm:true});
                         self.setState({datosVentas:datos});
                         self.consularAvisosVentas();
                        $("#notify_success").text("Los datos de la venta fueron guardados con exito");
                        $("#notify_success").notify();
                    },
                    function(model,response,options){
                           $("#notify_error").text(response.responseText);
                           $("#notify_error").notify();
                    });
                console.log("Vas a guardar la venta");              
            });
            Page('/pagos',function(){
              self.mostrarMenu(appmvc.Menu.PAGOS);
              console.log("menu de ventas");                    
             });

            Page('/pagos/guardar',function(){     
             if(self.refs[appmvc.Menu.PAGOS].hayErrores()){
                    $("#notify_error").text("Hay errores en algunos campos");
                    $("#notify_error").notify();
              }
              else{    
                var datosNuevos=  self.refs[appmvc.Menu.PAGOS].nuevosDatos(); 
                var pagos = new ApiRestPagos();    

                pagos.Guardar(datosNuevos,
                    function(datos,response){
                        self.setState({actualizarForm:true});
                         self.consularAvisosVentas();
                        $("#notify_success").text("Los datos fueron guardados con exito");
                        $("#notify_success").notify();
                    },
                    function(model,response,options){
                           $("#notify_error").text(response.responseText);
                           $("#notify_error").notify();
                    });
               }                
            });


            Page('/costos',function(){
              self.mostrarMenu(appmvc.Menu.COSTOS);
              console.log("menu de costos");                    
             });
           Page('/reportes',function(){
               self.mostrarMenu(appmvc.Menu.REPORTES);
              console.log("Estas en el menu de reportes");
              
            });

           Page('/compras_avisos',function(){
              self.mostrarMenu(appmvc.Menu.REPORTES);
              self.refs[appmvc.Menu.REPORTES].onClickReporteCalendarioAduana();
              console.log("menu de compras avisos");                    
             });

          Page('/ventas_avisos',function(){
              self.mostrarMenu(appmvc.Menu.REPORTES);
              self.refs[appmvc.Menu.REPORTES].onClickReporteCalendarioPagos();
              console.log("menu de ventas avisos");                    
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
   componentDidMount: function(){
      localStorage.clear();
      console.log("******** inicia *********")
   },
		mostrarMenu:function(nomform){
        var menu = nomform.toLowerCase();
        if(this.state.permisos_menu.indexOf("*")>=0 || this.state.permisos_menu.indexOf(menu)>=0){
          this.setState({actualizarForm:false});
          this.setState({formMostrar:nomform});
        }
        console.log("Mostrando avisos")
        this.consularAvisosVentas();
        this.consularAvisosCompras()
    },
    consularAvisosVentas: function(){
        var self = this;
        var consulta = new ApiRestCalendarioPagos();
        
        consulta.calendarioAcumuladoPagos( 
            function(data){
              self.setState({aviso_ventas:data[0].total});
      
            },
            function(model,response,options){
              self.setState({aviso_ventas:data[0].total});
            }
          );
    },
    consularAvisosCompras: function(){
        var self = this;
        var consulta = new ApiRestCompras();
  
        consulta.calendarioAcumuladoFechaAduana( 
            function(data){
              self.setState({aviso_compras:data[0].total});
      
            },
            function(model,response,options){
              self.setState({aviso_compras:data[0].total});
            }
          );
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
           if(pk==="-1"){
                 Page.redirect('/compras/nuevo');
                 return
           }
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
    llenarDatosInventario: function(pk){
           var self = this;
           var comp = new ApiRestCompras();
           comp.buscarCompraPorPk(pk, 
                function(data){
                    self.setState({datosInventarios: data[0] });
                    },
                function(model,response,options){
                      self.setState({datosInventarios : [] });
                    }
            );
         }, 
    llenarDatosVenta: function(pk){
           var self = this;
           var venta = new ApiRestVentas();
           valor = venta.buscarVentaPorPk(pk, 
                function(data){
                    self.setState({datosVentas: data[0] });
                    },
                function(model,response,options){
                      self.setState({datosVentas : [] });
                    }
            );


         }, 
    llenarDatosPago: function(pk){
           var self = this;
           var venta = new ApiRestVentas();
           valor = venta.buscarVentaPorPk(pk, 
                function(data){
                    self.setState({datosPagos: data[0] });
                    },
                function(model,response,options){
                      self.setState({datosPagos : [] });
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
      var estilo = 'inline';
      // if(menu === appmvc.Menu.COSTOS){
      //  estilo = 'inline-block';
      // }
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
        this.setState({datosInventarios:[],actualizarForm:true});       
        this.llenarDatosInventario(pk);
      }      
      if(this.state.formMostrar===appmvc.Menu.VENTAS){
        this.setState({datosVentas:[],actualizarForm:true});
        this.llenarDatosVenta(pk);
      }  
     if(this.state.formMostrar===appmvc.Menu.PAGOS){
        this.setState({datosPagos:[],actualizarForm:true});
        this.llenarDatosPago(pk);
      }  
      if(this.state.formMostrar===appmvc.Menu.COSTOdebS){
        this.setState({datosCostos:[],actualizarForm:true});
      }  
      
 		},
    llenarCombos: function(){
        console.log("buscando datos");
    },
    onLogin: function(con_permiso){
      if(con_permiso==true){
        this.cargarCatalogos();
      }
      this.setState({permiso: con_permiso});
      this.permisosMenu();
    },
    cargarCatalogos:function(){
      datosCatalogo = new  ApiRestCatalogo();
      appmvc.Datos.PAISES = null; 
      datosCatalogo.buscarDetallesPorNumCatalogo(appmvc.Catalogos.PAISES, 
                         function(data){
                             appmvc.Datos.PAISES =  data; 
                                       },
                         function(model,response,options){
                             console.log("hay errores " + response.statusText)
                                       }
                         );

      appmvc.Datos.BANCOS = null; 
      datosCatalogo.buscarDetallesPorNumCatalogo(appmvc.Catalogos.BANCOS, 
                          function(data){
                              appmvc.Datos.BANCOS =  data; 
                                        },
                          function(model,response,options){
                              console.log("hay errores " + response.statusText)
                                        }
                          );
  
      appmvc.Datos.MONEDAS = null; 
      datosCatalogo.buscarDetallesPorNumCatalogo(appmvc.Catalogos.MONEDAS, 
                          function(data){
                              appmvc.Datos.MONEDAS =  data; 
                                        },
                          function(model,response,options){
                              console.log("hay errores " + response.statusText)
                                        }
                          );
      
      appmvc.Datos.MATERIALES = null; 
      datosCatalogo.buscarDetallesPorNumCatalogo(appmvc.Catalogos.MATERIALES, 
                          function(data){
                              appmvc.Datos.MATERIALES =  data; 
                                        },
                          function(model,response,options){
                              console.log("hay errores " + response.statusText)
                                        }
                          );
      appmvc.Datos.TIPO_DOCUMENTO = null; 
      datosCatalogo.buscarDetallesPorNumCatalogo(appmvc.Catalogos.TIPO_DOCUMENTO, 
                          function(data){
                              appmvc.Datos.TIPO_DOCUMENTO =  data; 
                                        },
                          function(model,response,options){
                              console.log("hay errores " + response.statusText)
                                        }
                          );
      appmvc.Datos.METODO_PAGO = null; 
      datosCatalogo.buscarDetallesPorNumCatalogo(appmvc.Catalogos.METODO_PAGO, 
                          function(data){
                              appmvc.Datos.METODO_PAGO =  data; 
                                        },
                          function(model,response,options){
                              console.log("hay errores " + response.statusText)
                                        }
                          );
      appmvc.Datos.PERIODO_PAGO = null; 
      datosCatalogo.buscarDetallesPorNumCatalogo(appmvc.Catalogos.PERIODO_PAGO, 
                          function(data){
                              appmvc.Datos.PERIODO_PAGO =  data; 
                                        },
                          function(model,response,options){
                              console.log("hay errores " + response.statusText)
                                        }
                          );
      appmvc.Datos.EMPRESA = null; 
      datosCatalogo.buscarDetallesPorNumCatalogo(appmvc.Catalogos.EMPRESA, 
                          function(data){
                              data.sort((a, b) => Number(a.monto2) - Number(b.monto2));
                              appmvc.Datos.EMPRESA =  data; 
  
                                        },
                          function(model,response,options){
                              console.log("hay errores " + response.statusText)
                                        }
                          );
      
      appmvc.Datos.TIPO_ROLLOS = null; 
      datosCatalogo.buscarDetallesPorNumCatalogo(appmvc.Catalogos.TIPO_ROLLOS, 
                          function(data){
                              appmvc.Datos.TIPO_ROLLOS =  data; 
                                        },
                          function(model,response,options){
                              console.log("hay errores " + response.statusText)
                                        }
                          );
      
        // Avisos
        this.consularAvisosVentas();
        this.consularAvisosCompras()
    },
    permisosMenu:function(){
      var self = this;
        var permiso = new ApiRestPermisos();    

            permiso.permisoAdministrador(
                function(datos,response){
                 self.setState({permisos_menu: datos[0]['permisos']});
                },
                function(model,response,options){
                  self.setState({permisos_menu: []});
                  console.log("no tienes permisos");
                });
     },
		 render: function () {
      //var permisos_menu = this.permisosMenu();
      console.log("Permisos en " + this.state.permisos_menu);

			this.crearFormulario(appmvc.Menu.PROVEEDORES,<Proveedores ref={appmvc.Menu.PROVEEDORES}  datos={this.state.datosProveedor} onClaveSeleccionada={this.onClaveSeleccionada} />);
			this.crearFormulario(appmvc.Menu.CLIENTES,<Clientes  ref={appmvc.Menu.CLIENTES}  datos={this.state.datosCliente} onClaveSeleccionada={this.onClaveSeleccionada} />);		
      this.crearFormulario(appmvc.Menu.COMPRAS,<Compras ref={appmvc.Menu.COMPRAS} datos={this.state.datosCompra} onClaveCompraSeleccionada={this.onClaveSeleccionada} />);
      this.crearFormulario(appmvc.Menu.INVENTARIOS,<Inventarios ref={appmvc.Menu.INVENTARIOS} datos={this.state.datosInventarios} onClaveCompraSeleccionada={this.onClaveSeleccionada} consularAvisosCompras={this.consularAvisosCompras}/>);   
      this.crearFormulario(appmvc.Menu.VENTAS,<Ventas ref={appmvc.Menu.VENTAS} datos={this.state.datosVentas}  onClaveVentaSeleccionada={this.onClaveSeleccionada}/>);
      this.crearFormulario(appmvc.Menu.PAGOS,<ClientesPagos ref={appmvc.Menu.PAGOS} datos={this.state.datosPagos} onClaveVentaSeleccionada={this.onClaveSeleccionada} />);
    
      this.crearFormulario(appmvc.Menu.COSTOS,<Costos ref={appmvc.Menu.COSTOS} datos={this.state.datosCostos}/>);
      this.crearFormulario(appmvc.Menu.REPORTES,<Reportes ref={appmvc.Menu.REPORTES} permisos_menu={this.state.permisos_menu}/>);
 
          var style = {
      margin: "0px",
     padding: "0px"
    };
     var estiloSistema = (this.state.permiso) ? {display: 'inline'} : {display: 'none'};

    // var estiloSistema = (this.state.permiso && this.state.formMostrar === appmvc.Menu.COMPRAS) ? {display:'inline-block'} : estiloSistema;
      
		return (
    <div style={style}>    
    <Login permiso={this.state.permiso} onLogin={this.onLogin}/>
    <div style={estiloSistema}>
  	<header>
  	</header>
  	<MenuPrincipal permisos_menu={this.state.permisos_menu} aviso_ventas={this.state.aviso_ventas} aviso_compras={this.state.aviso_compras}/>
  	<MenuAcciones formActivo = {this.state.formMostrar} onClaveSeleccionada={this.onClaveSeleccionada} />
    <section className="contenido">
  		{appmvc.MenuForms[appmvc.Menu.PROVEEDORES]}
  		{appmvc.MenuForms[appmvc.Menu.CLIENTES]}
  	  {appmvc.MenuForms[appmvc.Menu.COMPRAS]}
      {appmvc.MenuForms[appmvc.Menu.INVENTARIOS]}
      {appmvc.MenuForms[appmvc.Menu.VENTAS]}
      {appmvc.MenuForms[appmvc.Menu.PAGOS]}
      
      {appmvc.MenuForms[appmvc.Menu.REPORTES]}
      {appmvc.MenuForms[appmvc.Menu.COSTOS]}
    </section>
    </div>
  </div>
			);  
		}

	
	});



// function mostrar(estado,reff){
// 	var estilo= estado==="formProveedores" ? 'inline-block' : 'none';
// 	var forma = ReactDOM.findDOMNode(reff);   
// 	forma.style.display=estilo;
// }