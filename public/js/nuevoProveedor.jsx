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
	
			<div className="bloque_proveedor">
				<div className="titulo_bloque">
					Nuevo Proveedor
				</div>
				<div className="caja_bloque">
					<div className="campos_bloque">
						<ul className="ul_bloque">
							<li className="li_bloque">
								<label className="etiquetas_bloque" for="codigo_p">Código</label>
								<input className="inputs_bloque" type="text" placeholder="Código"/>
								<div className="viñeta">*</div>
								<div className="error_mostrar">mensaje de error del campo</div>
							</li>
							<li className="li_bloque">
								<label className="etiquetas_bloque" for="rfc_p">RFC</label>
								<input className="inputs_bloque" type="text" placeholder="RFC" />
								<div className="viñeta">*</div>
								<div className="error_mostrar">mensaje de error del campo</div>
							</li>
							<li className="li_bloque">
								<label className="etiquetas_bloque" for="nombre_p">Nombre</label>
								<input className="inputs_bloque" type="text" placeholder="Nombre" />
								<div className="viñeta">*</div>
								<div className="error_mostrar">mensaje de error del campo</div>
							</li>
						</ul>
					</div>
					<form enctype="multipart/form-data">
						<ul className="botones_proveedor">
							<li><input type="submit" value="Cancelar" /></li>
							<li><input type="submit" value="Guardar" /></li>
						</ul>
					</form>
				</div>
				<br/>
			</div>	

			);  
		}
});
















			