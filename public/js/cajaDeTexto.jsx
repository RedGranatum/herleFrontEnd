var React=require('react');

module.exports = React.createClass({
		
		render: function () {
			return (
                        <li className="li_bloque">
                              <label className="etiquetas_bloque">{this.props.titulo}</label>
                              
                              <input className="inputs_bloque" pattern={this.props.caracteresEsp}
                               type="text" placeholder={this.props.textoIndicativo} id={this.props.identificador} />
                              
                              <div className="viñeta"></div>
                        </li>

			);  
		}
});
