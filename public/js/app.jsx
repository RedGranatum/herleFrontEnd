var React         = require('react');
var ReactDOM      = require('react-dom') ;
var MenuPrincipal = require('../js/menuPrincipal.jsx');
var MenuAcciones  = require('../js/menuAcciones.jsx');
var Proveedores   = require('../js/proveedores.jsx');
var Clientes      = require('../js/clientes.jsx');
var Page          = require("page");




module.exports = React.createClass({
		getInitialState: function(){
	 	 return {
	 	 	formMostrar:""
	 		};
	 	},
		componentWillMount:function(){
			 //Para que self sea this dentro de las funciones de Page
			 self=this;

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
             	self.mostrarMenu('');
             });
             Page();
		},
		mostrarMenu:function(nomform){
              this.setState({
              	formMostrar:nomform
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
			   if( appmvc.MenuForms[menu] === undefined ||  appmvc.MenuForms[menu] === null){
               	    appmvc.MenuForms[menu] = componente;
               }
           }
 		},
	
		 render: function () {
				
			this.crearFormulario(appmvc.Menu.PROVEEDORES,<Proveedores ref={appmvc.Menu.PROVEEDORES}/>);
			this.crearFormulario(appmvc.Menu.CLIENTES,<Clientes  ref={appmvc.Menu.CLIENTES}/>)

		return (

  <div>
	<header>
	</header>
	<MenuPrincipal/>
	<MenuAcciones formActivo = {this.state.formMostrar}/>
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