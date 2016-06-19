var React=require('react');

module.exports = React.createClass({

getDefaultProps: function(){
	return{
		clase: 'titulo_bloque',
		id : '',
		titulo: '',
		estilo: 'block',
	}
},
render: function () {
 	  var estilo =  {display: this.props.estilo};
      return (
      		<div className={this.props.clase} id={this.props.id} style={estilo}>
				{this.props.titulo}
			</div>
			);  
		}
});