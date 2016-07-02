var React=require('react');

module.exports = React.createClass({
getInitialState: function(){
	return{
	   	id: -1,
	   	num_documento:  '',
	   	cliente_codigo: '',
	   	cliente_nombre: '',
	   	cliente_rfc: '',
	}
},
componentWillReceiveProps: function(nextProps) {
 	 if(nextProps.datos.id !== undefined){
 	 	var cabecero = nextProps.datos; 
  		var cliente_id     =  cabecero.cliente.id;
	    var cliente_codigo =  cabecero.cliente.codigo;	    	
        var cliente_nombre =  cabecero.cliente.nombre;
        var cliente_rfc    =  cabecero.cliente.rfc;

		this.setState({
 					   id :     	   cabecero.id,	
 					   num_documento:  cabecero.num_documento,
 					   cliente_codigo: cliente_codigo,
 					   cliente_nombre: cliente_nombre,
 					   cliente_rfc:    cliente_rfc,
 					});

	 }
 	  else{
 	  	this.setState(this.getInitialState())
  }
 },
render: function () {
	  var estilo =  {display: this.props.estilo};
      return (      		
	<article className="bloque">
			<div className="formula">
				<figure className="formula_foto">
					<p><img className="img_factura" src="images/factura.png" /></p>
				</figure>
				<div className="formula_datos">
					<h3>Documento: {this.state.num_documento}</h3>
					<h3>Id Venta: {this.state.id}</h3>
					<h3>Cliente:</h3>
					<h3>{this.state.cliente_codigo}</h3>
					<h5>{this.state.cliente_rfc}</h5>
					<h5>{this.state.cliente_nombre}</h5>
				</div>
			</div>
			<br />
			<div className="titulo_bloque">
				Pago
			</div>
			<div className="caja_bloque">
				<div className="campos_bloque">
					<ul className="ul_bloque">
						<li className="li_bloque">
							<label className="etiquetas_bloque" htmlFor="tipo_documento">Tipo de documento</label>
							<label className="etiqueta_especial" htmlFor="">Siempre será abono</label>
						</li>
						<li className="li_bloque">
							<label className="etiquetas_bloque" htmlFor="fecha_pago">Fecha</label>
							<input id="fecha_pago" className="inputs_bloque" type="text" placeholder="Fecha de pago" />
							<div className="viñeta">*</div>
							<div className="error_mostrar">mensaje de error del campo</div>
						</li>
						<li className="li_bloque">
							<label className="etiquetas_bloque" htmlFor="monto">Monto</label>
							<input className="inputs_bloque" type="text" placeholder="Monto" />
							<div className="viñeta">*</div>
							<div className="error_mostrar">mensaje de error del campo</div>
						</li>
					</ul>
				</div>
			</div>
		</article>
			);  
  }
});
