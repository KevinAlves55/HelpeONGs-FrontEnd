"use strict"

const openModalPostagens  = () =>
document.getElementById("postagem-post").classList.add("active");

const closeModalPostagens = () =>
document.getElementById("postagem-post").classList.remove("active");

const closeModalEvento = () =>
document.getElementById("postagem-evento").classList.remove("active");

const closeModalVaga = () => {
    document.getElementById("postagem-vaga").classList.remove("active")
}

const openModalEndereco = () => {
    document.getElementById("postagem-endereco").classList.add("active");
}

const closeModalEndereco = () => {
    document.getElementById("postagem-endereco").classList.remove("active");
}

export {
    openModalPostagens,
    closeModalPostagens,
    closeModalEvento,
    closeModalVaga,
    openModalEndereco,
    closeModalEndereco
}