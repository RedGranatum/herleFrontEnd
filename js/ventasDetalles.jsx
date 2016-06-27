
var React = require('react');



module.exports = React.createClass({

		render: function () {

		   return(  
		   	     <article className="bloque">
	          <div className="bloque_catalogo" id="ampliar_tabla">
				<table className="tabla_catalogo">
					<tr>
						<td>No. Rollo</td>
						<td>Familia del producto</td>
						<td>Existencia (Kgs)</td>
						<td>Venta (Kgs)</td>
						<td>Precio neto</td>
						<td></td>
					</tr>
					<tr>
						<td><input type="text" className="caja_grid"/></td>
						<td><label className="etiqueta_grid">Código de producto</label></td>
						<td><label className="etiqueta_grid">14000</label></td>
						<td><input type="text" className="caja_grid"/></td>
						<td><input type="text" className="caja_grid"/></td>
						<td><button className="guardar_renglon"><i className="fa fa-plus fa-2x"></i></button></td>
					</tr>
					<tr>
						<td><input type="text" className="caja_grid"/></td>
						<td><label className="etiqueta_grid">Código de producto</label></td>
						<td><label className="etiqueta_grid">25000</label></td>
						<td><input type="text" className="caja_grid"/></td>
						<td><input type="text" className="caja_grid"/></td>
						<td><button className="eliminar_renglon"><i className="fa fa-remove fa-2x"></i></button></td>
					</tr>
					<tr>
						<td><input type="text" className="caja_grid"/></td>
						<td><label className="etiqueta_grid">Código de producto</label></td>
						<td><label className="etiqueta_grid">32000</label></td>
						<td><input type="text" className="caja_grid"/></td>
						<td><input type="text" className="caja_grid"/></td>
						<td><button className="eliminar_renglon"><i className="fa fa-remove fa-2x"></i></button></td>
					</tr>
				</table>
				<div className="error_mostrar_grid">mensaje de error del campo</div>
			</div>		
            </article>
			);  
		}
});