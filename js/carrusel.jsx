
var React= require('react');
var Carousel = require('nuka-carousel');

module.exports = React.createClass({
	  mixins: [Carousel.ControllerMixin],
		render: function () {
           return (
		      <Carousel>
		        <img src="images/herle.png"/>
		        <img src="images/centauro.png"/>
		        <img src="images/codifica.png"/>
		      </Carousel>
			);  
		}
});