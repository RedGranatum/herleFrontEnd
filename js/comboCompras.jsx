var React=require('react');
var FuncGenericas   = require('../js/funcionesGenericas');
var OpcionCombo   = require('../js/opcionCombo.jsx');
var Titulo       = require('../js/titulos.jsx');
var ApiRestCompras = require('../js/modelos/apirestCompras');

module.exports = React.createClass({
getDefaultProps: function(){
	return{
		clase: 'caja_bloque',
		estilo: 'block'
	}
},
getInitialState: function(){
  return{
     listado_compras: [],
     claveSeleccionada: "-1",
  }
},
llenarCombos: function(){    
   this.ListaCompras = this.state.listado_compras.map(function(compra) {
       var detalle = compra.invoice + " - " + compra.fec_solicitud;     
       
       return (
             <option key={compra.id} value={compra.id}>{detalle}</option>
             );
         });
},
BuscarComprasSinInventariar: function(){
	   var self = this;
     var combo =self.refs.comboCompras
//     combo.hidden = true
        var compras = new ApiRestCompras();
          funcionBusqueda = compras.buscarComprasNoInventariadas.bind(compras);
          funcionBusqueda(function(data){
                 self.setState({listado_compras: data});  
  //                combo.hidden = false
              },
              function(model,response, options) {
                 self.setState({listado_compras: []});
    //             combo.hidden = false
              }
          );
},
onFocus: function(){
  this.BuscarComprasSinInventariar();
},
onChange: function(valor){
  this.props.onClaveCompraSeleccionada(valor.target.value)
},
render: function () {
    this.llenarCombos();
      var estilo = {display:"none"};
      var opciones = this.ListaCompras;
  return (   
      <li className="li_bloque">   		
         <select ref="comboCompras" name={this.props.id} className="select_bloque" value={this.props.claveSeleccionada}   onFocus={this.onFocus} onChange={this.onChange} >
              <option key={"-1"} value={"-1"} >{"== INVOICE POR VALIDAR =="}</option>
              {opciones}
          </select>
      </li>
		);  
	}
});
