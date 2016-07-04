var React      = require('react');
var TituloMenu = require('../js/titulos_menu.jsx'); 
var CeldaTabla       = require('../js/celdaTabla.jsx');
var FilaTabla        = require('../js/filaTabla.jsx');
var ApiRestVentas = require('../js/modelos/apirestVentas');


module.exports = React.createClass({
getDefaultProps: function(){
  return{
    clase: 'caja_bloque',
  }
},
getInitialState: function(){
  return {
    lista_costo: []
  }
},
onClickReporte: function(){
  console.log("Reporte seleccionado")
  this.llenarListaExistencias();
},
llenarListaExistencias: function(){
  var self = this;
  var ventas = new ApiRestVentas();
  ventas.costoAgrupado(  
    function(data){
          self.setState({lista_costo: data });
    },
    function(model,response,options){
            self.setState({lista_costo : [] });
    }
  );
},
render: function () {

  var self= this;
  var estilo = {cursor:"pointer"};

  //var titulosEncabezado=["Id", "Num.Rollo","Codigo Producto", "Calibre",  "Ancho",  "Largo",  "Peso (Kgs)", "Peso (Lbs)"];
  var titulosEncabezado=[ "Num.Rollo","Codigo Producto","Operacion ","Cliente/Proveedor", "Fecha", "Entrada Kg","Salida Kg","Precio Kg","Utilidad"];


  var encabezado=titulosEncabezado.map(function(titulo){
     return (
           <CeldaTabla key={titulo} contenido={titulo} />
      );
  });

  var listado_detalles = [];
  var i=1;

  var num_rollo_ant = '';

  this.state.lista_costo.forEach(function(resultado){
    var detalle = []
    var tipo_operacion = ''

    if(num_rollo_ant !== resultado.num_rollo){
          detalle = []
          i=i+1;
          detalle.push(<CeldaTabla contenido={"==== " + resultado.num_rollo + " ===="}  key={"num_rollo_" + i}/>);
          detalle.push(<CeldaTabla contenido="" key={"codigo_producto_" + i} />);
          detalle.push(<CeldaTabla contenido="" key={"tipo_operacion_" + i} />);
          detalle.push(<CeldaTabla contenido="" key={"nombre_proveedor_" + i} />);
          detalle.push(<CeldaTabla contenido="" key={"fec_compra" + i} />);
          detalle.push(<CeldaTabla contenido="" key={"compra_peso_kg" + i} />);
          detalle.push(<CeldaTabla contenido="" key={"venta_peso_kg" + i} />);
          detalle.push(<CeldaTabla contenido="" key={"precio_kg" + i} />);
          detalle.push(<CeldaTabla contenido="" key={"utilidad" + i} />);

          listado_detalles.push(<FilaTabla key={i} id={i + resultado.num_rollo} childrens={detalle} num_fila={i} estilo={estilo} onSeleccionFila={self.onSeleccionFila}/>)

    }

    if(num_rollo_ant === '' || num_rollo_ant !== resultado.num_rollo)
    {
        detalle = []
         i=i+1;
      tipo_operacion = 'Compra'
     
      detalle.push(<CeldaTabla contenido={resultado.num_rollo} key={"num_rollo_" + i}/>);
      detalle.push(<CeldaTabla contenido={resultado.codigo_producto} key={"codigo_producto_" + i} />);
      detalle.push(<CeldaTabla contenido={tipo_operacion} key={"tipo_operacion_" + i} />);
      detalle.push(<CeldaTabla contenido={resultado.nombre_proveedor} key={"nombre_proveedor_" + i} />);
      detalle.push(<CeldaTabla contenido={resultado.fec_compra} key={"fec_compra" + i} />);
      detalle.push(<CeldaTabla contenido={resultado.compra_peso_kg} key={"compra_peso_kg" + i} />);
      detalle.push(<CeldaTabla contenido="" key={"venta_peso_kg" + i} />);
      detalle.push(<CeldaTabla contenido={resultado.precio_kg_compra} key={"precio_kg_compra" + i} />);
      detalle.push(<CeldaTabla contenido="" key={"utilidad" + i} />);

      listado_detalles.push(<FilaTabla key={i} id={resultado.num_rollo} childrens={detalle} num_fila={i} estilo={estilo} onSeleccionFila={self.onSeleccionFila}/>)
    }
    

    console.log("num_rollo :" + resultado.num_rollo)
   

    if(resultado.cliente_id > 0){
       detalle = []
       i=i+1;
        tipo_operacion = 'Venta'
     
        detalle.push(<CeldaTabla contenido={resultado.num_rollo} key= {"num_rollo_" + i} />);
        detalle.push(<CeldaTabla contenido={resultado.codigo_producto} key= {"codigo_producto_" + i} />);
        detalle.push(<CeldaTabla contenido={tipo_operacion} key= {"tipo_operacion_" + i} />);
        detalle.push(<CeldaTabla contenido={resultado.nombre_cliente} key= {"nombre_cliente_" + i} />);
        detalle.push(<CeldaTabla contenido={resultado.fec_venta} key={"fec_venta" + i} />);
        detalle.push(<CeldaTabla contenido="" key={"compra_peso_kg" + i} />);
        detalle.push(<CeldaTabla contenido={resultado.venta_peso_kg} key={"venta_peso_kg" + i} />);
        detalle.push(<CeldaTabla contenido={resultado.precio_kg_venta} key={"precio_kg_venta" + i} />);
        detalle.push(<CeldaTabla contenido={resultado.utilidad} key={"utilidad" + i} />);

         listado_detalles.push(<FilaTabla key={i} id={resultado.num_rollo} childrens={detalle} num_fila={i} estilo={estilo} onSeleccionFila={self.onSeleccionFila}/>)
    }

    num_rollo_ant = resultado.num_rollo;
   
  })

    return (          
      <section className="contenido">
        <article className="caja_lista_reporte">
          <TituloMenu titulo="Costos" onClick={this.onClickReporte}/>
        </article>
        <article className="bloque">
          <div className="caja_bloque">
            <div className="bloque_catalogo" id="ampliar_tabla">
              <table className="tabla_catalogo">
                <tbody>
                <FilaTabla childrens={encabezado}/>
                {listado_detalles}
                </tbody>
              </table>
            </div>
          </div>
        </article>
      </section>
      );  
    }
});
