var React       = require('react');
var TablaInv	= require('../js/tabla3.jsx');
var DetalleInv  = require('../js/inventarioDetalles.jsx')

module.exports = React.createClass({
componentWillReceiveProps: function(nuevas_props){
	this.setState({detalle_ind: {}})
},
onSeleccionFila: function(detalle){
	this.setState({detalle_ind: detalle})
},
funcion: function(nom){
	console.log(nom);
},
getInitialState: function(){
	return{
		detalle_ind : {},
	}
},
getDefaultProps: function(){
			return{
				 compra_detalles: [],
			}
},
render: function () {  
   return (
     <div>            
		<article className="bloque">
			<div className="bloque_catalogo" id="ampliar_tabla">
				<TablaInv datos_compra ={this.props.datos} onSeleccionFila={this.onSeleccionFila} />
			</div>
		</article>
		<article className="bloque">
		</article>
		<article className="bloque">
			<div className="formula">
				<figure className="formula_foto">
					<p><img src="images/ok.png" alt="" /></p>
				</figure>
				<div className="formula_datos">
					<h3>Valor del kilo en dolar</h3>
					<h3>Valor de tonelada en pesos</h3>
					<h3>Valor del kilo en pesos</h3>
					<h3>Valor final del kilo en pesos</h3>
				</div>
			</div>
		</article>
	    <DetalleInv detalle={this.state.detalle_ind}/>
   </div>

			);  
		}
});


