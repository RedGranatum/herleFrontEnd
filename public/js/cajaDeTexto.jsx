var React=require('react');

module.exports = React.createClass({
		valorCambio: function(){
      this.props.onChange(
            this.refs.CajaTexto.value
        );
    },
		render: function () {
			return (
                        <li className="li_bloque">
                              <label className="etiquetas_bloque">{this.props.titulo}</label>
                              
                              <input 
                                className="inputs_bloque" 
                                pattern={this.props.caracteresEsp}
                                type="text" 
                                placeholder={this.props.textoIndicativo} 
                                id={this.props.identificador} 
                                value={this.props.valor}
                                onChange = {this.valorCambio}
                                ref = {"CajaTexto"}
                                />
                              
                              <div className="viñeta"></div>
                        </li>

			);  
		}
});
