var React=require('react');

module.exports = React.createClass({

render: function () {
      return (
      			<article class="bloque">
			<div class="resaltar_titulo_caja">
				Producto
			</div>
			<div class="resaltar_caja_bloque">
				<div class="campos_bloque">
					<ul class="ul_bloque">
						<li class="li_bloque">
							<label class="etiquetas_bloque" for="material_i">Material</label>
							<select name="material_i" class="select_bloque">
								<option value="galvanizado">Galvanizado</option>
								<option value="pintado">Pintado</option>
								<option value="rainbow">Rainbow</option>
								<option value="zintroalum">Zintroalum</option>
							</select>
							<div class="viñeta">*</div>
							<div class="error_ocultar">mensaje de error del campo</div>
						</li>
						<li class="li_bloque">
							<label class="etiquetas_bloque" for="calibre_i">Calibre</label>
							<input class="inputs_bloque" name="calibre_i" type="number" />
							<div class="viñeta">*</div>
							<div class="error_ocultar">mensaje de error del campo</div>
						</li>
						<li class="li_bloque">
							<label class="etiquetas_bloque" for="ancho_i">Ancho</label>
							<input class="inputs_bloque" name="ancho_i" type="number" />
							<div class="viñeta">*</div>
							<div class="error_ocultar">mensaje de error del campo</div>
						</li>
						<li class="li_bloque">
							<label class="etiquetas_bloque" for="largo_i">Largo</label>
							<select name="largo_i" class="select_bloque">
								<option value="0">0</option>
								<option value="10">10</option>
								<option value="12">12</option>
							</select>
							<div class="viñeta">*</div>
							<div class="error_ocultar">mensaje de error del campo</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="titulo_resalta">
				Código Producto
			</div>
			<br>
			<div class="resaltar_titulo_caja">
				Rollo
			</div>
			<div class="resaltar_caja_bloque">
				<div class="campos_bloque">
					<ul class="ul_bloque">
						<li class="li_bloque">
							<label class="etiquetas_bloque" for="no_rollo">No. Rollo</label>
							<input class="inputs_bloque" type="text" placeholder="No. Rollo" />
							<div class="viñeta">*</div>
							<div class="error_ocultar">mensaje de error del campo</div>
						</li>
						<li class="li_bloque">
							<label class="etiquetas_bloque" for="peso_kgs">Peso (Kgs)</label>
							<input class="inputs_bloque" type="text" placeholder="Peso (Kgs)" />
							<div class="viñeta">*</div>
							<div class="error_ocultar">mensaje de error del campo</div>
						</li>
						<li class="li_bloque">
							<label class="etiquetas_bloque" for="peso_lbs">Peso (Lbs)</label>
							<input class="inputs_bloque" type="text" placeholder="Peso (Lbs)" />
							<div class="viñeta">*</div>
							<div class="error_ocultar">mensaje de error del campo</div>
						</li>
						<li class="li_bloque">
							<label class="etiquetas_bloque" for="transporte">Transporte</label>
							<input class="inputs_bloque" type="text" placeholder="Transporte" />
							<div class="viñeta">*</div>
							<div class="error_ocultar">mensaje de error del campo</div>
						</li>
					</ul>
				</div>
			</div>
		</article>

			);  
		}
});

