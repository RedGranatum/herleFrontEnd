var React         = require('react');
var ApirestPagos = require('../js/modelos/apirestClientesPagos');

var PagosCabecero = require('../js/clientesPagosCabecero.jsx');
var PagosLista    = require('../js/clientesPagosLista.jsx');
var ListadoVentasAdeudo   = require('../js/comboVentas.jsx');

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
onClaveVentaSeleccionada: function(id_venta){
	this.props.onClaveVentaSeleccionada(id_venta);
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
 hayErrores: function(){
   return this.refs["PagosCabecero"].hayErrores();
 },
 nuevosDatos: function(){
 	return this.refs["PagosCabecero"].nuevosDatos();
 },
render: function () {
	   var venta_detalles = (this.props.datos.venta_detalles === undefined) ? [] : this.props.datos.venta_detalles;
	   var cabecero    = (this.props.datos.id>0) ? <PagosCabecero ref="PagosCabecero" datos= {this.props.datos} /> : '';
	   var lista_pagos = (this.props.datos.id>0) ? <PagosLista    listado_pagos = {this.state.listado_pagos} id_venta = {this.props.datos.id}  /> : '';
      return (      	
		    <div>	
			    <article className="bloque">
				    <ListadoVentasAdeudo name="listado_ventas_adeudo" onClaveVentaSeleccionada={this.onClaveVentaSeleccionada} />
		     		{cabecero}
				</article>	
				   {lista_pagos}
			</div>
			);  
		}
});