
'use strict';

import { validarSession } from "../utils/ValidatorSession.js";
import ApiRequest from "../utils/ApiRequest.js";

let ongLogado;
ongLogado = validarSession("dadosOng");




let req = await ApiRequest("GET", `http://localhost:3131/ong/${ongLogado.idOng}`);
const dados = req.data;

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
    if (objectLocal.foto === null || objectLocal.foto === undefined) {
        bannerPerfil.setAttribute("src", "../../assets/img/sem-foto.png");
    }
    else if (!objectLocal.foto.includes(".jpg") && !objectLocal.foto.includes(".jpeg") && !objectLocal.foto.includes(".png") && !objectLocal.foto.includes(".svg") && !objectLocal.foto.includes(".git")) {
        bannerPerfil.setAttribute("src", `../../assets/img/sem-foto.png`)
    } else {
        bannerPerfil.setAttribute("src", `${objectLocal.banner}`)
    }



}
CarregarMiniPerfil(dados);

document.getElementById("sair").addEventListener("click", () => {
    localStorage.clear();
    Redirect("loginONGs");
});

//Carregar dados no sobre
async function carregarDadosSobre (dadosSobre){
    let descricaoSobre = document.getElementById("descricaoSobre");
    let qtdaMembros = document.getElementById("qtdaMembros");
    let anoFundacao = document.getElementById("anoFundacao");

    descricaoSobre.innerHTML = `${dadosSobre.descricaoSobre}`;
    qtdaMembros.innerHTML = `${dadosSobre.qtdaMembros}`;
    anoFundacao.innerHTML = `${dadosSobre.anoFundacao}`;
    

    
}

carregarDadosSobre(dadosSobre);
let reqDados = await ApiRequest("GET", `http://localhost:3131/ong/${ongLogado.idOng}`);
    const dadosSobre = reqDados.data





