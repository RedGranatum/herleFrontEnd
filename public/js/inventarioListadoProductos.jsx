var React=require('react');
var CeldaTabla      = require('../js/celdaTabla.jsx');
var FilaTabla       = require('../js/filaTabla.jsx');

module.exports = React.createClass({

// getInitialState: function(){
// 	return{
// 	};

// },
getDefaultProps: function(){
	return{
		listado_compra: [],
	}
},
onSeleccionFila: function(pk_detalle){
	console.log("Fila " + pk_detalle + " seleccionada")
	var detalleProd = {}
	
	this.props.onSeleccionFila(pk_detalle);
},

render: function () {	
	var self= this;
	var estilo = {cursor:"pointer"};

	var titulosEncabezado=["Id", "Catalogo Mat.","Dsc Material",	"Calibre",	"Ancho",	"Largo",	"Peso (Kgs)",	"Peso (Lbs)",	"No. Rollo",	"Precio"];


	var encabezado=titulosEncabezado.map(function(titulo){
     return (
           <CeldaTabla key={titulo} contenido={titulo} />
     	);
	});

	var listado_detalles = [];
	var i=1;
	this.props.listado_compra.forEach(function(resultado){
		var detalle = []
		detalle.push(<CeldaTabla contenido={resultado.id} key="id"/>);
		detalle.push(<CeldaTabla contenido={resultado.material.descripcion1} key="descripcion1"/>);
		detalle.push(<CeldaTabla contenido={resultado.dsc_material}  key="dsc_material" />);
		detalle.push(<CeldaTabla contenido={resultado.calibre}  key="calibre" />);
		detalle.push(<CeldaTabla contenido={resultado.ancho}  key="ancho" />);
		detalle.push(<CeldaTabla contenido={resultado.largo}  key="largo"/>);
		detalle.push(<CeldaTabla contenido={resultado.peso_kg}  key="peso_kg" />);
		detalle.push(<CeldaTabla contenido={resultado.peso_lb} key="peso_lb" />);
		detalle.push(<CeldaTabla contenido={resultado.num_rollo} key="num_rollo" />);
		detalle.push(<CeldaTabla contenido={resultado.precio}  key="precio"/>);
	    listado_detalles.push(<FilaTabla key={resultado.id} id={resultado.id} childrens={detalle} num_fila={i} estilo={estilo} onSeleccionFila={self.onSeleccionFila}/>)
   		i=i+1;
	})
	return (
			<div className="bloque_catalogo" id="ampliar_tabla">
				<table className="tabla_catalogo" id="tabla">
					<tbody>
					<FilaTabla childrens={encabezado}/>
					{listado_detalles}
					</tbody>
				</table>
			</div>
			);
		}
});