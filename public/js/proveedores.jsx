var React=require('react');
var CajaDeTexto=require('../js/cajaDeTexto.jsx');
var OpcionCombo=require('../js/opcionCombo.jsx');

var estados=[];
estados[
{valor:"estado_de_mexico",titulo:"Estado de México"},
{valor:"distrito_federal",titulo:"Distrito Federal"}
]

	var Estados = estados.map(function(tupla) {
      return (
        <OpcionCombo valorOpcion={tupla.valor} tituloOpcion={tupla.titulo}/>
       );
    });


module.exports = React.createClass({
		
		render: function () {

			return (

<article className="bloque">
			<div className="titulo_bloque">
				Proveedor
			</div>
			<div className="caja_bloque">
				<div className="campos_bloque">
					<ul className="ul_bloque">
						<CajaDeTexto titulo={"Id"}  textoIndicativo={"Id"} />
						<CajaDeTexto titulo={"Nombre"}  textoIndicativo={"Nombre"} />
						<CajaDeTexto titulo={"Calle"}  textoIndicativo={"Calle"} />
						<CajaDeTexto titulo={"Número"}  textoIndicativo={"Número"} />
						<CajaDeTexto titulo={"Código Postal"} identificador="codigo_postal" textoIndicativo={"Código Postal"} />
						<li className="li_bloque">
							<label className="etiquetas_bloque" for="estado">Estado</label>
							<select name="estado"  className="select_bloque">
							    {Estados}
								
							</select>
							<div className="viñeta"></div>
						</li>
						<li className="li_bloque">
							<label className="etiquetas_bloque" for="pais">País</label>
							<select name="pais" className="select_bloque">
							    <OpcionCombo valorOpcion="mexico" tituloOpcion="México"/>
							    <OpcionCombo valorOpcion="eeuu" tituloOpcion="EEUU"/>
							    <OpcionCombo valorOpcion="china" tituloOpcion="China"/>
							</select>
							<div className="viñeta"></div>
						</li>
						<CajaDeTexto titulo={"RFC"} textoIndicativo={"RFC"} />
						<CajaDeTexto titulo={"Teléfono"} textoIndicativo={"Teléfono"} />
						<CajaDeTexto titulo={"e-mail"} textoIndicativo={"e-mail"} caracteresEsp={"[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"}/>
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



