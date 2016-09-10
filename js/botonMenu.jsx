var React=require('react');

module.exports = React.createClass({
		getDefaultProps: function(){
                  return ({
                        ruta:'#'
                  });
            },
		render: function () {
                  var icono = this.props.icono !== null ? <i className={"fa fa-"+this.props.icono+" fa-"+this.props.tam} /> : '';
                  var avisos = this.props.avisos !== null ? <span>{this.props.avisos}</span> : '';

                  var icono_aviso = icono!== '' ? icono : avisos; 
			return (

             	<li className="li_menu">
             		<a className={this.props.colorLink} href={this.props.ruta}>
                        {icono_aviso}
             		</a>
             	</li>

			);  
		}
});

