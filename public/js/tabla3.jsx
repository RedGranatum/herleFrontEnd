
var React= require('react');
var FilaTabla       = require('../js/filaTabla.jsx');
var CeldaTabla      = require('../js/celdaTabla.jsx');
module.exports = React.createClass({


        render: function () {
var funcion=this.props.funcion;

var titulosEncabezado=["Material",	"Calibre",	"Ancho",	"Largo",	"Peso (Kgs)",	"Peso (Lbs)",	"No. Rollo",	"Precio"];


var encabezado=titulosEncabezado.map(function(titulo){
     return (
           <CeldaTabla key={titulo} contenido={titulo} />
     	);
});

styles={
			 cursor:"pointer"
			} 

var listado=[  
{material:"m1",calibre:"c1",ancho:"a1",largo:"l1",pesok:"k1",pesol:"l1",rollo:"r1",precio:"p1"},
{material:"m2",calibre:"c2",ancho:"a2",largo:"l2",pesok:"k2",pesol:"l2",rollo:"r2",precio:"p2"},
{material:"m3",calibre:"c3",ancho:"a3",largo:"l3",pesok:"k3",pesol:"l3",rollo:"r3",precio:"p3"},
{material:"m4",calibre:"c4",ancho:"a4",largo:"l4",pesok:"k4",pesol:"l4",rollo:"r4",precio:"p4"},
]

var listado_detalles = [];
listado.forEach(function(resultado){
            var detalle =[];
            var material = <CeldaTabla key="a1" contenido={resultado.material}/>
            var calibre = <CeldaTabla  key="b1"  contenido={resultado.calibre}/>
            var ancho = <CeldaTabla   key="c1"   contenido={resultado.ancho}/>
            var largo = <CeldaTabla  key="d1"  contenido={resultado.largo}/>
            var peso_kg = <CeldaTabla key="e1"    contenido={resultado.pesok}/>
            var peso_lb = <CeldaTabla key="f1"    contenido={resultado.pesol}/>
            var num_rollo = <CeldaTabla  key="g1" contenido={resultado.rollo}/>
            var precio = <CeldaTabla    key="h1"  contenido={resultado.precio}/>


            detalle.push(material)
            detalle.push(calibre)
            detalle.push(ancho)
            detalle.push(largo)
            detalle.push(peso_kg)
            detalle.push(peso_lb)
            detalle.push(num_rollo)
            detalle.push(precio)
          


             listado_detalles.push(<FilaTabla key={resultado.id} childrens={detalle}  estilo={styles} funcion={funcion}/>)
          });


            
		
       
            return (
			   <table className="tabla_catalogo" id="tabla">
					<tbody>
					<FilaTabla childrens={encabezado} funcion={funcion}/>
					{listado_detalles}
					</tbody>
				</table>
			);  
		}
});