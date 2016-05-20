
var React= require('react');


module.exports = React.createClass({

		render: function () {
          
           return (
	
			 <td contentEditable={this.props.esEditable}>
			    {this.props.contenido} 
                
			 </td>

			);  
		}
});