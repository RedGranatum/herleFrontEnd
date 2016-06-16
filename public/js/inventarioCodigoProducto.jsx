var React=require('react');
var ApiRestInventario  		   = require('../js/modelos/apirestInventarios');

module.exports = React.createClass({

getDefaultProps: function(){
	return{
		rango: '0',
		material : '',
		ancho: '0',
		largo: '0',
	}
},
getInitialState: function(){
	return{
		codigo_producto: "",
		}
},
componentWillReceiveProps: function(nextProps) {
	this.calcularCodigoDelProducto(nextProps.rango,nextProps.material,nextProps.ancho,nextProps.largo)
 },
calcularCodigoDelProducto: function(rango,material,ancho,largo){
   var self = this;
   var inv = new ApiRestInventario();
   inv.rango 		= rango;
   inv.cdu_material = material;
   inv.ancho  		= ancho;
   inv.largo        = largo;

   inv.obtenerCodigoDelProducto( 
        function(data){
        		self.setState({codigo_producto:data});
            },
        function(model,response,options){
        		self.setState({codigo_producto:""});
            }
    );
},
render: function () {
    return (
			<div className="titulo_resalta">
				{this.state.codigo_producto}
			</div>
			);  
		}
});

