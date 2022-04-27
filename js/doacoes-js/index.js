"use strict"

import ApiRequest from "../utils/ApiRequest.js";
// import { openModal, closeModal } from "./modal.js";
import {
    openFiltro,
    filtrar
} from "./filtro.js";

let objeto = await ApiRequest("GET", "http://localhost:3131/ong");
let dadosLogado = JSON.parse(localStorage.getItem('dados'));
console.log(dadosLogado);

const CarregarRecomendados = async () => {

    const container = document.getElementById("recomendados-ongs");
    const corpo = objeto.data;
    const recomendados = corpo.filter(({
        idOng
    }) => idOng > 2 ? false : true);
    const cards = recomendados.map(CriarRecomendados);
    container.replaceChildren(...cards);

}

const CriarRecomendados = ({
    id,
    nome,
    foto
}) => {

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

const CriarONGs = ({
    idOng,
    nome,
    numeroDeSeguidores,
    foto
}) => {

    const corpo = document.createElement("div");

    corpo.innerHTML =
        `<div class="ongs-card">
        <img src="assets/img/favoritar-sem-preenchimento.png" class="img-coracao" alt="Favoritos" title="Icon Coração" id="favoritar" data-idong="${idOng}">
        <img src="${foto}" alt="${nome}" title="Imagem da ONG" class="img-ong">
        <h2>${nome}</h2>
        <span>${numeroDeSeguidores} seguidores</span>
        <button type="button" data-idong="${idOng}">DOAR</button>
    </div>`;

    return corpo;

}

const pesquisarNomeONG = (e) => {

    const container = document.getElementById("ongs");
    const pesquisaNome = document.getElementById('pesquisar').value
    const corpo = objeto.data;
    const nomeONG = corpo.filter(({
        nome
    }) => nome !== pesquisaNome ? false : true);
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

async function CarregarMiniPerfil() {

    let nomeLogado = document.getElementById("mini-perfil-nome");
    let fotoLogado = document.getElementById("mini-perfil-foto");

    if (dadosLogado.nome === null || dadosLogado.nome === undefined) {
        nomeLogado.innerHTML = `<a href="login.html">Login</a>  / <a href="cadastroUsuario.html">Cadastrar</a>`;
    } else {
        nomeLogado.innerHTML = `${dadosLogado.nome}`;
    }

    if (dadosLogado.foto === null || dadosLogado.foto === undefined) {
        fotoLogado.setAttribute("src", "../../assets/img/sem-foto.png");
    } else if (!dadosLogado.foto.includes(".jpg") || !dadosLogado.foto.includes(".jpeg") || !dadosLogado.foto.includes(".png") || !dadosLogado.foto.includes(".svg")) {
        fotoLogado.setAttribute("src", `../../assets/img/sem-foto.png`)
    } else {
        fotoLogado.setAttribute("src", `${dadosLogado.foto}`);
    }

}

async function CarregarTamanhoArray() {

    let valor = document.getElementById("resultadoQtda");
    const corpo = objeto.data.length;

    valor.innerText = `${corpo} Resultados`;

}

const CarregarTodasCategorias = async () => {

    const container = document.getElementById("todas-categorias");
    const objetoCategory = await ApiRequest("GET", "http://localhost:3131/category");
    const categorias = objetoCategory.data;
    const categoriaCheckbox = categorias.map(CriarCategorias);
    container.replaceChildren(...categoriaCheckbox);
}

const CriarCategorias = ({idCategorias, nome}) => {

    const corpo = document.createElement("div");

    corpo.innerHTML =
    `
    <div class="categoria">
        <input type="checkbox" name="${nome} data-idCategoria="${idCategorias}">
        <i>${nome}</i>
    </div>
    `;

    return corpo;

}

const Favoritar = async ({target}) => {
    
    if (target.id === "favoritar") {

        const idUser = dadosLogado.idUsuario;
        const idOng = target.dataset.idong

        const idUserFormat = Number(idUser);
        const idOngFormat = Number(idOng);
        
        const response = await ApiRequest("POST", "http://localhost:3131/favorite", {
            idUsuario: idUserFormat,
            idOng: idOngFormat
        });

        console.log(response);

        if (response.status === 400) {
            alert('Essa ONG já foi favoritada');
        } else if (response.status === 200) {
            alert('Favoritado');
            location.reload();
        }

    }

}

const CarregarTodosFavoritos = async () => {

    const idUser = dadosLogado.idUsuario;
    const container = document.getElementById("favoritos-ong");
    const objeto = await ApiRequest("GET", `http://localhost:3131/favorite/${idUser}`);
    console.log(objeto);
    const todosFavoritos = objeto.data;
    const favoritos = todosFavoritos.map(CriarFavoritos);
    container.replaceChildren(...favoritos);

}

const CriarFavoritos = ({idOng, nome, foto}) => {

    const corpo = document.createElement("div");

    corpo.innerHTML =
    `<div class="ongs-opcoes">
        <div>
            <img src="${foto}" alt="Ongs perfil" title="Foto Ong">
            <h2>${nome}</h2>
        </div>
        <button type="button" data-idRecomendados="${idOng}">DOAR</button>
    </div>
    `;

    return corpo;

}

CarregarRecomendados();
CarregarTodasONGs();
document.getElementById("lupa").addEventListener("click", pesquisarNomeONG);
CarregarEstados();
CarregarMiniPerfil();
CarregarTamanhoArray();
CarregarTodasCategorias();
CarregarTodosFavoritos();
document.getElementById("ongs").addEventListener("click", Favoritar);
document.getElementById("botao-filtro").addEventListener("click", openFiltro);
document.getElementById("filtrar-opcoes").addEventListener("click", filtrar);
document.getElementById("sair").addEventListener("click", () => {

    localStorage.clear();
    window.location.href = "login.html";

})