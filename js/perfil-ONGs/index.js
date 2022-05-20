'use strict';
import { validarSession } from "../utils/ValidatorSession.js";
import ApiRequest from "../utils/ApiRequest.js";

let ongLogado;
ongLogado = validarSession("dadosOng");

let reqDados = await ApiRequest("GET", `http://localhost:3131/ong/${ongLogado.idOng}`);
let dados = reqDados.data;

let reqEndereco = await ApiRequest("GET", `http://localhost:3131/adress/${ongLogado.idOng}`);
console.log(reqEndereco);

let adress = reqEndereco.data;



function CarregarMiniPerfil(objectLocal) {

    let nomeLogado = document.getElementById("mini-perfil-nome");
    let fotoLogado = document.getElementById("mini-perfil-foto");
    let fotoPerfil = document.getElementById("perfil-foto");
    let nomePerfil = document.getElementById("perfil-nome");
    let bannerPerfil = document.getElementById("perfil-banner");
    
    //Nome de mini perfil
    if (objectLocal.nome === null || objectLocal.nome === undefined) {  
        nomeLogado.innerHTML = `<a href="login.html">Login</a>  / <a href="cadastroUsuario.html">Cadastrar</a>`;
    } else {
        nomeLogado.innerHTML = `${objectLocal.nome}`;
    }


    //Foto Mini Perfil
    if (objectLocal.foto === null || objectLocal.foto === undefined) {
        fotoLogado.setAttribute("src", "../../assets/img/sem-foto.png");
    } else if (!objectLocal.foto.includes(".jpg") && !objectLocal.foto.includes(".jpeg") && !objectLocal.foto.includes(".png") && !objectLocal.foto.includes(".svg") && !objectLocal.foto.includes(".git")) {
        fotoLogado.setAttribute("src", `../../assets/img/sem-foto.png`)
    } else {
        fotoLogado.setAttribute("src", `${objectLocal.foto}`);
    }


    //Foto de Perfil
    if (objectLocal.foto === null || objectLocal.foto === undefined) {
        fotoPerfil.setAttribute("src", "../../assets/img/sem-foto.png");
    }
    else if (!objectLocal.foto.includes(".jpg") && !objectLocal.foto.includes(".jpeg") && !objectLocal.foto.includes(".png") && !objectLocal.foto.includes(".svg")) {
    fotoPerfil.setAttribute("src", `../../assets/img/sem-foto.png`)
    } else {
        fotoPerfil.setAttribute("src", `${objectLocal.foto}`)
    }


    //Nome de Perfil
    if (objectLocal.nome === null || objectLocal.nome === undefined) {
        nomePerfil.innerHTML = `<a href="login.html">Login</a>  / <a href="cadastroUsuario.html">Cadastrar</a>`;
    } else {
        nomePerfil.innerHTML = `${objectLocal.nome}`;
    }


    //BANNER
    if (objectLocal.banner === null || objectLocal.foto === undefined) {
        bannerPerfil.setAttribute("src", "../../assets/img/sem-foto.png");
    }
    else if (!objectLocal.banner.includes(".jpg") && !objectLocal.banner.includes(".jpeg") && !objectLocal.banner.includes(".png") && !objectLocal.banner.includes(".svg") && !objectLocal.banner.includes(".git")) {
        bannerPerfil.setAttribute("src", `../../assets/img/sem-foto.png`)
    } else {
        bannerPerfil.setAttribute("src", `${objectLocal.banner}`)
    }



}
CarregarMiniPerfil(dados);

// Carregar dados no sobre
async function carregarDadosSobre (objectLocal, endereco) {

    let descricaosobre = document.getElementById("descricaoSobre");
    let qtdaMembro = document.getElementById("qtdaMembros");
    let anoDeFundacao = document.getElementById("anoFundacao");
    let sedeLocal = document.getElementById("sede");
    let historia = document.getElementById("historiaSobre");

    descricaosobre.innerText = `${objectLocal.descricao}`;
    qtdaMembro.innerHTML = `${objectLocal.qtdDeMembros}`;
    anoDeFundacao.innerHTML = `${objectLocal.dataDeFundacao}`;
    sedeLocal.innerHTML = `${endereco.municipio}, ${endereco.estado}`;
    historia.innerText = `${objectLocal.historia}`;
    
}

carregarDadosSobre(dados, adress);
document.getElementById("sair").addEventListener("click", () => {
    localStorage.clear();
    Redirect("loginONGs");
});




// Modal Editar

const openModalEditar = () => 
document.getElementById("modalEditar").classList.add("bg-active");

const closeModalEditar = () => 
document.getElementById("modalEditar").classList.remove("bg-active");


document.querySelector("#btnModal").addEventListener("click", openModalEditar);
document.querySelector('#botaoSairEditar').addEventListener("click", closeModalEditar);
document.getElementById("modalEditar").addEventListener("click", closeModalEditar);