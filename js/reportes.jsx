var React      = require('react');
var TituloMenu = require('../js/titulos_menu.jsx'); 
var CeldaTabla       = require('../js/celdaTabla.jsx');
var FilaTabla        = require('../js/filaTabla.jsx');
var ApiRestInventario = require('../js/modelos/apirestInventarios');
var ApiRestExistencias = require('../js/modelos/apirestExistencias');


module.exports = React.createClass({
getDefaultProps: function(){
	return{
		clase: 'caja_bloque',
	}
},
getInitialState: function(){
	return {
		lista_inventario: []
	}
},
onClickReporte: function(){
	console.log("Reporte seleccionado")
	this.llenarListaExistencias();
},
// llenarListaClientes: function(){
// 	var self = this;
// 	var Inventario = new ApiRestInventario();
// 	Inventario.listadoInventario(	
// 		function(data){
//    				self.setState({lista_inventario: data });
// 		},
// 		function(model,response,options){
// 				    self.setState({lista_inventario : [] });
// 		}
// 	);
// },
llenarListaExistencias: function(){
	var self = this;
	var existencias = new ApiRestExistencias();
	existencias.buscarExistenciaAgrupadasPorRollo(	
		function(data){
   				self.setState({lista_inventario: data });
		},
		function(model,response,options){
				    self.setState({lista_inventario : [] });
		}
	);
},
render: function () {

	  // producto1 =  {"id": 17,"compra_detalle": 9,"num_rollo": "SD2","codigo_producto": "PAQUETERIA12",
   //      "calibre": "3.000","ancho": "4.00","largo": 12,"peso_kg": "22.67965","peso_lb": "50.00001"}

	  // producto2 =  {"id": 18,"compra_detalle": 10,"num_rollo": "AA33","codigo_producto": "CP11",
   //      "calibre": "13.000","ancho": "14.00","largo": 11,"peso_kg": "12.67965","peso_lb": "150.00001"}
      
   //    lista_productos = []
   //    lista_productos.push(producto1);
   //    lista_productos.push(producto2);
	
	var self= this;
	var estilo = {cursor:"pointer"};

	//var titulosEncabezado=["Id", "Num.Rollo","Codigo Producto",	"Calibre",	"Ancho",	"Largo",	"Peso (Kgs)",	"Peso (Lbs)"];
	var titulosEncabezado=[ "Num.Rollo","Entradas Kg",	"Salida Kg",	"Existencias Kg"];


	var encabezado=titulosEncabezado.map(function(titulo){
     return (
           <CeldaTabla key={titulo} contenido={titulo} />
     	);
	});

	var listado_detalles = [];
	var i=1;
	this.state.lista_inventario.forEach(function(resultado){
		var detalle = []

			// detalle.push(<CeldaTabla contenido={resultado.id} key="id"/>);
			// detalle.push(<CeldaTabla contenido={resultado.num_rollo} key="num_rollo" />);
			// detalle.push(<CeldaTabla contenido={resultado.codigo_producto}  key="codigo_producto" />);
			// detalle.push(<CeldaTabla contenido={resultado.calibre}  key="calibre" />);
			// detalle.push(<CeldaTabla contenido={resultado.ancho}  key="ancho" />);
			// detalle.push(<CeldaTabla contenido={resultado.largo}  key="largo"/>);
			// detalle.push(<CeldaTabla contenido={resultado.peso_kg}  key="peso_kg" />);
			// detalle.push(<CeldaTabla contenido={resultado.peso_lb} key="peso_lb" />);
	
		 //    listado_detalles.push(<FilaTabla key={resultado.id} id={resultado.id} childrens={detalle} num_fila={i} estilo={estilo} onSeleccionFila={self.onSeleccionFila}/>)
	 		detalle.push(<CeldaTabla contenido={resultado.num_rollo} key="num_rollo"/>);
			detalle.push(<CeldaTabla contenido={resultado.entradas_kd} key="entradas_kd" />);
			detalle.push(<CeldaTabla contenido={resultado.salidas_kg}  key="salidas_kg" />);
			detalle.push(<CeldaTabla contenido={resultado.existencia_kg}  key="existencia_kg" />);
		
		     listado_detalles.push(<FilaTabla key={resultado.num_rollo} id={resultado.num_rollo} childrens={detalle} num_fila={i} estilo={estilo} onSeleccionFila={self.onSeleccionFila}/>)
	   		i=i+1;
	})

	  return (      		
			<section className="contenido">
				<article className="caja_lista_reporte">
					<TituloMenu titulo="Inventario" onClick={this.onClickReporte}/>
				</article>
				<article className="bloque">
					<div className="caja_bloque">
						<div className="bloque_catalogo" id="ampliar_tabla">
							<table className="tabla_catalogo">
								<tbody>
								<FilaTabla childrens={encabezado}/>
								{listado_detalles}
								</tbody>
							</table>
						</div>
					</div>
				</article>
			</section>
			);  
		}
});

