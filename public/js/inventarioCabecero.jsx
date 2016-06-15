var React       = require('react');
var FuncGenericas     = require('../js/funcionesGenericas');
var InventarioParam   = require('../js/inventarioParametros.jsx');
var CajaDeTexto 	  = require('../js/cajaDeTexto.jsx');
var Combo 	    	  = require('../js/combo.jsx');
var Titulo            = require('../js/titulos.jsx');
var AreaTexto         = require('../js/areaTexto.jsx');
var CajaConCampos     = require('../js/cajaConCampos.jsx');
var InventarioLista   = require('../js/inventarioListadoProductos.jsx');
var InventarioDetalle = require('../js/inventarioDetalleProducto.jsx');

module.exports = React.createClass({

componentWillReceiveProps: function(nextProps) {

 	if(nextProps.datos.id !== undefined){
 		this.setState({
 					   id :     	nextProps.datos.id,	
 					   invoice:     nextProps.datos.invoice,
 					   pais:   	    nextProps.datos.proveedor.pais,
 					   comentarios: nextProps.datos.comentarios,
 					   descripcion: nextProps.datos.descripcion,
 					   listado_compra: nextProps.datos.compra_detalles,
 					   transporte:  nextProps.datos.transporte,
 					});

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
		"tentrada": 'False',
		"listado_compra": [],
		"transporte": "",
		"detalle_compra": {},
		"errores" :{},
	}
},
onValorCambio: function(campo,valor){
	var campos ={};
	campos[campo] = valor;
	this.setState(campos);
},
llenarCombos: function(){
	   	    var func = new FuncGenericas();      
			this.Paises = func.llenarComboGenerico(appmvc.Datos.PAISES);

			var entradas = [{cdu_catalogo: "",descripcion1: "NO ESPECIFICADO"},{cdu_catalogo: "True",descripcion1: "Con Comercializadora"},{cdu_catalogo: "False",descripcion1: "Sin Comercializadora"}]
			this.TipoEntrada = func.llenarComboGenerico(entradas);
  },
 onSeleccionFila: function(pk_detalle){
	console.log("Se selecciono una fila del hijo " + pk_detalle );
	var detalle = this.buscarDetalleEnFila(pk_detalle);	
	this.setState({detalle_compra: detalle});
	
	//id: 9, compra: 14, material: Object, dsc_material: "material 2", calibre: "1.000", ancho: "4.00", largo: 54, peso_kg: "6.00", peso_lb: "65.00", num_rollo:
},
buscarDetalleEnFila: function(pk_detalle){
	var detalle = {}
	this.state.listado_compra.filter(function(datos){

     if(datos.id === pk_detalle){
        detalle =datos;
      }
  });
	return detalle;
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
			<Titulo titulo='Invoice' />
			<CajaConCampos >
				<li className="li_bloque">
					<label className="etiquetas_bloque" for="invoice">Invoice</label>
					<label className="etiqueta_especial" for="">{ this.state.invoice}</label>
				</li>
				<Combo 	propiedades = {PAIS}   ref="ComboPais" key="Pais" />	
				<Combo 	propiedades = {TENTRADA}  ref="ComboTEntrada" key="TEntrada" />	
			</CajaConCampos>
			<br />
			<Titulo titulo='Otros Datos' />
			<CajaConCampos >
				<AreaTexto propiedades={DESCRIPCION} />
				<AreaTexto propiedades={COMENTARIOS} />
			</CajaConCampos>
			<br />
			<InventarioLista listado_compra={this.state.listado_compra} onSeleccionFila={this.onSeleccionFila} />			
		</article>
		<InventarioDetalle detalle_compra={this.state.detalle_compra}  transporte={this.state.transporte}/>
		<InventarioParam  pais={this.state.pais} conComercializadora={this.state.tentrada}/>
		
	</div>
		);  
	}
});