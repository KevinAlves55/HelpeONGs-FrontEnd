"use strict"

import ApiRequest from "../utils/ApiRequest.js";
import Redirect from "../utils/Redirect.js";
import { validarSession } from "../utils/ValidatorSession.js";
import { openSetaHeader, closeSetaHeader } from "../utils/MiniOpMenu.js";
import { closeModalEvento, closeModalPostagens, closeModalVaga, openModalEndereco, openModalPostagens } from "./modalPostagens.js";
import { checkInputs, errorValidation } from "../validator/validatorPostagem.js";
import { imagemPreviewPost, imagemPreviewEvent } from "./PreviewImgFeed.js";
import { getFormattedDate } from "../utils/DataFormat.js";
import { hideLoading, showLoading } from "../utils/Loading.js";

// POST
const descricao = document.getElementById("text-post");

// EVENTO
const tituloEvento = document.getElementById("titulo-evento");
const descEvento = document.getElementById("text-evento");
const dataEvento = document.getElementById("data-evento");
const horaEvento = document.getElementById("hora-evento");
const candidato = document.getElementById("candidato");
const cepEvent = document.getElementById("cep");
const estadoEvent = document.getElementById("estado");
const cidadeEvent = document.getElementById("cidade");
const ruaEvent = document.getElementById("rua");
const bairroEvent = document.getElementById("bairro");
const numeroEvent = document.getElementById("numero");
const complementosEvent = document.getElementById("complemento");


let objeto = await ApiRequest("GET", "http://localhost:3131/ong");
let userLogado;
let ongLogado;

if (localStorage.hasOwnProperty('dadosUsuario') !== false) {
    
    userLogado = validarSession("dadosUsuario");
    let req = await ApiRequest("GET", `http://localhost:3131/user/${userLogado.idUsuario}`);
    const dadosUsuario = req.data

    if (!dadosUsuario.foto || !dadosUsuario.banner || !dadosUsuario.dataDeNascimento) {
        Redirect("perfilUsuario");
    }

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
    CarregarMiniPerfil(dadosUsuario);

} else if (localStorage.hasOwnProperty('dadosOng') !== false) {

    ongLogado = validarSession("dadosOng");
    let req = await ApiRequest("GET", `http://localhost:3131/ong/${ongLogado.idOng}`);
    const dadosOng = req.data

    if (!dadosOng.foto || !dadosOng.banner || !dadosOng.historia || !dadosOng.descricao) {
        Redirect("perfilONGs");
    }

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
    CarregarMiniPerfil(dadosOng);

    function CarregarBarraPostagem(objectLocal) {

        let nomePostagem = document.getElementById("nome-postagem");
        let imgPostagem = document.getElementById("foto-postagem");

        nomePostagem.innerText = `${objectLocal.nome}`;
        imgPostagem.setAttribute("src", `${objectLocal.foto}`);

    }
    CarregarBarraPostagem(dadosOng);

    function CarregarMiniPerfilPostagem(objectLocal) {

        let imgCriador = document.querySelector("#imgOngPostagem");
        let nomeCriador = document.querySelector("#nomeOngPostagem");
    
        imgCriador.setAttribute("src", objectLocal.foto);
        nomeCriador.innerText = `${objectLocal.nome}`;
    
    }
    CarregarMiniPerfilPostagem(dadosOng);

    function CarregarMiniPerfilEvento(objectLocal) {

        let imgCriador = document.querySelector("#imgOngEvento");
        let nomeCriador = document.querySelector("#nomeOngEvento");
    
        imgCriador.setAttribute("src", objectLocal.foto);
        nomeCriador.innerText = `${objectLocal.nome}`;
    
    }
    CarregarMiniPerfilEvento(dadosOng);

    function CarregarMiniPerfilVaga(objectLocal) {

        let imgCriador = document.querySelector("#imgOngVaga");
        let nomeCriador = document.querySelector("#nomeOngVaga");

        imgCriador.setAttribute("src", objectLocal.foto);
        nomeCriador.innerText = `${objectLocal.nome}`;

    }
    CarregarMiniPerfilVaga(dadosOng);

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
        FiltraNomeONG(pesquisaNome);

    }

}

