"use strict"

import ApiRequest from "../utils/ApiRequest.js";
import Redirect from "../utils/Redirect.js";
import { validarSession } from "../utils/ValidatorSession.js";
import { openFiltro, filtrar } from "./filtro.js";
import { openModal, closeModal } from "./modal.js"

let objeto = await ApiRequest("GET", "http://localhost:3131/ong");
let userLogado;
let ongLogado;

if (localStorage.hasOwnProperty('dadosUsuario') !== false) {
    
    userLogado = validarSession("dadosUsuario");

    document.getElementById("sair").addEventListener("click", () => {
        localStorage.clear();
        Redirect("loginUsuario");
    });

    function CarregarMiniPerfil(objectLocal) {

        let nomeLogado = document.getElementById("mini-perfil-nome");
        let fotoLogado = document.getElementById("mini-perfil-foto");
    
        if (objectLocal.nome === null || objectLocal.nome === undefined) {
            nomeLogado.innerHTML = `<a href="login.html">Login</a>  / <a href="cadastroUsuario.html">Cadastrar</a>`;
        } else {
            nomeLogado.innerHTML = `${objectLocal.nome}`;
        }
    
        if (objectLocal.foto === null || objectLocal.foto === undefined) {
            fotoLogado.setAttribute("src", "../../assets/img/sem-foto.png");
        } else if (!objectLocal.foto.includes(".jpg") || !objectLocal.foto.includes(".jpeg") || !objectLocal.foto.includes(".png") || !objectLocal.foto.includes(".svg")) {
            fotoLogado.setAttribute("src", `../../assets/img/sem-foto.png`)
        } else {
            fotoLogado.setAttribute("src", `${objectLocal.foto}`);
        }
    
    }
    CarregarMiniPerfil(userLogado);

    const CarregarTodosFavoritos = async () => {

        const idUser = userLogado.idUsuario;
        const container = document.getElementById("favoritos-ong");
        const objeto = await ApiRequest("GET", `http://localhost:3131/favorite/${idUser}`);
        console.log(objeto);
        const todosFavoritos = objeto.data;
        const favoritos = todosFavoritos.map(CriarFavoritos);
        container.replaceChildren(...favoritos);
    
    }
    CarregarTodosFavoritos();

} else if (localStorage.hasOwnProperty('dadosOng') !== false) {

    ongLogado = validarSession("dadosOng");

    document.getElementById("sair").addEventListener("click", () => {
        localStorage.clear();
        Redirect("loginONGs");
    });

    function CarregarMiniPerfil(objectLocal) {

        let nomeLogado = document.getElementById("mini-perfil-nome");
        let fotoLogado = document.getElementById("mini-perfil-foto");
    
        if (objectLocal.nome === null || objectLocal.nome === undefined) {
            nomeLogado.innerHTML = `<a href="login.html">Login</a>  / <a href="cadastroUsuario.html">Cadastrar</a>`;
        } else {
            nomeLogado.innerHTML = `${objectLocal.nome}`;
        }
    
        if (objectLocal.foto === null || objectLocal.foto === undefined) {
            fotoLogado.setAttribute("src", "../../assets/img/sem-foto.png");
        } else if (!objectLocal.foto.includes(".jpg") || !objectLocal.foto.includes(".jpeg") || !objectLocal.foto.includes(".png") || !objectLocal.foto.includes(".svg")) {
            fotoLogado.setAttribute("src", `../../assets/img/sem-foto.png`)
        } else {
            fotoLogado.setAttribute("src", `${objectLocal.foto}`);
        }
    
    }
    CarregarMiniPerfil(ongLogado);

    const favoriteNone = () => 
    document.getElementById("favoritos").style.display = "none";
    favoriteNone();

    CarregarMiniPerfil(ongLogado);

} else {

    CarregarMiniPerfil();

    const favoriteNone = () => document.getElementById("favoritos").style.display = "none";
    favoriteNone();

    const feedNone = () => document.getElementById("feed").style.display = "none";
    feedNone();

    const perfilNone = () => document.getElementById("perfil").style.display = "none";
    perfilNone();

    const sinoNone = () => document.getElementById("sinoNotification").style.display = "none";
    sinoNone();

    document.getElementById("sair").addEventListener("click", () => {
        localStorage.clear();
        Redirect("cadastroUsuario");
    });

}

