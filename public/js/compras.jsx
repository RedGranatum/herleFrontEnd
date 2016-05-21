var $ = require('jquery');
var ApiRestCatalogo = require('../js/modelos/apirestCatalogos');
var CajaDeTexto 	= require('../js/cajaDeTexto.jsx');
var Combo 			= require('../js/combo.jsx');
var FuncGenericas   = require('../js/funcionesGenericas')
var OpcionCombo 	= require('../js/opcionCombo.jsx');
var NuevoProveedor  = require('../js/nuevoProveedor.jsx');
var IconoTabla      = require('../js/iconoTabla.jsx');
var AreaTexto       = require('../js/areaTexto.jsx');
var React 			= require('react');
var moment 			= require('moment');
var Tabla 	        = require('../js/tabla.jsx');
var ReactDOM 		= require('react-dom') ;

require('jquery-ui');

require('react-datepicker/dist/react-datepicker.css');
var statusCom=[
  {val:"1",tit:"Activa"},
  {val:"0",tit:"Cancelada"}
];

var status_combo=statusCom.map(function(stat){
   return (<OpcionCombo valorOpcion={stat.val} tituloOpcion={stat.tit}/>)

});

module.exports = React.createClass({
	componentDidMount: function(){
				$("#fec_solicitud,#fec_aduana,#fec_inventario,#fec_real").datepicker({dateFormat:"dd/mm/yy"});
	},
	    componentWillReceiveProps: function(nuevas_props){
	    var nuevaPropiedades = nuevas_props.datos



	    if(nuevas_props.datos.id !== undefined){
	    	var proveedor_id     =  nuevaPropiedades.proveedor.id;
        	var proveedor_nombre =  nuevaPropiedades.proveedor.nombre;
		}

	    if(nuevas_props.datos.id === undefined){
	       	nuevaPropiedades = this.valoresDefecto();
	       	proveedor_nombre = nuevaPropiedades.proveedor_nombre;
	       	proveedor_id     = nuevaPropiedades.proveedor_id;
	     }

	   
	    if(nuevaPropiedades.invoice!==undefined){
            this.setState({
            	"invoice"	     : nuevaPropiedades.invoice,
            	"proveedor"      : proveedor_id,
            	"proveedor_nombre": proveedor_nombre,
            	"fec_solicitud"	 : nuevaPropiedades.fec_solicitud,
		        "fec_aduana"     : nuevaPropiedades.fec_aduana,
		        "fec_inventario" : nuevaPropiedades.fec_inventario,
		        "fec_real"       : nuevaPropiedades.fec_real,
		        "casa_cambio"    : nuevaPropiedades.casa_cambio,
		        "precio_dolar"   : nuevaPropiedades.precio_dolar,
		        "bln_activa"     : nuevaPropiedades.bln_activa ? '1' : '0',
		        "transporte"     : nuevaPropiedades.transporte,
		        "descripcion"    : nuevaPropiedades.descripcion,
		        "comentarios"    : nuevaPropiedades.comentarios,

            })	   
        }
	    },
		onValorCambio: function(campo,valor){
			var update = {};
			update[campo] = valor;
			this.setState(update);
		},
		getInitialState: function(){
			return this.valoresDefecto();
		},
		valoresDefecto: function(){
			return {			
				    id: -1,											
			        invoice: "",
			        proveedor: "0",
			        proveedor_nombre: "",
			        fec_solicitud:  moment().format('DD/MM/YYYY'),
			        fec_aduana: moment().format('DD/MM/YYYY'),
			        fec_inventario: moment().format('DD/MM/YYYY'),
			        fec_real:   "01/01/1900",
			        casa_cambio: "",
			        precio_dolar: "",
			        bln_activa: "0",
			        transporte: "",
			        descripcion: "",
			        comentarios: "",  
			};
		},
		render: function () {
			func = new FuncGenericas();
			
	        var dic1 =                               ["id",           "titulo",            "textoIndicativo" ,    "valor",                  "onChange"     ];
			var INVOICE         = func.zipCol(dic1,["invoice",        "Invoice",           "Invoice",           this.state.invoice ,       this.onValorCambio]);
            var PROVEEDOR       = func.zipCol(dic1,["proveedor_nombre","Proveedor",         "Proveedor",         this.state.proveedor_nombre,this.onValorCambio]);
            var FECHASOLICITUD  = func.zipCol(dic1,["fec_solicitud",  "Fecha Solicitud",   "Fecha Solicitud",   this.state.fec_solicitud , this.onValorCambio]);
            var FECHAADUANA     = func.zipCol(dic1,["fec_aduana",     "Fecha Aduana",      "Fecha Aduana",      this.state.fec_aduana ,    this.onValorCambio]);
            var FECHAINVENTARIO = func.zipCol(dic1,["fec_inventario", "Fecha Inventario",  "Fecha Inventario",  this.state.fec_inventario, this.onValorCambio]);
            var FECHAREAL       = func.zipCol(dic1,["fec_real",       "Fecha Real",        "Fecha Real",        this.state.fec_real ,      this.onValorCambio]);
            var CASADECAMBIO    = func.zipCol(dic1,["casa_cambio",    "Casa de Cambio",    "Casa de Cambio",    this.state.casa_cambio ,   this.onValorCambio]);
            var PRECIODOLLAR    = func.zipCol(dic1,["precio_dolar",   "Precio Dollar",     "Precio Dollar",     this.state.precio_dolar ,  this.onValorCambio]);
            var TRANSPORTE      = func.zipCol(dic1,["transporte",     "Transporte",        "Transporte",        this.state.transporte ,    this.onValorCambio]);
            var OBSERVACIONES   = func.zipCol(dic1,["descripcion",    "Descripción",       "Descripción",       this.state.descripcion ,   this.onValorCambio]);        
            var COMENTARIOS     = func.zipCol(dic1,["comentarios",    "Comentarios",       "Comentarios",       this.state.comentarios ,   this.onValorCambio]);        

            var dic2 =                      ["id",         "titulo",               "children" ,   "seleccionado",        "onChange"     ];
		   	var STATUS = func.zipCol(dic2,["bln_activa",   "Estatus de Compra",    status_combo,      this.state.bln_activa,    this.onValorCambio]);
         	moment.locale('de')
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
						<AreaTexto propiedades={COMENTARIOS} />
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