var React      = require('react');


module.exports = React.createClass({
getDefaultProps: function(){
			return{
				id_venta: -1,
				listado_pagos: [],
			};
},
componentWillMount: function(){
	this.listado_detalles = [];
},

CrearFilaTabla: function(dic_valores){ 
	var fila = <tr key={dic_valores.Id}>	
			  	   <td>{dic_valores.Fecha}</td>
				   <td>{dic_valores.Cargo}</td>
				   <td>{dic_valores.Abono}</td>
				   <td>{dic_valores.Saldo}</td>
				   <td>{dic_valores.Observaciones}</td>
			   </tr>;;
	this.listado_detalles.push(fila);
},

sumatoria: function(){
		 var self = this;
		 var suma = 0.0; 
		 this.state.listado.forEach(function(detalle_venta){
		 	var detalle = self.refs["detalle_" + detalle_venta.id];
		 	var precio = detalle.state.precio_neto;
		 	suma = parseFloat(suma) + parseFloat(precio);
		 });
	
		suma = parseFloat(suma).toFixed(2)
		ReactDOM.render( <EtiquetaTexto titulo="Neto Venta: " valor={suma} clase="etiqueta_especial" key ="suma_venta" />,document.getElementById("venta_neto_venta"));

},


render: function () {
		var self = this;
	    this.listado_detalles = []
        
	    var Titulos ={Id:"Titulo",Fecha:"Fecha", Cargo:"Cargo",Abono:"Abono" ,Saldo:"Saldo",Observaciones:"Observaciones"}
        this.CrearFilaTabla(Titulos);
  		
  		var saldo = 0.0;
  		
  		this.props.listado_pagos.forEach(function(detalle){
  			saldo = parseFloat(saldo) + parseFloat(detalle.cargo) - parseFloat(detalle.abono);
  			saldo = parseFloat(saldo).toFixed(2)
	  		var Datos ={Id:detalle.id,Fecha:detalle.fecha, Cargo:detalle.cargo,Abono:detalle.abono ,Saldo:saldo,Observaciones:detalle.observaciones}
    	    self.CrearFilaTabla(Datos);
    	});

      return (      		
		<article className="bloque">
				<div className="bloque_catalogo" id="ampliar_tabla">
					<table className="tabla_catalogo">
						<tbody>
						{this.listado_detalles}
						</tbody>
					</table>
				</div>
			</article>
			);  
		}
});


