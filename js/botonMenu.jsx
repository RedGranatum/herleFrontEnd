var React=require('react');

module.exports = React.createClass({
		getDefaultProps: function(){
                  return ({
                        ruta:'#'
                  });
            },
		render: function () {
			return (

             	<li className="li_menu">
             		<a className={this.props.colorLink} href={this.props.ruta}>
             		<i className={"fa fa-"+this.props.icono+" fa-"+this.props.tam}>
             		</i>
             		</a>
             	</li>

			);  
		}
});