import {mostrarFavoritos, eliminarTodo, logoImagen} from './funciones.js';

const btnFavorito = document.querySelector('#btnFav');
const btnVaciar = document.querySelector('#vaciar');

logoImagen();

btnFavorito.addEventListener('click', mostrarFavoritos);
btnVaciar.addEventListener('click', eliminarTodo);


