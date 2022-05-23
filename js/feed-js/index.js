"use strict"

import ApiRequest from "../utils/ApiRequest.js";
import Redirect from "../utils/Redirect.js";
import { validarSession } from "../utils/ValidatorSession.js";
import { openSetaHeader, closeSetaHeader } from "../utils/MiniOpMenu.js";
import { closeModalEndereco, closeModalEvento, closeModalPostagens, closeModalVaga, openModalEndereco, openModalPostagens } from "./modalPostagens.js";
import { checkInputs } from "../validator/validatorPostagem.js";
import { imagemPreviewPost, imagemPreviewEvent } from "./PreviewImgFeed.js";
import { getFormattedDate } from "../utils/DataFormat.js";
import { hideLoading, showLoading } from "../utils/Loading.js";
import { PesquisarCep } from "../utils/ViaCep.js";
import { CheckWindow } from "../utils/Menu.js";

// POST
const descricao = document.getElementById("text-post");

// EVENTO
const tituloEvento = document.getElementById("titulo-evento");
const objetivo = document.getElementById("objetivo-evento")
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

// VAGA
const tituloVaga = document.getElementById("titulo-vaga");
const descVaga = document.getElementById("descricao-vaga");
const requisitosVaga = document.getElementById("requisitos-vaga");
const cargaHorariaVaga = document.getElementById("carga-horaria");

let objeto = await ApiRequest("GET", "http://localhost:3131/ong");
let userLogado;
let ongLogado;

const loaderContainer = document.querySelector(".loader");
let page = 0;

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

CheckWindow();

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

