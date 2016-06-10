var ApiRestCatalogo = require('../js/modelos/apirestCatalogos');
var CajaDeTexto 	= require('../js/cajaDeTexto.jsx');
var Combo 	    	= require('../js/combo.jsx');
var FuncGenericas   = require('../js/funcionesGenericas');
var OpcionCombo 	= require('../js/opcionCombo.jsx');
var React 			= require('react');
var ReactDOM    	= require('react-dom') ;

module.exports = React.createClass({
		llenarCombos: function(){
	   	    var func = new FuncGenericas();      
	   		this.Materiales = func.llenarComboGenerico(appmvc.Datos.MATERIALES);
	   },
	   componentDidMount:function(){
	   		debugger;
			this.llenarCombos();
	   },
		getInitialState: function(){
			return this.valoresDefecto();		
		},
		valoresDefecto: function(){
			return{
		        "id": -1,
		        "material": "0050000",
		        "calibre": "0.0",
		        "ancho": "0.0",
		        "largo": "0",
		        "codigo_producto": "",
		        "errores" :{},
			};
		},
		render: function () {
            func = new FuncGenericas();
	        var dic1 =                      ["id",      "titulo",      "textoIndicativo" ,    "valor",             "onChange"      , "onBlur"				 , "error"];
			var CALIBRE   = func.zipCol(dic1,["calibre",  "Calibre", 	 "calibre", 		  this.state.calibre,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.material ] );
			var ANCHO    = func.zipCol(dic1,["ancho",     "Ancho",  	 "ancho",	          this.state.ancho ,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.calibre ]);
			var LARGO   = func.zipCol(dic1,["largo",      "Largo", 	     "largo",  	          this.state.largo,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.ancho ]);

    	    var dic2 =                      ["id",       "titulo",   "children" ,              "seleccionado",        "onChange"     ];
		   	var MATERIAL     = func.zipCol(dic2,["material",     "Material",    this.Materiales,  this.state.material,    this.onValorCambio]);
 		    
 		
 			debugger;

			return (
		<section className="contenido" id="el_top">
			<article className="bloque">
				<div className="titulo_bloque">
					Producto
				</div>
				<div className="caja_bloque">
					<div className="campos_bloque">
						<ul className="ul_bloque">
							<li className="li_bloque">
								<Combo 		 propiedades = {MATERIAL}   ref="ComboMaterial" key="Material" />	
								<CajaDeTexto propiedades = {CALIBRE} ref="cajaCalibre"/>
								<CajaDeTexto propiedades = {ANCHO} ref="cajaAncho"/>
								<CajaDeTexto propiedades = {LARGO} ref="cajaLargo"/>
							</li>
						</ul>
					</div>
				</div>
				<div className="titulo_resalta">
					Código Producto
				</div>
			</article>
		</section>	
					);  
		}
	});



