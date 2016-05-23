var ApiRestCatalogo = require('../js/modelos/apirestCatalogos');
var CajaDeTexto 	= require('../js/cajaDeTexto.jsx');
var ComboSimple 			= require('../js/combo_simple.jsx');
var FuncGenericas   = require('../js/funcionesGenericas')
var OpcionCombo 	= require('../js/opcionCombo.jsx');
var React 			= require('react');
var ReactDOM 		= require('react-dom') ;
var FilaTabla       = require('../js/filaTabla.jsx');
var CeldaTabla      = require('../js/celdaTabla.jsx');
var IconoTabla      = require('../js/iconoTabla.jsx');
var func = new FuncGenericas(); 



var dicEncabezado=["CduMaterial","material","calibre","ancho","largo","peso_kg","peso_lb","num_rollo","precio","icono1","icono2"];

var titulosEncabezado=["Cat.Material","Desc.Material","Calibre","Ancho","Largo","Peso (Kgs)","Peso (Lbs)","No. Rollo","Precio","_","."];

// var ico_nuevo = <IconoTabla  opcionGuardar={"guardar_renglon"} tipoIcono={"plus"}/>;

// var reglonNuevo=["","","","","","","","","",ico_nuevo,""];


var encabezado=titulosEncabezado.map(function(titulo){
     return (
           <CeldaTabla key={titulo} contenido={titulo} />
     	);
});

// var i=0;
// var nuevo_renglon=reglonNuevo.map(function(titulo){
//      i=i+1;
//      return (
//            <CeldaTabla key={i} contenido={titulo} esEditable={true} />

//       );
// });



module.exports = React.createClass({
      llenarCombos: function(){    
         var func = new FuncGenericas();      
         this.Materiales = func.llenarComboGenerico(appmvc.Datos.MATERIALES);
     },
     filaNuevo: function(materiales){
          var ico_nuevo = <IconoTabla  opcionGuardar={"guardar_renglon"} tipoIcono={"plus"}/>;
         // var dicEncabezado=["CduMaterial","material","calibre","ancho","largo","peso_kg","peso_lb","num_rollo","precio","icono1","icono2"];
          var reglonNuevo=[<ComboSimple propiedades={materiales} />,"","","","","","","","",ico_nuevo,""];      
          var i=0;
          return reglonNuevo.map(function(columnas){
          var editable=(i>0 && i<9) ? true: false;
          i=i+1;
        return (

             <CeldaTabla key={i} contenido={columnas} esEditable={editable} />

            );
        });
     },

    llenarColumnas: function(listado_columnas){
          var i=0;
          return listado_columnas.map(function(columna){
          var editable=(i>0 && i<9) ? true: false;
          editable= false;
          i=i+1;
        return (

             <CeldaTabla key={i} contenido={columna} esEditable={editable} />

            );
        });
     },
		render: function () {
      this.llenarCombos();
      var dic2 =                        ["id",         "titulo",               "children" ,   "seleccionado",        "onChange"     ];
      var MATERIALES = func.zipCol(dic2,["material",   "",                  this.Materiales,      "",    this.onValorCambio]);
      
      var ico_nuevo =    <IconoTabla  opcionGuardar={"guardar_renglon"} tipoIcono={"plus"}/>;
      var combo_materiales = <ComboSimple propiedades={MATERIALES} />;

     
      var dic1 =                               ["id",           "titulo",            "textoIndicativo" ,    "valor",                  "onChange"          ,"onEnter",              "onBlur" ];
      var FECHASOLICITUD  = func.zipCol(dic1,["desc_material",  "desc_material",   "desc_material",   this.state.fec_solicitud , this.onValorCambio,      "",              this.onBlurCaja]);
         
      var caja1 = <CajaDeTexto propiedades={FECHASOLICITUD} />

      var RENGLON_NUEVO = this.llenarColumnas([combo_materiales,"","","","","","","","",ico_nuevo,""]);      
       
    
      

      var self = this;
      var listado_detalles = [];
       this.props.listado.forEach(function(resultado){
            var detalle =[];
            var material_catalogo = <CeldaTabla key="a11" esEditable={false} contenido={<ComboSimple propiedades={MATERIALES} />} />
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

      

            detalle.push(material_catalogo)
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
          });
           return (
		      <table className="tabla_catalogo">
		       <tbody>
					<FilaTabla childrens={encabezado}/>
          <FilaTabla childrens={RENGLON_NUEVO}/>
          
          {listado_detalles}
				  </tbody>
				</table>
			);  
		}
});




