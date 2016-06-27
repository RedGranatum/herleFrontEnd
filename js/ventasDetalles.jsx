var ApiRestCatalogo   = require('../js/modelos/apirestCatalogos');
var ApirestInventarioCalculo   = require('../js/modelos/apirestInventarioCalculo');
var CajaDeTexto 	  = require('../js/cajaDeTexto.jsx');
var CajaDeTextoSimple = require('../js/cajaDeTextoSimple.jsx');
var EtiquetaTexto   = require('../js/etiquetaDeTexto.jsx');
var CeldaTabla        = require('../js/celdaTabla.jsx');
var Combo 	    	  = require('../js/combo.jsx');
var FuncGenericas     = require('../js/funcionesGenericas');
var IconoTabla        = require('../js/iconoTabla.jsx');
var OpcionCombo 	  = require('../js/opcionCombo.jsx');
var React 			  = require('react');
var ReactDOM    	  = require('react-dom') ;

//var CatalogoApiRest   = require('../js/modelos/catalogoApiRest');

module.exports = React.createClass({
 		limpiarFila: function()
		{
			var val_def = this.valoresPorDefecto();
			this.setState(val_def);
		},		
  		getDefaultProps: function(){
			return{
				primera: false,
				titulo:  false,	
				id:  -1,
				venta: "0",
				num_rollo: "",
				peso_kg: "0.0",
				precio_neto: "0.0",
				datos: [],		
			};
		},
		valoresPorDefecto: function(){
			return{
				primera: false,
				titulo:  false,	
				id:  -1,
				venta: "0",
				num_rollo: "",
				peso_kg: "0.0",
				precio_neto: "0.0",
				datos: [],		
			};
		},
	 	getInitialState: function(){
			return{
				id : this.props.id,
				venta: this.props.venta,
				num_rollo: this.props.num_rollo,
				peso_kg: this.props.peso_kg,
				precio_neto: this.props.precio_neto,
				errores: [],
			};		
		},
onBlurCaja: function(control,valor){  				

},
onValorCambio: function(campo,valor){
			var update = {};
			update[campo] = valor;
			this.setState(update);
},
valoresFila: function()
{              
		return{
			    id : this.state.id,
				venta: this.state.venta,
				num_rollo: this.state.num_rollo,
				peso_kg: this.state.peso_kg,
				precio_neto: this.state.precio_neto,			
		};
},
clickOperacion: function(operacion)
		{
			//debugger;
			var errores ="";
			//var errores = this.validarCampos()
			var fila = this.valoresFila();
			this.props.clickOperacion(operacion,fila,errores);
		},
render: function () {			
            func = new FuncGenericas();
          
            var dicCajas     =             ["id",      "titulo",      "textoIndicativo" ,    "valor",                     "onChange",      "onBlur",                  "error"   ];
			var ID    = func.zipCol(dicCajas,["id",  "",              "",            this.state.id,   this.onValorCambio ,  this.onBlurCaja,     this.state.errores.id     ]);

			var NUM_ROLLO    = func.zipCol(dicCajas,["num_rollo",  "",              "",            this.state.num_rollo,   this.onValorCambio ,  this.onBlurCaja,     this.state.errores.num_rollo     ]);
		   	var PESO_KG  	 = func.zipCol(dicCajas,["peso_kg",       "",  			"",			   this.state.peso_kg,     this.onValorCambio,     this.onBlurCaja,	  this.state.errores.peso_kg]);         
		   	var PRECIO_NETO  = func.zipCol(dicCajas,["precio_neto",       "",  			"",		   this.state.precio_neto, this.onValorCambio,       this.onBlurCaja,this.state.errores.precio_neto]);

			var ico_nuevo = <IconoTabla clickOperacion={this.clickOperacion} key="ico_nuevo" id="nuevo"     opcionGuardar={"guardar_renglon"} tipoIcono={"plus"}/>;
            var ico_elim  = <IconoTabla clickOperacion={this.clickOperacion} key="ico_elim"  id="eliminar"  opcionGuardar={"eliminar_renglon"} tipoIcono={"remove"}/>;
            var ico_mod   = <IconoTabla clickOperacion={this.clickOperacion} key="ico_mod"   id="modificar" opcionGuardar={"actualizar_renglon"} tipoIcono={"refresh"}/>;

            var icono1 = this.props.primera ? ico_nuevo : ico_elim;
            var icono2 = this.props.primera ? "" : ico_mod;
            
            var caja_numrollo = this.props.primera ? <CajaDeTextoSimple estilo="caja_grid" propiedades = {NUM_ROLLO}    requerido={false} /> : <EtiquetaTexto titulo="" valor={this.state.num_rollo} clase="etiqueta_especial" />;
        	return (
				<tr key={this.props.key}>
		          <CeldaTabla  contenido= { this.props.titulo ? this.props.datos.id   : <CajaDeTextoSimple estilo="caja_grid" propiedades = {ID}      requerido={false} />}  />

		          <CeldaTabla  contenido= { this.props.titulo ? this.props.datos.num_rollo   : caja_numrollo }  />
		          <CeldaTabla  contenido= { this.props.titulo ? this.props.datos.peso_kg   : <CajaDeTextoSimple estilo="caja_grid" propiedades = {PESO_KG}      requerido={false} />}  />
		          <CeldaTabla  contenido= { this.props.titulo ? this.props.datos.precio_neto        : <CajaDeTextoSimple estilo="caja_grid"  propiedades = {PRECIO_NETO} requerido={false}  />} />
		          <CeldaTabla  contenido= { this.props.titulo ? this.props.icono1 : icono1} />
                </tr>
			);  
		}
	});