function TrocarTipoPostagem({target}) {

    let opcaoValor = target.options[target.selectedIndex].value;
    console.log(opcaoValor);

    if (opcaoValor === "P") {
        document.getElementById("postagem-vaga").classList.remove("active");
        document.getElementById("postagem-evento").classList.remove("active");
        document.getElementById("postagem-post").classList.add("active");
        document.getElementById("trocar-select-post")[0].selected = true;
    } else if (opcaoValor === "E") {
        document.getElementById("postagem-vaga").classList.remove("active");
        document.getElementById("postagem-post").classList.remove("active");
        document.getElementById("postagem-evento").classList.add("active");
        document.getElementById("trocar-select-evento")[1].selected = true;
    } else if (opcaoValor === "V") {
        document.getElementById("postagem-post").classList.remove("active");
        document.getElementById("postagem-evento").classList.remove("active");
        document.getElementById("postagem-vaga").classList.add("active");
        document.getElementById("trocar-select-vaga")[2].selected = true;
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

const PostarEvento = async (e) => {

    e.preventDefault();

    const arquivosSelecionadosEvent = media;
    const endereco = CadastrarEndereco();
    const candidatoEscolha = GetSelectBoolean();
    const dataHora = `${dataEvento.value} ${horaEvento.value}`;

    const dom = {
        idOng: ongLogado.idOng,
        "evento": {
            titulo: tituloEvento.value,
            dataHora: dataHora,
            objetivo: objetivo.value,
            descricao: descEvento.value,
            candidatos: candidatoEscolha,
            numeroParticipantes: 0
        },
        endereco,
        media: arquivosSelecionadosEvent
    }

    showLoading();
    let req = await ApiRequest(
        "POST", 
        "http://localhost:3131/event",
        dom
    );

    if (req.status === 200) {
        hideLoading();
        closeModalEvento();
        location.reload();
    }

}

const PostarVaga = async (e) => {

    e.preventDefault();

    const endereco = CadastrarEndereco();
    let cargaHoraria = cargaHorariaVaga.options[cargaHorariaVaga.selectedIndex].value;

    const dom = {
        idOng: ongLogado.idOng,
        "vaga": {
            titulo: tituloVaga.value,
            descricao: descVaga.value,
            requisitos: requisitosVaga.value,
            cargaHoraria: cargaHoraria
        },
        endereco
    }

    showLoading();
    let req = await ApiRequest(
        "POST", 
        "http://localhost:3131/vacancy", 
        dom
    );

    if (req.status === 200) {
        hideLoading();
        closeModalVaga();
        location.reload();
    }

}

const CadastrarEndereco = () => {

    const domEndereco = {
        bairro: bairroEvent.value,
        numero: Number(numeroEvent.value),
        cep: cepEvent.value,
        rua: ruaEvent.value,
        complemento: complementosEvent.value,
        municipio: cidadeEvent.value,
        uf: estadoEvent.value
    }

    closeModalEndereco();
    return domEndereco;
}

const GetSelectBoolean = () => {

    let candidatoSelect = candidato.options[candidato.selectedIndex].value;
    let booleanCandidato

    if (candidatoSelect === "true") {
        booleanCandidato = true;
    } else {
        booleanCandidato = false;
    }

    return booleanCandidato;

}

const CarregarEventosDestaque = async () => {

    const container = document.getElementById("previa-eventos");
    const objetoEvent = await ApiRequest("GET", "http://localhost:3131/event");
    const eventos = objetoEvent.data;
    const eventosDestaque = eventos.filter(({dataDeCriacao}) => dataDeCriacao === Date()  ? false : true).slice(0, 4);
    const cards = eventosDestaque.map(CriarEventosDestaque);
    container.replaceChildren(...cards);

}

const CriarEventosDestaque  = ({idEventos, tbl_ong, titulo, tbl_evento_media}) => {

    const corpo = document.createElement("div");
    corpo.classList.add("evento");

    corpo.innerHTML = 
    `
        <img src="${tbl_evento_media[0].url}" data-idEvento="${idEventos}" alt="Eventos de doação" id="eventoSelecionado" class="fundo-evento">
        <img src="${tbl_ong.foto}" alt="ONGs" class="perfil-postagem">
        <h3>${titulo}</h3>
    `;

    return corpo;

}

const CarregarVagasConvite = async () => {

    const dataDeHoje = new Date();
    const container = document.getElementById("vagas-indicadas");
    const objetoVagas = await ApiRequest("GET", "http://localhost:3131/vacancy");
    const vagas = objetoVagas.data;
    const vagasDestaque = vagas.filter(({dataDeCriacao}) => dataDeCriacao === dataDeHoje  ? false : true);
    const cards = vagasDestaque.map(CriarVagasDestaques);
    container.replaceChildren(...cards);
    CarregarQtdaVagas(vagasDestaque);

}

const CriarVagasDestaques = ({idVagas, tbl_ong, titulo}) => {

    const corpo = document.createElement("div");
    corpo.classList.add("vaga");

    corpo.innerHTML =
    `
        <div class="info-fundo-vaga">
            <img src="${tbl_ong.banner}" alt="Eventos de doação" class="vaga-fundo">
            <img src="${tbl_ong.foto}" alt="ONGs" class="perfil-postagem">

            <h3>${titulo}</h3>
        </div>

        <button type="button" data-idVaga="${idVagas}">
            conferir vaga
        </button>
    `;

    return corpo;

}

function CarregarQtdaVagas(objetoVagas) {

    let quantidadeVagas = document.getElementById("qtdaVagas");

    quantidadeVagas.innerHTML = `${objetoVagas.length}`;

}

const CarregarFeed = async () => {

    const container = document.querySelector(".feed");
    const objetoFeed = await ApiRequest("GET", `http://localhost:3131/feed/${page}`);
    console.log(objetoFeed);
    const dadosFeed = objetoFeed.data;
    const elementosFeed = dadosFeed.map(CriarFeed);
    const elementosFeedHtml = elementosFeed.map(({outerHTML}) => {
        return outerHTML
    }).join('');
    container.innerHTML += elementosFeedHtml;

}

const CriarFeed = (
    {
        type, 
        dataDeCriacao,
        descricao, 
        idOng, 
        idPost, 
        tbl_ong, 
        tbl_post_media,
        titulo,
        candidatos,
        tbl_evento_media
    }
) => {

    let corpo;
    if (type === "post") {
        
        const dataFormat = getFormattedDate(dataDeCriacao);
   
        corpo = document.createElement("div");
        corpo.classList.add("post");

        if (tbl_post_media.length === 0) {
            
            corpo.innerHTML =
            `
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
                        <span>0 Curtidas</span>
                    </div>
                    <div class="icone-funcao">
                        <img src="assets/img/comentario-post-feed.png" alt="Comentar" title="Icone comentar" class="comentar">
                        <span>Comentários</span>
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
            `;

        } else if (tbl_post_media.length === 1) {
            corpo.innerHTML =
            `
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
                        <span>0 Curtidas</span>
                    </div>
                    <div class="icone-funcao">
                        <img src="assets/img/comentario-post-feed.png" alt="Comentar" title="Icone comentar" class="comentar">
                        <span>Comentários</span>
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
            `;
        } else if (tbl_post_media.length === 2) {
            corpo.innerHTML =
            `
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
                        <span>0 Curtidas</span>
                    </div>
                    <div class="icone-funcao">
                        <img src="assets/img/comentario-post-feed.png" alt="Comentar" title="Icone comentar" class="comentar">
                        <span>Comentários</span>
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
            `;
        } else {
            corpo.innerHTML =
            `
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
                        <span>0 Curtidas</span>
                    </div>
                    <div class="icone-funcao">
                        <img src="assets/img/comentario-post-feed.png" alt="Comentar" title="Icone comentar" class="comentar">
                        <span>Comentários</span>
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
            `;
        }

        return corpo;

    }
    
    if (type === "evento") {
       
        const dataFormat = getFormattedDate(dataDeCriacao);
   
        corpo = document.createElement("div");
        corpo.classList.add("evento-feed");

        if (tbl_evento_media.length === 0) {
            
            corpo.innerHTML = 
            `
            <div class="parte-superior">
                <div class="info-ong">
                    <img src="${tbl_ong.foto}" alt="${tbl_ong.nome}">

                    <div class="info-nome-data">
                        <h2>${tbl_ong.nome}</h2>
                        <span>${dataFormat}</span>
                    </div>
                </div>

                <img src="assets/img/mais-sobre-postagem.png" alt="">
            </div>

            <div class="info-evento">
                <div class="info-superior">
                    <h2>${titulo}</h2>

                    <p>
                        ${descricao}
                    </p>
                </div>

                <div id="interesses">
                    <div id="conteudo-btn">
                        <button type="button" id="saiba-mais-evento">Saiba nais</button>
                        <button type="button" id="candidatarEvento">Candidata-se</button>
                    </div>
                </div>
            </div>
            `;

        } else if (tbl_evento_media.length === 1) {

            corpo.innerHTML = 
            `
            <div class="parte-superior">
                <div class="info-ong">
                    <img src="${tbl_ong.foto}" alt="${tbl_ong.nome}">

                    <div class="info-nome-data">
                        <h2>${tbl_ong.nome}</h2>
                        <span>${dataFormat}</span>
                    </div>
                </div>

                <img src="assets/img/mais-sobre-postagem.png" alt="">
            </div>

            <div class="info-evento">
                <div class="info-superior">
                    <h2>${titulo}</h2>

                    <p>
                        ${descricao}
                    </p>
                </div>

                <div class="imagens-postadas">
                    <img src="${tbl_evento_media[0].url}" class="principal tamanho-total"  alt="{NomeDoPost}" title="Imagem do postagens">
                </div>

                <div id="interesses">
                    <div id="conteudo-btn">
                        <button type="button" id="saiba-mais-evento">Saiba nais</button>
                        <button type="button" id="candidatarEvento">Candidata-se</button>
                    </div>
                </div>
            </div>
            `;

        } else if (tbl_evento_media.length === 2) {

            corpo.innerHTML = 
            `
            <div class="parte-superior">
                <div class="info-ong">
                    <img src="${tbl_ong.foto}" alt="${tbl_ong.nome}">

                    <div class="info-nome-data">
                        <h2>${tbl_ong.nome}</h2>
                        <span>${dataFormat}</span>
                    </div>
                </div>

                <img src="assets/img/mais-sobre-postagem.png" alt="">
            </div>

            <div class="info-evento">
                <div class="info-superior">
                    <h2>${titulo}</h2>

                    <p>
                        ${descricao}
                    </p>
                </div>

                <div class="imagens-postadas">
                    <img src="${tbl_evento_media[0].url}" alt="{NomeDoPost}" title="Imagem do postagens">

                    <div class="imagens-complementos">
                        <img src="${tbl_evento_media[1].url}" alt="{NomeDoPost}" title="Imagem do postagens" class="cima ocupar-tudo">
                    </div>
                </div>

                <div id="interesses">
                    <div id="conteudo-btn">
                        <button type="button" id="saiba-mais-evento">Saiba nais</button>
                        <button type="button" id="candidatarEvento">Candidata-se</button>
                    </div>
                </div>
            </div>
            `;

        } else {

            corpo.innerHTML = 
            `
            <div class="parte-superior">
                <div class="info-ong">
                    <img src="${tbl_ong.foto}" alt="${tbl_ong.nome}">

                    <div class="info-nome-data">
                        <h2>${tbl_ong.nome}</h2>
                        <span>${dataFormat}</span>
                    </div>
                </div>

                <img src="assets/img/mais-sobre-postagem.png" alt="">
            </div>

            <div class="info-evento">
                <div class="info-superior">
                    <h2>${titulo}</h2>

                    <p>
                        ${descricao}
                    </p>
                </div>

                <div class="imagens-postadas">
                    <img src="${tbl_evento_media[0].url}" alt="{NomeDoPost}" title="Imagem do postagens">

                    <div class="imagens-complementos">
                        <img src="${tbl_evento_media[1].url}" alt="{NomeDoPost}" title="Imagem do postagens" class="cima">
                        <img src="${tbl_evento_media[2].url}" alt="{NomeDoPost}" title="Imagem do postagens" class="baixo">
                    </div>
                </div>

                <div id="interesses">
                    <div id="conteudo-btn">
                        <button type="button" id="saiba-mais-evento">Saiba mais</button>
                        <button type="button" id="candidatarEvento">Candidata-se</button>
                    </div>
                </div>
            </div>
            `;
        }

        return corpo;

    }
    
    if (type === "vaga") {
        
        const dataFormat = getFormattedDate(dataDeCriacao);
   
        corpo = document.createElement("div");
        corpo.classList.add("vaga");

        corpo.innerHTML =
        `
        <div class="parte-superior">
            <div class="info-ong">
                <img src="${tbl_ong.foto}" alt="${tbl_ong.nome}" title="${tbl_ong.nome}">

                <div class="info-nome-data">
                    <h2>${tbl_ong.nome}</h2>
                    <span>${dataFormat}</span>
                </div>
            </div>

            <img src="assets/img/mais-sobre-postagem.png" alt="{nomeDoEvento}">
        </div>

        <div class="corpo-vaga">
            <h2>${titulo}</h2>

            <p>
                ${descricao}
            </p>

            <div class="vaga-botoes">
                <button>Saiba Mais</button>
                <button>Interesse</button>
            </div>
        </div>
        `;

        return corpo;

    }

}

const showLoaderFeed = () => {

    loaderContainer.classList.add("show");
    removeLoader();

}

const removeLoader = () => {
    
    setTimeout(() => {
        loaderContainer.classList.remove("show");
        GetNextFeed();
        console.log(page);
    }, 1000);

}

const GetNextFeed = () => {

    page++
    CarregarFeed();

}

document.getElementById("seta-baixo").addEventListener("click", openSetaHeader);
document.getElementById("cancelar-header").addEventListener("click", closeSetaHeader);
document.querySelector("main").addEventListener("click", closeSetaHeader);
document.getElementById("pesquisar").addEventListener("keypress", PesquisarONGs);

// Scroll Infinito
window.addEventListener("scroll", () => {
    
    const { clientHeight, scrollHeight, scrollTop } = document.documentElement
    const isPageBottomAlmostReached = scrollTop + clientHeight >= scrollHeight -1;

    if (isPageBottomAlmostReached) {
        
        showLoaderFeed();

    }

});

CheckWindow();
document.querySelector("#trocar-select-post")
.addEventListener("change", TrocarTipoPostagem);
document.querySelector("#trocar-select-evento").addEventListener("change",TrocarTipoPostagem);
document.querySelector("#trocar-select-vaga").addEventListener("change",TrocarTipoPostagem);
document.getElementById("postagens").addEventListener("click", openModalPostagens);
document.getElementById("modalClose").addEventListener("click", closeModalPostagens);
document.getElementById("modalCloseEvento").addEventListener("click", closeModalEvento);
document.getElementById("modalCloseVaga").addEventListener("click", closeModalVaga);
document.getElementById('files').addEventListener('change', handleFileSelect, false);
document.getElementById("filesEvent").addEventListener('change', handleFileSelect, false);
document.getElementById("files").addEventListener('change', imagemPreviewPost);
document.getElementById("filesEvent").addEventListener('change', imagemPreviewEvent);
document.getElementById("publicarPost").addEventListener("click", PostarPost);
document.getElementById("publicarEvent").addEventListener("click", PostarEvento);
document.getElementById("publicarVaga").addEventListener("click", PostarVaga);
document.getElementById("modal-add-endereco").addEventListener("click", openModalEndereco);
document.getElementById("btnCancelar").addEventListener("click", closeModalEndereco);
document.getElementById("cep").addEventListener("focusout", PesquisarCep);
document.getElementById("btnSalvar").addEventListener("click", CadastrarEndereco);
document.getElementById("btnEndereco").addEventListener("click", openModalEndereco);
CarregarEventosDestaque();
CarregarVagasConvite();
CarregarFeed();