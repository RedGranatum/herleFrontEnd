var React=require('react');

module.exports = React.createClass({
		valorCambio: function(){
      this.props.propiedades.onChange(
           this.props.propiedades.id,
           this.refs.CajaTexto.value
        );
    },
		render: function () {

			return (
                        <li className="li_bloque">
                              <label className="etiquetas_bloque">{this.props.propiedades.titulo}</label>
                              
                              <input 
                                className="inputs_bloque" 
                                pattern={this.props.propiedades.caracteresEsp}
                                type="text" 
                                placeholder={this.props.propiedades.textoIndicativo} 
                                id={this.props.propiedades.identificador} 
                                value={this.props.propiedades.valor}
                                onChange = {this.valorCambio}
                                ref = {"CajaTexto"}
                                />
                              
                              <div className="viñeta"></div>
                        </li>

			);  
		}
});
