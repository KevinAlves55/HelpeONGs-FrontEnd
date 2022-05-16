"use strict"

// TESTE DE CAPTURA DE ARQUIVO
document.getElementById("btn").addEventListener("click", () => {

    const file = document.getElementById("arquivo").value
    console.log(file);

});

import ApiRequest from "../utils/ApiRequest.js";
import Redirect from "../utils/Redirect.js";
import { validarSession } from "../utils/ValidatorSession.js";
import { openSetaHeader, closeSetaHeader } from "../utils/MiniOpMenu.js";
import { closeModalEvento, closeModalPostagens, closeModalVaga, openModalPostagens } from "./modalPostagens.js";
import { checkInputs, errorValidation } from "../validator/validatorPostagem.js";
import { imagemPreview } from "./upload.js";

const descricao = document.getElementById("text-post");

let objeto = await ApiRequest("GET", "http://localhost:3131/ong");
let userLogado;
let ongLogado;

if (localStorage.hasOwnProperty('dadosUsuario') !== false) {
    
    userLogado = validarSession("dadosUsuario");

    const controlNone = () => document.getElementById("control").style.display = "none";
    controlNone();
    const postagemNone = () => document.getElementById("criar-postagem").style.display = "none";
    postagemNone();

    document.getElementById("sair").addEventListener("click", () => {
        localStorage.clear();
        Redirect("loginUsuario");
    });

    document.getElementById("sair-header").addEventListener("click", () => {
        localStorage.clear();
        Redirect("loginUsuario");
    });

    function CarregarMiniPerfil(objectLocal) {

        let nomeLogado = document.getElementById("mini-perfil-nome");
        let fotoLogado = document.getElementById("mini-perfil-foto");
        let fotoHeader = document.getElementById("foto-header");
    
        if (objectLocal.nome === null && objectLocal.nome === undefined) {
            nomeLogado.innerHTML = `<a href="login.html">Login</a>  / <a href="cadastroUsuario.html">Cadastrar</a>`;
        } else {
            nomeLogado.innerHTML = `${objectLocal.nome}`;
        }
    
        if (objectLocal.foto === null || objectLocal.foto === undefined) {
            fotoLogado.setAttribute("src", "../../assets/img/sem-foto.png");
            fotoHeader.setAttribute("src", "../../assets/img/sem-foto.png");
        } else if (!objectLocal.foto.includes(".jpg") || !objectLocal.foto.includes(".jpeg") || !objectLocal.foto.includes(".png") || !objectLocal.foto.includes(".svg")) {
            fotoLogado.setAttribute("src", `../../assets/img/sem-foto.png`);
            fotoHeader.setAttribute("src", "../../assets/img/sem-foto.png");
        } else {
            fotoLogado.setAttribute("src", `${objectLocal.foto}`);
            fotoHeader.setAttribute("src", `${objectLocal.foto}`);
        }
    
    }
    CarregarMiniPerfil(userLogado);

} else if (localStorage.hasOwnProperty('dadosOng') !== false) {

    ongLogado = validarSession("dadosOng");

    document.getElementById("sair").addEventListener("click", () => {
        localStorage.clear();
        Redirect("loginONGs");
    });

    document.getElementById("sair-header").addEventListener("click", () => {
        localStorage.clear();
        Redirect("loginONGs");
    });

    function CarregarMiniPerfil(objectLocal) {

        let nomeLogado = document.getElementById("mini-perfil-nome");
        let fotoLogado = document.getElementById("mini-perfil-foto");
        let fotoHeader = document.getElementById("foto-header");
    
        if (objectLocal.nome === null || objectLocal.nome === undefined) {
            nomeLogado.innerHTML = `<a href="login.html">Login</a>  / <a href="cadastroUsuario.html">Cadastrar</a>`;
        } else {
            nomeLogado.innerHTML = `${objectLocal.nome}`;
        }
    
        if (objectLocal.foto === null || objectLocal.foto === undefined) {
            fotoLogado.setAttribute("src", "../../assets/img/sem-foto.png");
            fotoHeader.setAttribute("src", "../../assets/img/sem-foto.png");
        } else if (!objectLocal.foto.includes(".jpg") && !objectLocal.foto.includes(".jpeg") && !objectLocal.foto.includes(".png") && !objectLocal.foto.includes(".svg") && !objectLocal.foto.includes(".gif")) {
            fotoLogado.setAttribute("src", `../../assets/img/sem-foto.png`);
            fotoHeader.setAttribute("src", "../../assets/img/sem-foto.png");
        } else {
            fotoLogado.setAttribute("src", `${objectLocal.foto}`);
            fotoHeader.setAttribute("src", `${objectLocal.foto}`);
        }
    
    }
    CarregarMiniPerfil(ongLogado);

    function CarregarBarraPostagem(objectLocal) {

        let nomePostagem = document.getElementById("nome-postagem");
        let imgPostagem = document.getElementById("foto-postagem");

        nomePostagem.innerText = `${objectLocal.nome}`;
        imgPostagem.setAttribute("src", `${objectLocal.foto}`);

    }
    CarregarBarraPostagem(ongLogado);

    function CarregarMiniPerfilPostagem(objectLocal) {

        let imgCriador = document.querySelector("#imgOngPostagem");
        let nomeCriador = document.querySelector("#nomeOngPostagem");
    
        imgCriador.setAttribute("src", objectLocal.foto);
        nomeCriador.innerText = `${objectLocal.nome}`;
    
    }
    CarregarMiniPerfilPostagem(ongLogado);

    function CarregarMiniPerfilEvento(objectLocal) {

        let imgCriador = document.querySelector("#imgOngEvento");
        let nomeCriador = document.querySelector("#nomeOngEvento");
    
        imgCriador.setAttribute("src", objectLocal.foto);
        nomeCriador.innerText = `${objectLocal.nome}`;
    
    }
    CarregarMiniPerfilEvento(ongLogado);

    function CarregarMiniPerfilVaga(objectLocal) {

        let imgCriador = document.querySelector("#imgOngVaga");
        let nomeCriador = document.querySelector("#nomeOngVaga");

        imgCriador.setAttribute("src", objectLocal.foto);
        nomeCriador.innerText = `${objectLocal.nome}`;

    }
    CarregarMiniPerfilVaga(ongLogado);

} else {

    Redirect("cadastroUsuario");

}

