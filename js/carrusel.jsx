
var React= require('react');


module.exports = React.createClass({
		render: function () {
           return (
				<div className="carousel-wrapper" style="height: 400px;">
					<span id="target-item-1"></span>
					<span id="target-item-2"></span>
					<span id="target-item-3"></span>
					<div className="carousel-item item-1">
						<figure className="foto-item"><p/><img className="imagen_normal" src="images/herle.png" /></figure>
						<a className="arrow arrow-prev" href="#target-item-3"></a>
						<a className="arrow arrow-next" href="#target-item-2"></a>
					</div>
					<div className="carousel-item item-2">
						<figure className="foto-item"><p/><img className="imagen_normal" src="images/centauro.png" /></figure>
							<a className="arrow arrow-prev" href="#target-item-1"></a>
							<a className="arrow arrow-next" href="#target-item-3"></a>
					</div>
					<div className="carousel-item item-3">
					<figure className="foto-item"><p/><img className="imagen_otra" src="images/codifica.png" /></figure>
						<a className="arrow arrow-prev" href="#target-item-2"></a>
						<a className="arrow arrow-next" href="#target-item-1"></a>
					</div>
			    </div>

			);  
		}
});