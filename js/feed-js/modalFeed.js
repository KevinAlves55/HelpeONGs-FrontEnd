"use strict"

const openModalInfoEvento = () =>
document.getElementById("info-evento").classList.add("active");

const closeModalInfoEvento = () =>
document.getElementById("info-evento").classList.remove("active");

const openModalInfoVaga = () =>
document.getElementById("info-vaga").classList.add("active");

const closeModalInfoVaga = () =>
document.getElementById("info-vaga").classList.remove("active");

export {
    openModalInfoEvento,
    closeModalInfoEvento,
    openModalInfoVaga,
    closeModalInfoVaga
}