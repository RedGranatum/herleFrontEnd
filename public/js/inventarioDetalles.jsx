var ApiRestCatalogo = require('../js/modelos/apirestCatalogos');
var CajaDeTexto 	= require('../js/cajaDeTexto.jsx');
var Combo 	    	= require('../js/combo.jsx');
var FuncGenericas   = require('../js/funcionesGenericas');
var OpcionCombo 	= require('../js/opcionCombo.jsx');
var React 			= require('react');
var ReactDOM    	= require('react-dom');
var ApiRestInventario  = require('../js/modelos/apirestInventarios');


module.exports = React.createClass({
	   componentWillReceiveProps: function(nuevas_props){
			detalle = nuevas_props.detalle;
			con_valores = Object.keys(detalle).length > 0 
			
			var valoresDefecto  = this.valoresDefecto();
			var cdu_material = valoresDefecto.material
			var calibre = valoresDefecto.calibre;
			var ancho   = valoresDefecto.ancho;
			var largo   = valoresDefecto.largo;

			
			if(con_valores){
				cdu_material = detalle.material.cdu_catalogo
				calibre = detalle.calibre;
				ancho   = detalle.ancho;
				largo   = detalle.largo;
			}
		    var codigo =this.calcularCodigoDelProducto(calibre,cdu_material,ancho,largo);
		

			this.setState({ material: cdu_material, 
				            calibre:calibre, 
				            ancho:ancho, 
				            largo:largo,
				            codigo_producto: codigo});
	
		},
		llenarCombos: function(){
	   	    var func = new FuncGenericas();      
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
		        "errores" :{},
			};
		},
		onValorCambio: function(campo,valor){
			var campos ={};
			campos[campo] = valor;
			this.setState(campos);
			if(campo === "material"){
				debugger;
			}
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
					this.calcularCodigoDelProducto(this.state.calibre,
											  this.state.material,
											  this.state.ancho,
											  this.state.largo);
				}
		},
		render: function () {
            func = new FuncGenericas();
	        var dic1 =                      ["id",      "titulo",      "textoIndicativo" ,    "valor",             "onChange"      , "onBlur"				 , "error"];
			var CALIBRE   = func.zipCol(dic1,["calibre",  "Calibre", 	 "calibre", 		  this.state.calibre,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.material ] );
			var ANCHO    = func.zipCol(dic1,["ancho",     "Ancho",  	 "ancho",	          this.state.ancho ,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.calibre ]);
			var LARGO   = func.zipCol(dic1,["largo",      "Largo", 	     "largo",  	          this.state.largo,   this.onValorCambio  , this.onBlurCaja,  this.state.errores.ancho ]);

    	    var dic2 =                      ["id",       "titulo",   "children" ,              "seleccionado",        "onChange"     ];
		   	var MATERIAL     = func.zipCol(dic2,["material",     "Material",    this.Materiales,  this.state.material,    this.onValorCambio]);
 		
			return (
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
			</article>	
					);  
		}
	});



