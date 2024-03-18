const carrito = document.getElementById('carrito');
const listaCatalogos = document.getElementById('lista-carrito');
const catalogos = document.getElementById('Lista-catalogo');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

cargarEventListeners();

function cargarEventListeners() {
    catalogos.addEventListener('click', comprarCatalogo);
    carrito.addEventListener('click', eliminarCatalogo);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}

function comprarCatalogo(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const catalogo = e.target.parentElement.parentElement;
        leerDatosCatalogo(catalogo);
    }
}

function leerDatosCatalogo(catalogo) {
    const infoCatalogo = {
        imagen: catalogo.querySelector('img').src,
        titulo: catalogo.querySelector('h4').textContent,
        precio: catalogo.querySelector('.precio').textContent,
        id: catalogo.querySelector('.agregar-carrito').getAttribute('data-id')
    };
    insertarCarrito(infoCatalogo);
}

function insertarCarrito(catalogo) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${catalogo.imagen}" width="100">
        </td>
        <td>${catalogo.titulo}</td>
        <td>${catalogo.precio}</td>
        <td>
            <a href="#" class="borrar-catalogo" data-id="${catalogo.id}">X</a>
        </td>
    `;
    listaCatalogos.appendChild(row);
    guardarCatalogoLocalStorage(catalogo);
}

function eliminarCatalogo(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar-catalogo')) {
        const catalogoId = e.target.getAttribute('data-id');
        e.target.parentElement.parentElement.remove();
        eliminarCatalogoLocalStorage(catalogoId);
    }
}

function vaciarCarrito() {
    while (listaCatalogos.firstChild) {
        listaCatalogos.removeChild(listaCatalogos.firstChild);
    }
    vaciarLocalStorage();
    return false;
}

function guardarCatalogoLocalStorage(catalogo) {
    let catalogos = obtenerCatalogosLocalStorage();
    catalogos.push(catalogo);
    localStorage.setItem('catalogos', JSON.stringify(catalogos));
}

function obtenerCatalogosLocalStorage() {
    let catalogosLS;
    if (localStorage.getItem('catalogos') === null) {
        catalogosLS = [];
    } else {
        catalogosLS = JSON.parse(localStorage.getItem('catalogos'));
    }
    return catalogosLS;
}

function leerLocalStorage() {
    let catalogosLS = obtenerCatalogosLocalStorage();
    catalogosLS.forEach(function (catalogo) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${catalogo.imagen}" width="100">
            </td>
            <td>${catalogo.titulo}</td>
            <td>${catalogo.precio}</td>
            <td>
                <a href="#" class="borrar-catalogo" data-id="${catalogo.id}">X</a>
            </td>
        `;
        listaCatalogos.appendChild(row);
    });
}

function eliminarCatalogoLocalStorage(catalogoId) {
    let catalogosLS = obtenerCatalogosLocalStorage();
    catalogosLS = catalogosLS.filter(function (catalogo) {
        return catalogo.id !== catalogoId;
    });
    localStorage.setItem('catalogos', JSON.stringify(catalogosLS));
}

function vaciarLocalStorage() {
    localStorage.clear();
}
