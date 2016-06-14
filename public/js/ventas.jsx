
var React= require('react');


module.exports = React.createClass({

		render: function () {
          return(    
           <div>
   <article className="bloque">
			<div className="titulo_bloque">
				Venta
			</div>
			<div className="caja_bloque">
				<div className="campos_bloque">
					<ul className="ul_bloque">
						<li className="li_bloque">
							<label className="etiquetas_bloque" forName="id">Id</label>
							<input className="inputs_bloque" type="text" placeholder="Id" readonly />
							<div className="viñeta">*</div>
							<div className="error_mostrar">mensaje de error del campo</div>
						</li>
						<li className="li_bloque">
							<label className="etiquetas_bloque" forName="fecha_venta">Fecha de venta</label>
							<input id="fecha_venta" className="inputs_bloque" type="text" placeholder="Fecha de venta" />
							<div className="viñeta">*</div>
							<div className="error_mostrar">mensaje de error del campo</div>
						</li>
						<li className="li_bloque">
							<label className="etiquetas_bloque" forName="tipo_documento">Tipo de documento</label>
							<input className="radio_bloque" type="radio" name="factura_remision" value="si" checked="checked" />
							<label forName="factura"><span><span></span></span>Factura</label>
							<input className="radio_bloque" type="radio" name="factura_remision" value="no"/>
							<label forName="remision"><span><span></span></span>Nota de remisión</label>
						</li>
						<li className="li_bloque">
							<label className="etiquetas_bloque" forName="no_documento">No. documento</label>
							<input className="inputs_bloque" type="text" placeholder="No. de documento" />
							<div className="viñeta">*</div>
							<div className="error_mostrar">mensaje de error del campo</div>
						</li>
					</ul>
				</div>
			</div>
			<br/>
			<div className="titulo_bloque">
				Cliente
			</div>
			<div className="caja_bloque">
				<div className="campos_bloque">
					<ul className="ul_bloque">
						<li className="li_bloque">
							<label className="etiquetas_bloque" forName="proveedor">Cliente</label>
							<input className="inputs_bloque" type="text" placeholder="Código, Nombre" />
							<div className="viñeta">*</div>
							<div className="bloque_resultados_proveedor">
								<div className="resultado_proveedor">
									<span className="dsc_resultado_proveedor">Resultado A</span>
								</div>
								<div className="resultado_proveedor">
									<span className="dsc_resultado_proveedor">Resultado B</span>
								</div>
								<div className="resultado_proveedor">
									<span className="dsc_resultado_proveedor">Resultado C</span>
								</div>
								<div className="resultado_proveedor">
									<span className="dsc_resultado_proveedor">Resultado D</span>
								</div>
							</div>
							<div className="error_mostrar">mensaje de error del campo</div>
						</li>
						<li className="li_bloque">
							<label className="etiquetas_bloque" forName="tipo_pago">Tipo de pago</label>
							<select name="tipo_pago" className="select_bloque">
								<option value="mexico_c">Contado</option>
								<option value="eeuu_c">Credito</option>
								<option value="mexico_c">Transferencia</option>
							</select>
							<div className="viñeta">*</div>
							<div className="error_ocultar">mensaje de error del campo</div>
						</li>
						<li className="li_bloque">
							<label className="etiquetas_bloque" forName="max_dias">Max. días pago</label>
							<input className="inputs_bloque" type="text" placeholder="Max. para días del pago" />
							<div className="viñeta">*</div>
							<div className="error_mostrar">mensaje de error del campo</div>
						</li>
						<li className="li_bloque">
							<label className="etiquetas_bloque" forName="banco">Banco</label>
							<input className="inputs_bloque" type="text" placeholder="Banco" readonly />
							<div className="viñeta">*</div>
							<div className="error_mostrar">mensaje de error del campo</div>
						</li>
						<li className="li_bloque">
							<label className="etiquetas_bloque" forName="estatus_venta">Estatus de la venta</label>
							<select name="estatus_venta" className="select_bloque">
								<option value="activa">Activa</option>
								<option value="cancelada">Cancelada</option>
							</select>
							<div className="viñeta">*</div>
							<div className="error_ocultar">mensaje de error del campo</div>
						</li>
					</ul>
				</div>
			</div>
			<div className="titulo_resalta">
				$ Neto Venta
			</div>
		</article>
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
              </div>

			);  
		}
});


