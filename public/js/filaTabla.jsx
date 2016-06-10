var ApiRestCatalogo = require('../js/modelos/apirestCatalogos');
var CajaDeTexto 	= require('../js/cajaDeTexto.jsx');
var Combo 			= require('../js/combo.jsx');
var FuncGenericas   = require('../js/funcionesGenericas')
var OpcionCombo 	= require('../js/opcionCombo.jsx');
var React 			= require('react');
var ReactDOM 		= require('react-dom') ;

module.exports = React.createClass({

   onSeleccionFila:function(){
    this.props.onSeleccionFila(this.props.id);
   },

		render: function () {
    

           return (
	    
					<tr key={this.props.key} onClick={this.onSeleccionFila.bind()} style={this.props.estilo}>
                         {this.props.childrens}
           </tr>

			);  
              
		}
});