var React=require('react');

module.exports = React.createClass({
    onChange: function(valor){
         this.props.propiedades.onChange(this.props.propiedades.id,valor.target.value);
    },
		render: function () {

        console.log(this.props.propiedades.id);
      return (
            <li className="li_bloque">
              <label className="etiquetas_bloque" >{this.props.propiedades.titulo}</label>
              <select name={this.props.propiedades.id} className="select_bloque" value={this.props.propiedades.seleccionado} onChange={this.onChange} >
                   {this.props.propiedades.children}
              </select>
              <div className="viñeta"></div>
              <div className="error_ocultar">mensaje de error del campo</div>
            </li>

			);  
		}
});
