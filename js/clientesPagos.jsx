var React         = require('react');
var ApirestPagos = require('../js/modelos/apirestClientesPagos');

var PagosCabecero = require('../js/clientesPagosCabecero.jsx');
var PagosLista    = require('../js/clientesPagosLista.jsx');


module.exports = React.createClass({
getInitialState: function(){
		return{
			listado_pagos: [],	
		};
},
componentWillReceiveProps: function(nextProps){
	this.num_con = -1;
	if(nextProps.datos.id !== undefined){
		this.onBuscarListaPagos(nextProps.datos.id)
	 }
 	  else{
 	  	this.setState({listado_pagos: []})
  }
},
onBuscarListaPagos: function(venta){
	       var self = this;
	      var datos = new ApirestPagos();
          funcionBusqueda = datos.detallesPagosPorVenta.bind(datos);
          funcionBusqueda(venta,
              function(data){
                 self.setState({listado_pagos: data});
                  
              },
              function(model,response, options) {
                 self.setState({listado_pagos: []});
              }
          );
 },

render: function () {
	   var venta_detalles = (this.props.datos.venta_detalles === undefined) ? [] : this.props.datos.venta_detalles;

      return (      	
		    <div>	
		     	<PagosCabecero datos= {this.props.datos} />
				<PagosLista    listado_pagos = {this.state.listado_pagos} id_venta = {this.props.datos.id}  />
			</div>
			);  
		}
});