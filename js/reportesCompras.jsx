var React=require('react');
var Titulo       = require('../js/titulos.jsx');

module.exports = React.createClass({
getDefaultProps: function(){
	return{
		estilo: 'block',
		titulos: {},
		titulos_secundarios: {},
		datos: [],
		id: 'Id',
		columna_cabecero: '',
    id_reporte : 'reporte_tablas_listado',
	}
},
getInitialState: function(){
  return {
    listadoFilas: [],
  }
},
llenarFila: function(diccionario, num_fila){
	
	  estilo={}
    estilo["background"]="#dddddc";
    estilo["fontWeight"] = "bold";   
    // if(num_fila % 2 === 0){
    //     estilo["background"] = "#FFFFFF";
    // }       
    if(num_fila === 'titulo'){
        estilo["background"] = "#b08f88";
    }
	
	var filaInd = []

 	Object.keys(this.props.titulos).forEach(function (titulo) {
 		 filaInd.push(<td key={titulo}  style={estilo}> {diccionario[titulo]} </td>);
   });
 	
           this.listadoFilas.push(<tr  key={num_fila}> {filaInd} </tr>); 
},
llenarFilaSecundaria: function(diccionario, num_fila, i){
	
	estilo={}
   
     estilo["background"]="#FFFFFF";
    
    var filaInd = []
    filaInd.push(<td key={"cabsec_"+ i} style={{background:"#FFFFFF"}}>  </td>);
 	    
    if(num_fila === 'tit_secundario'){
        estilo["background"] = "#DCC1BB";
        num_fila = num_fila + "_" + i;
    }

	
    Object.keys(this.props.titulos_secundarios).forEach(function (titulo) {
         var valor = diccionario[titulo] 
         if(valor === "true" || valor ===true){
         	valor ="Si"
         }
     	 filaInd.push(<td key={titulo}  style={estilo}> {valor} </td>);
   });
   		this.listadoFilas.push(<tr  key={num_fila}> {filaInd} </tr>);
},
llenarTitulos: function(){
	this.llenarFila(this.props.titulos,'titulo');
},
llenarTitulosSecundarios: function(i){
	this.llenarFilaSecundaria(this.props.titulos_secundarios,'tit_secundario',i);
},
llenarDatosSecundarios: function(datos,i){
	this.llenarFilaSecundaria(datos,'datos_sec' + i);
},


llenarFilaDatos: function(){
    var self = this;
    var num_fila = 1;
    var valor_cabecero_ant = ''
	this.props.datos.forEach(function(datos){
        if(valor_cabecero_ant !==  datos[self.props.columna_cabecero]){ 
       	   self.llenarFila(datos, num_fila);
           if(Object.keys(self.props.titulos_secundarios).length>0){
             self.llenarTitulosSecundarios(num_fila);
             self.llenarDatosSecundarios(datos,num_fila);
           }
       }
       else{
          if(Object.keys(self.props.titulos_secundarios).length>0){
           	   self.llenarDatosSecundarios(datos,num_fila);
            }
       }
     valor_cabecero_ant = datos[self.props.columna_cabecero]
         num_fila+=1;
	});
},
crearListado: function(){
	this.listadoFilas = [];
	this.llenarTitulos();
  this.llenarFilaDatos();

},

render: function () {    
     this.crearListado()
//     var filas = (this.props.datos.length > 0) ? this.listadoFilas  : [] ;
     var filas = this.listadoFilas ;

    return (  
        <table className="tabla_catalogo" key="tablas"  id={this.props.id_reporte}>
          <tbody>
          {filas}
          </tbody>
        </table>
			);  
		}
});