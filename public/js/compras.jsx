var ApiRestCatalogo = require('../js/modelos/apirestCatalogos');
var CajaDeTexto 	= require('../js/cajaDeTexto.jsx');
var Combo 			= require('../js/combo.jsx');
var FuncGenericas   = require('../js/funcionesGenericas')
var OpcionCombo 	= require('../js/opcionCombo.jsx');
var NuevoProveedor  = require('../js/nuevoProveedor.jsx');
var IconoTabla      = require('../js/iconoTabla.jsx');
var AreaTexto       = require('../js/areaTexto.jsx');
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
	    componentWillReceiveProps: function(nuevas_props){
	    	//debugger;
	    if(nuevas_props.datos.invoice!==undefined){
            this.setState({
            	"invoice": nuevas_props.datos.invoice,
            	"proveedor": nuevas_props.datos.proveedor.nombre,
            	"fechSol": nuevas_props.datos.fec_solicitud,
		        "fecha_adu": nuevas_props.datos.fec_aduana,
		        "fecha_inv": nuevas_props.datos.fec_inventario,
		        "fecha_rea":   nuevas_props.datos.fec_real,
		        "casa_cambio": nuevas_props.datos.casa_cambio,
		        "precio_dollar": nuevas_props.datos.precio_dolar,
		        "transporte": nuevas_props.datos.transporte,
		        "descripcion": nuevas_props.datos.descripcion,
            })	   
            //this.setState({"fecha_adu":  nuevas_props.datos.fec_aduanas}) 
        }
	    },
		onValorCambio: function(){

		},
		getInitialState: function(){
			return {
		        
																	
			        "invoice": "78945",
			        "proveedor": "chabelo",
			        "fechSol": "24/10/1992",
			        "fecha_adu": "25/10/1992",
			        "fecha_inv": "28/10/1992",
			        "fecha_rea":   "32/10/1992",
			        "casa_cambio": "no lo se",
			        "precio_dollar": "25",
			        "transporte": "automovil",
			        "descripcion": "holaaaa"
		      
			};
			
		},
		render: function () {
			func = new FuncGenericas();
			
	        var dic1 =                               ["id",          "titulo",      "textoIndicativo" ,    "valor",          "onChange"     ];
			var INVOICE         = func.zipCol(dic1,["invoice",       "Invoice",       "Invoice",            this.state.invoice ,           this.onValorCambio]);
            var PROVEEDOR       = func.zipCol(dic1,["proveedor",    "Proveedor",       "Proveedor",        this.state.proveedor ,       this.onValorCambio]);
            var FECHASOLICITUD  = func.zipCol(dic1,["fechSol",     "Fecha Solicitud",  "Fecha Solicitud",  this.state.fechSol ,  this.onValorCambio]);
            var FECHAADUANA     = func.zipCol(dic1,["fecha_adu",     "Fecha Aduana",  "Fecha Aduana",  this.state.fecha_adu ,  this.onValorCambio]);
            var FECHAINVENTARIO = func.zipCol(dic1,["fecha_inv",     "Fecha Inventario",  "Fecha Inventario",  this.state.fecha_inv ,  this.onValorCambio]);
            var FECHAREAL       = func.zipCol(dic1,["fecha_rea",     "Fecha Real",  "Fecha Real",  this.state.fecha_rea ,  this.onValorCambio]);
            var CASADECAMBIO    = func.zipCol(dic1,["casa_cambio",   "Casa de Cambio",  "Casa de Cambio",  this.state.casa_cambio ,  this.onValorCambio]);
            var PRECIODOLLAR    = func.zipCol(dic1,["precio_dollar", "Precio Dollar",  "Precio Dollar",  this.state.precio_dollar ,  this.onValorCambio]);
            var TRANSPORTE      = func.zipCol(dic1,["transporte",     "Transporte",  "Transporte",  this.state.transporte ,  this.onValorCambio]);
            var OBSERVACIONES    = func.zipCol(dic1,["Descripcion",     "Descripción",  "Descripción",  this.state.descripcion ,  this.onValorCambio]);        

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
						 <CajaDeTexto mensajeIndicativo={<IconoTabla mensajeIndicador={"Agregar Proveedor"}  opcionGuardar={"agregar_proveedor"} tipoIcono={"truck"}/>} propiedades={PROVEEDOR} />
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
						<AreaTexto propiedades={OBSERVACIONES} />
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
		<NuevoProveedor/>
		   <div className="bloque_catalogo" id="ampliar_tabla">
               <Tabla/>
			</div>
			
		</article>		
	</section>
			);  
		}
});