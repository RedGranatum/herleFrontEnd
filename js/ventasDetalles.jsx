var ApiRestCatalogo   = require('../js/modelos/apirestCatalogos');
var ApirestInventario = require('../js/modelos/apirestInventarios');
var ApirestExistencia = require('../js/modelos/apirestExistencias');

var ApirestInventarioCalculo   = require('../js/modelos/apirestInventarioCalculo');
var CajaDeTexto 	  = require('../js/cajaDeTexto.jsx');
var CajaDeTextoSimple = require('../js/cajaDeTextoSimple.jsx');
var EtiquetaTexto   = require('../js/etiquetaDeTexto.jsx');
var CeldaTabla        = require('../js/celdaTabla.jsx');
var ListaResultados  = require('../js/resultadosLista.jsx');
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
				existencia: "",
				id_venta: -1,
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
				existencia: "",
				busqueda: "",
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
				existencia: this.props.existencia,
				busqueda: "",
				errores: [],
				busqueda_num_rollo: [],
			};		
		},
relacionCampoErrores: function(){
	var dic_errores = {
		peso_kg:    {valor:this.state.peso_kg,   expreg:/^[\d.]+$/,    requerido: true,  mensaje:"El valor debe ser entero o decimal"},
		precio_neto:     {valor:this.state.precio_neto,    expreg:/^[\d.]+$/,    requerido: true,  mensaje:"El valor debe ser entero o decimal"},
		existencia:     {valor:this.state.existencia,    expreg:/^[\d.]+$/,    requerido: true,  mensaje:"El valor debe ser entero o decimal"},
		 }
    return dic_errores;
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

		if( key === "peso_kg"){
			if(valor<=0 || valor > this.state.existencia){
				errores = true;
				errores_lista[key] = mens;
			}
		}
		if(key === "precio_neto"){
			if(valor === "" || valor<=0){
				errores = true;
				errores_lista[key] = mens;
			}
		}


	}
	 this.setState({errores: errores_lista});
	 return errores;
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
	if(control === "peso_kg"){
		if(this.state.peso_kg > this.state.existencia ){
			nuevos_errores[control] = mens;
		}
	}
	if(control === "precio_neto"){
		if(this.state.precio_neto === "" || this.state.precio_neto<=0){
			nuevos_errores[control] = mens;
		}
	}


	   this.setState({errores: nuevos_errores});
},
onBlurCaja: function(control,valor){  				
	this.validarCampoErrores(control,valor);	
	if(control === "precio_neto"){
  		  this.props.sumatoria();				
	}
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
				existencia: this.state.existencia,		
		};
},
onClaveSeleccionada: function(pk){

		console.log("la pk :" +pk);
        var self = this; 
		num_rollo = this.state.busqueda_num_rollo.filter(function(key) {
			    return key['id'] === pk;
		});
		if(num_rollo.length>0){
			self.setState({num_rollo: num_rollo[0]['id'], existencia: num_rollo[0]['nombre'] ,busqueda_num_rollo:[]});
	// 						
		}
		else{ 
			self.setState({num_rollo:'' ,existencia: '', busqueda_num_rollo:[]});
		}
	},
onBuscarRollo: function(control,valor){
	       var self = this;
	      var existencia = new ApirestExistencia();
          funcionBusqueda = existencia.buscarExistenciaPorNumRollo.bind(existencia);
          funcionBusqueda(valor,
              function(data){
              	 //codigo_producto
              	 //num_rollo
              	 var existencias=[]
              	var existencias = data.map(function(tupla) {
		  	       var lista = {};
		  	       lista['id'] = tupla['num_rollo']
		  	       lista['codigo'] = tupla['num_rollo']
		  	       lista['nombre'] = tupla['existencia_kg']
		          return lista;
	  		});
	
                 self.setState({busqueda_num_rollo: existencias});
                  
              },
              function(model,response, options) {
                 self.setState({busqueda_num_rollo: []});
              }
          );
	},

clickOperacion: function(operacion)
		{
			var errores = this.validarCampos()
			var fila = this.valoresFila();
			this.props.clickOperacion(operacion,fila,errores);
		},
