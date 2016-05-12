var ApiRestCatalogo = require('../js/modelos/apirestCatalogos');
var CajaDeTexto 	= require('../js/cajaDeTexto.jsx');
var Combo 			= require('../js/combo.jsx');
var FuncGenericas   = require('../js/funcionesGenericas')
var OpcionCombo 	= require('../js/opcionCombo.jsx');
var React 			= require('react');
var ReactDOM 		= require('react-dom') ;


module.exports = React.createClass({
	componentWillReceiveProps: function(nuevas_props){
		 func = new FuncGenericas();
		  func.llenarNuevasPropiedades(nuevas_props,this);
		  if(nuevas_props.datos.pais!==undefined){
	   	  		this.onValorCambio("pais",nuevas_props.datos.pais);
		  }
	   }, 
	   llenarCombos: function(){    
	        var func = new FuncGenericas();      
	   		 this.Paises = func.llenarComboGenerico(appmvc.Datos.PAISES);
	   		 this.Bancos = func.llenarComboGenerico(appmvc.Datos.BANCOS)

	  	    this.Estados = [];

			this.buscarEstados(this.state.pais);           
	   },
	  componentWillMount:function(){
	  	    //Cuando refrescan la pagina tarda en cargar los paises
	   		 if(appmvc.Datos.PAISES===null){
	   	   		setTimeout(this.llenarCombos,2000);
	   		 }
	   		 else{
	   			this.llenarCombos();
	   		}
	   },
	   	getInitialState: function(){
			return this.valoresDefecto();
		},
		nuevosDatos: function(){
			//Esta funcion la llama el formulario app.jsx para obtener los datos a guardar
			datosNuevos ={}
			for(var key in this.valoresDefecto()){
				datosNuevos[key] = this.state[key];
			}

			// Esta lineas es temporal, mientras encuentro porque el estado no se actualiza como los demas campos
			var combo = ReactDOM.findDOMNode(this.refs.ComboEstados);
			var b=combo.getElementsByClassName("select_bloque");
			console.log("estado: "+ this.state.estado + "  combo: " + b.estado.value);
			datosNuevos["estado"] = b.estado.value;
			return datosNuevos;
		},
		valoresDefecto: function(){
			return{
				id: -1,
				codigo: "",
				nombre: "",
				rfc: "",
				calle: "",                                                                     
				numero: "",
                colonia: "",
                cp: "",
                telefono: "" ,
                email: "",
                comentarios: "",
                pais: "0010001",
                estado: "0020001",
                banco: "0030000" 
			};	
		},
		onValorCambio: function(campo,valor){
			var campos ={};
			if(campo ==="comentarios"){
				valor= valor.target.value;
			}
		  	if(campo === "pais"){
		  		this.buscarEstados(valor);
		  	}
			campos[campo] = valor;
			this.setState(campos);
		},
		relacionEstados: function(data)
		{
			 var func = new FuncGenericas();      
	   		 var Estados = func.llenarComboGenerico(data);
	        		
	         this.setState({llenarEstados: Estados});
	    },
      buscarEstados: function(cdu_pais){
            var self = this;
            datosCatalogo = new  ApiRestCatalogo();
            datosCatalogo.buscarDetallesPorCduDefault(cdu_pais
            			,this.relacionEstados
                        ,function(model,response,options){
                            console.log("hay errores " + response.statusText)
                           }
                    );
       },
		render: function () {
			func = new FuncGenericas();
			
	        var dic1 =                      ["id",      "titulo",      "textoIndicativo" ,    "valor",          "onChange"     ];
			var CODIGO   = func.zipCol(dic1,["codigo",  "Codigo",        "Codigo",        this.state.codigo ,   this.onValorCambio]);
            var NOMBRE   = func.zipCol(dic1,["nombre",  "Nombre",        "Nombre",        this.state.nombre,    this.onValorCambio]);
            var RFC      = func.zipCol(dic1,["rfc",     "RFC",           "RFC",           this.state.rfc,       this.onValorCambio]);
            var CALLE    = func.zipCol(dic1,["calle",   "Calle",         "Calle",         this.state.calle,     this.onValorCambio]);
			var NUMERO   = func.zipCol(dic1,["numero",  "Número",        "Número",        this.state.numero,    this.onValorCambio]);
			var COLONIA  = func.zipCol(dic1,["colonia", "Colonia",       "Colonia",       this.state.colonia,   this.onValorCambio]);
			var CP       = func.zipCol(dic1,["cp",      "Código Postal", "Código Postal", this.state.cp,        this.onValorCambio]);
			var TELEFONO = func.zipCol(dic1,["telefono","Teléfono",      "Teléfono",      this.state.telefono,  this.onValorCambio]);
   			var EMAIL     = func.zipCol(dic1,["email",  "e-mail",        "e-mail",        this.state.email,     this.onValorCambio]);

   			var dic2 =                      ["id",       "titulo",   "children" ,              "seleccionado",        "onChange"     ];
		   	var PAIS     = func.zipCol(dic2,["pais",     "País",      this.Paises,               this.state.pais,    this.onValorCambio]);
         	var ESTADO   = func.zipCol(dic2,["estado",   "Estado",      this.state.llenarEstados,  this.state.estado,  this.onValorCambio]);
            var BANCOS	 =	func.zipCol(dic2,["banco",     "Banco",      this.Bancos,            this.state.banco,    this.onValorCambio]);  
			return (
<article className="bloque">
			<div className="titulo_bloque">
				Cliente
			</div>
			<div className="caja_bloque">
				<div className="campos_bloque">
					<ul className="ul_bloque">
					    <CajaDeTexto propiedades={CODIGO} />
						<CajaDeTexto propiedades={RFC}/>
						<CajaDeTexto propiedades={NOMBRE} />
						<CajaDeTexto propiedades={CALLE} />
						<CajaDeTexto propiedades={NUMERO} />
                        <CajaDeTexto propiedades={COLONIA} />
                        <CajaDeTexto propiedades={CP} />
                        <Combo propiedades={PAIS}/>
                         <Combo propiedades = {ESTADO} ref="ComboEstados" />
                        <CajaDeTexto propiedades={TELEFONO} />
                        <CajaDeTexto propiedades={EMAIL}/>
                        <Combo  propiedades={BANCOS}/>
                        <li className="li_bloque">
							<label className="etiquetas_bloque" htmlFor="comentarios_c">Comentarios</label>
							<textarea className="textarea_bloque" name="comentarios_c" placeholder="Comentarios" value={this.state.comentarios} onChange={this.onValorCambio.bind(this,'comentarios')} ></textarea>
						</li>  
					</ul>
				</div>
			</div>
		</article>
             
                
			);  
		}
});