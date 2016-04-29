var app = app || {};

(function () {
	'use strict';
	appmvc.Componentes.proveedores = React.createClass({
		
		render: function () {
			return (

<article className="bloque">
			<div className="titulo_bloque">
				Proveedor
			</div>
			<div className="caja_bloque">
				<div className="campos_bloque">
					<ul className="ul_bloque">
						<li className="li_bloque">
							<label className="etiquetas_bloque" for="id_proveedor">Id</label>
							<input className="inputs_bloque" type="text" placeholder="Id"/>
							<div className="viñeta"></div>
						</li>
						<li className="li_bloque">
							<label className="etiquetas_bloque" for="nombre_proveedor">Nombre</label>
							<input className="inputs_bloque" type="text" placeholder="Nombre" />
							<div className="viñeta"></div>
						</li>
						<li className="li_bloque">
							<label className="etiquetas_bloque" for="calle">Calle</label>
							<input className="inputs_bloque" type="text" placeholder="Calle" />
							<div className="viñeta"></div>
						</li>
						<li className="li_bloque">
							<label className="etiquetas_bloque" for="numero">Número</label>
							<input className="inputs_bloque" type="text" placeholder="Número" />
							<div className="viñeta"></div>
						</li>
						<li className="li_bloque">
							<label className="etiquetas_bloque" for="codigo_postal">Código Postal</label>
							<input className="inputs_bloque" type="text" placeholder="Código Postal" />
							<div className="viñeta"></div>
						</li>
						<li className="li_bloque">
							<label className="etiquetas_bloque" for="estado">Estado</label>
							<select name="estado" className="select_bloque">
								<option value="estado_de_mexico">Estado de México</option>
								<option value="distrito_federal">Distrito Federal</option>
							</select>
							<div className="viñeta"></div>
						</li>
						<li className="li_bloque">
							<label className="etiquetas_bloque" for="pais">País</label>
							<select name="pais" className="select_bloque">
								<option value="mexico">México</option>
								<option value="eeuu">EEUU</option>
								<option value="china">China</option>
							</select>
							<div className="viñeta"></div>
						</li>
						<li className="li_bloque">
							<label className="etiquetas_bloque" for="rfc">RFC</label>
							<input className="inputs_bloque" type="text" placeholder="RFC" />
							<div className="viñeta"></div>
						</li>
						<li className="li_bloque">
							<label className="etiquetas_bloque" for="telefono">Teléfono</label>
							<input className="inputs_bloque" type="text" placeholder="Teléfono" />
							<div className="viñeta"></div>
						</li>
						<li className="li_bloque">
							<label className="etiquetas_bloque" for="e-mail">e-mail</label>
							<input className="inputs_bloque" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" placeholder="e-mail" />
							<div className="viñeta"></div>
						</li>
						<li className="li_bloque">
							<label className="etiquetas_bloque" for="comentarios">Comentarios</label>
							<textarea className="textarea_bloque" name="comentarios" placeholder="Comentarios"></textarea>
						</li>
					</ul>
				</div>
			</div>
		</article>
					);  
		}
	});
})();