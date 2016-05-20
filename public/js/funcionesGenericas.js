var OpcionCombo 	= require('../js/opcionCombo.jsx');
var React 			= require('react');
var CeldaTabla      = require('../js/celdaTabla.jsx');


var funcionesGenericas = function(){
return {

     llenarNuevasPropiedades: function(nuevas_props,contexto){
		var campos = {}
	   	var nuevaPropiedades = nuevas_props.datos
	   
	     if(nuevas_props.datos.id === undefined){
	       	nuevaPropiedades = contexto.valoresDefecto()
	      }
		  for(var key in nuevaPropiedades){
		   	  	campos[key] =  nuevaPropiedades[key];
	   		 }
	   	  contexto.setState(campos)
	   },
	   zipCol: function(columnas,valores){
	   	  	diccionario = {};
      		for(var col in columnas){
      			diccionario[columnas[col]] = valores[col];
      		}
      		return diccionario;
	   },
	   llenarComboGenerico: function(listaCatalogos){
	   		var ListaComponentes = listaCatalogos.map(function(tupla) {
		  return (
        		 <OpcionCombo key={tupla.cdu_catalogo}  valorOpcion={tupla.cdu_catalogo} tituloOpcion={tupla.descripcion1} />
      		  );
    		});
    		return ListaComponentes;
	   },
	   llenarCeldasDeFila: function(propsCelda){
         var celdasTabla=propsCelda.map(function(propie){
              return(  <CeldaTabla esEditable={propie.editable} contenido={propie.contenido} /> );
         });
          return celdasTabla;
	   }
	};
}

module.exports = funcionesGenericas;
