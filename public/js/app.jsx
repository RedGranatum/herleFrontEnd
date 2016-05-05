var React         = require('react');
var ReactDOM      = require('react-dom') ;
var MenuPrincipal = require('../js/menuPrincipal.jsx');
var MenuAcciones  = require('../js/menuAcciones.jsx');
var Proveedores   = require('../js/proveedores.jsx');
var Clientes      = require('../js/clientes.jsx');
var Page          = require("page");

var FORM_PROVEEDORES='formProveedores';
var FORM_CLIENTES='formClientes';

var FORMULARIOS=[FORM_PROVEEDORES,FORM_CLIENTES];

module.exports = React.createClass({
		getInitialState: function(){
	 	 return {
	 	 	formMostrar:""
	 		};
	 	},
		componentWillMount:function(){
			 this.formProveedores=null;
			 this.formClientes=null;
			 self=this;
             Page('/',function(){
                 console.log("Estas en el indice");
             });

             Page('/proveedores',function(){
             	console.log("Estas en el menu de proveedores");
                self.llamar(FORM_PROVEEDORES);
            
              //  var forma2 = ReactDOM.findDOMNode(self.refs.formClientes);   
              //  forma2.style.display='none';

             });
             Page('/clientes',function(){
             	console.log("Estas en el menu de clientes");
             	self.llamar(FORM_CLIENTES);
          
             //   var forma2 = ReactDOM.findDOMNode(self.refs.formClientes);   
              //  forma2.style.display='block';
             });
             Page();
		},
		componentDidUpdate:function(prev_props,prev_state){
              console.log("se actualizo el componente",this.state.formMostrar);

               this.mostrarForm();

		},
		llamar:function(nomform){
              this.setState({
              	formMostrar:nomform
              });

             
		},
		mostrarForm:function(){
                 
                  for (var i=0;i<FORMULARIOS.length;i++){
                       var estilo=(FORMULARIOS[i]===this.state.formMostrar) ? 'inline-block' : 'none';
                       var forma1 = ReactDOM.findDOMNode(this.refs[FORMULARIOS[i]]);   
			           forma1.style.display=estilo;
                       
                  }
	                                                                                                          
		},
		render: function () {
			
			if((this.formProveedores===undefined || this.formProveedores===null) && (this.state.formMostrar===FORM_PROVEEDORES)){
				this.formProveedores=<Proveedores ref={FORM_PROVEEDORES}/>;
			}
			if((this.formClientes===undefined || this.formClientes===null) && (this.state.formMostrar===FORM_CLIENTES)){
				this.formClientes=<Clientes  ref={FORM_CLIENTES}/>;
			}
		return (

  <div>
	<header>
	</header>
	<MenuPrincipal/>
	<MenuAcciones/>
	<section className="contenido">
		{this.formProveedores}
		{this.formClientes}
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