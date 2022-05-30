"use strict";

// Modal Editar
const openModalEditar = () => 
document.getElementById("modalEditar").classList.add("bg-active");

const closeModalEditar = () => 
document.getElementById("modalEditar").classList.remove("bg-active");

// Modal de categorias
const openModalCategorias = () =>
document.getElementById("modalCategorias").classList.add("active");

const closeModalCategorias = () =>
document.getElementById("modalCategorias").classList.remove("active");

export { 
    openModalEditar, 
    closeModalEditar,
    openModalCategorias,
    closeModalCategorias
};