var React=require('react');

module.exports = React.createClass({

		render: function () {
      var error = this.props.propiedades.error === undefined ? "" :  this.props.propiedades.error;
      var divStyle = (error !=="") ? { display: 'inline-block'} : {display: 'none'} ;
     	return (
                        <li className="li_bloque">
                              <label className="etiquetas_bloque">{this.props.propiedades.titulo} {this.props.mensajeIndicativo}</label>      
                              <input 
                                className="inputs_bloque" 
                     
                                type="number" 
                                placeholder={this.props.propiedades.textoIndicativo} 
                                id={this.props.propiedades.id} 
                                value={this.props.propiedades.valor}
                          
                                />
                              
                              <div className="viñeta">{(this.props.requerido === false) ? '' : '*'}</div>
                              <div style={divStyle} className="error_mostrar">{error}</div>
                        </li>

			);  
		}
});