function TrocarTipoPostagem({target}) {

    let opcaoValor = target.options[target.selectedIndex].value;
    console.log(opcaoValor);

    if (opcaoValor === "P") {
        console.log("ESTAMOS EM POST");
        document.getElementById("postagem-vaga").classList.remove("active");
        document.getElementById("postagem-evento").classList.remove("active");
        document.getElementById("postagem-post").classList.add("active");
        document.getElementById("trocar-select-post")[0].selected = true;
    } else if (opcaoValor === "E") {
        console.log("ESTAMOS EM EVENTO");
        document.getElementById("postagem-vaga").classList.remove("active");
        document.getElementById("postagem-post").classList.remove("active");
        document.getElementById("postagem-evento").classList.add("active");
        document.getElementById("trocar-select-evento")[1].selected = true;
    } else if (opcaoValor === "V") {
        console.log("ESTAMOS EM VAGA");
        document.getElementById("postagem-post").classList.remove("active");
        document.getElementById("postagem-evento").classList.remove("active");
        document.getElementById("postagem-vaga").classList.add("active");
        document.getElementById("trocar-select-vaga")[2].selected = true;
    }

}

const PesquisarONGs = (evento) => {

    if (evento.key == "Enter") {

        const pesquisaNome = evento.target.value;
        console.log(pesquisaNome);

    }

}

const handlePreview = () => imagemPreview('files', 'imagePreviewMain');

let media = [];
async function handleFileSelect(evento) {

    // Objeto FileList guarda todos os arquivos.
    var files = evento.target.files;
    console.log(files);

    if (files.length <= 3) {

        // PERCORRE O OBJETO E CRIA UM ARRAY DE OBJETOS DENTRO DELE
        for (var i = 0, f; f = files[i]; i++) {
            const reader = new FileReader();
            let base64;
            reader.addEventListener(
                "load",
                 () => {
                    const dadosReader = reader.result; 
                    base64 = dadosReader.replace(/^data:image\/[a-z]+;base64,/, "");
                    console.log(base64);
                },
                false
            );

            if (f) {
                reader.readAsDataURL(f);   
            }

            media.push(
                {
                    "fileName": f.name,
                    "base64": base64,
                    "type": f.type
                }
            );

            console.log(media);
        }
    } else {
        alert("Máximo de arquivos permitidos é 3");
    }

    console.log("MEDIA", media);
}

const PostarPost = async (e) => {

    e.preventDefault();

    const validacoes = checkInputs();
    const arquivosSelecionados = media;
    console.log(arquivosSelecionados);

    let result;
    validacoes.map(status => {
        status === false ? result = false : "";
    });

    // if (result != false) {

    //     const dom = {
    //         idOng: ongLogado.idOng,
    //         descricao: descricao.value,
    //         media: arquivosSelecionados
    //     }

    //     console.log(`DADOS DIGITADOS`, dom);

    //     const request = await ApiRequest("POST", "http://localhost:3131/post", dom);
    //     console.log(request);

    //     // if (request.status === 200) {
    //     //     closeModalPostagens();
    //     //     location.reload();
    //     // }

    // }

}

document.getElementById("pesquisar").addEventListener("keypress", PesquisarONGs)
document.getElementById("seta-baixo").addEventListener("click", openSetaHeader);
document.getElementById("cancelar-header").addEventListener("click", closeSetaHeader);
document.querySelector("main").addEventListener("click", closeSetaHeader);
document.getElementById("postagens").addEventListener("click", openModalPostagens);
document.getElementById("modalClose").addEventListener("click", closeModalPostagens);
document.getElementById("modalCloseEvento").addEventListener("click", closeModalEvento);
document.getElementById("modalCloseVaga").addEventListener("click", closeModalVaga);
document.getElementById('files').addEventListener('change', handlePreview);
document.getElementById('files').addEventListener('change', handleFileSelect, false);

document.querySelector("#trocar-select-post")
.addEventListener(
    "change", 
    TrocarTipoPostagem
);
document.querySelector("#trocar-select-evento")
.addEventListener(
    "change", 
    TrocarTipoPostagem
);
document.querySelector("#trocar-select-vaga")
.addEventListener(
    "change", 
    TrocarTipoPostagem
);
document.getElementById("publicarPost").addEventListener("click", PostarPost);