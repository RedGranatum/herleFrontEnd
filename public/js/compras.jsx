var $ = require('jquery');
var React 			= require('react');
var ReactDOM 		= require('react-dom') ;
var moment 			= require('moment');
var ApiRestCatalogo = require('../js/modelos/apirestCatalogos');
var CajaDeTexto 	= require('../js/cajaDeTexto.jsx');
var EtiquetaTexto   = require('../js/etiquetaDeTexto.jsx');
var Combo 			= require('../js/combo.jsx');
var FuncGenericas   = require('../js/funcionesGenericas')
var OpcionCombo 	= require('../js/opcionCombo.jsx');
var NuevoProveedor  = require('../js/nuevoProveedor.jsx');
var IconoTabla      = require('../js/iconoTabla.jsx');
var AreaTexto       = require('../js/areaTexto.jsx');
var Tabla 	        = require('../js/tabla.jsx');
var ListaResultados  = require('../js/resultadosLista.jsx');
var ApiRestProveedor = require('../js/modelos/apirestProveedores');
var CompraDetalle    = require('../js/compraDetalles.jsx');

require('jquery-ui');
require('react-datepicker/dist/react-datepicker.css');

var statusCom=[
  {val:"1",tit:"Activa"},
  {val:"0",tit:"Cancelada"}
];

var status_combo=statusCom.map(function(stat){
   return (<OpcionCombo key={stat.val} valorOpcion={stat.val} tituloOpcion={stat.tit}/>)

});

