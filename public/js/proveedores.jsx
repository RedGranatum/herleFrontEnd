var React 			= require('react');
var CajaDeTexto 	= require('../js/cajaDeTexto.jsx');
var OpcionCombo 	= require('../js/opcionCombo.jsx');
var Combo 	    	= require('../js/combo.jsx');
var ReactDOM    	= require('react-dom') ;
var ApiRestCatalogo = require('../js/modelos/apirestCatalogos');

//var CatalogoApiRest   = require('../js/modelos/catalogoApiRest');

module.exports = React.createClass({
	   componentWillReceiveProps: function(nuevas_props){
	   	  var campos = {}
	   	  var nuevaPropiedades = nuevas_props.datos
	   
	     if(nuevas_props.datos.id === undefined){
	       	nuevaPropiedades = this.valoresDefecto()
	      }
		  for(var key in nuevaPropiedades){
		   	  	campos[key] =  nuevaPropiedades[key];
	   		 }
	   		
	   	  this.setState(campos);
	   	  this.onValorCambio("pais",nuevaPropiedades.pais)
	   	   
	   },
	   llenarCombos: function(){
		this.Paises = appmvc.Datos.PAISES.map(function(tupla) {
		  return (
        		<OpcionCombo key={tupla.cdu_catalogo} valorOpcion={tupla.cdu_catalogo} tituloOpcion={tupla.descripcion1} />
      		  );
    		});
	   	  	this.Estados = [];

			this.buscarEstados(this.state.pais);
	   },
	   componentDidMount:function(){
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
		        "id": -1,
		        "codigo": "",
		        "nombre": "",
		        "calle": "",
		        "numero": "",
		        "cp": "",
		        "pais":   "0010001",
		        "estado": "0020001",
		        "rfc": "",
		        "telefono": "",
		        "email": "",
		        "comentarios": "",
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
		   var Estados = data.map(function(tupla) {
				   return (
				   			<OpcionCombo key={tupla.cdu_catalogo} valorOpcion={tupla.cdu_catalogo} tituloOpcion={tupla.descripcion1} />
		      		  	  );
		    		 });
	        		
	        this.setState({llenarEstados: Estados});
	    		},
	  buscarEstados: function(cdu_pais){
            var self = this;
            datosCatalogo = new  ApiRestCatalogo();
            datosCatalogo.buscarDetallesPorCduDefault(cdu_pais
            			,this.relacionEstados
                        ,function(model,response,options){
                        	debugger;
                            console.log("hay errores " + response.statusText)
                                      }
                        );
       },
      zipCol: function(columnas,valores){
      		diccionario = {};
      		for(var col in columnas){
      			diccionario[columnas[col]] = valores[col];
      		}
      		return diccionario;
      },
		render: function () {

	        var dic1 =                      ["id",      "titulo",      "textoIndicativo" ,    "valor",             "onChange"    ];
			var CODIGO   = this.zipCol(dic1,["codigo",  "Codigo",        "Codigo",        this.state.codigo,   this.onValorCambio]);
			var NOMBRE   = this.zipCol(dic1,["nombre",  "Nombre", 	     "Nombre", 		  this.state.nombre,   this.onValorCambio]);
			var CALLE    = this.zipCol(dic1,["calle",   "Calle",  	     "Calle",	      this.state.calle ,   this.onValorCambio]);
			var NUMERO   = this.zipCol(dic1,["numero",  "Número", 	     "Número",  	  this.state.numero,   this.onValorCambio]);
			var CP       = this.zipCol(dic1,["cp",      "Código Postal", "codigo_postal", this.state.cp ,      this.onValorCambio]);
			var RFC      = this.zipCol(dic1,["rfc",     "RFC",           "RFC",			  this.state.rfc ,     this.onValorCambio]);
			var TELEFONO = this.zipCol(dic1,["telefono","Teléfono",      "Teléfono",	  this.state.telefono, this.onValorCambio]);
		    var EMAIL    = this.zipCol(dic1,["email",   "e-mail",        "e-mail",		  this.state.email,    this.onValorCambio]);

    	    var dic2 =                      ["id",       "titulo",   "children" ,              "seleccionado",        "onChange"     ];
		   	var PAIS     = this.zipCol(dic2,["pais",     "País",    this.Paises,               this.state.pais,    this.onValorCambio]);
		   	var ESTADO   = this.zipCol(dic2,["estado",   "Estado",  this.state.llenarEstados,  this.state.estado,  this.onValorCambio]);

			return (
<article className="bloque" >
			<div className="titulo_bloque">
				Proveedor
			</div>
			<div className="caja_bloque">
				<div className="campos_bloque">
					<ul className="ul_bloque">
  			            <CajaDeTexto propiedades = {CODIGO}  />
  			            <CajaDeTexto propiedades = {RFC} ref="cajaRfc"/>
  			           	<CajaDeTexto propiedades = {NOMBRE} ref="cajaNombre"/>
  			           	<CajaDeTexto propiedades = {CALLE}  ref="cajaCalle" />
						<CajaDeTexto propiedades = {NUMERO}/>
						<CajaDeTexto propiedades = {CP}/>
						<Combo 		 propiedades = {PAIS}   ref="ComboPais" key="Pais"  />
	  				    <Combo 		 propiedades = {ESTADO} ref="ComboEstados" />
						<CajaDeTexto propiedades = {TELEFONO}/>
						<CajaDeTexto propiedades = {EMAIL}/>
						<li className="li_bloque">
							<label className="etiquetas_bloque" htmlFor="comentarios">Comentarios</label>
							<textarea className="textarea_bloque" name="comentarios" placeholder="Comentarios" value={this.state.comentarios} onChange={this.onValorCambio.bind(this,'comentarios')}></textarea>
						</li>
					

					</ul>
				</div>


			</div>
		</article>
					);  
		}
	});



