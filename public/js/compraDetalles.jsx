var ApiRestCatalogo = require('../js/modelos/apirestCatalogos');
var CajaDeTexto 	= require('../js/cajaDeTexto.jsx');
var CeldaTabla      = require('../js/celdaTabla.jsx');
var Combo 	    	= require('../js/combo.jsx');
var FuncGenericas   = require('../js/funcionesGenericas')
var IconoTabla      = require('../js/iconoTabla.jsx');
var OpcionCombo 	= require('../js/opcionCombo.jsx');
var React 			= require('react');
var ReactDOM    	= require('react-dom') ;

//var CatalogoApiRest   = require('../js/modelos/catalogoApiRest');

module.exports = React.createClass({
	componentWillMount: function(){
		var material     = (this.props.datos.material.cdu_catalogo===undefined)? this.props.datos.material : this.props.datos.material.cdu_catalogo;   
		var dsc_material =  this.props.datos.dsc_material
        var calibre      = this.props.datos.calibre
		var ancho        = this.props.datos.ancho;
		var largo        = this.props.datos.largo;
		var peso_kg      = this.props.datos.peso_kg;
		var peso_lb      = this.props.datos.peso_lb;
		var num_rollo    = this.props.datos.num_rollo;
		var precio       = this.props.datos.precio;



		this.setState({material: material,material_descripcion:dsc_material, calibre:calibre, ancho: ancho, 
			          largo:largo,peso_kg: peso_kg,peso_lb:peso_lb,num_rollo:num_rollo,precio:precio })

	},
	   componentWillReceiveProps: function(nuevas_props){
	   	   var nuevaPropiedades = nuevas_props.datos
                          



	 //    if(nuevas_props.datos.id !== undefined){
	 //    	var proveedor_id     =  nuevaPropiedades.proveedor.id;
	 //    	var proveedor_codigo     =  nuevaPropiedades.proveedor.codigo;
	    	
  //       	var proveedor_nombre = "[" + proveedor_codigo + "] " + nuevaPropiedades.proveedor.nombre;

		// }

	 //    if(nuevas_props.datos.id === undefined){
	 //       	nuevaPropiedades     = this.valoresDefecto();
	 //       	proveedor_nombre     = nuevaPropiedades.proveedor_nombre;
	 //       	proveedor_id   		 = nuevaPropiedades.proveedor_id;
	 //        proveedor_codigo     = nuevaPropiedades.proveedor_codigo;
	       	 	
	 //     }

	   	  
	   },
	   llenarCombos: function(){    
         var func = new FuncGenericas();      
         this.Materiales = func.llenarComboGenerico(appmvc.Datos.MATERIALES);
        },
	 	getInitialState: function(){
			return this.valoresDefecto();
			
		},
		getDefaultProps: function(){
			return{
				primera: false,
				titulo:  false,
			};
		},
		valoresDefecto: function(){
			return{
		        "id": -1,
		        "compra": -1,
		        "material": "0050000",
		        "material_descripcion": "",
		        "dsc_material": "",
		        "calibre": "",
		        "ancho": "",
		        "largo":   "",
		        "peso_kg": "",
		        "peso_lb": "",
		        "num_rollo": "",
		        "precio": "",
			};
		},
		onValorCambio: function(campo,valor){
			var update = {};
			update[campo] = valor;
			this.setState(update);
		},
		onBlurCaja: function(campo){

		},
		clickOperacion: function(operacion)
		{
			this.props.clickOperacion(operacion);
		},
		render: function () {
			this.llenarCombos();
		
            func = new FuncGenericas();
          
            var dicCajas =                        			  ["id",      "titulo",      "textoIndicativo" ,    "valor",                     "onChange",              "onBlur"   ];
			var DSC_MATERIAL      = func.zipCol(dicCajas,["material_descripcion",  "",              "",            this.state.material_descripcion,   this.onValorCambio ,     this.onBlurCaja ]);
		   	var CALIBRE  		  = func.zipCol(dicCajas,["calibre",       "",  			"",			   this.state.calibre,                 this.onValorCambio,     this.onBlurCaja]);
		   	var ANCHO    		  = func.zipCol(dicCajas,["ancho",       "",  			"",			       this.state.ancho,                 this.onValorCambio,       this.onBlurCaja]);
		   	var LARGO    		  = func.zipCol(dicCajas,["largo",       "",  			"",			       this.state.largo,                 this.onValorCambio,       this.onBlurCaja]);
		   	var PESOKG    		  = func.zipCol(dicCajas,["peso_kg",       "",  			"",			       this.state.peso_kg,                 this.onValorCambio,     this.onBlurCaja]);
		   	var PESOLB   		  = func.zipCol(dicCajas,["peso_lb",       "",  			"",			       this.state.peso_lb,                 this.onValorCambio,     this.onBlurCaja]);
			var NOROLLO   		  = func.zipCol(dicCajas,["num_rollo",       "",  			"",			   this.state.num_rollo,                 this.onValorCambio,   this.onBlurCaja]);
			var PRECIO   		  = func.zipCol(dicCajas,["precio",       "",  			"",			 	   this.state.precio,                 this.onValorCambio,      this.onBlurCaja]);
		
		    var dicCombo =                      ["id",         "titulo",               "children" ,   "seleccionado",        "onChange"     ];
		   	var MATERIALES = func.zipCol(dicCombo,["material",   "",  				  this.Materiales,      this.state.material,    this.onValorCambio]);
    
			var ico_nuevo = <IconoTabla clickOperacion={this.clickOperacion} key="ico_nuevo" id="nuevo"     opcionGuardar={"guardar_renglon"} tipoIcono={"plus"}/>;
            var ico_elim  = <IconoTabla clickOperacion={this.clickOperacion} key="ico_elim"  id="eliminar"  opcionGuardar={"eliminar_renglon"} tipoIcono={"remove"}/>;
            var ico_mod   = <IconoTabla clickOperacion={this.clickOperacion} key="ico_mod"   id="modificar" opcionGuardar={"actualizar_renglon"} tipoIcono={"refresh"}/>;

            var icono1 = this.props.primera ? ico_nuevo : ico_elim;
            var icono2 = this.props.primera ? "" : ico_mod;
        
        	return (
				<tr key={this.props.key}>
		          <CeldaTabla  contenido= { this.props.titulo ? this.props.datos.material       : <Combo       propiedades = {MATERIALES}   />} />
		          <CeldaTabla  contenido= { this.props.titulo ? this.props.datos.dsc_material   : <CajaDeTexto  propiedades = {DSC_MATERIAL}  requerido={false} />}  />
		          <CeldaTabla  contenido= { this.props.titulo ? this.props.datos.calibre        : <CajaDeTexto propiedades = {CALIBRE}        requerido={false}  />} />
		          <CeldaTabla  contenido= { this.props.titulo ? this.props.datos.ancho          : <CajaDeTexto propiedades = {ANCHO}          requerido={false}  />} /> 
		          <CeldaTabla  contenido= { this.props.titulo ? this.props.datos.largo 		    : <CajaDeTexto propiedades = {LARGO}          requerido={false}  />} /> 
		          <CeldaTabla  contenido= { this.props.titulo ? this.props.datos.pesokg 		: <CajaDeTexto propiedades = {PESOKG}         requerido={false}  />} />
		          <CeldaTabla  contenido= { this.props.titulo ? this.props.datos.pesolbs		: <CajaDeTexto propiedades = {PESOLB}         requerido={false}  />} />
		          <CeldaTabla  contenido= { this.props.titulo ? this.props.datos.norollo 		: <CajaDeTexto propiedades = {NOROLLO}        requerido={false}  />} />
		          <CeldaTabla  contenido= { this.props.titulo ? this.props.datos.precio 		: <CajaDeTexto propiedades = {PRECIO}         requerido={false}   />} />
		          <CeldaTabla  contenido= { this.props.titulo ? this.props.icono1 : icono1} />
		          <CeldaTabla  contenido= { this.props.titulo ? this.props.icono2 : icono2} />
                </tr>
			);  
		}
	});