llenarListaNumRollo: function(lista){
 	 return  (lista.length >0) ?  <div className="caja_busqueda" ref="busqueda_num_rollo"> <ListaResultados ref="ListaResultadosBusquedaNumRollo"	resultados={lista} onClaveSeleccionada={this.onClaveSeleccionada}/></div> :[];
      
},
render: function () {			
            func = new FuncGenericas();
          
            var dicCajas     =             ["id",      "titulo",      "textoIndicativo" ,    "valor",                     "onChange",   "onEnter",   "onBlur",                  "error"   ];
			var ID    = func.zipCol(dicCajas,["id",  "",              "",            this.state.id,   this.onValorCambio , "", this.onBlurCaja,     this.state.errores.id     ]);

			var BUSQUEDA    = func.zipCol(dicCajas,["busqueda",  "",              "",            this.state.busqueda,   this.onValorCambio , this.onBuscarRollo,  this.onBlurCaja,     this.state.errores.busqueda     ]);
			var NUM_ROLLO    = func.zipCol(dicCajas,["num_rollo",  "",              "",            this.state.num_rollo,   this.onValorCambio , "",  this.onBlurCaja,     this.state.errores.num_rollo     ]);
		   	var EXISTENCIA  	 = func.zipCol(dicCajas,["existencia",       "",  			"",			   this.state.existencia,     this.onValorCambio,    "",                  this.onBlurCaja,	  this.state.errores.existencia]);         
		   	var PESO_KG  	 = func.zipCol(dicCajas,["peso_kg",       "",  			"",			   this.state.peso_kg,     this.onValorCambio,    "",                  this.onBlurCaja,	  this.state.errores.peso_kg]);         
		   	var PRECIO_NETO  = func.zipCol(dicCajas,["precio_neto",       "",  			"",		   this.state.precio_neto, this.onValorCambio,  "",                this.onBlurCaja,this.state.errores.precio_neto]);

			var ico_nuevo = <IconoTabla clickOperacion={this.clickOperacion} key="ico_nuevo" id="nuevo"     opcionGuardar={"guardar_renglon"} tipoIcono={"plus"}/>;
            var ico_elim  = <IconoTabla clickOperacion={this.clickOperacion} key="ico_elim"  id="eliminar"  opcionGuardar={"eliminar_renglon"} tipoIcono={"remove"}/>;
            var ico_mod   = <IconoTabla clickOperacion={this.clickOperacion} key="ico_mod"   id="modificar" opcionGuardar={"actualizar_renglon"} tipoIcono={"refresh"}/>;

            var icono1 = this.props.primera ? ico_nuevo : ico_elim;
            var icono2 = this.props.primera ? "" : ico_mod;
            
            var caja_busqueda = this.props.primera ? <CajaDeTextoSimple estilo="caja_grid" propiedades = {BUSQUEDA}    requerido={false} /> : <EtiquetaTexto titulo="" valor={""} clase="etiqueta_especial" />;
        
        	var caja_peso_kg     = this.props.id_venta>0 ? <EtiquetaTexto titulo="" valor={this.state.peso_kg}   clase="etiqueta_especial"/> : <CajaDeTextoSimple estilo="caja_grid" propiedades = {PESO_KG}      requerido={false} />; 
	    	var caja_precio_neto = this.props.id_venta>0 ? <EtiquetaTexto titulo="" valor={this.state.precio_neto}   clase="etiqueta_especial"/> : <CajaDeTextoSimple estilo="caja_grid" propiedades = {PRECIO_NETO}      requerido={false} />; 
	    	var icono_eliminar   = this.props.id_venta>0 ? <td></td> : <CeldaTabla  contenido= { this.props.titulo ? this.props.icono1 : icono1} />;
	        
	        var busqueda_rollo = this.llenarListaNumRollo(this.state.busqueda_num_rollo)
        	return (
        		<tr key={this.props.key}>
		         {busqueda_rollo}
		          <CeldaTabla  contenido= { this.props.titulo ? this.props.datos.busqueda    : caja_busqueda }  />
		          <CeldaTabla  contenido= { this.props.titulo ? this.props.datos.num_rollo   : <EtiquetaTexto titulo="" valor={this.state.num_rollo}   clase="etiqueta_especial"/>}  />     
		          <CeldaTabla  contenido= { this.props.titulo ? this.props.datos.existencia  : <EtiquetaTexto titulo="" valor={this.state.existencia}   clase="etiqueta_especial"/>}  />
		          <CeldaTabla  contenido= { this.props.titulo ? this.props.datos.peso_kg     : caja_peso_kg }     />
		          <CeldaTabla  contenido= { this.props.titulo ? this.props.datos.precio_neto : caja_precio_neto } />
		          {icono_eliminar}
                </tr>
            
			);  
		}
	});


