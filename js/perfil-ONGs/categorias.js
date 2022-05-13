'use strict';

import ApiRequest from "../utils/ApiRequest.js";

const category = document.getElementesById('');
const nomeDaCategoria = document.getElementById('categoria-input');

function receberDados(){
    var categorias = document.getElementById('categoria-input').value;

    console.log(categorias);

}

const nomeCategoria = (evento) => {

    if (evento.key == "Enter") {

        const pesquisaNome = evento.target.value;
        console.log(pesquisaNome);

    }

}

document.getElementById("categoria-input").addEventListener("keypress", 
nomeCategoria);

