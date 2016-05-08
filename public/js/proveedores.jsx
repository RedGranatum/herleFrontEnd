var React=require('react');
var CajaDeTexto=require('../js/cajaDeTexto.jsx');
var OpcionCombo=require('../js/opcionCombo.jsx');
var Combo=require('../js/combo.jsx');
var RutasApiRest   = require('../js/modelos/rutaApiRest');
var ReactDOM = require('react-dom') ;


module.exports = React.createClass({
	   componentWillReceiveProps: function(nuevas_props){
	   	  console.log(nuevas_props);
	   	   this.onNombreChange(nuevas_props.datos.nombre);
	   	   this.onCalleChange(nuevas_props.datos.calle);
	       this.onNumeroChange(nuevas_props.datos.numero);
	       this.onCpChange(nuevas_props.datos.cp);
	       this.onRfcChange(nuevas_props.datos.rfc);
	       this.onTelefonoChange(nuevas_props.datos.telefono);
	       this.onEmailChange(nuevas_props.datos.email);
	       this.onCodigoChange(nuevas_props.datos.codigo)
		   this.onComentariosChange(nuevas_props.datos.comentarios)
		   this.onComboChange("pais",nuevas_props.datos.pais)
		   this.onComboEstado(nuevas_props.datos.estado)
				   	     	   	     
	   },
	   componentWillMount:function(){
	   		this.Paises = this.props.paises.map(function(tupla) {
		  return (
        		<OpcionCombo key={tupla.cdu_catalogo} valorOpcion={tupla.cdu_catalogo} tituloOpcion={tupla.descripcion1} />
      		  );
    		});
    		this.Estados = [];
			this.buscarEstados(this.state.pais);
	   },
		getInitialState: function(){
			return{
				nombre : '',
				calle : '',
				pais: '0010003',
				llenarEstados: [],
			};
		},
		onCodigoChange: function(valor){
			this.setState({codigo: valor});
		},
 		 onNombreChange: function(valor){
 		 	 this.setState({nombre: valor});
		  },
		  onCalleChange: function(valor){
  		 	 this.setState({calle: valor});
		  },
		  onNumeroChange: function(valor){
  		 	 this.setState({numero: valor});
		  },
		    onCpChange: function(valor){
  		 	 this.setState({cp: valor});
		  },
		    onRfcChange: function(valor){
  		 	 this.setState({rfc: valor});
		  },
		    onTelefonoChange: function(valor){
  		 	 this.setState({telefono: valor});
		  },
	     onEmailChange: function(valor){
  		 	 this.setState({email: valor});
		  },
		  onComentariosChange: function(valor){
		  	 this.setState({comentarios: valor});
		  },
		  onComboChange: function(combo,valor){
		  	console.log("cambio " + combo + " a " + valor);
		  	if(combo === "pais"){
		  		this.setState({pais: valor})
		  		this.buscarEstados(valor);
		  	}
		  },
		  onComboEstado: function(combo,valor){
		  	this.setState({estado: valor});
		  	console.log("cambio el estado "+valor)
		  },
		buscarEstados: function(pais){
          var self=  this;
            this.rutaBusqueda  = new RutasApiRest(pais);
            console.log("ESTA BUSCANDO ..." + pais)
            
      //       var combo = document.getElementById("comboEstadosProveedores")
      //       if(combo !==null){
	 			 // ReactDOM.unmountComponentAtNode(combo);
      //       }

            this.rutaBusqueda.buscarDetallesPorCduDefault(pais);
            this.rutaBusqueda.fetch({
               success: function(data){
                          //self.state.llenarEstados =  data.toJSON();

                      var Estados = data.toJSON().map(function(tupla) {
					  return (
	        				<OpcionCombo key={tupla.cdu_catalogo} valorOpcion={tupla.cdu_catalogo} tituloOpcion={tupla.descripcion1} />
	      		  			);
	    				});
	        		
	        		  self.setState({llenarEstados: Estados})
	        		  self.setState({estado: self.props.datos.estado})
                  //   ReactDOM.render( <Combo titulo={"Estado"} nomCombo={"estado"} seleccionado={self.state.estado} children={this.Estados} onChange={self.onComboEstado}/>,document.getElementById("comboEstadosProveedores"));
			       
            
					//	   ReactDOM.render( <Combo key="estado" titulo={"Estado"} nomCombo={"estado"} seleccionado={self.state.estado} children={this.Estados} onChange={self.onComboEstado}/>,document.getElementById("comboEstadosProveedores"));
	
	             console.log(data.length);
                  },
                 error: function(model,response, options) {
		                   //self.state.llenarEstados = [];
                          console.log(response.responseText);
//                          	<div id="comboEstadosProveedores">	</div>
					
                  }
              });
      },
		render: function () {
		

			return (
<article className="bloque" >
			<div className="titulo_bloque">
				Proveedor
			</div>
			<div className="caja_bloque">
				<div className="campos_bloque">
					<ul className="ul_bloque">
						<CajaDeTexto titulo={"Codigo"}  textoIndicativo={"Codigo"} valor={this.state.codigo} onChange ={this.onCodigoChange} />
						<CajaDeTexto titulo={"Nombre"}  textoIndicativo={"Nombre"} ref="cajaNombre" valor={this.state.nombre} onChange ={this.onNombreChange} />
						<CajaDeTexto titulo={"Calle"}  textoIndicativo={"Calle"}  ref="cajaCalle" valor={this.state.calle} onChange={this.onCalleChange} />
						<CajaDeTexto titulo={"Número"}  textoIndicativo={"Número"} valor={this.state.numero} onChange={this.onNumeroChange}/>
						<CajaDeTexto titulo={"Código Postal"} identificador="codigo_postal" textoIndicativo={"Código Postal"} valor={this.state.cp} onChange={this.onCpChange}/>
						<Combo key="Pais" titulo={"País"} nomCombo={"pais"} children={this.Paises}  seleccionado={this.state.pais} onChange={this.onComboChange} />
	  				    <Combo titulo={"Estado"} nomCombo={"estado"} seleccionado={this.state.estado} children={this.state.llenarEstados} onChange={this.onComboEstado}/>
 						<CajaDeTexto titulo={"RFC"} textoIndicativo={"RFC"}  valor={this.state.rfc} onChange={this.onRfcChange} />
						<CajaDeTexto titulo={"Teléfono"} textoIndicativo={"Teléfono"}  valor={this.state.telefono} onChange={this.onTelefonoChange}/>
						<CajaDeTexto titulo={"e-mail"} textoIndicativo={"e-mail"} valor={this.state.email} onChange={this.onEmailChange} caracteresEsp={"[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"}/>
						<li className="li_bloque">
							<label className="etiquetas_bloque" htmlFor="comentarios">Comentarios</label>
							<textarea className="textarea_bloque" name="comentarios" placeholder="Comentarios" value={this.state.comentarios} onChange={this.onComentariosChange}></textarea>
						</li>
					</ul>
				</div>


			</div>
		</article>
					);  
		}
	});



