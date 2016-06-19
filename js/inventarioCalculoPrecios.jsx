var React=require('react');
var ApirestInventarioCalculo   = require('../js/modelos/apirestInventarioCalculo');

module.exports = React.createClass({
componentWillReceiveProps: function(nuevas_props){
	this.calcularFormula(nuevas_props);
},
getInitialState: function(){
	return this.valoresDefecto();		
},
valoresDefecto: function(){
	return{
        "kilo_en_pesos" :"0",
        "kilo_en_dolar" : "0",
        "tonelada_en_dolar": "0",
        "kilo_en_pesos_final": "0",
	};
},
calcularFormula: function(propiedades){
	   	var self = this;
	   	var invCal = new ApirestInventarioCalculo();
	   	var valores = propiedades.valores;
	   	invCal.cdu_pais = valores.cdu_pais; 
   		invCal.precio_tonelada_dolar =valores.precio_tonelada_dolar; 
	   	invCal.con_comercializadora = valores.con_comercializadora; 
	  	invCal.precio_libra_centavos = valores.precio_libra_centavos;
	    invCal.factor = valores.factor;
	    invCal.precio_dolar = valores.precio_dolar;
	    invCal.factor_impuesto = valores.factor_impuesto;
	    invCal.porc_comercializadora = valores.porc_comercializadora;

   invCal.obtenerCalculos( 
        function(data){
        		self.setState({
        			kilo_en_pesos : data["kilo_en_pesos"],
        			kilo_en_dolar:data["kilo_en_dolar"],
        			tonelada_en_dolar: data["tonelada_en_dolar"],
        			kilo_en_pesos_final:data["kilo_en_pesos_final"]
        		})
            },
        function(model,response,options){
        		self.setState({
        			kilo_en_pesos : "0",
        			kilo_en_dolar:"0",
        			tonelada_en_dolar:"0",
        			kilo_en_pesos_final: "0"
        		})
            }
    );
 },
 onGuardar: function(){
 	this.props.onGuardar();
 },
render: function () {
	return (
		<article className="bloque">
			<div className="formula">
				<figure className="formula_foto" onClick={this.onGuardar}>
					<p><img src="images/guardar.png" alt="" /></p>
				</figure>
				<div className="formula_datos">
					<h3>Kilo en dolar: {this.state.kilo_en_dolar}</h3>
					<h3>Tonelada en dolar: {this.state.tonelada_en_dolar} </h3>
					<h3>Kilo en pesos: {this.state.kilo_en_pesos}</h3>
					<h3>Kilo en pesos final: {this.state.kilo_en_pesos_final}</h3>
				</div>
			</div>
		</article>
			);
		}
});