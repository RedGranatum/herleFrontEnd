var React=require('react');

module.exports = React.createClass({

getDefaultProps: function(){
	return{
		clase: 'titulo_bloque',
		titulo: ''
	}
},
render: function () {
      return (
      		<div className={this.props.clase}>
				{this.props.titulo}
			</div>
			);  
		}
});

