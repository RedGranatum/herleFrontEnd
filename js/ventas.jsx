
var React = require('react');
var VentasCabecero = require('../js/ventasCabecero.jsx');
var VentasListado = require('../js/ventasListado.jsx');

module.exports = React.createClass({
getDefaultProps: function(){
	return{
		datos : []
	};
},
		render: function () {       	          
       	          var venta_detalles = (this.props.datos.venta_detalles === undefined) ? [] : this.props.datos.venta_detalles;
		   return(  
		   	<div >
	
		      		<VentasCabecero datos={this.props.datos}/>
				  
		            <VentasListado listado ={venta_detalles}/>
		        
            </div>
			);  
		}
});


