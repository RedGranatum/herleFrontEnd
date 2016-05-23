var React=require('react');

module.exports = React.createClass({
  TeclaPresionada: function(event) {
          if(event.charCode == 13)  {
                this.props.propiedades.onEnter(this.props.propiedades.id,this.refs.CajaTexto.value);
          }
      },
		valorCambio: function(){
      this.props.propiedades.onChange(
           this.props.propiedades.id,
           this.refs.CajaTexto.value
        );
    },
    handleBlur: function(){
            this.props.propiedades.onBlur( this.props.propiedades.id,this.refs.CajaTexto.value);
        },
		render: function () {

			return (
                        <li className="li_bloque">
                              <label className="etiquetas_bloque">{this.props.propiedades.titulo} {this.props.mensajeIndicativo}</label>
                              
                              <input 
                                className="inputs_bloque" 
                                pattern={this.props.propiedades.caracteresEsp}
                                type="text" 
                                placeholder={this.props.propiedades.textoIndicativo} 
                                id={this.props.propiedades.id} 
                                value={this.props.propiedades.valor}
                                onChange = {this.valorCambio}
                                ref = {"CajaTexto"}
                                onKeyPress ={this.TeclaPresionada} 
                                onBlur = {this.handleBlur}
                                />
                              
                              <div className="viñeta">{(this.props.requerido === false) ? '' : '*'}</div>
                              <div className="error_mostrar">{this.props.propiedades.error}</div>
                        </li>

			);  
		}
});
