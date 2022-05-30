"use strict"

const openSetaHeader = () =>
document.getElementById("mais-opcoes").classList.add("active");

const closeSetaHeader = () => 
document.getElementById("mais-opcoes").classList.remove("active");

export {
    openSetaHeader,
    closeSetaHeader
};