
var React           = require('react');
var VentaDetalle   = require('../js/ventasDetalles.jsx');


module.exports = React.createClass({
getDefaultProps: function(){
			return{
				listado: [],
			};
		},
getInitialState: function(){
			return{
				listado: this.props.listado,	
			};
	},
componentWillMount: function(){
	this.num_con =-1;

},
componentWillReceiveProps: function(nuevas_props){
	this.num_con = -1;
},
clickOperacion: function(operacion,fila,errores){
	//if(operacion === "nuevo" && errores === false){
	if(operacion === "nuevo" ){
		debugger;
		var nuevo = this.state.listado.slice()
		this.num_con =  this.num_con - 1;
		var nueva_fila = fila;
		// nueva_fila["num_consecutivo"] = this.num_con;  
		 nueva_fila["id"] = this.num_con;
		 nueva_fila.venta = this.state.listado.venta;
		 nuevo.push(nueva_fila);
		 this.setState({listado: nuevo })
		// this.refs.NuevoDetalle.limpiarFila(); 
		// console.log("*** " + nueva_fila.id + " &&&& " + nueva_fila.compra);
	}
},
render: function () {
        var listado_detalles = [];

    	var Titulos ={num_rollo:"Num.Rollo", peso_kg:"Peso Kg",precio_neto:"Precio Neto"}
        var fila_titulo =  <VentaDetalle key={"titulo"} datos ={Titulos} titulo={true} />
        var fila_insercion =  <VentaDetalle ref="NuevoDetalle" key={"primera"}  primera={true} clickOperacion={this.clickOperacion}/>
      

      this.state.listado.forEach(function(detalle_venta){          
            var detalle= <VentaDetalle ref={"detalle_" + detalle_venta.id } 
            						key={"xx" + detalle_venta.id} 
            						datos = {detalle_venta} 
            						id = {detalle_venta.id} 
									venta = {detalle_venta.venta} 
									num_rollo = {detalle_venta.num_rollo} 
									peso_kg = {detalle_venta.peso_kg} 
									precio_neto = {detalle_venta.precio_neto} 
            						clickOperacion={self.clickOperacion}  />
             listado_detalles.push(detalle);
          });

		   return(  
		   	     <article className="bloque">
	          <div className="bloque_catalogo" id="ampliar_tabla">
				<table className="tabla_catalogo">	
				 <tbody>					
					{fila_titulo}
					{fila_insercion}
					{listado_detalles}					
				  </tbody>
				</table>
				<div className="error_mostrar_grid">mensaje de error del campo</div>
			</div>		
            </article>
			);  
		}
});