const FiltraNomeONG = (valorDigitado) => {

    const value = valorDigitado;

    let allOngs = [];
    allOngs = objeto;
    const filteredOngs = [];
    allOngs.data.filter(ong => {
        value.includes(ong.nome)? filteredOngs.push(ong.idOng) : "";
    });
    
    const id = filteredOngs[0];

    CarregarPostPesquisa(id);

}

const CarregarPostPesquisa = async (idOng) => {

    if (idOng === undefined) {
        alert("Esta ONG não existe");
        CarregarTodosPost();
    } else {
        const container = document.querySelector(".feed");
        let req = await ApiRequest("GET", `http://localhost:3131/post/${idOng}`);
        console.log(req);

        if (req.status === 500) {
            alert("Esta ONG não existe");
        } else {
            const dadosPost = req.data;
            const post = dadosPost.map(CriarPosts);
            container.replaceChildren(...post);
        } 
    }

} 

let media = [];
async function handleFileSelect(evento) {

    // Objeto FileList guarda todos os arquivos.
    var files = evento.target.files;

    if (files.length <= 3) {
        // PERCORRE O OBJETO E CRIA UM ARRAY DE OBJETOS DENTRO DELE
        for (var i = 0, f; f = files[i]; i++) {
            
            const reader = new FileReader();
            let infoArquivo = f;
            
            reader.addEventListener(
                "load",
                () => {
                    const dadosReader = reader.result;
                    let base64 = dadosReader.replace(/^data:image\/[a-z]+;base64,/, "");

                    media.push(
                        {
                            "fileName": infoArquivo.name,
                            "base64": base64,
                            "type": infoArquivo.type
                        }
                    );
                },
                false
            );

            if (f) {
                reader.readAsDataURL(f);;
            }
        }

    } else {
        alert("Máximo de arquivos permitidos é 3");
    }
}

const PostarPost = async (e) => {

    e.preventDefault();

    const validacoes = checkInputs();
    const arquivosSelecionados = media;

    let result;
    validacoes.map(status => {
        status === false ? result = false : "";
    });

    if (result != false) {

        const dom = {
            idOng: ongLogado.idOng,
            descricao: descricao.value,
            media: arquivosSelecionados
        }

        showLoading();
        const request = await ApiRequest("POST", "http://localhost:3131/post", dom);
        console.log(request);

        if (request.status === 200) {
            hideLoading();
            closeModalPostagens();
            location.reload();
        }

    }

}

const PostarEvento = async () => {

    const arquivosSelecionadosEvent = media;
    const candidatoBoolean = candidato.options[candidato.selectedIndex].value;

    const dom = {
        idOng: ongLogado.idOng,
        "evento": {
            titulo: tituloEvento.value,
            dataHora: Date(dataEvento),
            objetivo: "",
            descricao: descEvento.value,
            candidato: candidatoBoolean,
            numeroDeParticipantes: 0
        },
        "endereco": {
            bairro: bairroEvent.value,
            numero: Number(numeroEvent.value),
            cep: cepEvent.value,
            rua: ruaEvent.value,
            complemento: complementosEvent.value,
            municipio: cidadeEvent.value,
            idLogin: ongLogado.idLogin
        },
        media: arquivosSelecionadosEvent
    }
    console.log(dom);

}

const CarregarFeed = async () => {

    const container = document.querySelector(".feed");
    const objetoPost = await ApiRequest("GET", "http://localhost:3131/post");
    // const objetoEvent = await ApiRequest("GET", "http://localhost:3131/event");
    const dadosPost = objetoPost.data;
    // const dadosEvent = dadosEvent.data;
    // console.log(dadosEvent);
    const post = dadosPost.map(CriarPosts);
    container.replaceChildren(...post);

}

