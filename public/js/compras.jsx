var ApiRestCatalogo = require('../js/modelos/apirestCatalogos');
var CajaDeTexto 	= require('../js/cajaDeTexto.jsx');
var Combo 			= require('../js/combo.jsx');
var FuncGenericas   = require('../js/funcionesGenericas')
var OpcionCombo 	= require('../js/opcionCombo.jsx');
var Tabla 	= require('../js/tabla.jsx');
var React 			= require('react');
var ReactDOM 		= require('react-dom') ;

var statusCom=[
  {val:"activa",tit:"Activa"},
  {val:"cancelada",tit:"Cancelada"}
];

var statuss=statusCom.map(function(stat){
   return (<OpcionCombo valorOpcion={stat.val} tituloOpcion={stat.tit}/>)

});

module.exports = React.createClass({
		onValorCambio: function(){

		},
		render: function () {
			func = new FuncGenericas();
			
	        var dic1 =                               ["id",          "titulo",      "textoIndicativo" ,    "valor",          "onChange"     ];
			var INVOICE         = func.zipCol(dic1,["invoice",       "Invoice",       "Invoice",            "" ,           this.onValorCambio]);
            var PROVEEDOR       = func.zipCol(dic1,["proveedor",    "Proveedor",       "Proveedor",        "" ,       this.onValorCambio]);
            var FECHASOLICITUD  = func.zipCol(dic1,["fechSol",     "Fecha Solicitud",  "Fecha Solicitud",  "" ,  this.onValorCambio]);
            var FECHAADUANA     = func.zipCol(dic1,["fecha_adu",     "Fecha Aduana",  "Fecha Aduana",  "" ,  this.onValorCambio]);
            var FECHAINVENTARIO = func.zipCol(dic1,["fecha_inv",     "Fecha Inventario",  "Fecha Inventario",  "" ,  this.onValorCambio]);
            var FECHAREAL       = func.zipCol(dic1,["fecha_rea",     "Fecha Real",  "Fecha Real",  "" ,  this.onValorCambio]);
            var CASADECAMBIO    = func.zipCol(dic1,["casa_cambio",   "Casa de Cambio",  "Casa de Cambio",  "" ,  this.onValorCambio]);
            var PRECIODOLLAR    = func.zipCol(dic1,["precio_dollar", "Precio Dollar",  "Precio Dollar",  "" ,  this.onValorCambio]);
            var TRANSPORTE      = func.zipCol(dic1,["transporte",     "Transporte",  "Transporte",  "" ,  this.onValorCambio]);
            
            var dic2 =                      ["id",         "titulo",               "children" ,   "seleccionado",        "onChange"     ];
		   	var STATUS = func.zipCol(dic2,["estatus_venta",   "Estatus de Compra",    statuss,      "",    this.onValorCambio]);
         	
           return (
	 <section className="contenido">
		   <article className="bloque">
			<div className="titulo_bloque">
				Compra 
			</div>
			<div className="caja_bloque">
				<div className="campos_bloque">
					<ul className="ul_bloque">
						 <CajaDeTexto propiedades={INVOICE} />
						 <CajaDeTexto propiedades={PROVEEDOR} />
						 <CajaDeTexto propiedades={FECHASOLICITUD} />
						 <CajaDeTexto propiedades={FECHAADUANA} />
						 <CajaDeTexto propiedades={FECHAINVENTARIO} />
						 <CajaDeTexto propiedades={FECHAREAL} />
						 <CajaDeTexto propiedades={CASADECAMBIO} />
						 <CajaDeTexto propiedades={PRECIODOLLAR} />
					</ul>
				</div>
			</div>
			<br/>
			<div className="titulo_bloque">
				Otros Datos
				
			</div>
			<div className="caja_bloque">
				<div className="campos_bloque">
					<ul className="ul_bloque">
						<CajaDeTexto propiedades={TRANSPORTE} />
						<Combo propiedades={STATUS} />
						<li className="li_bloque">
							<label className="etiquetas_bloque" htmlFor="descripcion">Descripción</label>
							<textarea className="textarea_bloque" name="descripcion" placeholder="Descripción"></textarea>
							<div className="error_ocultar">mensaje de error del campo</div>
						</li>
						<li className="li_bloque">
							<label className="etiquetas_bloque" htmlFor="comentarios">Comentarios</label>
							<textarea className="textarea_bloque" name="comentarios" placeholder="Comentarios"></textarea>
							<div className="error_ocultar">mensaje de error del campo</div>
						</li>
					</ul>
				</div>
			</div>
		</article>
		<article className="bloque">
			<div className="bloque_catalogo" id="ampliar_tabla">
				<Tabla/>
			</div>
		</article>		
	</section>
			);  
		}
});