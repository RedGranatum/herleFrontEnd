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
    onFocus: function(e){
      console.log("entro a la caja");
      e.target.select();
    },
		render: function () {
      var error = this.props.propiedades.error === undefined ? "" :  this.props.propiedades.error;
      clasError = (error !=="") ? "caja_grid_error" : "caja_grid"
      //var divStyle = (error !=="") ? { display: 'inline-block'} : {display: 'none'} ;

      //var divStyle =  { display: 'inline-block'}  

			return (
                              <input 
                                className={clasError} 
                                pattern={this.props.propiedades.caracteresEsp}
                                type="text" 
                                placeholder={this.props.propiedades.textoIndicativo} 
                                id={this.props.propiedades.id} 
                                value={this.props.propiedades.valor}
                                onChange = {this.valorCambio}
                                ref = {"CajaTexto"}
                                onKeyPress ={this.TeclaPresionada} 
                                onBlur = {this.handleBlur}
                                onFocus ={this.onFocus}
                                />    
                                
                                         
			);  
		}
});
