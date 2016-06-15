var React=require('react');

module.exports = React.createClass({

getDefaultProps: function(){
	return{
		clase: 'titulo_bloque',
		id : '',
		titulo: ''
	}
},
render: function () {
      return (
      		<div className={this.props.clase} id={this.props.id}>
				{this.props.titulo}
			</div>
			);  
		}
});

