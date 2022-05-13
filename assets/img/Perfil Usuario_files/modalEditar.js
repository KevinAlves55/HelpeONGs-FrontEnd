// const modal = document.querySelector('.modalEditar');
// const modalSair = document.querySelector('.botaoSairEditar');
"use strict";

const openModalEditar = () => 
document.getElementById("modalEditar").classList.add("bg-active");

const closeModalEditar = () => 
document.getElementById("modalEditar").classList.remove("bg-active");


// btn.addEventListener('click', () => {
//     document.getElementById("modalEditar").classList.add("bg-active");
// })

// modal.addEventListener('click', () => {
//     document.getElementById("modalEditar").classList.remove("bg-active");
// })

// modalSair.addEventListener('click', () => {
//     modal.classList.remove('bg-active');
// })

document.querySelector("#btnModal").addEventListener("click", openModalEditar);
document.querySelector('#botaoSairEditar').addEventListener("click", closeModalEditar);
document.getElementById("modalEditar").addEventListener("click", closeModalEditar);