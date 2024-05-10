//Sobre consultas a la API Rick And Morty
import {numeroPagina} from './funciones.js';

export const obtenerPersonajes = async () => {
    let pagina = numeroPagina(0,42);
    const url = `https://rickandmortyapi.com/api/character?page=${pagina}`;

    try {
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        return resultado.results;

    } catch (error) {
        console.log(error);
    }
}


export const obtenerPersonajeId = async (id) =>{
    const url = `https://rickandmortyapi.com/api/character/${id}`;

    try {
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        return resultado;
    } catch (error) {
        console.log(error);
    }

}

export const obtenerBusqueda = async (page,nombre, estado) =>{
    const url = `https://rickandmortyapi.com/api/character/?page=${page}&name=${nombre}&status=${estado}`;

    try {
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        return resultado;
        
    } catch (error) {
        console.log(error);
    }

}

