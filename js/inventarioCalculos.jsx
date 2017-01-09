var React=require('react');
var FuncGenericas       = require('../js/funcionesGenericas')
var ApirestInventarioCalculo   = require('../js/modelos/apirestInventarioCalculo');

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
componentDidUpdate: function( prevProps, prevState ) {
	if( (prevProps.pais !== this.props.pais  || prevProps.con_comercializadora != this.props.con_comercializadora)
		|| 
	       (prevProps.precio_libra != this.props.precio_libra
		|| prevProps.factor != this.props.factor
		|| prevProps.precio_dolar != this.props.precio_dolar
		|| prevProps.impuesto != this.props.impuesto
		|| prevProps.impuesto_china != this.props.impuesto_china
		|| prevProps.porc_comercializadora != this.props.porc_comercializadora
		|| prevProps.precio_tonelada_dolar != this.props.precio_tonelada_dolar)){
			this.calcularFormula();
	}
},
calcularFormula: function(){
	   	var self = this;
	   	var impuesto = this.props.pais === "0010002" ? this.props.impuesto_china : this.props.impuesto;

	   	var invCal = new ApirestInventarioCalculo();
	   	invCal.cdu_pais =this.props.pais; 
	  	invCal.precio_libra_centavos = this.props.precio_libra;
	    invCal.factor = this.props.factor;
	    invCal.precio_dolar = this.props.precio_dolar;
	    invCal.factor_impuesto = impuesto;
	    invCal.porc_comercializadora = this.props.porc_comercializadora;
   		invCal.precio_tonelada_dolar = this.props.precio_tonelada_dolar; 
	   	invCal.con_comercializadora = this.props.con_comercializadora; 

   invCal.obtenerCalculos( 
        function(data){
        		self.setState({
        			kilo_en_dolar:data["kilo_en_dolar"],
        			kilo_en_pesos : data["kilo_en_pesos"],
        			tonelada_en_dolar: data["tonelada_en_dolar"],
        			kilo_en_pesos_final:data["kilo_en_pesos_final"]
        		})
            },
        function(model,response,options){
        		self.setState(this.getInitialState())
            }
    );
 },
 onGuardar: function(){
 	console.log("guardara los parametros");
 	this.props.onGuardar();
 },
 redondear: function(valor){
 	return func.redondearValores(valor,4);
 },
render: function () {
     estiloFila = {textAlign: 'right',}
         
	return (
			<div className="formula">
				<figure className="formula_foto">
					<button  onClick={this.onGuardar}><p><img src="images/guardar.png" /></p></button>
				</figure>
				<div className="formula_datos">
					<h3>Libra en dolar:      {this.redondear(this.state.kilo_en_dolar)} </h3>
					<h3>Kilo  en pesos:      {this.state.kilo_en_pesos}</h3>
					<h3>Tonelada en dolar:   {this.redondear(this.state.tonelada_en_dolar)}</h3>
					<h3>Kilo en pesos final: {this.state.kilo_en_pesos_final}</h3>
				</div>
			</div>
			);
		}
});