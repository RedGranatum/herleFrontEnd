var ApiRestCatalogo   = require('../js/modelos/apirestCatalogos');
var CajaDeTexto 	  = require('../js/cajaDeTexto.jsx');
var CajaDeTextoSimple = require('../js/cajaDeTextoSimple.jsx');
var CeldaTabla        = require('../js/celdaTabla.jsx');
var Combo 	    	  = require('../js/combo.jsx');
var FuncGenericas     = require('../js/funcionesGenericas')
var IconoTabla        = require('../js/iconoTabla.jsx');
var OpcionCombo 	  = require('../js/opcionCombo.jsx');
var React 			  = require('react');
var ReactDOM    	  = require('react-dom') ;

//var CatalogoApiRest   = require('../js/modelos/catalogoApiRest');

module.exports = React.createClass({
	componentWillMount: function(){
       	if(this.props.datos === undefined){
				this.limpiarFila();
		}
		else{
				var material     = (this.props.datos.material.cdu_catalogo===undefined)? this.props.datos.material : this.props.datos.material.cdu_catalogo;   
				var id           = this.props.datos.id;
				var compra       = this.props.datos.compra;
				var dsc_material = this.props.datos.dsc_material;
		        var calibre      = this.props.datos.calibre;
				var ancho        = this.props.datos.ancho;
				var largo        = this.props.datos.largo;
				var peso_kg      = this.props.datos.peso_kg;
				var peso_lb      = this.props.datos.peso_lb;
				var num_rollo    = this.props.datos.num_rollo;
				var precio       = this.props.datos.precio;

				this.setState({id:id, compra:compra, material: material,material_descripcion:dsc_material, calibre:calibre, ancho: ancho, 
					          largo:largo,peso_kg: peso_kg,peso_lb:peso_lb,num_rollo:num_rollo,precio:precio })
			}
	},
	 componentWillReceiveProps: function(nuevas_props){
	   	   var nuevaPropiedades = nuevas_props.datos 
	   },
	   llenarCombos: function(){    
         var func = new FuncGenericas();      
         this.Materiales = func.llenarComboGenerico(appmvc.Datos.MATERIALES);

        },
  	   validarCampos: function()
		{
			var dic_err = this.relacionCampoErrores();
			var errores_lista = {};
			var errores = false;
		    for(var key in dic_err){
		    	var valor  = dic_err[key].valor;
		    	var exp    = dic_err[key].expreg;
		    	var requer = dic_err[key].requerido;
		    	var mens   = dic_err[key].mensaje;

		    	if(exp.test(valor) || (valor==="" && requer===false))
				{
					errores_lista[key] = "";
				}
				else
				{
					errores = true;
					errores_lista[key] = mens;
				}
			}
			 this.setState({errores: errores_lista});
			 return errores;
		},
        relacionCampoErrores: function(){
			var dic_errores = {
				material_descripcion:   {valor:this.state.material_descripcion,  expreg:/^[a-zA-Z0-9\-().\s]{1,10}$/,     requerido: true,  mensaje:"Alfanumerico ,longitud [1-10]"},	
				calibre:    {valor:this.state.calibre,   expreg:/^[\d.]+$/,    requerido: true,  mensaje:"El valor debe ser entero o decimal"},
				ancho:      {valor:this.state.calibre,   expreg:/^[\d.]+$/,    requerido: true,  mensaje:"El valor debe ser entero o decimal"},
				largo:      {valor:this.state.largo,     expreg:/^[\d.]+$/,    requerido: true,  mensaje:"El valor debe ser entero o decimal"},
				peso_kg:    {valor:this.state.peso_kg,   expreg:/^[\d.]+$/,    requerido: true,  mensaje:"El valor debe ser entero o decimal"},
				peso_lb:    {valor:this.state.peso_lb,   expreg:/^[\d.]+$/,    requerido: true,  mensaje:"El valor debe ser entero o decimal"},
				num_rollo:  {valor:this.state.num_rollo, expreg:/^[a-zA-Z0-9\-().\s]{1,30}$/,    requerido: false,  mensaje:"Alfanumerico ,longitud [1-30]"},
				precio:     {valor:this.state.precio,    expreg:/^[\d.]+$/,    requerido: true,  mensaje:"El valor debe ser entero o decimal"},
				 }
		    return dic_errores;
		},
		validarCampoErrores: function(control, valor){
			var dic_err = this.relacionCampoErrores();

			if(control === undefined ||  dic_err[control]=== undefined){
  				return;
  			}
  		
		  
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
  			this.validarCampoErrores(control,valor);		  			
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
		        "errores" :{},
			};
		},
		onValorCambio: function(campo,valor){
			var update = {};
			update[campo] = valor;
			this.setState(update);
		},
		clickOperacion: function(operacion)
		{
			var errores = this.validarCampos()
			var fila = this.valoresFila();
			this.props.clickOperacion(operacion,fila,errores);
		},
		valoresFila: function()
		{              
			return{
		        "id": this.state.id,
		        "compra": this.state.compra,
		        "material": this.state.material,
		        "material_descripcion": this.state.material_descripcion,
		        "dsc_material": this.state.dsc_material,
		        "calibre": this.state.calibre,
		        "ancho": this.state.ancho,
		        "largo":   this.state.largo,
		        "peso_kg": this.state.peso_kg,
		        "peso_lb": this.state.peso_lb,
		        "num_rollo": this.state.num_rollo,
		        "precio": this.state.precio,
		        "num_consecutivo" : this.props.primera ? "" : this.props.datos.num_consecutivo,
			};
		},
		limpiarFila: function()
		{
			var val_def = this.valoresDefecto();
			this.setState(val_def);
		},
		render: function () {
			this.llenarCombos();
		
            func = new FuncGenericas();
          
            var dicCajas =                        	     ["id",      "titulo",      "textoIndicativo" ,    "valor",                     "onChange",              "onBlur",                  "error"   ];
			var DSC_MATERIAL      = func.zipCol(dicCajas,["material_descripcion",  "",              "",            this.state.material_descripcion,   this.onValorCambio ,  this.onBlurCaja,   this.state.errores.material_descripcion     ]);
		   	var CALIBRE  		  = func.zipCol(dicCajas,["calibre",       "",  			"",			   this.state.calibre,                 this.onValorCambio,     this.onBlurCaja,			 this.state.errores.calibre]);         
		   	var ANCHO    		  = func.zipCol(dicCajas,["ancho",       "",  			"",			       this.state.ancho,                 this.onValorCambio,       this.onBlurCaja,			this.state.errores.ancho]);
		   	var LARGO    		  = func.zipCol(dicCajas,["largo",       "",  			"",			       this.state.largo,                 this.onValorCambio,       this.onBlurCaja,			this.state.errores.largo]);
		   	var PESOKG    		  = func.zipCol(dicCajas,["peso_kg",       "",  			"",			       this.state.peso_kg,                 this.onValorCambio,     this.onBlurCaja,	    this.state.errores.peso_kg]);
		   	var PESOLB   		  = func.zipCol(dicCajas,["peso_lb",       "",  			"",			       this.state.peso_lb,                 this.onValorCambio,     this.onBlurCaja,		this.state.errores.peso_lb]);
			var NOROLLO   		  = func.zipCol(dicCajas,["num_rollo",       "",  			"",			   this.state.num_rollo,                 this.onValorCambio,   this.onBlurCaja,			this.state.errores.num_rollo]);
			var PRECIO   		  = func.zipCol(dicCajas,["precio",       "",  			"",			 	   this.state.precio,                 this.onValorCambio,      this.onBlurCaja,			this.state.errores.precio]);
		
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
		          <CeldaTabla  contenido= { this.props.titulo ? this.props.datos.dsc_material   : <CajaDeTextoSimple estilo="caja_grid" propiedades = {DSC_MATERIAL}  requerido={false} />}  />
		          <CeldaTabla  contenido= { this.props.titulo ? this.props.datos.calibre        : <CajaDeTextoSimple estilo="caja_grid"  propiedades = {CALIBRE}        requerido={false}  />} />
		          <CeldaTabla  contenido= { this.props.titulo ? this.props.datos.ancho          : <CajaDeTextoSimple estilo="caja_grid"  propiedades = {ANCHO}          requerido={false}  />} /> 
		          <CeldaTabla  contenido= { this.props.titulo ? this.props.datos.largo 		    : <CajaDeTextoSimple estilo="caja_grid"  propiedades = {LARGO}          requerido={false}  />} /> 
		          <CeldaTabla  contenido= { this.props.titulo ? this.props.datos.pesokg 		: <CajaDeTextoSimple estilo="caja_grid"  propiedades = {PESOKG}         requerido={false}  />} />
		          <CeldaTabla  contenido= { this.props.titulo ? this.props.datos.pesolbs		: <CajaDeTextoSimple estilo="caja_grid"  propiedades = {PESOLB}         requerido={false}  />} />
		          <CeldaTabla  contenido= { this.props.titulo ? this.props.datos.norollo 		: <CajaDeTextoSimple estilo="caja_grid"  propiedades = {NOROLLO}        requerido={false}  />} />
		          <CeldaTabla  contenido= { this.props.titulo ? this.props.datos.precio 		: <CajaDeTextoSimple estilo="caja_grid"  propiedades = {PRECIO}         requerido={false}   />} />
		          <CeldaTabla  contenido= { this.props.titulo ? this.props.icono1 : icono1} />
                </tr>
			);  
		}
	});