const CriarPosts = ({createdAt, descricao, idOng, idPost, tbl_ong, tbl_post_media}) => {
    
    const dataFormat = getFormattedDate(createdAt);

    let corpo;
   
    corpo = document.createElement("div");
    corpo.classList.add("feed");

    if (tbl_post_media.length === 0) {
        
        corpo.innerHTML =
        `
        <div class="post" data-idPost="${idPost}" data-idOng="${idOng}">
            <div class="parte-superior">
                <div class="info-ong">
                    <img src="${tbl_ong.foto}" alt="${tbl_ong.nome}" title="${tbl_ong.nome}">

                    <div class="info-nome-data">
                        <h2>${tbl_ong.nome}</h2>
                        <span>${dataFormat}</span>
                    </div>
                </div>

                <img src="assets/img/mais-sobre-postagem.png" alt="Mais sobre {nomeDaOng}" title="Icone more horizontal">
            </div>

            <p>
                ${descricao}
            </p>

            <div class="interacoes">
                <div class="icone-funcao">
                    <img src="assets/img/curtir-sem-preencimento.png" alt="Curtiram" title="Icone curtir" class="curtir">
                    <span></span>
                </div>
                <div class="icone-funcao">
                    <img src="assets/img/comentario-post-feed.png" alt="Comentar" title="Icone comentar" class="comentar">
                    <span></span>
                </div>
                <div class="icone-funcao">
                    <img src="assets/img/compartilhar.png" alt="Compartilhar" title="Icone compartilhar" class="compartilhar">
                    <span>Compartilhar</span>
                </div>
                <div id="modalCompartilhamento">
                    <div id="shared"></div>
                </div>
            </div>

            <div id="comentar">
                <input name="" id="" placeholder="Digite seu comentário">
                <button type="button" id="enviarComentario">
                    <img src="assets/img/navigation.png" alt="">
                </button>
            </div>
        </div>
        `;

    } else if (tbl_post_media.length === 1) {
        corpo.innerHTML =
        `
        <div class="post" data-idPost="${idPost}" data-idOng="${idOng}">
            <div class="parte-superior">
                <div class="info-ong">
                    <img src="${tbl_ong.foto}" alt="${tbl_ong.nome}" title="${tbl_ong.nome}">

                    <div class="info-nome-data">
                        <h2>${tbl_ong.nome}</h2>
                        <span>${dataFormat}</span>
                    </div>
                </div>

                <img src="assets/img/mais-sobre-postagem.png" alt="Mais sobre {nomeDaOng}" title="Icone more horizontal">
            </div>

            <div class="imagens-postadas">
                <img src="${tbl_post_media[0].url}" class="principal tamanho-total"  alt="{NomeDoPost}" title="Imagem do postagens">
            </div>

            <p>
                ${descricao}
            </p>

            <div class="interacoes">
                <div class="icone-funcao">
                    <img src="assets/img/curtir-sem-preencimento.png" alt="Curtiram" title="Icone curtir" class="curtir">
                    <span></span>
                </div>
                <div class="icone-funcao">
                    <img src="assets/img/comentario-post-feed.png" alt="Comentar" title="Icone comentar" class="comentar">
                    <span></span>
                </div>
                <div class="icone-funcao">
                    <img src="assets/img/compartilhar.png" alt="Compartilhar" title="Icone compartilhar" class="compartilhar">
                    <span>Compartilhar</span>
                </div>
            </div>

            <div id="comentar">
                <input name="" id="" placeholder="Digite seu comentário">
                <button type="button" id="enviarComentario">
                    <img src="assets/img/navigation.png" alt="">
                </button>
            </div>
        </div>
        `;
    } else if (tbl_post_media.length === 2) {
        corpo.innerHTML =
        `
        <div class="post" data-idPost="${idPost}" data-idOng="${idOng}">
            <div class="parte-superior">
                <div class="info-ong">
                    <img src="${tbl_ong.foto}" alt="${tbl_ong.nome}" title="${tbl_ong.nome}">

                    <div class="info-nome-data">
                        <h2>${tbl_ong.nome}</h2>
                        <span>${dataFormat}</span>
                    </div>
                </div>

                <img src="assets/img/mais-sobre-postagem.png" alt="Mais sobre {nomeDaOng}" title="Icone more horizontal">
            </div>

            <div class="imagens-postadas">
                <img src="${tbl_post_media[0].url}" class="principal"  alt="{NomeDoPost}" title="Imagem do postagens">

                <div class="imagens-complementos">
                    <img src="${tbl_post_media[1].url}" alt="{NomeDoPost}" title="Imagem do postagens" class="cima ocupar-tudo">
                </div>
            </div>

            <p>
                ${descricao}
            </p>

            <div class="interacoes">
                <div class="icone-funcao">
                    <img src="assets/img/curtir-sem-preencimento.png" alt="Curtiram" title="Icone curtir" class="curtir">
                    <span></span>
                </div>
                <div class="icone-funcao">
                    <img src="assets/img/comentario-post-feed.png" alt="Comentar" title="Icone comentar" class="comentar">
                    <span></span>
                </div>
                <div class="icone-funcao">
                    <img src="assets/img/compartilhar.png" alt="Compartilhar" title="Icone compartilhar" class="compartilhar">
                    <span>Compartilhar</span>
                </div>
            </div>

            <div id="comentar">
                <input name="" id="" placeholder="Digite seu comentário">
                <button type="button" id="enviarComentario">
                    <img src="assets/img/navigation.png" alt="">
                </button>
            </div>
        </div>
        `;
    } else {
        corpo.innerHTML =
        `
        <div class="post" data-idPost="${idPost}" data-idOng="${idOng}">
            <div class="parte-superior">
                <div class="info-ong">
                    <img src="${tbl_ong.foto}" alt="${tbl_ong.nome}" title="${tbl_ong.nome}">

                    <div class="info-nome-data">
                        <h2>${tbl_ong.nome}</h2>
                        <span>${dataFormat}</span>
                    </div>
                </div>

                <img src="assets/img/mais-sobre-postagem.png" alt="Mais sobre {nomeDaOng}" title="Icone more horizontal">
            </div>

            <div class="imagens-postadas">
                <img src="${tbl_post_media[0].url}" class="principal"  alt="{NomeDoPost}" title="Imagem do postagens">

                <div class="imagens-complementos">
                    <img src="${tbl_post_media[1].url}" alt="{NomeDoPost}" title="Imagem do postagens" class="cima">
                    <img src="${tbl_post_media[2].url}" class="baixo">
                </div>
            </div>

            <p>
                ${descricao}
            </p>

            <div class="interacoes">
                <div class="icone-funcao">
                    <img src="assets/img/curtir-sem-preencimento.png" alt="Curtiram" title="Icone curtir" class="curtir">
                    <span></span>
                </div>
                <div class="icone-funcao">
                    <img src="assets/img/comentario-post-feed.png" alt="Comentar" title="Icone comentar" class="comentar">
                    <span></span>
                </div>
                <div class="icone-funcao">
                    <img src="assets/img/compartilhar.png" alt="Compartilhar" title="Icone compartilhar" class="compartilhar">
                    <span>Compartilhar</span>
                </div>
            </div>

            <div id="comentar">
                <input name="" id="" placeholder="Digite seu comentário">
                <button type="button" id="enviarComentario">
                    <img src="assets/img/navigation.png" alt="">
                </button>
            </div>
        </div>
        `;
    }

    return corpo;

}

document.getElementById("pesquisar").addEventListener("keypress", PesquisarONGs)
document.getElementById("seta-baixo").addEventListener("click", openSetaHeader);
document.getElementById("cancelar-header").addEventListener("click", closeSetaHeader);
document.querySelector("main").addEventListener("click", closeSetaHeader);
document.getElementById("postagens").addEventListener("click", openModalPostagens);
document.getElementById("modalClose").addEventListener("click", closeModalPostagens);
document.getElementById("modalCloseEvento").addEventListener("click", closeModalEvento);
document.getElementById("modalCloseVaga").addEventListener("click", closeModalVaga);
document.getElementById('files').addEventListener('change', handleFileSelect, false);
document.getElementById("filesEvent").addEventListener('change', handleFileSelect, false);
document.getElementById("files").addEventListener('change', imagemPreviewPost);
document.getElementById("filesEvent").addEventListener('change', imagemPreviewEvent);
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
document.getElementById("publicarEvent").addEventListener("click", PostarEvento);
document.getElementById("modal-add-endereco").addEventListener("click", openModalEndereco);
CarregarFeed();