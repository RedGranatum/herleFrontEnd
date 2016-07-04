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
    getDefaultProps: function(){
      return{
        estilo: {},
        num_fila: 1,
        cabecero: false,
      }
    },
		render: function () {
          var estilo = this.props.estilo;
          estilo["background"]="#dddddc";
        
          if(this.props.num_fila % 2 === 0){
            estilo["background"] = "#FFFFFF";
          }       
          if(this.props.cabecero === true){
            estilo["background"] = "#b08f88";
          }
          console.log("fila " + this.props.num_fila);
          //  this.props.estilo["cursor"]    
           return (
	    
					<tr key={this.props.key} onClick={this.onSeleccionFila} style={estilo}>
                         {this.props.childrens}
           </tr>

			);  
              
		}
});
