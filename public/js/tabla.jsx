var ApiRestCatalogo = require('../js/modelos/apirestCatalogos');
var CajaDeTexto 	= require('../js/cajaDeTexto.jsx');
var Combo 			= require('../js/combo.jsx');
var FuncGenericas   = require('../js/funcionesGenericas')
var OpcionCombo 	= require('../js/opcionCombo.jsx');
var React 			= require('react');
var ReactDOM 		= require('react-dom') ;

module.exports = React.createClass({

		render: function () {

           return (
		      <table className="tabla_catalogo">
		       <tbody>
					<tr>
						<td>Material</td>
						<td>Calibre</td>
						<td>Ancho</td>
						<td>Largo</td>
						<td>Peso (Kgs)</td>
						<td>Peso (Lbs)</td>
						<td>No. Rollo</td>
						<td>Precio</td>
						<td></td>
					</tr>
					<tr>
						<td contenteditable='true'></td>
						<td contenteditable='true'></td>
						<td contenteditable='true'></td>
						<td contenteditable='true'></td>
						<td contenteditable='true'></td>
						<td contenteditable='true'></td>
						<td contenteditable='true'></td>
						<td contenteditable='true'></td>
						<td><a className="guardar_renglon" href="#"><i className="fa fa-plus fa-2x"></i></a></td>
					</tr>
					<tr>
						<td contenteditable='true'></td>
						<td contenteditable='true'></td>
						<td contenteditable='true'></td>
						<td contenteditable='true'></td>
						<td contenteditable='true'></td>
						<td contenteditable='true'></td>
						<td contenteditable='true'></td>
						<td contenteditable='true'></td>
						<td><a className="eliminar_renglon" href="#"><i className="fa fa-remove fa-2x"></i></a></td>
					</tr>
					<tr>
						<td contenteditable='true'></td>
						<td contenteditable='true'></td>
						<td contenteditable='true'></td>
						<td contenteditable='true'></td>
						<td contenteditable='true'></td>
						<td contenteditable='true'></td>
						<td contenteditable='true'></td>
						<td contenteditable='true'></td>
						<td><a className="eliminar_renglon" href="#"><i className="fa fa-remove fa-2x"></i></a></td>
					</tr>
					<tr>
						<td contenteditable='true'></td>
						<td contenteditable='true'></td>
						<td contenteditable='true'></td>
						<td contenteditable='true'></td>
						<td contenteditable='true'></td>
						<td contenteditable='true'></td>
						<td contenteditable='true'></td>
						<td contenteditable='true'></td>
						<td><a className="eliminar_renglon" href="#"><i className="fa fa-remove fa-2x"></i></a></td>
					</tr>
					<tr>
						<td contenteditable='true'></td>
						<td contenteditable='true'></td>
						<td contenteditable='true'></td>
						<td contenteditable='true'></td>
						<td contenteditable='true'></td>
						<td contenteditable='true'></td>
						<td contenteditable='true'></td>
						<td contenteditable='true'></td>
						<td><a className="eliminar_renglon" href="#"><i className="fa fa-remove fa-2x"></i></a></td>
					</tr>
				  </tbody>
				</table>
			);  
		}
});



