
var React= require('react');
var FilaTabla       = require('../js/filaTabla.jsx');
var CeldaTabla      = require('../js/celdaTabla.jsx');
module.exports = React.createClass({

onSeleccionFila: function(pk_detalle){
  console.log("El detalle es: " + pk_detalle)
   detalle= this.props.datos_compra.compra_detalles.filter(function(detalle){

       if(detalle.id === pk_detalle){
        return(
               detalle
          ); 
      }
  });
  this.props.onSeleccionFila(detalle[0]);

},
render: function () {
var funcion=this.props.funcion;

var titulosEncabezado=["Catalogo Mat.","Dsc Material",	"Calibre",	"Ancho",	"Largo",	"Peso (Kgs)",	"Peso (Lbs)",	"No. Rollo",	"Precio"];


var encabezado=titulosEncabezado.map(function(titulo){
     return (
           <CeldaTabla key={titulo} contenido={titulo} />
     	);
});

styles={
			 cursor:"pointer"
			} 

var self = this;

var listado = this.props.datos_compra.compra_detalles  === undefined ? [] :  this.props.datos_compra.compra_detalles 

var listado_detalles = [];

listado.forEach(function(resultado){
            var detalle =[];
            var catalogo = <CeldaTabla key="a2" contenido={resultado.material.descripcion1}/>
            var material = <CeldaTabla key="a1" contenido={resultado.dsc_material}/>
            var calibre = <CeldaTabla  key="b1"  contenido={resultado.calibre}/>
            var ancho = <CeldaTabla   key="c1"   contenido={resultado.ancho}/>
            var largo = <CeldaTabla  key="d1"  contenido={resultado.largo}/>
            var peso_kg = <CeldaTabla key="e1"    contenido={resultado.peso_kg}/>
            var peso_lb = <CeldaTabla key="f1"    contenido={resultado.peso_lb}/>
            var num_rollo = <CeldaTabla  key="g1" contenido={resultado.num_rollo}/>
            var precio = <CeldaTabla    key="h1"  contenido={resultado.precio}/>

            detalle.push(catalogo)
            detalle.push(material)
            detalle.push(calibre)
            detalle.push(ancho)
            detalle.push(largo)
            detalle.push(peso_kg)
            detalle.push(peso_lb)
            detalle.push(num_rollo)
            detalle.push(precio)
            listado_detalles.push(<FilaTabla key={resultado.id} id={resultado.id} childrens={detalle}  estilo={styles} onSeleccionFila={self.onSeleccionFila}/>)
          });      
		       
      return (
			   <table className="tabla_catalogo" id="tabla_de_inventario_compra">
					<tbody>
					<FilaTabla childrens={encabezado} funcion={funcion}/>
					{listado_detalles}
					</tbody>
				</table>
			);  
		}
});