"use strict";

import ApiRequest from "../utils/ApiRequest.js";
import { CriarONGs } from "./index.js";

function getValues() {

    var categorias = document.querySelectorAll('[type=checkbox]:checked');
    let values = [];
    for (var i = 0; i < categorias.length; i++) {
      values.push(categorias[i].name);
    }
    
    return values;
}

const openFiltro = () => {

    document.getElementById("modal-filtros").classList.add("active");

}

const filtrar = async () => {

    document.getElementById("modal-filtros").classList.remove("active");
    const categoriasSelecionadas = getValues();
    console.log(categoriasSelecionadas);
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

    const container = document.getElementById("ongs");
    const corpo = filteredOngs;
    const cards = corpo.map(CriarONGs);
    container.replaceChildren(...cards);
}

export {
    openFiltro,
    filtrar
}