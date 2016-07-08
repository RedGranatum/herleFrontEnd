var React=require('react');
var Titulo       = require('../js/titulos.jsx');

module.exports = React.createClass({
getDefaultProps: function(){
	return{
		estilo: 'block',
		titulos: {},
		datos: [],
	}
},
componentWillMount: function(){
	this.listadoFilas = [];
},
componentDidMount: function(){
	this.crearListado();
},
llenarFila: function(diccionario){
	var filaInd = []
   	
	Object.keys(this.props.titulos).forEach(function (titulo) {
		 filaInd.push(<td contentEditable={false} > {diccionario[titulo]} </td>);
   });
   		this.listadoFilas.push(<tr  style={estilo}> {filaInd} </tr>);
},
llenarTitulos: function(){
	this.llenarFila(this.props.titulos);
}
llenarFilaDatos: function(){
	this.props.datos.forEach(function(datos){
         llenarFila(datos);
	});
},
crearListado: function(){
	this.llenarTitulos();
    this.llenarFilaDatos();
},
render: function () {
     return (      		
           	<table className="tabla_catalogo">
				<tbody>
					{this.listadoFilas}
				</tbody>
			</table>
			);  
		}
});