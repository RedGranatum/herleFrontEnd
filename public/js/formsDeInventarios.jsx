var React=require('react');

module.exports = React.createClass({

		render: function () {
            return (
            <section className="contenido" id="el_top">
		<article className="bloque">
			<div className="titulo_bloque">
				Producto
			</div>
			<div className="caja_bloque">
				<div className="campos_bloque">
					<ul className="ul_bloque">
						<li className="li_bloque">
							<label className="etiquetas_bloque">Material</label>
							<select name="material_i" className="select_bloque">
								<option value="galvanizado">Galvanizado</option>
								<option value="pintado">Pintado</option>
								<option value="rainbow">Rainbow</option>
								<option value="zintroalum">Zintroalum</option>
							</select>
							<div className="viñeta">*</div>
							<div className="error_ocultar">mensaje de error del campo</div>
						</li>
						<li className="li_bloque">
							<label className="etiquetas_bloque" for="calibre_i">Calibre</label>
							<input className="inputs_bloque" name="calibre_i" type="number" />
							<div className="viñeta">*</div>
							<div className="error_ocultar">mensaje de error del campo</div>
						</li>
						<li className="li_bloque">
							<label className="etiquetas_bloque" for="ancho_i">Ancho</label>
							<input className="inputs_bloque" name="ancho_i" type="number" />
							<div className="viñeta">*</div>
							<div className="error_ocultar">mensaje de error del campo</div>
						</li>
						<li className="li_bloque">
							<label className="etiquetas_bloque" for="largo_i">Largo</label>
							<select name="largo_i" className="select_bloque">
								<option value="0">0</option>
								<option value="10">10</option>
								<option value="12">12</option>
							</select>
							<div className="viñeta">*</div>
							<div className="error_ocultar">mensaje de error del campo</div>
						</li>
					</ul>
				</div>
			</div>
			<div className="titulo_resalta">
				Código Producto
			</div>
			<br/>
			<div className="titulo_bloque">
				Rollo
			</div>
			<div className="caja_bloque">
				<div className="campos_bloque">
					<ul className="ul_bloque">
						<li className="li_bloque">
							<label className="etiquetas_bloque" for="no_rollo">No. Rollo</label>
							<input className="inputs_bloque" type="text" placeholder="No. Rollo" />
							<div className="error_ocultar">mensaje de error del campo</div>
						</li>
						<li className="li_bloque">
							<label className="etiquetas_bloque" for="peso_kgs">Peso (Kgs)</label>
							<input className="inputs_bloque" type="text" placeholder="Peso (Kgs)" />
							<div className="error_ocultar">mensaje de error del campo</div>
						</li>
						<li className="li_bloque">
							<label className="etiquetas_bloque" for="peso_lbs">Peso (Lbs)</label>
							<input className="inputs_bloque" type="text" placeholder="Peso (Lbs)" />
							<div className="error_ocultar">mensaje de error del campo</div>
						</li>
						<li className="li_bloque">
							<label className="etiquetas_bloque" for="transporte">Transporte</label>
							<input className="inputs_bloque" type="text" placeholder="Transporte" />
							<div className="error_ocultar">mensaje de error del campo</div>
						</li>
					</ul>
				</div>
			</div>
		</article>
		<article className="bloque">
			<div className="titulo_bloque">
				Origen Producto
			</div>
			<div className="caja_bloque">
				<div className="campos_bloque">
					<ul className="ul_bloque">
						<li className="li_bloque">
							<label className="etiquetas_bloque" for="pais_p">Origen del producto</label>
							<select name="pais_p" className="select_bloque">
								<option value="mexico_p">México</option>
								<option value="eeuu_p">EEUU</option>
								<option value="china_p">China</option>
							</select>
							<div className="viñeta">*</div>
							<div className="error_ocultar">mensaje de error del campo</div>
						</li>
						<li className="li_bloque">
							<label className="etiquetas_bloque" for="tipo_entrada">Tipo de entrada</label>
							<select name="tipo_entrada" className="select_bloque">
								<option value="no_especificado">NO ESPECIFICADO</option>
								<option value="con_comercializadora">Con Comercializadora</option>
								<option value="sin_comercializadora">Sin Comercializadora</option>
							</select>
							<div className="viñeta">*</div>
							<div className="error_ocultar">mensaje de error del campo</div>
						</li>
					</ul>
				</div>
			</div>
			<br/>
			<div className="titulo_bloque">
				Sin Comercializadora
			</div>
			<div className="caja_bloque">
				<div className="campos_bloque">
					<ul className="ul_bloque">
						<li className="li_bloque">
							<label className="etiquetas_bloque" for="precio_lbs">Precio en libra</label>
							<input className="inputs_bloque" type="text" placeholder="Precio en libra" />
							<div className="viñeta">*</div>
							<div className="error_ocultar">mensaje de error del campo</div>
						</li>
						<li className="li_bloque">
							<label className="etiquetas_bloque" for="factor">Factor</label>
							<input className="inputs_bloque" type="text" placeholder="Factor" />
							<div className="viñeta">*</div>
							<div className="error_ocultar">mensaje de error del campo</div>
						</li>
						<li className="li_bloque">
							<label className="etiquetas_bloque" for="precio_dls">Precio en dolar</label>
							<input className="inputs_bloque" type="text" placeholder="Precio en dolar" />
							<div className="viñeta">*</div>
							<div className="error_ocultar">mensaje de error del campo</div>
						</li>
						<li className="li_bloque">
							<label className="etiquetas_bloque" for="factor_impurto">Factor de impuestos</label>
							<input className="inputs_bloque" type="text" placeholder="Factor de impuestos" />
							<div className="viñeta">*</div>
							<div className="error_ocultar">mensaje de error del campo</div>
						</li>
					</ul>
				</div>
			</div>
			<br/>
			<div className="titulo_bloque">
				Con Comercializadora
			</div>
			<div className="caja_bloque">
				<div className="campos_bloque">
					<ul className="ul_bloque">
						<li className="li_bloque">
							<label className="etiquetas_bloque" for="porcentaje_c">Porcentaje (%)</label>
							<input className="inputs_bloque" type="text" placeholder="Porcentaje de comercializadora" />
							<div className="viñeta">*</div>
							<div className="error_ocultar">mensaje de error del campo</div>
						</li>
					</ul>
				</div>
			</div>
			<br/>
			<div className="titulo_bloque">
				Valor Tonelada En Dolar / 1000
			</div>
			<div className="caja_bloque">
				<div className="campos_bloque">
					<ul className="ul_bloque">
						<li className="li_bloque">
							<label className="etiquetas_bloque" for="factor_k">Factor</label>
							<input className="inputs_bloque" type="text" placeholder="Factor para convertir en kilos" />
							<div className="viñeta">*</div>
							<div className="error_ocultar">mensaje de error del campo</div>
						</li>
					</ul>
				</div>
			</div>
		</article>
		<article className="bloque">
			<div className="titulo_bloque">
				Otros Datos
			</div>
			<div className="caja_bloque">
				<div className="campos_bloque">
					<ul className="ul_bloque">
						<li className="li_bloque">
							<label className="etiquetas_bloque" for="descripcion_i">Descripción</label>
							<textarea className="textarea_bloque" name="descripcion_i" placeholder="Descripción"></textarea>
							<div className="error_ocultar">mensaje de error del campo</div>
						</li>
						<li className="li_bloque">
							<label className="etiquetas_bloque" for="comentarios_i">Comentarios</label>
							<textarea className="textarea_bloque" name="comentarios_i" placeholder="Comentarios"></textarea>
							<div className="error_ocultar">mensaje de error del campo</div>
						</li>
					</ul>
				</div>
			</div>
		</article>
	</section>

			);  
		}
});







