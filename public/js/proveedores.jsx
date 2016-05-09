var React=require('react');
var CajaDeTexto=require('../js/cajaDeTexto.jsx');
var OpcionCombo=require('../js/opcionCombo.jsx');
var Combo=require('../js/combo.jsx');
var ReactDOM = require('react-dom') ;
var CatalogoApiRest   = require('../js/modelos/catalogoApiRest');

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
	   componentWillMount:function(){
	   	  this.catalogoApiRest = new CatalogoApiRest();
	   		this.Paises = this.props.paises.map(function(tupla) {
		  return (
        		<OpcionCombo key={tupla.cdu_catalogo} valorOpcion={tupla.cdu_catalogo} tituloOpcion={tupla.descripcion1} />
      		  );
    		});
    		this.Estados = [];

			this.buscarEstados(this.state.pais);
            
           
	   },
		getInitialState: function(){
			return this.valoresDefecto();
			
		},
		valoresDefecto: function(){
			return{
		        "id": -1,
		        "codigo": "",
		        "nombre": "",
		        "calle": "",
		        "numero": "",
		        "cp": "",
		        "pais": "0010001",
		        "estado": "0020000",
		        "rfc": "",
		        "telefono": "",
		        "email": "",
		        "comentarios": "",
        		llenarEstados: [],
			};
		},
		onValorCambio: function(campo,valor){
			var campos ={};
			if(campo ==="comentarios"){
				valor= valor.target.value;
			}
			campos[campo] = valor;
			this.setState(campos);

		  	if(campo === "pais"){
		  		this.buscarEstados(valor);
		  	}

		},
		relacionEstados: function(data)
		{
		   var Estados = data.map(function(tupla) {
				   return (
				   			<OpcionCombo key={tupla.cdu_catalogo} valorOpcion={tupla.cdu_catalogo} tituloOpcion={tupla.descripcion1} />
		      		  	  );
		    		 });
	        		
	        this.setState({llenarEstados: Estados});
	        this.setState({estado: this.props.datos.estado});
		},
	  buscarEstados: function(pais){
			this.catalogoApiRest.DetallesPorCduDefault(pais,this.relacionEstados,
						function(model,response,options){
							console.log("hay errores " + response.statusText)
						});
      },
      zipCol: function(columnas,valores){
      		diccionario = {};
      		for(var col in columnas){
      			diccionario[columnas[col]] = valores[col];
      		}
      		return diccionario;
      },
		render: function () {

	        var dic1 =                      ["id",      "titulo",      "textoIndicativo" ,    "valor",             "onChange"     ];
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
  			           	<CajaDeTexto propiedades = {NOMBRE} ref="cajaNombre"/>
						<CajaDeTexto propiedades = {CALLE}  ref="cajaCalle" />
						<CajaDeTexto propiedades = {NUMERO}/>
						<CajaDeTexto propiedades = {CP}/>
						<Combo 		 propiedades = {PAIS}   ref="ComboPais" key="Pais"  />
	  				    <Combo 		 propiedades = {ESTADO} />
 						<CajaDeTexto propiedades = {RFC} />
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



