"use strict"

const openModalInfoEvento = () =>
document.getElementById("info-evento").classList.add("active");

const closeModalInfoEvento = () =>
document.getElementById("info-evento").classList.remove("active");

export {
    openModalInfoEvento,
    closeModalInfoEvento
}