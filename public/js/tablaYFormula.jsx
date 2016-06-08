var React=require('react');
var TablaInv=require('../js/tabla3.jsx');

module.exports = React.createClass({
funcion: function(nom){
	console.log(nom);
},
render: function () {
  
			return (
     <div>            
		<article className="bloque">
			<div className="bloque_catalogo" id="ampliar_tabla">
				<TablaInv funcion={this.funcion}/>
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
   </div>

			);  
		}
});


