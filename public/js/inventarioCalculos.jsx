var React=require('react');

module.exports = React.createClass({
getDefaultProps: function(){
	return{
		pais            : "0010000",
	    precio_libra 	: "0.0",
	    factor       	: "0.0",
	    precio_dolar 	: "0.0",
	    impuesto 		: "0.0",
	   	impuesto_china : "0.0",
	    porc_comercializadora: "0.0",
	    precio_tonelada_dolar : '0.0',
		con_comercializadora : 'False'
	}
},
getInitialState: function(){
	return{
		kilo_en_dolar:"0",
		kilo_en_pesos : "0",
		tonelada_en_dolar:"0",
		kilo_en_pesos_final: "0"
    }
  },
calcularFormula: function(propiedades){
	   	var self = this;
	   	var invCal = new ApirestInventarioCalculo();
	   	invCal.cdu_pais =this.props.pais; 
	  	invCal.precio_libra_centavos = this.props.precio_libra;
	    invCal.factor = this.props.factor;
	    invCal.precio_dolar = this.props.precio_dolar;
	    invCal.factor_impuesto = this.props.impuesto;
	    invCal.porc_comercializadora = this.props.porc_comercializadora;
   		invCal.precio_tonelada_dolar = this.props.precio_tonelada_dolar; 
	   	invCal.con_comercializadora = this.props.con_comercializadora; 

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
        			kilo_en_dolar:"0",
        			kilo_en_pesos : "0",
        			tonelada_en_dolar:"0",
        			kilo_en_pesos_final: "0"
        		})
            }
    );
 },
render: function () {
	return (
			<div className="formula">
				<figure className="formula_foto">
					<button><p><img src="images/guardar.png" /></p></button>
				</figure>
				<div className="formula_datos">
					<h3>Kilo en dolar: {this.state.kilo_en_dolar}</h3>
					<h3>Kilo en pesos: {this.state.kilo_en_pesos}</h3>
					<h3>Tonelada en dolar: {this.state.tonelada_en_dolar}</h3>
					<h3>Kilo en pesos final: {this.state.kilo_en_pesos_final}</h3>
				</div>
			</div>
			);
		}
});