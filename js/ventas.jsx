
var React = require('react');
var VentasCabecero = require('../js/ventasCabecero.jsx');
var VentasDetalles = require('../js/ventasDetalles.jsx');

module.exports = React.createClass({
getDefaultProps: function(){
	return{
		datos : []
	};
},
		render: function () {
       
		   return(  
		   	<div >
	
		      		<VentasCabecero datos={this.props.datos}/>
		
		   
		            <VentasDetalles/>
		        
            </div>
			);  
		}
});


