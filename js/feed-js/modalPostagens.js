"use strict"

const openModalPostagens  = () =>
document.getElementById("postagem-post").classList.add("active");

const closeModalPostagens = () =>
document.getElementById("postagem-post").classList.remove("active");

export {
    openModalPostagens,
    closeModalPostagens
}