"use strict"

import ApiRequest from "../utils/ApiRequest.js";
// import { openModal, closeModal } from "./modal.js";
import { openFiltro, filtrar } from "./filtro.js";

let objeto = await ApiRequest("GET", "http://localhost:3131/ong");
let dadosLogado = JSON.parse(localStorage.getItem('dados'));
console.log(dadosLogado);

const CarregarRecomendados = async () => {

    const container = document.getElementById("recomendados-ongs");
    const corpo = objeto.data;
    const recomendados = corpo.filter(({idOng}) => idOng > 2 ? false : true);
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

const pesquisarNomeONG = (e) => {
    
    const container = document.getElementById("ongs");
    const pesquisaNome = document.getElementById('pesquisar').value
    const corpo = objeto.data;
    const nomeONG = corpo.filter(({nome}) => nome !== pesquisaNome ? false : true);
    const cards = nomeONG.map(CriarONGs);
    container.replaceChildren(...cards);
    
    let valor = document.getElementById("resultadoQtda");
    const corpoResult = nomeONG.length;
    valor.innerText = `${corpoResult} Resultados`;

}

const CarregarEstados = async () => {

    const container = document.getElementById("estados-select");
    const objetoUf = await ApiRequest("GET", "http://localhost:3131/uf");
    const estados = objetoUf.data;
    const estadoUf = estados.map(CriarOptionEstado);
    container.replaceChildren(...estadoUf);

}

const CriarOptionEstado = ({id, nome, sigla}) => {

    const corpo = document.createElement("option");

    corpo.innerHTML =
    `
    <option value="${sigla}" data-idEstado="${id}">${nome}</option>
    `;

    return corpo;

}

async function CarregarMiniPerfil () {
    
    let nomeLogado = document.getElementById("mini-perfil-nome");
    let fotoLogado = document.getElementById("mini-perfil-foto");
    
    if (dadosLogado.nome === null || dadosLogado.nome === undefined) {
        nomeLogado.innerHTML = `<a href="login.html">Login</a>  / <a href="cadastroUsuario.html">Cadastrar</a>`;
    } else {
        nomeLogado.innerHTML = `${dadosLogado.nome}`;
    }
    
    if (dadosLogado.foto === null || dadosLogado.foto === undefined) {
        fotoLogado.setAttribute("src", "../../assets/img/sem-foto.png");
    } else {
        fotoLogado.setAttribute("src", `${dadosLogado.foto}`);
    }

}

async function CarregarTamanhoArray() {

    let valor = document.getElementById("resultadoQtda");
    const corpo = objeto.data.length;

    valor.innerText = `${corpo} Resultados`;

}

CarregarRecomendados();
CarregarTodasONGs();
document.getElementById("lupa").addEventListener("click", pesquisarNomeONG);
CarregarEstados();
CarregarMiniPerfil();
CarregarTamanhoArray();
document.getElementById("botao-filtro").addEventListener("click", openFiltro);
document.getElementById("filtrar-opcoes").addEventListener("click", filtrar);
document.getElementById("sair").addEventListener("click", () => {

    localStorage.clear();
    window.location.href = "login.html";

})