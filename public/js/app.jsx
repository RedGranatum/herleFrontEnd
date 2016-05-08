var React         = require('react');
var ReactDOM      = require('react-dom');
var MenuPrincipal = require('../js/menuPrincipal.jsx');
var MenuAcciones  = require('../js/menuAcciones.jsx');
var Proveedores   = require('../js/proveedores.jsx');
var Clientes      = require('../js/clientes.jsx');
var Page          = require("page");
var CatalogoApiRest   = require('../js/modelos/catalogoApiRest');
var ProveedorApiRest   = require('../js/modelos/proveedoresApiRest');



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
               this.CalalogoPaises = []

               this.CatalogoApiRest = new CatalogoApiRest();
               this.ProveedorApiRest = new ProveedorApiRest();
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
          buscarPaises: function(formulario,valor_buscado){
          	var self = this;
          	console.log("Numero de pais" + appmvc.Catalogos.PAISES);
			this.CatalogoApiRest.DetallesPorCatalogo(appmvc.Catalogos.PAISES,	
					function(data){
							self.CalalogoPaises =  data;
							},
					function(model,response,options){
							console.log("hay errores " + response.statusText)
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
 			this.llenarDatosProveedor(pk)
 		},

		 render: function () {
            if(this.CalalogoPaises.length===0){this.buscarPaises();}

			this.crearFormulario(appmvc.Menu.PROVEEDORES,<Proveedores ref={appmvc.Menu.PROVEEDORES} paises={this.CalalogoPaises} datos={this.state.datosProveedor}/>);
			this.crearFormulario(appmvc.Menu.CLIENTES,<Clientes  ref={appmvc.Menu.CLIENTES}/>)			

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