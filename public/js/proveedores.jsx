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


module.exports = React.createClass({
	   componentWillReceiveProps: function(nuevas_props){
	   		this.setState({nombre: nuevas_props.datos.nombre});
	   },
		getInitialState: function(){
			return{
				nombre : this.props.datos.nombre,
			};
		},
		manejadorTextoTecleado: function(texto_tecleado){
			this.setState({nombre: texto_tecleado});
		},
		render: function () {
			return (
<article className="bloque" >
			<div className="titulo_bloque">
				Proveedor
			</div>
			<div className="caja_bloque">
				<div className="campos_bloque">
					<ul className="ul_bloque">
						<CajaDeTexto titulo={"Id"}  textoIndicativo={"Id"} />
						<CajaDeTexto titulo={"Nombre"}  textoIndicativo={"Nombre"} valor={ this.state.nombre} onChange ={this.manejadorTextoTecleado} />
						<CajaDeTexto titulo={"Calle"}  textoIndicativo={"Calle"} />
						<CajaDeTexto titulo={"Número"}  textoIndicativo={"Número"} />
						<CajaDeTexto titulo={"Código Postal"} identificador="codigo_postal" textoIndicativo={"Código Postal"} />
						<Combo  titulo={"Estado"} nomCombo={"estado"} children={Estados} />
						<Combo  titulo={"País"} nomCombo={"pais"} children={Paises} />
						<CajaDeTexto titulo={"RFC"} textoIndicativo={"RFC"} />
						<CajaDeTexto titulo={"Teléfono"} textoIndicativo={"Teléfono"} />
						<CajaDeTexto titulo={"e-mail"} textoIndicativo={"e-mail"} caracteresEsp={"[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"}/>
						<li className="li_bloque">
							<label className="etiquetas_bloque" htmlFor="comentarios">Comentarios</label>
							<textarea className="textarea_bloque" name="comentarios" placeholder="Comentarios"></textarea>
						</li>
					</ul>
				</div>


			</div>
		</article>
					);  
		}
	});



