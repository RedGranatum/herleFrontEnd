
var React= require('react');


module.exports = React.createClass({
		onChange: function(valor){
			debugger;	
		},

		render: function () {
          
           return (
	
			 <td contentEditable={false} onChange={this.onChange}>
			    {this.props.contenido} 
			 </td>

			);  
		}
});