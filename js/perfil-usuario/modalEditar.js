
"use strict";

const openModalEditar = () => 
document.getElementById("modalEditar").classList.add("bg-active");

const closeModalEditar = () => 
document.getElementById("modalEditar").classList.remove("bg-active");


document.querySelector("#btnModal").addEventListener("click", openModalEditar);
document.querySelector('#botaoSairEditar').addEventListener("click", closeModalEditar);