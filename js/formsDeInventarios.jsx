var React=require('react');
var Combo 	    	= require('../js/combo.jsx');
var FuncGenericas   = require('../js/funcionesGenericas');
var OpcionCombo 	= require('../js/opcionCombo.jsx');

var materiales=[
  {valor:"galvanizado",titulo:"Galvanizado"},
  {valor:"pintado",titulo:"Pintadooooo"},
  {valor:"rainbow",titulo:"Rainbow"},
  {valor:"zintroalum",titulo:"Zintroalum"},
]

var materialesOptions=materiales.map(function(mat){
    return (  <OpcionCombo valorOpcion={mat.valor} tituloOpcion={mat.titulo}/> );
});
//debugger;
var func = new FuncGenericas();
            //this.errors = this.errors || {};
           //  this.validadarCampos();
           // console.log(this.errors);
	        //var dic1 =                      ["id",      "titulo",      "textoIndicativo" ,    "valor",             "onChange"      , "onBlur"				 , "error"];
			//var CODIGO   = func.zipCol(dic1,["codigo",  "Código",        "Código",        this.state.codigo,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.codigo ]);
			//var NOMBRE   = func.zipCol(dic1,["nombre",  "Nombre", 	     "Nombre", 		  this.state.nombre,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.nombre ] );
			//var CALLE    = func.zipCol(dic1,["calle",   "Calle",  	     "Calle",	      this.state.calle ,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.calle ]);
			//var NUMERO   = func.zipCol(dic1,["numero",  "Número", 	     "Número",  	  this.state.numero,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.numero ]);
			//var COLONIA  = func.zipCol(dic1,["colonia", "Colonia",       "Colonia",       this.state.colonia,   this.onValorCambio , this.onBlurCaja,  this.state.errores.colonia ]);
			//var CP       = func.zipCol(dic1,["cp",      "Código Postal", "codigo_postal", this.state.cp ,      this.onValorCambio  , this.onBlurCaja,  this.state.errores.cp ]);
			//var RFC      = func.zipCol(dic1,["rfc",     "RFC",           "RFC",			  this.state.rfc ,     this.onValorCambio  , this.onBlurCaja,  this.state.errores.rfc ]);
			//var TELEFONO = func.zipCol(dic1,["telefono","Teléfono",      "Teléfono",	  this.state.telefono, this.onValorCambio  , this.onBlurCaja,  this.state.errores.telefono ]);
		    //var EMAIL    = func.zipCol(dic1,["email",   "e-mail",        "e-mail",		  this.state.email,    this.onValorCambio  , this.onBlurCaja,  this.state.errores.email ]);

    	    var dic2           =                      ["id",       "titulo",   "children" , "seleccionado"             ];
		   	var MATERIALES     = func.zipCol(dic2,["material_i",     "Material",    materialesOptions, materialesOptions[1].props.valorOpcion        ]);



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
						<Combo propiedades={MATERIALES} key={"materiales"}/>
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







