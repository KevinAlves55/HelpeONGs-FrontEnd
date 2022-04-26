"use strict";

const openFiltro = () => 
document.getElementById("modal-filtros").classList.add("active");

const filtrar = () => 
document.getElementById("modal-filtros").classList.remove("active");

export {
    openFiltro,
    filtrar
}