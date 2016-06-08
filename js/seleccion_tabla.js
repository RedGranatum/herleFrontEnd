$(document).ready(iniciar);
	function myFunction(x) {
        // Obtenemos todos los TR de la tabla con id "tabla"
        // despues del tbody.
        var elementos = document.getElementById('tabla').
        getElementsByTagName('tbody')[0].getElementsByTagName('tr');
 
        // Por cada TR empezando por el segundo, ponemos fondo.
        for (var i = 1; i < elementos.length; i++) {
            elementos[i].style.background='#dddddc';
        }

        // Al elemento clickeado le ponemos fondo.
        x.style.background="#E8FFF1";
    }