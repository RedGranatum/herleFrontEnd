var ApiRestCatalogo = require('../js/modelos/apirestCatalogos');
var CajaDeTexto 	= require('../js/cajaDeTexto.jsx');
var Combo 	    	= require('../js/combo.jsx');
var FuncGenericas   = require('../js/funcionesGenericas');
var OpcionCombo 	= require('../js/opcionCombo.jsx');
var React 			= require('react');
var ReactDOM    	= require('react-dom');
var ApiRestInventario  		   = require('../js/modelos/apirestInventarios');
var InventarioPrecios 		   = require('../js/inventarioCalculoPrecios.jsx');

module.exports = React.createClass({
	   componentWillReceiveProps: function(nuevas_props){
	   	detalle = nuevas_props.detalle;
	   	cabecero = nuevas_props.cabecero;
		parametros_cal = nuevas_props.parametros_cal;
			con_valores = Object.keys(detalle).length > 0 
			
			var valoresDefecto  = this.valoresDefecto();
			var cdu_material = valoresDefecto.material
			var calibre = valoresDefecto.calibre;
			var ancho   = valoresDefecto.ancho;
			var largo   = valoresDefecto.largo;

		    var num_rollo = valoresDefecto.num_rollo;
		    var peso_kg = valoresDefecto.peso_kg;
		    var peso_lb = valoresDefecto.peso_lb;

			var transporte = valoresDefecto.transporte;

			var pais = valoresDefecto.pais

			var precio_libra = valoresDefecto.precio_libra
			var factor = valoresDefecto.factor
			var precio_dolar = valoresDefecto.precio_dolar
			var factor_impuesto = valoresDefecto.factor_impuesto
 			var precio_tonelada = valoresDefecto.precio_tonelada
			var porc_comercializadora = valoresDefecto.porc_comercializadora

			if(con_valores){
				cdu_material = detalle.material.cdu_catalogo
				calibre = detalle.calibre;
				ancho   = detalle.ancho;
				largo   = detalle.largo;

				num_rollo = detalle.num_rollo;
		    	peso_kg   = detalle.peso_kg;
		    	peso_lb   = detalle.peso_lb;

				transporte = cabecero.transporte;

				pais       = cabecero.proveedor.pais;

				precio_libra = parametros_cal.precio_libra;
				factor       = parametros_cal.factor;
				precio_dolar =  parametros_cal.precio_dolar;
				factor_impuesto = parametros_cal.factor_impuesto_eu;
		        precio_tonelada = parametros_cal.precio_tonelada

				porc_comercializadora = parametros_cal.porc_comercializadora;
			}
		    var codigo =this.calcularCodigoDelProducto(calibre,cdu_material,ancho,largo);
		
			this.setState({ material: cdu_material, 
				            calibre:calibre, 
				            ancho:ancho, 
				            largo:largo,
				            codigo_producto: codigo,
				            num_rollo: num_rollo,
				            peso_kg: peso_kg,
				            peso_lb: peso_lb,

				            transporte: transporte,
				            pais: pais,

				            precio_libra:precio_libra,
				            factor:factor,
				            precio_dolar:precio_dolar,
				            factor_impuesto:factor_impuesto,
				            porc_comercializadora:porc_comercializadora,
				            precio_tonelada:precio_tonelada});
		},

		llenarCombos: function(){
	   	    var func = new FuncGenericas();      
			this.Paises = func.llenarComboGenerico(appmvc.Datos.PAISES);
	   		this.Materiales = func.llenarComboGenerico(appmvc.Datos.MATERIALES);
	   },
	   componentDidMount:function(){
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
		        "num_rollo" : "",
		        "peso_kg" : "0.0",
		        "peso_lb" : "0.0",

		        "transporte": "",

		        "pais" : "0010000",

		        "precio_libra" : "0.0",
		        "factor" : "0",
		        "precio_dolar" : "0.0",
		        "factor_impuesto" : "0.0",
		        "precio_tonelada" : "0,0",
				"con_comercializadora" : "False",
		        "porc_comercializadora": "0",

		        "errores" :{},
			};
		},
		
		onValorCambio: function(campo,valor){
			var campos ={};
			campos[campo] = valor;
			this.setState(campos);
			if(campo === "material"){
				this.calcularCodigoDelProductoConStates(valor);
			}
			if(campo === "pais"){
				this.calcularFormulaConStates(valor);
			}
		},
		onValorCambioComer: function(campo,valor){
			var bln_com = (campo.target.value==="con_comercializadora") ? "True" : "False"
			this.setState({con_comercializadora: bln_com})	
		},
		calcularCodigoDelProducto: function(rango,cdu_material,ancho,largo){
		   var self = this;
		   var inv = new ApiRestInventario();
		   inv.rango 		= rango;
		   inv.cdu_material = cdu_material;
		   inv.ancho  		= ancho;
		   inv.largo        = largo;

		   inv.obtenerCodigoDelProducto( 
		        function(data){
		        		self.setState({codigo_producto:data});
		            },
		        function(model,response,options){
		        		self.setState({codigo_producto:""});
		            }
		    );
		 }, 
		onBlurCaja: function(control, valor){
				var camposCodigo = ["calibre", "ancho", "largo", "material"];
				var indice = camposCodigo.indexOf(control); 
				if(indice>=0){
					this.calcularCodigoDelProductoConStates();
				}
		},
		calcularCodigoDelProductoConStates: function(material_cambio){
			material = material_cambio === undefined ? this.state.material : material_cambio;
			this.calcularCodigoDelProducto(this.state.calibre,
						  material,
						  this.state.ancho,
						  this.state.largo);
		},		
		render: function () {
		   valoresCalculo = {
			    cdu_pais: this.state.pais,
			    precio_tonelada_dolar: this.state.precio_tonelada,
  			  	precio_libra_centavos: this.state.precio_libra,
  		   		factor: this.state.factor,
	   	 	    precio_dolar: this.state.precio_dolar,
  		   		factor_impuesto: this.state.factor_impuesto,
  		   		con_comercializadora : this.state.con_comercializadora,
  		   		porc_comercializadora: this.state.porc_comercializadora}


		    func = new FuncGenericas();
	        var dic1 =                      ["id",      "titulo",      "textoIndicativo" ,    "valor",             "onChange"      , "onBlur"				 , "error"];
			var CALIBRE   = func.zipCol(dic1,["calibre",  "Calibre", 	 "calibre", 		  this.state.calibre,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.material ] );
			var ANCHO    = func.zipCol(dic1,["ancho",     "Ancho",  	 "ancho",	          this.state.ancho ,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.calibre ]);
			var LARGO   = func.zipCol(dic1,["largo",      "Largo", 	     "largo",  	          this.state.largo,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.ancho ]);

			var NUM_ROLLO = func.zipCol(dic1,["num_rollo",  "num_rollo", 	"num_rollo", this.state.num_rollo,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.num_rollo ]);
			var PESO_KG = func.zipCol(dic1,["peso_kg",  "peso_kg", 	"peso_kg", this.state.peso_kg,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.peso_kg ]);
			var PESO_LB = func.zipCol(dic1,["peso_lb",  "peso_lb", 	"peso_lb", this.state.peso_lb,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.peso_lb ]);

			var TRANSPORTE   = func.zipCol(dic1,["transporte",  "transporte", 	"transporte", this.state.transporte,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.transporte ]);

			var PRECIO_LIBRA  = func.zipCol(dic1,["precio_libra",  "precio_libra", 	"precio_libra", this.state.precio_libra,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.precio_libra ]);
			var FACTOR        = func.zipCol(dic1,["factor",  "factor", 	"factor", this.state.factor,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.factor ]);
			var PRECIO_DOLAR  = func.zipCol(dic1,["precio_dolar",  "precio_dolar", 	"precio_dolar", this.state.precio_dolar,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.precio_dolar ]);
			var FACTOR_IMPUESTO  = func.zipCol(dic1,["factor_impuesto",  "factor_impuesto", "factor_impuesto", this.state.factor_impuesto,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.factor_impuesto ]);
			var PORC_COMERCIALIZADORA  = func.zipCol(dic1,["porc_comercializadora",  "porc_comercializadora", "porc_comercializadora", this.state.porc_comercializadora,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.porc_comercializadora ]);

    	    var dic2 =                      ["id",       "titulo",   "children" ,              "seleccionado",        "onChange"     ];
		   	var MATERIAL     = func.zipCol(dic2,["material",     "Material",    this.Materiales,  this.state.material,    this.onValorCambio]);
 			var PAIS     = func.zipCol(dic2,["pais",     "Origen producto",    this.Paises,               this.state.pais,    this.onValorCambio]);
		   		
		   	var mostrar =  (Object.keys(this.props.detalle).length > 0) ? 'inline-block' : 'none';
		   	var style = {display: mostrar}
			return (
		<div style={style}>
			<article className="bloque" id="el_top">
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
					{this.state.codigo_producto}
				</div>
			<br />
			<div className="titulo_bloque">
				Rollo
			</div>
			<div className="caja_bloque">
				<div className="campos_bloque">
					<ul className="ul_bloque">
						<CajaDeTexto propiedades = {NUM_ROLLO} ref="cajaNumRollo"/>
						<CajaDeTexto propiedades = {PESO_KG} ref="cajaPesoKg"/>
						<CajaDeTexto propiedades = {PESO_LB} ref="cajaPesoLb"/>
						<CajaDeTexto propiedades = {TRANSPORTE} ref="cajaTransporte"/>
					</ul>
				</div>
			</div>
			</article>	
			<article className="bloque" id="el_top">
			<div className="titulo_bloque">
				Origen Producto
			</div>
			<div className="caja_bloque">
				<div className="campos_bloque">
					<ul className="ul_bloque">
						<Combo 		 propiedades = {PAIS}   ref="ComboPais" key="Pais"  />
				<li className="li_bloque">
							<label className="etiquetas_bloque" for="tipo_entrada">Tipo de entrada</label>
							<select name="tipo_entrada" className="select_bloque" onChange={this.onValorCambioComer}>
								<option value="no_especificado">NO ESPECIFICADO</option>
								<option value="con_comercializadora">Con Comercializadora</option>
								<option value="sin_comercializadora">Sin Comercializadora</option>
							</select>
							<div className="viñeta">*</div>
							<div className="error_ocultar">mensaje de error del campo</div>
						</li>
					</ul>
				</div>
			</div>
			<br />
			<div className="titulo_bloque">
				Sin Comercializadora
			</div>
			<div className="caja_bloque">
				<div className="campos_bloque">
					<ul className="ul_bloque">
							<CajaDeTexto propiedades = {PRECIO_LIBRA} ref="cajaPrecioLibra"/>
							<CajaDeTexto propiedades = {FACTOR} ref="cajaFactor"/>
							<CajaDeTexto propiedades = {PRECIO_DOLAR} ref="cajaPrecioDolar"/>
							<CajaDeTexto propiedades = {FACTOR_IMPUESTO} ref="cajaFactorImpuesto"/>
					</ul>
				</div>
			</div>
			<div className="titulo_bloque">
				Con Comercializadora
			</div>
			<div className="caja_bloque">
				<div className="campos_bloque">
					<ul className="ul_bloque">
						<CajaDeTexto propiedades = {PORC_COMERCIALIZADORA} ref="cajaPorcentajeComerzializadora"/>
					</ul>
				</div>
			</div>

			</article>
			<InventarioPrecios valores={valoresCalculo}/>
		</div>
					);  
		}
	});



