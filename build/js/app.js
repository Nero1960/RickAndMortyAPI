import {obtenerPersonajes} from './consultas.js';
import {mostrarPersonajes, logoImagen} from './funciones.js';


document.addEventListener('DOMContentLoaded', async () => {
    //hover de la imagen
    logoImagen();
    //extraemos los resultados de la API a la variable personaje para pasarla como parámetro en la función mostrarPersonaje
    const personajes = await obtenerPersonajes();
    mostrarPersonajes(personajes, document.querySelector('#resultado'));

})