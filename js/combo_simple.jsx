var React=require('react');

module.exports = React.createClass({
    onChange: function(valor){
         this.props.propiedades.onChange(this.props.propiedades.id,valor.target.value);
    },
		render: function () {
	    console.log(this.props.propiedades.id);
      return (
              <select name={this.props.propiedades.id} className="select_bloque" value={this.props.propiedades.seleccionado} onChange={this.onChange} >
                   {this.props.propiedades.children}
              </select>
			);  
		}
});

