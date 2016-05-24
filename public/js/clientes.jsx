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
		relacionCampoErrores: function(){
			var dic_errores = {
				codigo:   {valor:this.state.codigo,  expreg:/^[a-zA-Z0-9\-().\s]{1,10}$/,     requerido: true,  mensaje:"Alfanumerico ,longitud [1-10]"},
				rfc:      {valor:this.state.rfc,     expreg:/^[a-zA-Z0-9\-().\s]{12,13}$/,    requerido: true,  mensaje:"Alfanumerico ,longitud [12-13]"},
				nombre:   {valor:this.state.nombre,  expreg:/^[a-zA-Z0-9\-().\s]{5,100}$/,    requerido: true,  mensaje:"Alfanumerico ,longitud [5-100]"},
				calle:    {valor:this.state.calle,   expreg:/^[a-zA-Z0-9\-().\s]{5,100}$/,    requerido: true,  mensaje:"Alfanumerico ,longitud [5-100]"},
				numero:   {valor:this.state.numero,  expreg:/^[a-zA-Z0-9\-().\s]{1,5}$/,      requerido: true,  mensaje:"Alfanumerico ,longitud [1-5]"},
				colonia:  {valor:this.state.colonia, expreg:/^[a-zA-Z0-9\-().\s]{1,50}$/,     requerido: true,  mensaje:"Alfanumerico ,longitud [0-50]"},
				cp:       {valor:this.state.cp,      expreg:/^[0-9\-().\s]{1,10}$/,           requerido: true,  mensaje:"Numerico ,longitud [0-10]"},		
			    telefono: {valor:this.state.telefono,expreg:/^[0-9\-().\s]{10,15}$/,          requerido: true, mensaje:"Numerico  ,longitud [10-15]"},
			    email:    {valor:this.state.email,   expreg:/^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,    requerido: true, mensaje:"El email no es valido"},		
				 }
		    return dic_errores;
		},

		validadarCampos: function()
		{
			var dic_err = this.relacionCampoErrores();
		    for(var key in dic_err){
		    	var valor  = dic_err[key].valor;
		    	var exp    = dic_err[key].expreg;
		    	var requer = dic_err[key].requerido;
		    	var mens   = dic_err[key].mensaje;
		    	if(exp.test(valor) || (valor==="" && requer===false))
				{
					this.errors[key] = "";
				}
				else
				{
					this.errors[key] = mens;
				}
			}
		},
		hayErrores: function(){
			for(var key in this.errors){
				if(this.errors[key].trim() !==""){
					return true;
				}
			}
			return false;
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
			this.errors = this.errors || {};
            this.validadarCampos();

	        var dic1 =                      ["id",      "titulo",      "textoIndicativo" ,    "valor",          "onChange"            , "error" ];
			var CODIGO   = func.zipCol(dic1,["codigo",  "Código",        "Código",        this.state.codigo ,   this.onValorCambio  , this.errors.codigo ]);
            var RFC      = func.zipCol(dic1,["rfc",     "RFC",           "RFC",           this.state.rfc,       this.onValorCambio  , this.errors.rfc]);
            var NOMBRE   = func.zipCol(dic1,["nombre",  "Nombre",        "Nombre",        this.state.nombre,    this.onValorCambio  , this.errors.nombre]);
            var CALLE    = func.zipCol(dic1,["calle",   "Calle",         "Calle",         this.state.calle,     this.onValorCambio  , this.errors.calle ]);
			var NUMERO   = func.zipCol(dic1,["numero",  "Número",        "Número",        this.state.numero,    this.onValorCambio  , this.errors.numero]);
			var COLONIA  = func.zipCol(dic1,["colonia", "Colonia",       "Colonia",       this.state.colonia,   this.onValorCambio  , this.errors.colonia]);
			var CP       = func.zipCol(dic1,["cp",      "Código Postal", "Código Postal", this.state.cp,        this.onValorCambio  , this.errors.cp]);
			var TELEFONO = func.zipCol(dic1,["telefono","Teléfono",      "Teléfono",      this.state.telefono,  this.onValorCambio  , this.errors.telefono ]);
   			var EMAIL     = func.zipCol(dic1,["email",  "e-mail",        "e-mail",        this.state.email,     this.onValorCambio  , this.errors.email]);

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