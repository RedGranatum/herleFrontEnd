var React=require('react');
var CajaDeTexto=require('../js/cajaDeTexto.jsx');
var OpcionCombo=require('../js/opcionCombo.jsx');
var Combo=require('../js/combo.jsx');

var estados=[
{valor:"estado_de_mexico",titulo:"Estado de México"},
{valor:"distrito_federal",titulo:"Distrito Federal"}
];

var paises=[
{valor:"mexico",titulo:"México"},
{valor:"eeuu",titulo:"EEUU"},
{valor:"china",titulo:"China"}
];

var bancos=[
{valor:"banamex",titulo:"Banamex"},
{valor:"bancomer",titulo:"Bancomer"},
{valor:"banorte",titulo:"Banorte"},
{valor:"hsbc",titulo:"HSBC"}
];



	var Estados = estados.map(function(tupla) {
      return (
        <OpcionCombo valorOpcion={tupla.valor} tituloOpcion={tupla.titulo}/>
       );
    });

    var Paises = paises.map(function(tupla) {
      return (
        <OpcionCombo valorOpcion={tupla.valor} tituloOpcion={tupla.titulo}/>
       );
    });

    var Bancos = bancos.map(function(tupla) {
      return (
        <OpcionCombo valorOpcion={tupla.valor} tituloOpcion={tupla.titulo}/>
       );
    });

module.exports = React.createClass({
		
		render: function () {
			var PROPIEDADES ={};
			return (
<article className="bloque">
			<div className="titulo_bloque">
				Cliente
			</div>
			<div className="caja_bloque">
				<div className="campos_bloque">
					<ul className="ul_bloque">
					    <CajaDeTexto propiedades={PROPIEDADES} textoIndicativo={"Id"} titulo={"Id"} />
						<CajaDeTexto propiedades={PROPIEDADES} textoIndicativo={"RFC"} titulo={"RFC"} />
						<CajaDeTexto propiedades={PROPIEDADES} textoIndicativo={"Nombre"} titulo={"Nombre"} />
						<CajaDeTexto propiedades={PROPIEDADES} textoIndicativo={"Calle"} titulo={"Calle"} />
						<CajaDeTexto propiedades={PROPIEDADES} textoIndicativo={"Número"} titulo={"Número"} />
                        <CajaDeTexto propiedades={PROPIEDADES} textoIndicativo={"Colonia"} titulo={"Colonia"} />
                        <CajaDeTexto propiedades={PROPIEDADES} textoIndicativo={"Código Postal"} titulo={"Código Postal"} />
                        <Combo propiedades={PROPIEDADES}  titulo={"País"} nomCombo={"pais_c"} children={Paises} />
                        <Combo propiedades={PROPIEDADES} titulo={"Estado"} nomCombo={"estado_c"} children={Estados} />
                        <CajaDeTexto propiedades={PROPIEDADES} textoIndicativo={"Teléfono"} titulo={"Teléfono"} />
                        <CajaDeTexto propiedades={PROPIEDADES} textoIndicativo={"e-mail"} caracteresEsp={"[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"} titulo={"e-mail"} />
                        <Combo  propiedades={PROPIEDADES} titulo={"Banco"} nomCombo={"banco_c"} children={Bancos} />
                        <li className="li_bloque">
							<label className="etiquetas_bloque" htmlFor="comentarios_c">Comentarios</label>
							<textarea className="textarea_bloque" name="comentarios_c" placeholder="Comentarios"></textarea>
						</li>  
					</ul>
				</div>
			</div>
		</article>
             
                
			);  
		}
});