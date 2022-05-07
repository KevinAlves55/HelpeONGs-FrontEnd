"use strict";

import ApiRequest from "../utils/ApiRequest.js";
import { CarregarTodasONGs, CriarONGs } from "./index.js";

function getValues() {

    var categorias = document.querySelectorAll('[type=checkbox]:checked');
    let values = [];
    for (var i = 0; i < categorias.length; i++) {
      values.push(categorias[i].name);
    }
    
    return values;
}

function carregarCardsCategorias(objeto) {

    const container = document.getElementById("ongs");
    const corpo = objeto;
    const cards = corpo.map(CriarONGs);
    container.replaceChildren(...cards);
    carregarTamanhoArray(corpo);

}

function carregarTamanhoArray(objeto) {

    let valor = document.getElementById("resultadoQtda");
    const tamanho = objeto;
    const corpo = tamanho.length;

    if (corpo === 0) {
        valor.innerText = "Nenhuma ONG encontrada para esse filtro";
        const container = document.getElementById("ongs");
        container.innerHTML = "";
        CarregarTodasONGs();
    } else if (tamanho === 1) {
        valor.innerText = `${corpo} Resultado`;
    } else {
        valor.innerText = `${corpo} Resultados`;   
    }

}

const openFiltro = () => {

    document.getElementById("modal-filtros").classList.add("active");

}

const filtrar = async () => {

    document.getElementById("modal-filtros").classList.remove("active");
    const categoriasSelecionadas = getValues();

    let request = [];
    request = await ApiRequest(
        "POST",
        "http://localhost:3131/category/filter",
        {
            categorias: categoriasSelecionadas
        }
    );

    let allOngs = [];
    allOngs = await ApiRequest("GET", "http://localhost:3131/ong");
    const filteredOngs = [];
    allOngs.data.filter(ong => {
        request.data.includes(ong.nome)? filteredOngs.push(ong) : "";
    });

    carregarCardsCategorias(filteredOngs);

}

export {
    openFiltro,
    filtrar
}