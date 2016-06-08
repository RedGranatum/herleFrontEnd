var ApiRestCatalogo = require('../js/modelos/apirestCatalogos');
var CajaDeTexto 	= require('../js/cajaDeTexto.jsx');
var Combo 			= require('../js/combo.jsx');
var FuncGenericas   = require('../js/funcionesGenericas')
var OpcionCombo 	= require('../js/opcionCombo.jsx');
var React 			= require('react');
var ReactDOM 		= require('react-dom') ;

module.exports = React.createClass({

   funcion:function(){
    var keyy=this.props.childrens[0].props.contenido;
   
    this.props.funcion(keyy);
   },

		render: function () {
    

           return (
	    
					<tr key={this.props.key} onClick={this.funcion.bind()} style={this.props.estilo}>
                         {this.props.childrens}
                    </tr>

			);  
              
		}
});