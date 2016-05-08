var React=require('react');

module.exports = React.createClass({
    componentWillUodate: function(nuevas_props,nuevo_Stados){
       console.log("El comobo hijo " + nuevas_props.seleccionado);
   },
    onChange: function(valor){
         this.props.onChange(this.props.nomCombo,valor.target.value);
    },
		render: function () {
        
      return (
            <li className="li_bloque">
              <label className="etiquetas_bloque" >{this.props.titulo}</label>
              <select name={this.props.nomCombo} className="select_bloque" value={this.props.seleccionado} onChange={this.onChange} >
                   {this.props.children}
              </select>
              <div className="viñeta"></div>
            </li>

			);  
		}
});
