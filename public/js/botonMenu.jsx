var React=require('react');

module.exports = React.createClass({
		
		render: function () {
			return (

             	<li className="li_menu">
             		<a className={this.props.colorLink} href="#">
             		<i className={"fa fa-"+this.props.icono+" fa-"+this.props.tam}>
             		</i>
             		</a>
             	</li>

			);  
		}
});
