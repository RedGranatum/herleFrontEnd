var React       = require('react');
var FuncGenericas   = require('../js/funcionesGenericas');
var InventarioParam = require('../js/inventarioParametros.jsx');
var CajaDeTexto 	= require('../js/cajaDeTexto.jsx');
var Combo 	    	= require('../js/combo.jsx');
var Titulo          = require('../js/titulos.jsx');
var AreaTexto       = require('../js/areaTexto.jsx');
var CajaConCampos   = require('../js/cajaConCampos.jsx')

module.exports = React.createClass({

componentWillReceiveProps: function(nextProps) {

 	if(nextProps.datos.id !== undefined){
 		this.setState({
 					   id :     	nextProps.datos.id,	
 					   invoice:     nextProps.datos.invoice,
 					   pais:   	    nextProps.datos.proveedor.pais,
 					   comentarios: nextProps.datos.comentarios,
 					   descripcion: nextProps.datos.descripcion});

 	}
 	else{
 		this.setState(this.getInitialState())
 	}
 },
componentWillMount: function() { 
	this.llenarCombos();
},
getInitialState: function(){
	return{
	   	"id": -1,
		"invoice":'',
		"pais":  '0010000',
		"comentarios": '',
		"descripcion": '',
		"tentrada": '0',
		"errores" :{},
	}
},
llenarCombos: function(){
	   	    var func = new FuncGenericas();      
			this.Paises = func.llenarComboGenerico(appmvc.Datos.PAISES);

			var entradas = [{cdu_catalogo: "0",descripcion1: "NO ESPECIFICADO"},{cdu_catalogo: "1",descripcion1: "Con Comercializadora"},{cdu_catalogo: "2",descripcion1: "Sin Comercializadora"}]
			this.TipoEntrada = func.llenarComboGenerico(entradas);
  },
 render: function () {  
	func = new FuncGenericas();
	var dic1 =         			            ["id",      "titulo", "textoIndicativo" ,    "valor",             "onChange"      , "onBlur"				 , "error"];
    var DESCRIPCION    = func.zipCol(dic1,["descripcion",    "Descripción",       "Descripción",       this.state.descripcion ,   this.onValorCambio,      "",						this.onBlurCaja,	this.state.errores.descripcion]);        
    var COMENTARIOS    = func.zipCol(dic1,["comentarios",    "Comentarios",       "Comentarios",       this.state.comentarios ,   this.onValorCambio,      "",						this.onBlurCaja,	this.state.errores.comentarios]);        

	var dic2 =                   ["id",       "titulo",               "children" ,      "seleccionado",            "onChange"     ];
	var PAIS 	 = func.zipCol(dic2,["pais",     "Origen producto",    this.Paises,       this.state.pais,        this.onValorCambio]);
	var TENTRADA = func.zipCol(dic2,["tentrada", "Tipo de entrada",    this.TipoEntrada,  this.state.tentrada,    this.onValorCambio]);

 return (
 	<div >
		<article className="bloque">
			<Titulo titulo={'Invoice: ' +   this.state.invoice} />
			<CajaConCampos >
				<Combo 	propiedades = {PAIS}   ref="ComboPais" key="Pais" />	
				<Combo 	propiedades = {TENTRADA}  ref="ComboTEntrada" key="TEntrada" />	
			</CajaConCampos>
			<br />
			<Titulo titulo='Otros Datos' />
			<CajaConCampos >
				<AreaTexto propiedades={DESCRIPCION} />
				<AreaTexto propiedades={COMENTARIOS} />
			</CajaConCampos>
		</article>
		<InventarioParam />
	</div>
		);  
	}
});