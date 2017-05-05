var React=require('react');
var FuncGenericas       = require('../js/funcionesGenericas')
var Titulo       = require('../js/titulos.jsx');
var ApiRestCompraDetalle  = require('../js/modelos/apirestCompraDetalles');

module.exports = React.createClass({
getDefaultProps: function(){
	return{
		estilo: 'block',
		titulos: {},
		titulos_secundarios: {},
    columnas_decimales: {},
		datos: [],
		id: 'Id',
		columna_cabecero: '',
    id_reporte : 'reporte_tablas_listado',
    solo_reportes: true,
	}
},
getInitialState: function(){
  return {
    listadoFilas: [],
  }
},
llenarFila: function(diccionario, num_fila, son_datos){
	  var self = this;
    func= new FuncGenericas();
	  estilo={background:"#dddddc",fontWeight:"bold",textAlign:"left"};  
    if(Object.keys(self.props.titulos_secundarios).length===0){
      estilo = {background:"#dddddc", textAlign: 'left',}
    } 
    if(num_fila === 'titulo'){
        estilo["background"] = "#b08f88";
    }
	
	var filaInd = []
 	Object.keys(this.props.titulos).forEach(function (titulo) {
    var valor = diccionario[titulo]
    var deci  = self.props.columnas_decimales[titulo]
     if(son_datos === true &&  deci !== undefined && valor!==null && valor >= -99999999999){
        valor = func.redondearValores(valor,deci)
        var estiloFila = {background:"#dddddc",fontWeight:"bold", textAlign: 'right',};
        if(Object.keys(self.props.titulos_secundarios).length===0){
              estiloFila = {background:"#dddddc", textAlign: 'right',}
            }
        filaInd.push(<td key={titulo}  style={estiloFila}>{valor}</td>);
     }
     else
     {
  	    filaInd.push(<td key={titulo}  style={estilo}>{valor}</td>);
     }     
   });
 	
    this.listadoFilas.push(<tr  key={num_fila}> {filaInd} </tr>); 
},
llenarFilaSecundaria: function(diccionario, num_fila, i,son_datos){
	var self = this;
  func= new FuncGenericas();
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
      
        var deci  = self.props.columnas_decimales[titulo]
        estilo["textAlign"]="";
  
    if(son_datos === true &&  deci !== undefined && valor!==null && valor >= -9999999){
        //debugger;   
        //id
        valor = func.redondearValores(valor,deci)
              var estiloFila = {background:"#FFFFFF",textAlign: 'right',};
        filaInd.push(<td key={titulo}  style={estiloFila}>{valor}</td>);
     }
     else
     {
      if(valor === "true" || valor ===true){
          valor ="Si"
       }
        console.log(valor);   
        filaInd.push(<td key={titulo} style={estilo} >{valor}</td>);
        if(self.props.solo_reportes===false && titulo === "inv_num_rollo" ){
          if(diccionario["id"]>0 && valor!== null && valor!= undefined && valor !==""){
            fila = filaInd[0];
            filaInd[0] = <td key={fila.key} style={fila.props.style} onDoubleClick={self.Deshacer.bind(this,diccionario["id"])} >{"Deshacer"}</td>;        
          }
        }
     }  
   });
   		this.listadoFilas.push(<tr  key={num_fila}> {filaInd} </tr>);
},
Deshacer: function(id_det_compra, e){
  console.log("Se va a deshacer el detalle de compra Numero: " + id_det_compra );
  var self = this;
  var compDet = new ApiRestCompraDetalle();
  compDet.Deshacer(id_det_compra,  
                function(datos){
                     self.props.refrescar();
                    },
                function(model,response,options){
                    }
            );
},
llenarTitulos: function(){
	this.llenarFila(this.props.titulos,'titulo');
},
llenarTitulosSecundarios: function(i){
	this.llenarFilaSecundaria(this.props.titulos_secundarios,'tit_secundario',i);
},
llenarDatosSecundarios: function(datos,i){
	this.llenarFilaSecundaria(datos,'datos_sec' + i,0,true);
},


llenarFilaDatos: function(){
    var self = this;
    var num_fila = 1;
    var valor_cabecero_ant = ''
	this.props.datos.forEach(function(datos){
        if(valor_cabecero_ant !==  datos[self.props.columna_cabecero]){ 
       	   self.llenarFila(datos, num_fila,true);
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
        <table className="bloque_tabla" key="tablas"  id={this.props.id_reporte}>
          <tbody>
          {filas}
          </tbody>
        </table>
			);  
		}
});