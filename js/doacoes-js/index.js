"use strict"

import ApiRequest from "../utils/ApiRequest.js";
import { openModal, closeModal } from "./modal.js";
import { openFiltro, filtrar } from "./filtro.js";

const CarregarRecomendados = async () => {

    const container = document.getElementById("recomendados-ongs");
    const objeto = await ApiRequest("GET", "http://localhost:3131/ong/all");
    const corpo = objeto.data;
    const recomendados = corpo.filter(({idOng}) => idOng > 8 ? false : true);
    const cards = recomendados.map(CriarRecomendados);
    container.replaceChildren(...cards);

}

const CriarRecomendados = ({id, nome, foto}) => {

    const corpo = document.createElement("div");

    corpo.innerHTML =
    `<div class="ongs-opcoes">
        <div>
            <img src="${foto}" alt="Ongs perfil" title="Foto Ong">
            <h2>${nome}</h2>
        </div>
        <button type="button" data-idRecomendados="${id}">DOAR</button>
    </div>`;

    return corpo;

}

const CarregarTodasONGs = async () => {

    const container = document.getElementById("ongs");
    const objeto = await ApiRequest("GET", "http://localhost:3131/ong/all");
    const corpo = objeto.data;
    const cards = corpo.map(CriarONGs);
    container.replaceChildren(...cards);

}

const CriarONGs = ({id, nome, numeroDeSeguidores, foto}) => {

    const corpo = document.createElement("div");

    corpo.innerHTML =
    `<div class="ongs-card">
        <img src="assets/img/favoritar-sem-preenchimento.png" class="img-coracao" alt="Favoritos" title="Icon Coração">
        <img src="${foto}" alt="${nome}" title="Imagem da ONG" class="img-ong">
        <h2>${nome}</h2>
        <span>${numeroDeSeguidores} seguidores</span>
        <button type="button" data-idONGs="${id}">DOAR</button>
    </div>`;

    return corpo;

}

CarregarRecomendados();
CarregarTodasONGs();
document.getElementById("botao-filtro").addEventListener("click", openFiltro);
document.getElementById("limpar-campos").addEventListener("click", filtrar);