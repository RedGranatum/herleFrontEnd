
var React = require('react');
var VentasCabecero = require('../js/ventasCabecero.jsx');
var VentasListado = require('../js/ventasListado.jsx');
var generarPDF = require('../js/libs/generarPDF.js')

module.exports = React.createClass({
getDefaultProps: function(){
	return{
		datos : []
	};
},
nuevosDatos: function(){
	var datos_cabecero = this.refs["cabecero_ventas"].valoresCabeceroVenta()
	if(datos_cabecero.id>0){
		return datos_cabecero;
	}
	var datos_detalles = this.refs["listado_detalles_ventas"].valoresDetallesVenta()
    datos_cabecero["venta_detalles"] = datos_detalles;
    return datos_cabecero;	
},
  generarPDF: function(){
      var generar = new generarPDF();

      // var nombre = this.state.detalles.nombre + ' ' + this.state.detalles.paterno + ' ' + this.state.detalles.materno;
      // var registro = this.state.detalles.id.toString();
      // generar.nombre = nombre;
      //generar.num_participante = registro;
      generar.generaPDF(this.props.datos);
      console.log("generando pdf");
  },
		render: function () {         
       	   var venta_detalles = (this.props.datos.venta_detalles === undefined) ? [] : this.props.datos.venta_detalles;
		   
		   return(  
		   	<div >
		       	
		        <VentasCabecero datos={this.props.datos} ref="cabecero_ventas" />
				  
		         <VentasListado 
		                listado ={venta_detalles} 
		                id_venta = {this.props.datos.id} 
		                ref="listado_detalles_ventas" 
		                generarPDF={this.generarPDF}/>
            </div>
			);  
		}
});


