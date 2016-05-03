var React=require('react');

module.exports = React.createClass({
		
		render: function () {
			return (

                <option value={this.props.valorOpcion}>{this.props.tituloOpcion}</option>
                
			);  
		}
});