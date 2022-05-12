"use strict"

const openModalPostagens  = () =>
document.getElementById("postagem-post").classList.add("active");

const closeModalPostagens = () =>
document.getElementById("postagem-post").classList.remove("active");

const closeModalEvento = () =>
document.getElementById("postagem-evento").classList.remove("active");

export {
    openModalPostagens,
    closeModalPostagens,
    closeModalEvento
}