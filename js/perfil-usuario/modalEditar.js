"use strict";

const btn = document.querySelector('.btnModal');
const modal = document.querySelector('.modalEditar');
const modalSair = document.querySelector('.botaoSairEditar');


btn.addEventListener('click', function () {
    modal.classList.add('bg-active');
})

modalSair.addEventListener('click', function () {
    modal.classList.remove('bg-active');
})