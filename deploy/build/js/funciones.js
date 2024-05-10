import {obtenerPersonajeId, obtenerBusqueda} from './consultas.js';

//Genera un numero aleatorio para alternas las paginas de la funcion ObtenerPersonaje
export const numeroPagina = (min,max) => Math.floor(Math.random() * (max - min) + min); 

//variables para el paginador
const registroPorPagina = 20; //muestra 20 personajes por paginas
let totalPaginas;
let iterador;
let paginaActual = 1; 


//modal
const modal = new bootstrap.Modal('.modal', {})
//toast
const toast = new bootstrap.Toast('.toast');

//Crear el html y mostrar los personajes en el DOM
export function mostrarPersonajes(personajes = [], referencia) {


    personajes.forEach(personaje => {

        //destructuring Object al objeto personaje, extraemos las variables de este.
        const {name, gender, image, status, created , species, id} = personaje;

        //Comenzamos a crear el DOM Scripting

        //<div class = 'col-md-6'></div>
        const divCol6 = document.createElement('DIV');
        divCol6.classList.add('col-md-6');

         const divCard = document.createElement('DIV');
         divCard.classList.add('card', 'mb-3');

         const divCardRow = document.createElement('DIV');
         divCardRow.classList.add('row', 'g-0');

         const divcardCol4 = document.createElement('DIV');
         divcardCol4.classList.add('col-md-4');

         const CardImage = document.createElement('IMG');
         CardImage.classList.add('img-fluid', 'rounded-start', 'imagen');
         CardImage.src = `${image}`;
         CardImage.alt = `Imagen Personaje`;
         CardImage.loading = 'lazy';


         const divcardCol8 = document.createElement('DIV');
         divcardCol8.classList.add('col-md-8');

         const divCardBody = document.createElement('DIV');
         divCardBody.classList.add('card-body');

         const cardTitle = document.createElement('H3');
         cardTitle.textContent = `${name}`;
         cardTitle.classList.add('card-title', 'name');

         const divSpan = document.createElement('DIV');
         divSpan.classList.add('d-flex', 'justify-content-between', 'infospan');


         const spanStatus = document.createElement('SPAN');
         spanStatus.textContent = `${status}`;
         spanStatus.classList.add('card-text', 'ps-4');

         const spanCircle = document.createElement('span');
         spanCircle.classList.add('circle')

         if(status == 'Alive'){
            spanCircle.classList.add('alive');
         } else if(status ==  'Dead'){
            spanCircle.classList.add('dead');
         } else {
            spanCircle.classList.add('desconocido');
         }

         const spanGender = document.createElement('SPAN');
         spanGender.textContent = `${gender}`;
         spanGender.classList.add('card-text');


         const spanSpecies = document.createElement('SPAN');
         spanSpecies.textContent = `${species}`;
         spanSpecies.classList.add('card-text');


         const parrafoCreated = document.createElement('small');
         parrafoCreated.textContent = `${created}`;
         parrafoCreated.classList.add('card-text', 'mt-2', 'text-gray', 'd-block', 'fs-6');

         const btnVer = document.createElement('button');
         btnVer.classList.add('btn', 'btn-success', 'mt-2');
         btnVer.textContent = `Ver Personaje`;

         //evento del click para mostrar el personaje
         btnVer.onclick = () => {
            mostrarModal(id);
         }

         //agregar a sus respectivos padres

         divSpan.appendChild(spanCircle);
         divSpan.appendChild(spanStatus);
         divSpan.appendChild(spanGender);
         divSpan.appendChild(spanSpecies);

         divCardBody.appendChild(cardTitle);
         divCardBody.appendChild(divSpan);
         divCardBody.appendChild(parrafoCreated);
         divCardBody.appendChild(btnVer);

         divcardCol4.appendChild(CardImage);           
         divcardCol8.appendChild(divCardBody);

         divCardRow.appendChild(divcardCol4);
         divCardRow.appendChild(divcardCol8);

         divCard.appendChild(divCardRow);

         divCol6.appendChild(divCard);

         referencia.appendChild(divCol6);
        
    });

}