module.exports = React.createClass({
	componentDidMount: function(){
		        var self= this;
				$("#fec_solicitud,#fec_aduana,#fec_inventario,#fec_real").datepicker({dateFormat:"dd/mm/yy"})
						.on("input change", function(e){
							self.cambiarValorFecha(e.target.id,e.target.value);
							console.log("Date changed: ", e.target.value);
						});

	  this.CompTablaDetalles = ReactDOM.render(<Tabla key="axs" obtenerPais={this.obtenerPais}  id="ComprasTablaDetalles" listado={[]} id_compra= {-1} />, document.getElementById("ampliar_tabla"));
	    
	},
	obtenerPais: function(){
		return this.state.proveedor_pais;
	},
	cambiarValorFecha: function(control,valor){
			var update = {};
			update[control] = valor;
			this.setState(update);
	},
	componentWillReceiveProps: function(nuevas_props){
	     var nuevaPropiedades = nuevas_props.datos

       
	    if(nuevas_props.datos.id !== undefined){
	    	var proveedor_id     =  nuevaPropiedades.proveedor.id;
	    	var proveedor_codigo     =  nuevaPropiedades.proveedor.codigo;
	    	var proveedor_pais     =  nuevaPropiedades.proveedor.pais;
	    	
        	var proveedor_nombre = "[" + proveedor_codigo + "] " + nuevaPropiedades.proveedor.nombre;

		}

	    if(nuevas_props.datos.id === undefined){
	       	nuevaPropiedades     = this.valoresDefecto();
	       	proveedor_nombre     = nuevaPropiedades.proveedor_nombre;
	       	proveedor_id   		 = nuevaPropiedades.proveedor_id;
	        proveedor_codigo     = nuevaPropiedades.proveedor_codigo;
	        proveedor_pais     =  nuevaPropiedades.proveedor.pais;
	       	 	
	     }

	   
	    if(nuevaPropiedades.invoice!==undefined){
            this.setState({
            	"id"              : nuevaPropiedades.id,
            	"invoice"	      : nuevaPropiedades.invoice,
            	"proveedor"       : proveedor_id,
            	"proveedor_codigo": proveedor_codigo,
            	"proveedor_pais"  : proveedor_pais,
            	"proveedor_nombre": proveedor_nombre,
            	"fec_solicitud"	  : nuevaPropiedades.fec_solicitud,
		        "fec_aduana"      : nuevaPropiedades.fec_aduana,
		        "fec_inventario"  : nuevaPropiedades.fec_inventario,
		        "fec_real"        : nuevaPropiedades.fec_real,
		        "casa_cambio"     : nuevaPropiedades.casa_cambio,
		        "precio_dolar"    : nuevaPropiedades.precio_dolar,
		        "bln_activa"      : nuevaPropiedades.bln_activa ? '1' : '0',
		        "transporte"      : nuevaPropiedades.transporte,
		        "descripcion"     : nuevaPropiedades.descripcion,
		        "comentarios"     : nuevaPropiedades.comentarios,
		        "compra_detalles" : nuevaPropiedades.compra_detalles,
				"busqueda_proveedores" : [],
				 "errores" :{},
            })	   
        }
        this.CompTablaDetalles = ReactDOM.render(<Tabla  key="axs" obtenerPais={this.obtenerPais} id="ComprasTablaDetalles" listado={nuevaPropiedades.compra_detalles} id_compra= {nuevaPropiedades.id} />, document.getElementById("ampliar_tabla"));
	    },
		onValorCambio: function(campo,valor){
			var update = {};

			update[campo] = valor;
			this.setState(update);
		},
		relacionCampoErrores: function(){
			var dic_errores = {
				invoice:   {valor:this.state.invoice,  expreg:/^[a-zA-Z0-9\-().\s]{1,10}$/,     requerido: true,  mensaje:"Alfanumerico ,longitud [1-10]"},
				proveedor_nombre: {valor:this.state.proveedor,     expreg:/^[ñÑa-zA-Z0-9\-().\s]{1,110}$/,    requerido: true,  mensaje:"Selecciona un proveedor"},
				casa_cambio:   {valor:this.state.casa_cambio,  expreg:/^[ñÑa-zA-Z0-9\-().\s]{2,100}$/,    requerido: true,  mensaje:"Alfanumerico ,longitud [2-30]"},
				precio_dolar:    {valor:this.state.precio_dolar,   expreg:/^[\d.]+$/,    requerido: true,  mensaje:"El valor debe ser entero o decimal"},
				fec_solicitud:    {valor:this.state.fec_solicitud,   expreg:/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,    requerido: true,  mensaje:"No es un formato de fecha correcto"},
				fec_aduana:    {valor:this.state.fec_aduana,   expreg:/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,    requerido: true,  mensaje:"No es un formato de fecha correcto"},
				fec_inventario:    {valor:this.state.fec_inventario,   expreg:/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,    requerido: true,  mensaje:"No es un formato de fecha correcto"},
				fec_real:    {valor:this.state.fec_real,   expreg:/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,    requerido: true,  mensaje:"No es un formato de fecha correcto"},
			
				 }
		    return dic_errores;
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
			        proveedor_codigo: "",
			        proveedor_pais: "0010000",
			        fec_solicitud:  moment().format('DD/MM/YYYY'),
			        fec_aduana: moment().format('DD/MM/YYYY'),
			        fec_inventario: moment().format('DD/MM/YYYY'),
			        fec_real:   "01/01/1900",
			        casa_cambio: "",
			        precio_dolar: "",
			        bln_activa: "1",
			        transporte: "",
			        descripcion: "",
			        comentarios: "",  
			        compra_detalles: [],
			        busqueda_proveedores: [],
			        "errores" :{},
			};
		},
		onBuscarProovedor: function(control,valor){
	  			  var self = this;
			      var proveedor = new ApiRestProveedor();
                  //bind(proveedor) le indica que this dentro de la funcion sera el proveedor y no el contexto actual
                  funcionBusqueda = proveedor.buscarProveedorPorValor.bind(proveedor);
                  funcionBusqueda(valor,
                      function(data){
                         self.setState({busqueda_proveedores: data});
                          
                      },
                      function(model,response, options) {
                         self.setState({busqueda_proveedores: []});
                      }
                  );
		},
		 BuscarProveedorPorPk: function(pk){
         	 var self = this;
           var prov = new ApiRestProveedor();
           prov.buscarProveedorPorPk(pk,	
      					function(data){
      						    var id = data[0].id;
      						    var codigo =  data[0].codigo;
      						    var nombre ="[" + codigo + "] " + data[0].nombre; 
      						    var pais = data[0].pais
      						
      			   				self.setState({proveedor: id,proveedor_nombre: nombre,proveedor_codigo:codigo,proveedor_pais:pais,busqueda_proveedores:[] });
      						     self.validarCampoErrores("proveedor_nombre","223");		
      							},
      					function(model,response,options){
      						     self.setState({proveedor: "0",proveedor_nombre: "",proveedor_codigo:"",proveedor_pais:pais,busqueda_proveedores: []  });
      						     self.validarCampoErrores("proveedor_nombre","");		
      							}
				    );
         },
		onClaveSeleccionada: function(pk){
			this.BuscarProveedorPorPk(pk)
  			console.log("la pk :" +pk);
  		},

  		validadarCampos: function()
		{
			var dic_err = this.relacionCampoErrores();
			var errores_lista = {};
		    for(var key in dic_err){
		    	var valor  = dic_err[key].valor;
		    	var exp    = dic_err[key].expreg;
		    	var requer = dic_err[key].requerido;
		    	var mens   = dic_err[key].mensaje;
		    	if(key === "proveedor_nombre"){
		    		if(this.state.proveedor === "0"){
		    			valor ="";
		    		}

		    	}

		    	if(exp.test(valor) || (valor==="" && requer===false))
				{
					errores_lista[key] = "";
				}
				else
				{
					errores_lista[key] = mens;
				}
			}
			 this.setState({errores: errores_lista});
		},
		validarCampoErrores: function(control, valor){
			var dic_err = this.relacionCampoErrores();

			if(control === undefined ||  dic_err[control]=== undefined){
  				return;
  			}
  		
		  //  var valorVal  = dic_err[control].valor;

		    var exp    = dic_err[control].expreg;
		    var requer = dic_err[control].requerido;
		    var mens   = dic_err[control].mensaje;
		    var nuevos_errores = this.state.errores;


		    if(exp.test(valor) || (valor==="" && requer===false)){
				nuevos_errores[control] = "";
			}
			else{
				nuevos_errores[control] = mens;
			}
		
	 	   this.setState({errores: nuevos_errores});
		},
  		onBlurCaja: function(control,valor){  				
  			var valVal = valor;
            if(control==="proveedor_nombre")
			 {				
				 var codigo_caja  = valor.substring(1,valor.indexOf("]"))
	  			 var codigo_state = this.state.proveedor_codigo;
			    valVal=codigo_caja;
			    if(valVal==="0"){
			    	valVal="";
			    }
			    
				if(codigo_caja !== codigo_state)
				{
					valVal ="";
					var valdef = this.valoresDefecto();
					this.setState({proveedor: valdef.proveedor,proveedor_nombre: valdef.proveedor_nombre,proveedor_codigo: valdef.proveedor_codigo,proveedor_pais:valdef.proveedor_pais })
				}
  			}

  			this.validarCampoErrores(control,valVal);		  			
  		},
  		hayErrores: function(){
  			this.validadarCampos();

			for(var key in this.state.errores){
				if(this.state.errores[key].trim() !==""){
					return true;
				}
			}

			var errores = this.CompTablaDetalles.HayErrores();
			return errores;
		},
		llenarListaProveedores: function(lista){
		 	 return  (lista.length >0) ?  <div className="caja_busqueda" ref="busqueda_proveedores_compras"> <ListaResultados ref="ListaResultadosBusqueda"	resultados={lista} onClaveSeleccionada={this.onClaveSeleccionada}/></div> :[];
              
		},
		nuevosDatos: function(){
			var datos_detalles = this.CompTablaDetalles.valoresDetallesCompra()
						
	    return{
	    	id:             this.state.id,
		    invoice: 	    this.state.invoice,
	        proveedor: 	    this.state.proveedor,
	        fec_solicitud:  this.state.fec_solicitud,
	        fec_aduana:     this.state.fec_aduana,
	        fec_inventario: this.state.fec_inventario,
	        fec_real: 		this.state.fec_real,
	        casa_cambio: 	this.state.casa_cambio,
	        precio_dolar: 	this.state.precio_dolar,
	        tipo_moneda: "0040000",
	        transporte: 	this.state.transporte,
	        bln_activa: 	this.state.bln_activa === '1' ? true : false,
	        descripcion: 	this.state.descripcion,
	        comentarios: 	this.state.comentarios,
	        compra_detalles: datos_detalles,
        };

		},
		render: function () {
			func = new FuncGenericas();
			
	        var dic1 =                               ["id",           "titulo",            "textoIndicativo" ,    "valor",                  "onChange"          ,"onEnter",              "onBlur"                 ,"error"];
			var INVOICE         = func.zipCol(dic1,["invoice",        "Invoice",           "Invoice",           this.state.invoice ,       this.onValorCambio,      "",                     this.onBlurCaja,	this.state.errores.invoice]);
            var PROVEEDOR       = func.zipCol(dic1,["proveedor_nombre","Proveedor",         "Proveedor",         this.state.proveedor_nombre,this.onValorCambio,    this.onBuscarProovedor, this.onBlurCaja,	this.state.errores.proveedor_nombre ]);
            var FECHASOLICITUD  = func.zipCol(dic1,["fec_solicitud",  "Fecha Solicitud",   "Fecha Solicitud",   this.state.fec_solicitud , this.onValorCambio,      "",					    this.onBlurCaja,	this.state.errores.fec_solicitud]);
            var FECHAADUANA     = func.zipCol(dic1,["fec_aduana",     "Fecha Aduana",      "Fecha Aduana",      this.state.fec_aduana ,    this.onValorCambio,      "",					    this.onBlurCaja,	this.state.errores.fec_aduana]);
            var FECHAINVENTARIO = func.zipCol(dic1,["fec_inventario", "Fecha Inventario",  "Fecha Inventario",  this.state.fec_inventario, this.onValorCambio,      "",				        this.onBlurCaja,	this.state.errores.fec_inventario]);
            var FECHAREAL       = func.zipCol(dic1,["fec_real",       "Fecha Real",        "Fecha Real",        this.state.fec_real ,      this.onValorCambio,      "",					    this.onBlurCaja,	this.state.errores.fec_real]);
            var CASADECAMBIO    = func.zipCol(dic1,["casa_cambio",    "Casa de Cambio",    "Casa de Cambio",    this.state.casa_cambio ,   this.onValorCambio,      "",					    this.onBlurCaja,	this.state.errores.casa_cambio]);
            var PRECIODOLLAR    = func.zipCol(dic1,["precio_dolar",   "Precio Dollar",     "Precio Dollar",     this.state.precio_dolar ,  this.onValorCambio,      "",					    this.onBlurCaja,	this.state.errores.precio_dolar]);
            var TRANSPORTE      = func.zipCol(dic1,["transporte",     "Transporte",        "Transporte",        this.state.transporte ,    this.onValorCambio,      "",					    this.onBlurCaja,	this.state.errores.transporte]);
            var OBSERVACIONES   = func.zipCol(dic1,["descripcion",    "Descripción",       "Descripción",       this.state.descripcion ,   this.onValorCambio,      "",						this.onBlurCaja,	this.state.errores.descripcion]);        
            var COMENTARIOS     = func.zipCol(dic1,["comentarios",    "Comentarios",       "Comentarios",       this.state.comentarios ,   this.onValorCambio,      "",						this.onBlurCaja,	this.state.errores.comentarios]);        

            var dic2 =                      ["id",         "titulo",               "children" ,   "seleccionado",        "onChange"     ];
		   	var STATUS = func.zipCol(dic2,["bln_activa",   "Estatus de Compra",    status_combo,      this.state.bln_activa,    this.onValorCambio]);
         

         	icono_proveedor = <IconoTabla mensajeIndicador={"Agregar Proveedor"}  opcionGuardar={"agregar_proveedor"} tipoIcono={"truck"}/>;
         
         	var busqueda_proveedores = this.llenarListaProveedores(this.state.busqueda_proveedores)

         
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
						 {busqueda_proveedores}
						 <CajaDeTexto propiedades={PROVEEDOR} mensajeIndicativo={icono_proveedor} />
						 <CajaDeTexto propiedades={FECHASOLICITUD} ref="cajaFechaSolicitud" />
						 <CajaDeTexto propiedades={FECHAADUANA} ref="cajaFechaAduana"/>
						 <EtiquetaTexto titulo="Fecha Inventario" valor={this.state.fec_inventario} clase="etiqueta_especial" />
						 <EtiquetaTexto titulo="Fecha Real" valor={this.state.fec_real} clase="etiqueta_especial" />
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
		   <div className="bloque_catalogo" id="ampliar_tabla">
              
			</div>
			
		</article>		
	</section>
			);  
		}
});