const CarregarRecomendados = async () => {

    const container = document.getElementById("recomendados-ongs");
    const corpo = objeto.data;
    const recomendados = corpo.filter(({numeroDeSeguidores, idOng}) => numeroDeSeguidores <= 10 && idOng < 8 ? false : true);
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

const CriarONGs = ({idOng, nome, numeroDeSeguidores, foto}) => {

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

const pesquisarNomeONG = () => {

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
    console.log(estados);
    const estadoUf = estados.map(CriarOptionEstado);
    estadoUf.map(option => {
        
        container.appendChild(option);
    
    });

}

const CriarOptionEstado = ({idEstado, nome, sigla}) => {

    const corpo = document.createElement("option");

    corpo.innerHTML =
    `
    <option value="${sigla}" data-idEstado="${idEstado}">${nome}</option>
    `;

    return corpo;

}

async function CarregarTamanhoArray() {

    let valor = document.getElementById("resultadoQtda");
    const corpo = objeto.data.length;

    valor.innerText = `${corpo} Resultados`;

}

function CarregarMiniPerfil() {

    let nomeLogado = document.getElementById("mini-perfil-nome");
    let fotoLogado = document.getElementById("mini-perfil-foto");

    nomeLogado.innerHTML = `<a href="loginUsuario.html">Login</a>  / <a href="cadastroUsuario.html">Cadastrar</a>`;
    fotoLogado.setAttribute("src", "../../assets/img/sem-foto.png");

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
        <input type="checkbox" name="${nome}" data-idCategoria="${idCategorias}">
        <i>${nome}</i>
    </div>
    `;

    return corpo;

}

const Favoritar = async ({target}) => {

    if (target.id === "favoritar") {

        if (userLogado === undefined) {
        
            alert("Esta ação só pode ser executada por doador");
    
        } else {

            const idUser = userLogado.idUsuario;
            const idOng = target.dataset.idong;

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
                location.reload();
            }

        }

    }

}

const CriarFavoritos = ({idOng, nome, foto}) => {

    const corpo = document.createElement("div");

    corpo.innerHTML =
    `<div class="ongs-opcoes">
        <div>
            <img src="${foto}" alt="Ongs perfil" title="Foto Ong">
            <img src="../../assets/img/favoritar-com-preenchimento.png" alt="Ongs perfil" title="Foto Ong" class="img-preenchimento" id="preenchimento" data-idong="${idOng}">
            <h2>${nome}</h2>
        </div>
        <button type="button" data-idRecomendados="${idOng}">DOAR</button>
    </div>
    `;

    return corpo;

}

const excluirFavorito = async ({target}) => {
    
    if (target.id === "preenchimento") {

        const idUser = userLogado.idUsuario;
        const idOng = target.dataset.idong;

        const idUserFormat = Number(idUser);
        const idOngFormat = Number(idOng);
        
        const response = await ApiRequest(
            "DELETE",
            `http://localhost:3131/favorite/${idUserFormat}/${idOngFormat}`
        );

        console.log(response);

        location.reload();

    }

}

const carregarModal = async ({target}) => {

    if (target.type === "button") {
        openModal();
    }

}

CarregarRecomendados();
CarregarTodasONGs();
document.getElementById("lupa").addEventListener("click", pesquisarNomeONG);
CarregarEstados();
CarregarTamanhoArray();
CarregarTodasCategorias();
document.getElementById("ongs").addEventListener("click", Favoritar);
document.getElementById("favoritos-ong").addEventListener("click", excluirFavorito);
document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("ongs").addEventListener("click", carregarModal);
document.getElementById("recomendados-ongs").addEventListener("click", carregarModal);
document.getElementById("favoritos").addEventListener("click", carregarModal);
document.getElementById("botao-filtro").addEventListener("click", openFiltro);
document.getElementById("filtrar-opcoes").addEventListener("click", filtrar);

export { 
    CriarONGs
}