async function mostrarModal(id){

    //seleccionamos el DOM del Modal
    const modalTitle = document.querySelector('.modal .modal-title');
    const modalBody = document.querySelector('.modal .modal-body');
    const modalFooter = document.querySelector('.modal .modal-footer');



    //realizamos la consulta al personaje con un id
    const personaje = await obtenerPersonajeId(id);

    //extraemos la informacion del personaje seleccionado
    const {name, image, status, species, gender, type, created} = personaje;
    const location = personaje.location.name;
    const origin = personaje.origin.name;

    modalTitle.textContent = `${name}`;

    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <img class="img-fluid img-modal" src="${image}" alt="image/${name}" loading="lazy" width="200" height = "300">
            </div>

            <div class="col-md-6 mt-2 mt-md-0">
                <p class="fw-bold text-uppercase text-white">Status: <span class="fw-normal text-uppercase">${status}</span></p>
                <p class="fw-bold text-uppercase text-white">Gender: <span class="fw-normal text-uppercase">${gender}</span></p>
                <p class="fw-bold text-uppercase text-white">Species: <span class="fw-normal text-uppercase">${species}</span></p>
                <p class="fw-bold text-uppercase text-white">Type: <span class="fw-normal text-uppercase">${type}</span></p>

                <p class="fw-bold text-uppercase text-white">Last Known Location: <span class="d-block fw-normal text-uppercase">${location}</span></p>

                <p class="fw-bold text-uppercase text-white">First seen in: <span class="d-block fw-normal text-uppercase">${origin}</span></p>
            </div>
        </div>      
    `;

    //limpiamos el html previo del modal footer
    limpiarHtml(modalFooter);

    //boton cerrar
    const btnCerrar = document.createElement('BUTTON');
    btnCerrar.classList.add('btn', 'btn-danger');
    btnCerrar.textContent = 'Cerrar';
    btnCerrar.onclick = () =>{
        modal.hide();
    }

    //boton agregar
    const btnAgregar = document.createElement('BUTTON');
    btnAgregar.textContent = existeFavorito(id) ? 'Eliminar Favoritos' : 'Agregar Favoritos';
    btnAgregar.classList.add('btn');

    if(existeFavorito(id)){
        btnAgregar.classList.add('btn-danger');
    } else {
        btnAgregar.classList.add('btn-success');
    }
     
    //evento al boton agregar
    btnAgregar.onclick = () =>{

        if(existeFavorito(id)){
        
            btnAgregar.textContent = 'Agregar Favorito';
            btnAgregar.classList.remove('btn-danger');
            btnAgregar.classList.add('btn-success');
            eliminarFavoritos(id);
            mostrarToast("Eliminado correctamente");
            if(document.querySelector('#favoritos')){
                limpiarHtml(document.querySelector('#favoritos'));
                mostrarFavoritos();
            }
            return;
        }

        agregarFavoritos({
            id,
            name,
            image,
            location,
            origin,
            status,
            gender,
            created,
            species,
            type
        });

        btnAgregar.textContent = 'Eliminar Favoritos';
        btnAgregar.classList.remove('btn-success');
        btnAgregar.classList.add('btn-danger');
        mostrarToast("Agregado correctamente");
    }

    modalFooter.appendChild(btnCerrar);
    modalFooter.appendChild(btnAgregar);

    modal.show();

}

function agregarFavoritos(personaje){
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
    localStorage.setItem('favoritos', JSON.stringify([...favoritos,personaje]));
}

function existeFavorito(id){
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
    const nuevoFavorito = favoritos.some(favorito => favorito.id === id);
    return nuevoFavorito;

}

function eliminarFavoritos(id){
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
    const nuevosFavoritos = favoritos.filter(personaje => personaje.id !== id);
    localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));

}

export function mostrarFavoritos(){

    const favoritoDiv = document.querySelector('#favoritos');
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];

    limpiarHtml(favoritoDiv);

    if(favoritos.length === 0){
        mostrarAlerta('No hay elementos guardados', favoritoDiv);
        return;
    }

    
    mostrarPersonajes(favoritos, favoritoDiv);


}

export function eliminarTodo(){
    const favoritoDiv = document.querySelector('#favoritos');
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];

    if(favoritos.length === 0){
        mostrarAlerta('No hay elementos guardados', favoritoDiv);
        return;
    }
    const confirmacion = confirm('Estas seguro de eliminar tus personajes favoritos?');
    if(confirmacion){
        localStorage.removeItem('favoritos');
        limpiarHtml(favoritoDiv);
    }
    
}

function mostrarToast(mensaje){
    const toastBody = document.querySelector('.toast .toast-body');
    toastBody.textContent = mensaje;
    toast.show();
}

export  async function validarFormulario (e){
    e.preventDefault();
    const nombre = document.querySelector('#nombre').value;
    const estado = document.querySelector('#estado').value;

    const datos = {
        nombre,
        estado
    }

    //se valida que todos los campos esten llenos
    if(!Object.values(datos).every(element => element !== '')){
        mostrarAlerta('Completa todos los campos', document.querySelector('.formulario'));
        return;
    }

    window.location = '#busqueda';

    //en caso de pasar la validación realizar la consulta
    const personaje = await obtenerBusqueda(paginaActual,nombre, estado);

    //limpia el html previo
    limpiarHtml(document.querySelector('#busqueda'));

    //verificamos si no hay errores de consulta
    if(personaje.error){
        mostrarAlerta(personaje.error, document.querySelector('#busqueda'));
        return;
    }

    //calculamos cuantas paginas se requieren para mostrar todos los personajes
    totalPaginas =  calcularPaginas(personaje.info.count);
    
    //se muestran los personajes
    mostrarPersonajes(personaje.results, document.querySelector('#busqueda'));

    //se manda a imprimir el paginador
    imprimirPaginador(nombre, estado);

}

const calcularPaginas = total => parseInt(Math.ceil(total / registroPorPagina )) 

function *crearPaginador (total){
    for(let i = 1; i <= total; i++){
        yield i;

    }

}

function imprimirPaginador(nombre, estado){
    iterador = crearPaginador(totalPaginas);
    limpiarHtml(document.querySelector('.pagination'));

    while(true){
        const {value, done} = iterador.next();

        if(done){
            return;
        }

        const li = document.createElement('LI');
        li.classList.add('page-item', 'px-1');
        
        const boton = document.createElement('a');
        boton.href = "#";
        boton.dataset.pagina = value;
        boton.text = value;
        boton.classList.add('page-link');

        li.appendChild(boton);
        document.querySelector('.pagination').appendChild(li);

        boton.onclick = async (e) =>{
            e.preventDefault();
            paginaActual = value;

            const personajes = await obtenerBusqueda(paginaActual,nombre, estado);

            limpiarHtml(document.querySelector('#busqueda'));
            mostrarPersonajes(personajes.results, document.querySelector('#busqueda'));
            window.location = '#busqueda';

        }

    }
}
function mostrarAlerta(mensaje, referencia){

    const alerta = document.querySelector('.alert');
    if(alerta){
        alerta.remove();
    }
    
    const divAlert = document.createElement('DIV');
    divAlert.classList.add('alert', 'alert-danger', 'mt-5', 'mb-0', 'text-center');
    divAlert.textContent = mensaje;

    referencia.appendChild(divAlert);
    
    setTimeout(() =>{
        divAlert.remove();
    }, 3000)

}
export function logoImagen() {
    const logo = document.querySelector('#logo');



    logo.addEventListener('mouseover', () => {
        let random = numeroPagina(1,6);
        const imagen = document.createElement('img');
        imagen.classList.add('imagen-logo');
        imagen.src = `build/video/0${random}.gif`;

        document.body.appendChild(imagen);
    })

    logo.addEventListener('mouseout', () => {
        const imagen = document.querySelector('.imagen-logo');
        if(imagen){
            imagen.remove();

        }
    })
  
  
}

function limpiarHtml(referencia){
    while(referencia.firstChild){
        referencia.removeChild(referencia.firstChild);

    }

}