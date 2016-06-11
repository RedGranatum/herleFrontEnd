var React       = require('react');
var TablaInv	= require('../js/tabla3.jsx');
var DetalleInv  = require('../js/inventarioDetalles.jsx')
var ApiRestCatalogo  = require('../js/modelos/apirestCatalogos');

module.exports = React.createClass({
cargarParametrosCalculo: function(){
	var self = this;
	dicParametros = {};

	datosCatalogo = new  ApiRestCatalogo();
    datosCatalogo.buscarDetallesPorNumCatalogo(appmvc.Catalogos.PARAMETROS_CALCULOS, 
        function(data){
               
        	lista_parametros = data.filter(function(catalogo){
        		var cduParametros = {"0090000":"precio_libra",
        							 "0090001": "factor",
        						 	 "0090002": "factor_impuesto_eu",
        						 	 "0090003": "porc_comercializadora",
        						 	 "0090006": "precio_dolar",
        						 	};
        		if(catalogo.cdu_catalogo in cduParametros){
        			var nom_parametro = cduParametros[catalogo.cdu_catalogo];
        			dicParametros[nom_parametro] = catalogo.monto1;
        		}
        		self.setState({parametros_cal : dicParametros});
        	});

         },
        function(model,response,options){
            self.setState({parametros_cal : {}});
            }
        )
},

//catalogo.cdu_catalogo
//"0090000"
//catalogo.descripcion1
//"Precio Libra en Centavos"
//catalogo.monto1
//"0.2700"

componentWillReceiveProps: function(nuevas_props){
	this.setState({detalle_ind: {}})
	this.cargarParametrosCalculo();
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
		parametros_cal : {},
	}
},
getDefaultProps: function(){
			return{
				 compra_detalles: [],
			}
},
//  var style = {
//       margin: "0px",
//      padding: "0px"
//     };
// 		return (
    
//   <div style={style}
//   'inline-block'
//   display
 render: function () {  
	var cabecero = (JSON.parse(JSON.stringify(this.props.datos))); 
	
	delete cabecero.compra_detalles

   return (
     <div >            
		<article className="bloque">
			<div className="bloque_catalogo" id="ampliar_tabla">
				<TablaInv datos_compra ={this.props.datos} onSeleccionFila={this.onSeleccionFila} />
			</div>
		</article>
		<article className="bloque">
		</article>

	    <DetalleInv detalle={this.state.detalle_ind} cabecero={cabecero} parametros_cal={this.state.parametros_cal}/>
   </div>

			);  
		}
});


