var React=require('react');

module.exports = React.createClass({

		render: function () {

     	return (
                    <section className="ventanas">
                      <div className="ventana">
                        <h2>Producto</h2>
                        <h4>Código</h4>
                        <h4>Familia</h4>
                        <h3>Precio Compra</h3>
                        <h3>Precio Venta</h3>
                        <h3>Utilidad</h3>
                      </div>
                      <div className="ventana">
                        <h2>Proveedor</h2>
                        <h4>Código</h4>
                        <h4>Nombre</h4>
                        <h4>RFC</h4>
                      </div>
                      <div className="ventana">
                        <h2>Cliente</h2>
                        <h4>Código</h4>
                        <h4>Nombre</h4>
                        <h4>RFC</h4>
                        <h4>Estatus</h4>
                      </div>
                    </section>
			);  
		}
});