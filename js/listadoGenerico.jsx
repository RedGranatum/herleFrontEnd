var React=require('react');
var Titulo       = require('../js/titulos.jsx');

module.exports = React.createClass({
getDefaultProps: function(){
	return{
		estilo: 'block',
		titulos: {},
		datos: [],
		id: 'Id',
	}
},
llenarFila: function(diccionario, num_fila){
	
	estilo={}
    estilo["background"]="#dddddc";
        
    if(num_fila % 2 === 0){
        estilo["background"] = "#FFFFFF";
    }       
    if(num_fila === 'titulo'){
        estilo["background"] = "#b08f88";
    }
	
	var filaInd = []

 	Object.keys(this.props.titulos).forEach(function (titulo) {
 		 filaInd.push(<td key={titulo} contentEditable={false} style={estilo}> {diccionario[titulo]} </td>);
   });
   		this.listadoFilas.push(<tr  key={num_fila}> {filaInd} </tr>);
},
llenarTitulos: function(){
	this.llenarFila(this.props.titulos,'titulo');
},
llenarFilaDatos: function(){
    var self = this;
    var num_fila = 1;
	this.props.datos.forEach(function(datos){
         self.llenarFila(datos, num_fila);
         num_fila+=1;
	});
},
crearListado: function(){
	this.listadoFilas = [];
	this.llenarTitulos();
    this.llenarFilaDatos();
},

render: function () {
     this.crearListado();

     return (      		
           	<table className="tabla_catalogo">
				<tbody>
					{this.listadoFilas}
				</tbody>
			</table>
			);  
		}
});