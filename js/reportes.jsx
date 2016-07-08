var React      = require('react');
var TituloMenu = require('../js/titulos_menu.jsx'); 
var CeldaTabla       = require('../js/celdaTabla.jsx');
var FilaTabla        = require('../js/filaTabla.jsx');
var ApiRestInventario = require('../js/modelos/apirestInventarios');
var ApiRestExistencias = require('../js/modelos/apirestExistencias');
var ListadoGenerico    = require('../js/listadoGenerico.jsx');

module.exports = React.createClass({
getDefaultProps: function(){
	return{
		clase: 'caja_bloque',
	}
},
getInitialState: function(){
	return {
		columna_id: 'Id',
		lista_datos: [],
		titulos_encabezado: {}
	}
},
onClickReporte: function(){
	console.log("Reporte seleccionado")
	this.llenarListaExistencias();
},
llenarListaExistencias: function(){
	var self = this;
	var titulosEncabezado={num_rollo:"Num.Rollo",codigo_producto: "Producto",calibre:"Milesimas",ancho:"Ancho",entradas_kg:"Entradas Kg",salidas_kg:"Salida Kg",existencia_kg:"Existencias Kg"};

	var existencias = new ApiRestExistencias();
	existencias.buscarExistenciaAgrupadasPorRollo(	
		function(data){
   				self.setState({lista_datos: data, titulos_encabezado: titulosEncabezado, columna_id:"num_rollo" });
		},
		function(model,response,options){
				    self.setState({lista_datos : [] , titulos_encabezado: titulosEncabezado, columna_id:"num_rollo" });
		}
	);
},
render: function () {
	var self= this;
	var estilo = {cursor:"pointer"};

 

	  return (      		
			<section className="contenido">
				<article className="caja_lista_reporte">
					<TituloMenu titulo="Inventario" onClick={this.onClickReporte}/>
				</article>
				<article className="bloque">
					<div className="caja_bloque">
						<div className="bloque_catalogo" id="ampliar_tabla">
							<ListadoGenerico id={this.state.columna_id} titulos={this.state.titulos_encabezado} datos={this.state.lista_datos}/>
						</div>
					</div>
				</article>
			</section>
			);  
		}
});

