var React=require('react');

module.exports = React.createClass({
valorCambio: function(caja_texto){
      this.props.propiedades.onChange(
           this.props.propiedades.id,
           caja_texto.target.value
        );
    },
		render: function () {
            //debugger;
			return (
				        <li className="li_bloque">
							<label className="etiquetas_bloque">{this.props.propiedades.titulo}</label>
							<textarea className="textarea_bloque" name={this.props.propiedades.nombre} 
									  placeholder={this.props.propiedades.textoIndicativo}
									  value={this.props.propiedades.valor}
									  onChange={this.valorCambio}></textarea>
							<div className="error_ocultar">mensaje de error del campo</div>
						</li>

			);  
		}
});





        