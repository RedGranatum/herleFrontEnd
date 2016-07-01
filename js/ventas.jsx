
var React = require('react');
var VentasCabecero = require('../js/ventasCabecero.jsx');
var VentasListado = require('../js/ventasListado.jsx');

module.exports = React.createClass({
getDefaultProps: function(){
	return{
		datos : []
	};
},
nuevosDatos: function(){
	var datos_cabecero = this.refs["cabecero_ventas"].valoresCabeceroVenta()
	var datos_detalles = this.refs["listado_detalles_ventas"].valoresDetallesVenta()
    datos_cabecero["venta_detalles"] = datos_detalles;
    return datos_cabecero;	
},
		render: function () {       	          
       	          var venta_detalles = (this.props.datos.venta_detalles === undefined) ? [] : this.props.datos.venta_detalles;
		   return(  
		   	<div >
	
		      		<VentasCabecero datos={this.props.datos} ref="cabecero_ventas" />
				  
		            <VentasListado listado ={venta_detalles} id_venta = {this.props.datos.id} ref="listado_detalles_ventas" />
		        
            </div>
			);  
		}
});


