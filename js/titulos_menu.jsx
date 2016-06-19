var React=require('react');

module.exports = React.createClass({

getDefaultProps: function(){
	return{
		titulo: '',
	}
},
onClick: function(){
	this.props.onClick()
},
render: function () {
      return (
			<div className="lista_reporte" onClick={this.onClick}>
				<a className="lnk_reporte"> 
					<div className="div_reporte">{this.props.titulo}</div>
				</a>
			</div>
			);  
		}
});

