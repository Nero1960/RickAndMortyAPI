import {validarFormulario, logoImagen} from './funciones.js';

const formulario = document.querySelector('.formulario');

formulario.addEventListener('submit', validarFormulario);
//hover de la imagen
logoImagen();