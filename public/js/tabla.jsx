var ApiRestCatalogo = require('../js/modelos/apirestCatalogos');
var CajaDeTexto 	= require('../js/cajaDeTexto.jsx');
var Combo 			= require('../js/combo.jsx');
var FuncGenericas   = require('../js/funcionesGenericas')
var OpcionCombo 	= require('../js/opcionCombo.jsx');
var React 			= require('react');
var ReactDOM 		= require('react-dom') ;
var FilaTabla       = require('../js/filaTabla.jsx');
var CeldaTabla      = require('../js/celdaTabla.jsx');
var IconoTabla      = require('../js/iconoTabla.jsx');
var func = new FuncGenericas(); 


var titulosEncabezado=["Material","Kalibre","Ancho","Largo","Peso (Kgs)","Peso (Lbs)","No. Rollo","Precio","_","."];

var ico_nuevo = <IconoTabla  opcionGuardar={"guardar_renglon"} tipoIcono={"plus"}/>;

var reglonNuevo=["ss","","","","","","","",ico_nuevo,""];


var encabezado=titulosEncabezado.map(function(titulo){
     return (
           <CeldaTabla key={titulo} contenido={titulo} />
     	);
});

var i=0;
var nuevo_renglon=reglonNuevo.map(function(titulo){
     i=i+1;
     return (
           <CeldaTabla key={i} contenido={titulo} />

      );
});

module.exports = React.createClass({

		render: function () {
      var listado_detalles = [];
       this.props.listado.forEach(function(resultado){
            var detalle =[];
            var material = <CeldaTabla key="a1" esEditable={true} contenido={resultado.dsc_material} />
            var calibre = <CeldaTabla  key="b1" esEditable={true} contenido={resultado.calibre} />
            var ancho = <CeldaTabla   key="c1"  esEditable={true} contenido={resultado.ancho} />
            var largo = <CeldaTabla  key="d1" key="a"   esEditable={true} contenido={resultado.largo} />
            var peso_kg = <CeldaTabla key="e1"   esEditable={true} contenido={resultado.peso_kg} />
            var peso_lb = <CeldaTabla key="f1"   esEditable={true} contenido={resultado.peso_lb} />
            var num_rollo = <CeldaTabla  key="g1"esEditable={true} contenido={resultado.num_rollo} />
            var precio = <CeldaTabla    key="h1" esEditable={true} contenido={resultado.precio} />

            var ico_elim = <IconoTabla  key="i1" opcionGuardar={"eliminar_renglon"} tipoIcono={"remove"}/>;
            var btn_eliminar =  <CeldaTabla key="j1" esEditable={true} contenido={ico_elim} />
            
            var ico_mod = <IconoTabla key="k1"  opcionGuardar={"actualizar_renglon"} tipoIcono={"refresh"}/>;
            var btn_modificar =  <CeldaTabla  key="l1"esEditable={true} contenido={ico_mod} />

      


            detalle.push(material)
            detalle.push(calibre)
            detalle.push(ancho)
            detalle.push(largo)
            detalle.push(peso_kg)
            detalle.push(peso_lb)
            detalle.push(num_rollo)
            detalle.push(precio)
            detalle.push(btn_eliminar)
            detalle.push(btn_modificar)


             listado_detalles.push(<FilaTabla key={resultado.id} childrens={detalle} />)
          //  filas.push(<Filas key={resultado.id}  resultado={resultado} onClaveSeleccionada={self.onClaveSeleccionada}/>);
          });
           return (
		      <table className="tabla_catalogo">
		       <tbody>
					<FilaTabla childrens={encabezado}/>
          <FilaTabla childrens={nuevo_renglon}/>
          
          {listado_detalles}
				  </tbody>
				</table>
			);  
		}
});




