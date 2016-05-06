var React=require('react');

module.exports = React.createClass({
		
		render: function () {
			return (
				<div className="bloque_resultados">
					<div className="resultado">
						<span className="dsc_resultado">Resultado A</span>
					</div>
					<div className="resultado">
						<span className="dsc_resultado">Resultado B</span>
					</div>
					<div className="resultado">
						<span className="dsc_resultado">Resultado C</span>
					</div>
					<div className="resultado">
						<span className="dsc_resultado">Resultado D</span>
					</div>
				</div>
			);  
		}
	});
