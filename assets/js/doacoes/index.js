"use strict"

import { openModal, closeModal } from "../doacoes/modal.js ";

// const testeModal = async ({target}) => {

//     if (target.type === "button") {

//         alert("Abriu");

//     }

// }

document.getElementById('teste').addEventListener('click', openModal);
// document.getElementById('ongs').addEventListener('click', testeModal);
document.getElementById('modalClose').addEventListener('click', closeModal);