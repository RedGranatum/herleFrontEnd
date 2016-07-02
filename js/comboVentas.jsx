var React=require('react');
var FuncGenericas   = require('../js/funcionesGenericas');
var OpcionCombo   = require('../js/opcionCombo.jsx');
var Titulo       = require('../js/titulos.jsx');
var ApiRestPagos = require('../js/modelos/apirestClientesPagos');

module.exports = React.createClass({
getDefaultProps: function(){
	return{
		clase: 'caja_bloque',
		estilo: 'block'
	}
},
getInitialState: function(){
  return{
     listado_ventas: [],
     claveSeleccionada: "-1",
  }
},
llenarCombos: function(){    
   this.ListaVentas = this.state.listado_ventas.map(function(venta) {
       var detalle = venta.ventas__num_documento;     
       
       return (
             <option key={venta.ventas} value={venta.ventas}>{detalle}</option>
             );
         });
},
BuscarVentasConAdeudo: function(){
	   var self = this;
	      var pagos = new ApiRestPagos();
          funcionBusqueda = pagos.ventasConAdeudos.bind(pagos);
          funcionBusqueda(function(data){
                 self.setState({listado_ventas: data});          
              },
              function(model,response, options) {
                 self.setState({listado_ventas: []});
              }
          );
},
onFocus: function(){
  this.BuscarVentasConAdeudo();
},
onChange: function(valor){
  this.props.onClaveVentaSeleccionada(valor.target.value)
},
render: function () {
    this.llenarCombos();
  return (   
      <li className="li_bloque">   		
         <select name={this.props.id} className="select_bloque" value={this.props.claveSeleccionada}   onFocus={this.onFocus} onChange={this.onChange}>
          <option key={"-1"} value={"-1"}>{"== VENTAS CON ADEUDOS =="}</option>
           {this.ListaVentas}
          </select>
      </li>
		);  
	}
});
