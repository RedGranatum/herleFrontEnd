var React=require('react');

module.exports = React.createClass({
		
		render: function () {
			return (
            <li className="li_bloque">
              <label className="etiquetas_bloque" >{this.props.titulo}</label>
              <select name={this.props.nomCombo} className="select_bloque">
                   {this.props.children}
              </select>
              <div className="viñeta"></div>
            </li>

			);  
		}
});
