"use strict"

import ApiRequest from "../utils/ApiRequest.js";
import { openModal, closeModal } from "./modal.js";
import { openFiltro, filtrar } from "./filtro.js";

const CriarRecomendados = ({id, nome, foto}) => {

    const corpo = document.createElement("div");

    corpo.innerHTML =
    `<div class="ongs-opcoes">
        <div>
            <img src="${foto}" alt="Ongs perfil" title="Foto Ong">
            <h2>${nome}</h2>
        </div>
        <button data-idRecomendados="${id}">DOAR</button>
    </div>`;

    return corpo;

}

const CarregarRecomendados = async () => {

    const container = document.getElementById("recomendados-ongs");
    const objeto = await ApiRequest("GET", "http://localhost:3131/ong/all");
    const corpo = objeto.data;
    const recomendados = corpo.filter(({idOng}) => idOng > 8 ? false : true);
    const cards = recomendados.map(CriarRecomendados);
    container.replaceChildren(...cards);

}

CarregarRecomendados();
document.getElementById("botao-filtro").addEventListener("click", openFiltro);
document.getElementById("limpar-campos").addEventListener("click", filtrar);