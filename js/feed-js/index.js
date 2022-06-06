"use strict"

import ApiRequest from "../utils/ApiRequest.js";
import Redirect from "../utils/Redirect.js";
import { validarSession } from "../utils/ValidatorSession.js";
import { openSetaHeader, closeSetaHeader } from "../utils/MiniOpMenu.js";
import { closeModalEndereco, closeModalEvento, closeModalPostagens, closeModalVaga, openModalEndereco, openModalPostagens } from "./modalPostagens.js";
import { checkInputs } from "../validator/validatorPostagem.js";
import { imagemPreviewPost, imagemPreviewEvent } from "./PreviewImgFeed.js";
import { getFormattedDate, getFormattedDateFeed } from "../utils/DataFormat.js";
import { hideLoading, showLoading } from "../utils/Loading.js";
import { PesquisarCep } from "../utils/ViaCep.js";
import { CheckWindow } from "../utils/Menu.js";
import { closeModalInfoEvento, closeModalInfoVaga, openModalInfoEvento, openModalInfoVaga } from "./modalFeed.js";
import { MessageValidator, MessageValidatorClose } from "./MessageValidator.js";

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
let dadosOng;

const loaderContainer = document.querySelector(".loader");
let page = 0;

if (localStorage.hasOwnProperty('dadosUsuario') !== false) {
    
    localStorage.removeItem('idOng');

    userLogado = validarSession("dadosUsuario");
    let req = await ApiRequest("GET", `http://localhost:3131/user/${userLogado.idUsuario}`);
    const dadosUsuario = req.data;

    let linkPerfil = document.getElementById("profileLink");
    linkPerfil.href = `perfilUsuario.html`;

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
            fotoLogado.setAttribute("src", "../..img/sem-foto.png");
            fotoHeader.setAttribute("src", "../../assets/img/sem-foto.png");
        } else if (!objectLocal.foto.includes(".jpg") && !objectLocal.foto.includes(".jpeg") && !objectLocal.foto.includes(".png") && !objectLocal.foto.includes(".svg") && !objectLocal.foto.includes(".git") && !objectLocal.foto.includes(".webp")) {
            fotoLogado.setAttribute("src", `../../assets/img/sem-foto.png`);
            fotoHeader.setAttribute("src", "../../assets/img/sem-foto.png");
        } else {
            fotoLogado.setAttribute("src", `${objectLocal.foto}`);
            fotoHeader.setAttribute("src", `${objectLocal.foto}`);
        }
    
    }
    CarregarMiniPerfil(dadosUsuario);

    const CarregarTodosSeguidores = async () => {

        const container = document.querySelector("#seguindo");
        const quantidade = document.getElementById("qtdaSeguidores");
        const textSeguir = document.getElementById("textSeguidor");
        let req = await ApiRequest("GET", `http://localhost:3131/follower/user/${dadosUsuario.idUsuario}`);
        const dadosSeguidores = req.data;
        quantidade.innerHTML = `${dadosSeguidores.length}`;
        const seguidores = dadosSeguidores.map(CriarSeguidores);
        container.replaceChildren(...seguidores);
        textSeguir.innerHTML = `SEGUINDO`;
    
    }
    
    const CriarSeguidores = ({tbl_ong}) => {
    
        let corpo;
        corpo = document.createElement("div");
        corpo.classList.add("info-seguindo");
    
        corpo.innerHTML =
        `
            <img src="${tbl_ong.foto}" id="meu-perfil-feed" data-idong="${tbl_ong.idOng}"  alt="{nomeDoSeguidor}">
    
            <div class="identificador">
                <h3>${tbl_ong.nome}</h3>
                <span>ONG</span>
            </div>
        `;
    
        return corpo;
    
    }

    CarregarTodosSeguidores();

} else if (localStorage.hasOwnProperty('dadosOng') !== false) {

    localStorage.removeItem('idOng');
    localStorage.removeItem('idUser');

    ongLogado = validarSession("dadosOng");
    let req = await ApiRequest("GET", `http://localhost:3131/ong/${ongLogado.idOng}`);
    dadosOng = req.data;

    if (!dadosOng.foto || !dadosOng.banner || !dadosOng.historia || !dadosOng.descricao) {
        Redirect("perfilONGs");
    }

    let linkPerfil = document.getElementById("profileLink");
    linkPerfil.href = `perfilONGs.html`;

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
        } else if (!objectLocal.foto.includes(".jpg") && !objectLocal.foto.includes(".jpeg") && !objectLocal.foto.includes(".png") && !objectLocal.foto.includes(".svg") && !objectLocal.foto.includes(".git") && !objectLocal.foto.includes(".webp")) {
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

    const VisitarPerfilUsuario = ({target}) => {

        if (target.id === "perfil-commit") {
            
            const idUser = target.dataset.iduser;

            const idUserSelecionado = {
                idUsuario: idUser
            }
    
            localStorage.setItem("idUser", JSON.stringify(idUserSelecionado));
            Redirect("perfilUsuario");

        }

    }
    document.querySelector(".feed").addEventListener("click", VisitarPerfilUsuario);

    const CarregarTodosSeguidores = async () => {

        const container = document.querySelector("#seguindo");
        const quantidade = document.getElementById("qtdaSeguidores");
        let req = await ApiRequest("GET", `http://localhost:3131/follower/ong/${dadosOng.idOng}`);
        const dadosSeguidores = req.data;
        quantidade.innerHTML = `${dadosSeguidores.length}`;
        const seguidores = dadosSeguidores.map(CriarSeguidores);
        container.replaceChildren(...seguidores);
    
    }

    const CriarSeguidores = ({tbl_usuario}) => {

        let corpo;
        corpo = document.createElement("div");
        corpo.classList.add("info-seguindo");

        corpo.innerHTML =
        `
            <img src="${tbl_usuario.foto}" alt="{nomeDoSeguidor}">

            <div class="identificador">
                <h3>${tbl_usuario.nome}</h3>
                <span>Doador</span>
            </div>
        `;

        return corpo;

    }

    CarregarTodosSeguidores();

} else {

    Redirect("cadastroUsuario");

}

const limparElementos = elemento => {

    while(elemento.firstChild){
        elemento.removeChild(elemento.lastChild);
    }

}

const PesquisarONGs = (evento) => {

    if (evento.key == "Enter") {

        const pesquisaNome = evento.target.value;
        CarregarFeedPesquisa(pesquisaNome);

    }

}

const CarregarFeedPesquisa = async (nomeOng) => {

    if (nomeOng === undefined) {

        alert("Digite um nome de ONG para pesquisar");
        CarregarFeed();
    
    } else {

        limparElementos(document.querySelector(".feed"));
        CarregarFeed(nomeOng);
        
    }

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
    const eventosDestaque = eventos.filter(({dataHora}) => dataHora >= new Date()  ? false : true).slice(0, 4);
    const cards = eventosDestaque.map(CriarEventosDestaque);
    container.replaceChildren(...cards);

}

const CriarEventosDestaque  = ({idEventos, tbl_ong, titulo, tbl_evento_media, idOng}) => {

    let corpo;
    corpo = document.createElement("div");
    corpo.classList.add("evento");
    corpo.id = "evento";

    if (tbl_evento_media.length === 0) {
        corpo.innerHTML = 
        `
            <img src="${tbl_ong.banner}" data-idEvento="${idEventos}" data-idong="${idOng}" alt="Eventos de doação" id="eventoSelecionado" class="fundo-evento">
            <img src="${tbl_ong.foto}" id="meu-perfil-feed" alt="ONGs" class="perfil-postagem">
            <h3>${titulo}</h3>
        `;
    } else {
        corpo.innerHTML = 
        `
            <img src="${tbl_evento_media[0].url}" data-idEvento="${idEventos}" data-idong="${idOng}" alt="Eventos de doação" id="eventoSelecionado" class="fundo-evento">
            <img src="${tbl_ong.foto}" id="meu-perfil-feed" data-idong="${idOng}" alt="ONGs" class="perfil-postagem">
            <h3>${titulo}</h3>
        `;
    }

    return corpo;

}

const CarregarVagasConvite = async () => {

    const container = document.getElementById("vagas-indicadas");
    const objetoVagas = await ApiRequest("GET", "http://localhost:3131/feed/vaga/0");
    const vagas = objetoVagas.data;
    const cards = vagas.map(CriarVagasDestaques);
    container.replaceChildren(...cards);
    CarregarQtdaVagas(vagas);

}

const CriarVagasDestaques = ({idVagas, tbl_ong, titulo, idOng}) => {

    const corpo = document.createElement("div");
    corpo.classList.add("vaga");

    corpo.innerHTML =
    `
        <div class="info-fundo-vaga">
            <img src="${tbl_ong.banner}" alt="Eventos de doação" class="vaga-fundo">
            <img src="${tbl_ong.foto}" id="meu-perfil-feed" data-idong="${idOng}" alt="ONGs" class="perfil-postagem">

            <h3>${titulo}</h3>
        </div>

        <button type="button" id="vagaSelecionado" data-idong="${idOng}" data-idVaga="${idVagas}">
            conferir vaga
        </button>
    `;

    return corpo;

}

function CarregarQtdaVagas(objetoVagas) {

    let quantidadeVagas = document.getElementById("qtdaVagas");

    quantidadeVagas.innerHTML = `${objetoVagas.length}`;

}

const CarregarFeed = async (nomeOng) => {

    if (nomeOng === undefined || nomeOng === null) {
        
        const container = document.querySelector(".feed");
        const objetoFeed = await ApiRequest("GET", `http://localhost:3131/feed/${page}`);
        const dadosFeed = objetoFeed.data;
        const elementosFeed = dadosFeed.map(CriarFeed);
        const elementosFeedHtml = elementosFeed.map(({outerHTML}) => {
            return outerHTML
        }).join('');
        container.innerHTML += elementosFeedHtml;

    } else {
        const container = document.querySelector(".feed");
        const objetoFeed = await ApiRequest("GET", `http://localhost:3131/feed/all/${nomeOng}/${page}`);

        if (objetoFeed.status === 404) {

            alert(`A pesquisa ${nomeOng} não encontrou resultados`);
            window.location.reload();
        
        } else {

            const dadosFeed = objetoFeed.data;
            const elementosFeed = dadosFeed.map(CriarFeed);
            const elementosFeedHtml = elementosFeed.map(({outerHTML}) => {
                return outerHTML
            }).join('');
            container.innerHTML += elementosFeedHtml;

        }
    }

}

const CriarFeed = (
    {
        type, 
        dataDeCriacao,
        descricao, 
        idOng, 
        idPost,
        idVagas,
        idEventos,
        tbl_ong,
        tbl_post_media,
        titulo,
        candidatos,
        tbl_evento_media,
        tbl_comentario,
        tbl_curtidas_dos_posts
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
                        <img src="${tbl_ong.foto}" alt="${tbl_ong.nome}" title="${tbl_ong.nome}" id="meu-perfil-feed" data-idong="${idOng}">

                        <div class="info-nome-data">
                            <h2>${tbl_ong.nome}</h2>
                            <span>${dataFormat} - POST</span>
                        </div>
                    </div>

                    <img src="assets/img/mais-sobre-postagem.png" alt="Mais sobre {nomeDaOng}" title="Icone more horizontal">
                </div>

                <p>
                    ${descricao}
                </p>

                <div class="interacoes">
                    <div class="icone-funcao">
                        <img src="${statusImagem(tbl_curtidas_dos_posts)}" alt="Curtiram" title="Icone curtir" class="curtir" id="curtir-post" data-idpost="${idPost}">
                        <span>${tbl_curtidas_dos_posts.length} Curtidas</span>
                    </div>
                    <div class="icone-funcao">
                        <img src="assets/img/comentario-post-feed.png" alt="Comentar" title="Icone comentar" class="comentar">
                        <span>${tbl_comentario.length} Comentários</span>
                    </div>
                    <div class="icone-funcao">
                        <img src="assets/img/compartilhar.png" alt="Compartilhar" title="Icone compartilhar" class="compartilhar">
                        <span>Compartilhar</span>
                    </div>
                </div>

                <div class="comentarios">
                    ${
                        tbl_comentario.map(comentario => generateComments(comentario)).join("")
                    }
                </div>

                <div id="comentar">
                    <input type="text" name="comentario" id="comentario" placeholder="Digite seu comentário" data-idpost="${idPost}">
                </div>
            `;

        } else if (tbl_post_media.length === 1) {

            corpo.innerHTML =
            `
            <div class="parte-superior">
                    <div class="info-ong">
                        <img src="${tbl_ong.foto}" alt="${tbl_ong.nome}" title="${tbl_ong.nome}" id="meu-perfil-feed" data-idong="${idOng}">

                        <div class="info-nome-data">
                            <h2>${tbl_ong.nome}</h2>
                            <span>${dataFormat} - POST</span>
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
                        <img src="${statusImagem(tbl_curtidas_dos_posts)}" alt="Curtiram" title="Icone curtir" class="curtir" id="curtir-post" data-idpost="${idPost}">
                        <span>${tbl_curtidas_dos_posts.length} Curtidas</span>
                    </div>
                    <div class="icone-funcao">
                        <img src="assets/img/comentario-post-feed.png" alt="Comentar" title="Icone comentar" class="comentar">
                        <span>${tbl_comentario.length} Comentários</span>
                    </div>
                    <div class="icone-funcao">
                        <img src="assets/img/compartilhar.png" alt="Compartilhar" title="Icone compartilhar" class="compartilhar">
                        <span>Compartilhar</span>
                    </div>
                </div>

                <div class="comentarios">
                    ${
                        tbl_comentario.map(comentario => generateComments(comentario)).join("")
                    }
                </div>

                <div id="comentar">
                    <input type="text" name="comentario" id="comentario" placeholder="Digite seu comentário" data-idpost="${idPost}">
                </div>
            `;
        
        } else if (tbl_post_media.length === 2) {
            
            corpo.innerHTML =
            `
            <div class="parte-superior">
                    <div class="info-ong">
                        <img src="${tbl_ong.foto}" alt="${tbl_ong.nome}" title="${tbl_ong.nome}" id="meu-perfil-feed" data-idong="${idOng}">

                        <div class="info-nome-data">
                            <h2>${tbl_ong.nome}</h2>
                            <span>${dataFormat} - POST</span>
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
                        <img src="${statusImagem(tbl_curtidas_dos_posts)}" alt="Curtiram" title="Icone curtir" class="curtir" id="curtir-post" data-idpost="${idPost}">
                        <span>${tbl_curtidas_dos_posts.length} Curtidas</span>
                    </div>
                    <div class="icone-funcao">
                        <img src="assets/img/comentario-post-feed.png" alt="Comentar" title="Icone comentar" class="comentar">
                        <span>${tbl_comentario.length} Comentários</span>
                    </div>
                    <div class="icone-funcao">
                        <img src="assets/img/compartilhar.png" alt="Compartilhar" title="Icone compartilhar" class="compartilhar">
                        <span>Compartilhar</span>
                    </div>
                </div>

                <div class="comentarios">
                    ${
                        tbl_comentario.map(comentario => generateComments(comentario)).join("")
                    }
                </div>

                <div id="comentar">
                    <input type="text" name="comentario" id="comentario" placeholder="Digite seu comentário" data-idpost="${idPost}">
                </div>
            `;
        
        } else {
            
            corpo.innerHTML =
            `
            <div class="parte-superior">
                    <div class="info-ong">
                        <img src="${tbl_ong.foto}" alt="${tbl_ong.nome}" title="${tbl_ong.nome}" id="meu-perfil-feed" data-idong="${idOng}">

                        <div class="info-nome-data">
                            <h2>${tbl_ong.nome}</h2>
                            <span>${dataFormat} - POST</span>
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
                        <img src="${statusImagem(tbl_curtidas_dos_posts)}" alt="Curtiram" title="Icone curtir" class="curtir" id="curtir-post" data-idpost="${idPost}">
                        <span id="qtdaCurtida">${
                            qtdaCurtidas(tbl_curtidas_dos_posts)
                        } Curtidas</span>
                    </div>
                    <div class="icone-funcao">
                        <img src="assets/img/comentario-post-feed.png" alt="Comentar" title="Icone comentar" class="comentar">
                        <span>${tbl_comentario.length} Comentários</span>
                    </div>
                    <div class="icone-funcao">
                        <img src="assets/img/compartilhar.png" alt="Compartilhar" title="Icone compartilhar" class="compartilhar">
                        <span>Compartilhar</span>
                    </div>
                </div>

                <div class="comentarios">
                    ${
                        tbl_comentario.map(comentario => generateComments(comentario)).join("")
                    }
                </div>

                <div id="comentar">
                    <input type="text" name="comentario" id="comentario" placeholder="Digite seu comentário" data-idpost="${idPost}">
                </div>
            `;
        
        }

        return corpo;

    }
    
    if (type === "evento") {

        const dataFormat = getFormattedDate(dataDeCriacao);
        
        corpo = document.createElement("div");
        corpo.classList.add("evento-feed");
        
        let buttonCandidato;
        if (candidatos === true) {

            buttonCandidato = `<button type="button" id="candidatarEvento" data-idEvento="${idEventos}">Candidata-se</button>`;
            
        } else if (candidatos === false) {

            buttonCandidato = ``;

        }

        if (tbl_evento_media.length === 0) {
            
            corpo.innerHTML = 
            `
            <div class="parte-superior">
                <div class="info-ong">
                    <img src="${tbl_ong.foto}" alt="${tbl_ong.nome}" id="meu-perfil-feed" data-idong="${idOng}">

                    <div class="info-nome-data">
                        <h2>${tbl_ong.nome}</h2>
                        <span>${dataFormat} - EVENTO</span>
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
                        <button type="button" id="saiba-mais-evento" data-idOng="${idOng}" data-idEvento="${idEventos}">Saiba mais</button>
                        ${buttonCandidato}
                    </div>
                </div>
            </div>
            `;

        } else if (tbl_evento_media.length === 1) {

            corpo.innerHTML = 
            `
            <div class="parte-superior">
                <div class="info-ong">
                    <img src="${tbl_ong.foto}" alt="${tbl_ong.nome}" id="meu-perfil-feed" data-idong="${idOng}">

                    <div class="info-nome-data">
                        <h2>${tbl_ong.nome}</h2>
                        <span>${dataFormat} - EVENTO</span>
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
                        <button type="button" id="saiba-mais-evento" data-idOng="${idOng}" data-idEvento="${idEventos}">Saiba mais</button>
                        ${buttonCandidato}
                    </div>
                </div>
            </div>
            `;

        } else if (tbl_evento_media.length === 2) {

            corpo.innerHTML = 
            `
            <div class="parte-superior">
                <div class="info-ong">
                    <img src="${tbl_ong.foto}" alt="${tbl_ong.nome}" id="meu-perfil-feed" data-idong="${idOng}">

                    <div class="info-nome-data">
                        <h2>${tbl_ong.nome}</h2>
                        <span>${dataFormat} - EVENTO</span>
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
                        <button type="button" id="saiba-mais-evento" data-idOng="${idOng}" data-idEvento="${idEventos}">Saiba nais</button>
                        ${buttonCandidato}
                    </div>
                </div>
            </div>
            `;

        } else {

            corpo.innerHTML = 
            `
            <div class="parte-superior">
                <div class="info-ong">
                    <img src="${tbl_ong.foto}" alt="${tbl_ong.nome}" id="meu-perfil-feed" data-idong="${idOng}">

                    <div class="info-nome-data">
                        <h2>${tbl_ong.nome}</h2>
                        <span>${dataFormat} - EVENTO</span>
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
                        <button type="button" id="saiba-mais-evento" data-idOng="${idOng}" data-idEvento="${idEventos}">Saiba nais</button>
                        ${buttonCandidato}
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
                <img src="${tbl_ong.foto}" alt="${tbl_ong.nome}" title="${tbl_ong.nome}" id="meu-perfil-feed" data-idong="${idOng}">

                <div class="info-nome-data">
                    <h2>${tbl_ong.nome}</h2>
                    <span>${dataFormat} - VAGA</span>
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
                <button type="button" id="saiba-mais-vaga" data-idvaga="${idVagas}" data-idong="${idOng}">Saiba Mais</button>
                <button type="button" id="interesse-vaga" data-idvaga="${idVagas}">Interesse</button>
            </div>
        </div>
        `;

        return corpo;

    }

}

const Comentar = (evento) => {

    console.log(evento);
    if (evento.key == "Enter") {
        
        const idPostagem = evento.target.dataset.idpost;
        const idUser = userLogado.idUsuario;
        const comentario = evento.target.value;
        EnviarComentario(evento, idPostagem, idUser, comentario);

    }


}

const EnviarComentario = async (evento, idPostagem, idUser, textoComentario) => {

    const bodyComentario = {

        idPost: Number(idPostagem),
        idUsuario: Number(idUser),
        comentario: {
            texto: textoComentario
        }

    }
    
    let req = await ApiRequest("POST", "http://localhost:3131/comment", bodyComentario);
    const dadoCommit = req.data;
    
    if (req.status === 200) {
        
        const elemento = evento.target.parentElement.parentElement.children[4];
        elemento.innerHTML += generateComments(dadoCommit);
        evento.target.value = "";
        
    
    } else {

        alert("Erro ao enviar comentário");

    }

}

function generateComments(comentario) {

    const dataFormat = getFormattedDateFeed(comentario.dataDeCriacao);

    let innerHTML;
    innerHTML = 
    `
        <div class="corpo-comentario">
            <div class="lateral-imagem">
                <img src="${comentario.tbl_usuario.foto}" alt="${comentario.tbl_usuario.nome}" data-iduser="${comentario.tbl_usuario.idUsuario}" id="perfil-commit" title="Foto de perfil">
            </div>
            <div class="vertical-info">
                <div class="comentario">
                    <h3>${comentario.tbl_usuario.nome}</h3>
                    <p>
                        ${comentario.comentario}
                    </p>
                </div>
                <div class="acoes-comentario">
                    <span>${dataFormat}</span>
                    <div class="curtir-comentario">
                        <img src="assets/img/comentario-curtida-sem-preenchimento.png" alt="{nomeDaPessoa}">
                        <span>0 Curtiram</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    return innerHTML;
}

const Curtir = async (evento) => {

    if (evento.target.id === "curtir-post") {
        const idPostagem = evento.target.dataset.idpost;
        const idUser = userLogado.idUsuario;
        CurtirPost(evento, idPostagem, idUser);
    }

}

const CurtirPost = async (evento, idPostagem, idUser) => {

    const bodyCurtir = {
        idPost: Number(idPostagem),
        idUsuario: Number(idUser)
    }

    let req = await ApiRequest("POST", "http://localhost:3131/post/like", bodyCurtir);

    if (req.status === 200) {

        limparElementos(document.querySelector(".feed"));
        CarregarFeed();

    } else if (req.status === 400) {
        
        let req = await ApiRequest("DELETE", `http://localhost:3131/post/like/${idPostagem}/${idUser}`);

        if (req.status === 200) {
            limparElementos(document.querySelector(".feed"));
            CarregarFeed();
        }

    } else {

        alert("Erro ao curtir postagem");

    }


}

const statusImagem = (infoCurtidas) => {

    if (infoCurtidas.length > 0) {

        if (!userLogado) {

            console.log("Não logado como usuário");

        } else {

            const likeTeste = infoCurtidas.filter(({ tbl_usuario }) => tbl_usuario.idUsuario === userLogado.idUsuario);
            let src;
            if (likeTeste.length > 0) {
                src = "assets/img/curtida-com-preenchimento.png";
            } else {
                src = "assets/img/curtir-sem-preencimento.png";
            }
            
            return src
        }
    
    } else {
        
        return "assets/img/curtir-sem-preencimento.png";
    
    }
}

const qtdaCurtidas = (qtdaCurtidas) => {

    if (qtdaCurtidas.length > 0) {
        return qtdaCurtidas.length;
    } else {
        return 0;
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

const CarregarModalInfoEventos = ({target}) => {

    if (target.id === "saiba-mais-evento") {

        openModalInfoEvento();
        const idEvento = target.dataset.idevento;
        const idOng = target.dataset.idong;
        DescarregaDadosModalEventos(idEvento, idOng);

    }

}

const DescarregaDadosModalEventos = async (idEvento, idOng) => {

    const container = document.querySelector(".modal-conteudo");
    let req = await ApiRequest("GET", `http://localhost:3131/event/${idOng}/${idEvento}`);
    const dadosEvento = req.data;
    const card = CriarModalEventos(dadosEvento);
    container.replaceChildren(card);

}

const CriarModalEventos = (dadosEvento) => {

    let corpo;
    
    const modal = document.createElement("div");
    modal.classList.add("modal-conteudo");
    
    const dataHora = getFormattedDateFeed(dadosEvento.dataHora);

    const disponibilidadeEvento = new Date(dadosEvento.dataHora); 
    const dataAtual = new Date();

    let status;
    if (dataAtual - disponibilidadeEvento > 0) {
        status = "Não"
    } else {
        status = "Sim"
    }

    if (dadosEvento.candidatos === true) {

        modal.innerHTML =
        `
        <div class="infos-conteudo">
            <div class="infos">
                <label>Objetivo: </label>
                <h3>${dadosEvento.objetivo}</h3>
            </div>
            <div class="infos">
                <label>Data e Hora: </label>
                <h3>${dataHora}</h3>
            </div>
            <div class="infos">
                <label>Aceitamos Candidatos: </label>
                <h3>Sim</h3>
            </div>
            <div class="infos">
                <label>Local: </label>
                <h3>${dadosEvento.tbl_endereco.cep}, ${dadosEvento.tbl_endereco.municipio} ${dadosEvento.tbl_endereco.tbl_estado.nome}, ${dadosEvento.tbl_endereco.rua}, ${dadosEvento.tbl_endereco.numero}</h3>
            </div>
            <div class="infos">
                <label>Evento disponível: </label>
                <h3>${status}</h3>
            </div>
        </div>
        `;

        corpo = modal;

    }
    
    if (dadosEvento.candidatos === false) {

        modal.innerHTML =
        `
            <div class="infos-conteudo">
                <div class="infos">
                    <label>Objetivo: </label>
                    <h3>${dadosEvento.objetivo}</h3>
                </div>
                <div class="infos">
                    <label>Data e Hora: </label>
                    <h3>${dataHora}</h3>
                </div>
                <div class="infos">
                    <label>Aceitamos Candidatos: </label>
                    <h3>Não</h3>
                </div>
                <div class="infos">
                    <label>Local: </label>
                    <h3>${dadosEvento.tbl_endereco.cep}, ${dadosEvento.tbl_endereco.municipio} ${dadosEvento.tbl_endereco.tbl_estado.sigla}, ${dadosEvento.tbl_endereco.rua} ${dadosEvento.tbl_endereco.numero}</h3>
                </div>
                <div class="infos">
                    <label>Evento disponível: </label>
                    <h3>${status}</h3>
                </div>
            </div>
        `;

        corpo = modal;
    }

    return corpo;

}

const CandidatarEvento = async ({target}) => {

    if (target.id === "candidatarEvento") {

        const idEvento = target.dataset.idevento;
        const idUsuario = userLogado.idUsuario;
        CandidatarEventoUsuario(idEvento, idUsuario);
        
    }

}

const CandidatarEventoUsuario = async (idEvento, idUsuario) => {

    const bodyEvent = {

        idEvento: idEvento,
        idUsuario: idUsuario

    }

    let req = await ApiRequest(
        "POST", 
        `http://localhost:3131/event-controller`, 
        bodyEvent
    );

    if (req.status === 200) { 
        
        MessageValidator("assets/img/success-icon.svg", "Você se candidatou ao evento com sucesso!");

    } else { 

        MessageValidator("assets/img/error-icon.svg", "Você já se candidatou ao evento!");

    }


}

const CarregarModalInfoVagas = ({target}) => {

    if (target.id === "saiba-mais-vaga") {

        openModalInfoVaga();
        const idVaga = target.dataset.idvaga;
        const idOng = target.dataset.idong;
        DescarregaDadosModalVagas(idVaga, idOng);

    }


}

const DescarregaDadosModalVagas = async (idVaga, idOng) => {

    const container = document.getElementById("info-vaga");
    let req = await ApiRequest("GET", `http://localhost:3131/vacancy/${idOng}/${idVaga}`);
    const dadosVaga = req.data;
    console.log(dadosVaga);
    const card = CriarModalVagas(dadosVaga);
    console.log(card);
    container.replaceChildren(card);

}

const CriarModalVagas = (dadosVaga) => {

    let corpo;

    corpo = document.createElement("div");
    corpo.classList.add("modal-conteudo-vaga");

    corpo.innerHTML =
    `
        <div id="infos-conteudo">
            <div id="requisitos">
                <label>Requisitos</label>

                <h2>${dadosVaga.requisitos}</h2>
            </div>

            <div class="info-vaga">
                <label>Carga horária:</label>
                <h2>${dadosVaga.cargaHoraria} Horas</h2>
            </div>
            <div class="info-vaga">
                <label>Local:</label>
                <h2>${dadosVaga.tbl_endereco.cep}, ${dadosVaga.tbl_endereco.municipio} SP, ${dadosVaga.tbl_endereco.rua}, número ${dadosVaga.tbl_endereco.numero}</h2>
            </div>
            <div class="info-vaga">
                <label>Telefone: </label>
                <h2>${dadosVaga.tbl_contato.telefone}</h2>
            </div>
            <div class="info-vaga">
                <label>Celular: </label>
                <h2>${dadosVaga.tbl_contato.numero}</h2>
            </div>
        </div>
    `;

    return corpo;

}

const CandidatarVaga = async ({target}) => {

    if (target.id === "interesse-vaga") {

        const idEvento = target.dataset.idvaga;
        const idUsuario = userLogado.idUsuario;
        CandidatarVagaUsuario(idEvento, idUsuario);
        
    }

}

const CandidatarVagaUsuario = async (idVaga, idUsuario) => {

    const bodyVacancy = {

        idVagas: idVaga,
        idUsuario: idUsuario

    }

    let req = await ApiRequest(
        "POST", 
        `http://localhost:3131/vacancy-controller`, 
        bodyVacancy
    );

    if (req.status === 200) { 
        
        MessageValidator("assets/img/success-icon.svg", "Você se candidatou a vaga com sucesso!");

    } else { 

        MessageValidator("assets/img/error-icon.svg", "Você já se candidatou a está vaga!");

    }


}

const CarregarEventoSelecionado = ({target}) => {

    if (target.id === "eventoSelecionado") {

        const idEvento = target.dataset.idevento;
        const idOng = target.dataset.idong;
        DescarregaEventoSelecionado(idEvento, idOng);

    }

}

const DescarregaEventoSelecionado = async (idEvento, idOng) => {

    const container = document.querySelector(".feed");
    let req = await ApiRequest("GET", `http://localhost:3131/event/${idOng}/${idEvento}`);
    const dadosEvento = req.data;
    const eventoSelecionado = CriarEventoSelecionado(dadosEvento);
    container.replaceChildren(eventoSelecionado);

}

const CriarEventoSelecionado = (dadosEvento) => {

    let corpo;
    corpo = document.createElement("div");
    corpo.classList.add("evento-feed");
       
    const dataFormat = getFormattedDate(dadosEvento.dataDeCriacao);

    let buttonCandidato;
    if (dadosEvento.candidatos === true) {

        buttonCandidato = `<button type="button" id="candidatarEvento" data-idEvento="${dadosEvento.idEventos}">Candidata-se</button>`;
        
    } else if (dadosEvento.candidatos === false) {

        buttonCandidato = ``;

    }

    if (dadosEvento.tbl_evento_media.length === 0) {
        
        corpo.innerHTML = 
        `
        <div class="parte-superior">
            <div class="info-ong">
                <img src="${dadosEvento.tbl_ong.foto}" alt="${dadosEvento.tbl_ong.nome}" id="meu-perfil-feed" 
                data-idong="${dadosEvento.idOng}">

                <div class="info-nome-data">
                    <h2>${dadosEvento.tbl_ong.nome}</h2>
                    <span>${dataFormat} - EVENTO</span>
                </div>
            </div>

            <img src="assets/img/mais-sobre-postagem.png" alt="">
        </div>

        <div class="info-evento">
            <div class="info-superior">
                <h2>${dadosEvento.titulo}</h2>

                <p>
                    ${dadosEvento.descricao}
                </p>
            </div>

            <div id="interesses">
                <div id="conteudo-btn">
                    <button type="button" id="saiba-mais-evento" data-idOng="${dadosEvento.idOng}" data-idEvento="${dadosEvento.idEventos}">Saiba mais</button>
                    ${buttonCandidato}
                </div>
            </div>
        </div>
        `;

    } else if (dadosEvento.tbl_evento_media.length === 1) {

        corpo.innerHTML = 
        `
        <div class="parte-superior">
            <div class="info-ong">
                <img src="${dadosEvento.tbl_ong.foto}" alt="${dadosEvento.tbl_ong.nome}" id="meu-perfil-feed" 
                data-idong="${dadosEvento.idOng}">

                <div class="info-nome-data">
                    <h2>${dadosEvento.tbl_ong.nome}</h2>
                    <span>${dataFormat} - EVENTO</span>
                </div>
            </div>

            <img src="assets/img/mais-sobre-postagem.png" alt="">
        </div>

        <div class="info-evento">
            <div class="info-superior">
                <h2>${dadosEvento.titulo}</h2>

                <p>
                    ${dadosEvento.descricao}
                </p>
            </div>

            <div class="imagens-postadas">
                <img src="${dadosEvento.tbl_evento_media[0].url}" class="principal tamanho-total"  alt="{NomeDoPost}" title="Imagem do postagens">
            </div>

            <div id="interesses">
                <div id="conteudo-btn">
                    <button type="button" id="saiba-mais-evento" data-idOng="${dadosEvento.idOng}" data-idEvento="${dadosEvento.idEventos}">Saiba mais</button>
                    ${buttonCandidato}
                </div>
            </div>
        </div>
        `;

    } else if (dadosEvento.tbl_evento_media.length === 2) {

        corpo.innerHTML = 
        `
        <div class="parte-superior">
            <div class="info-ong">
                <img src="${dadosEvento.tbl_ong.foto}" alt="${dadosEvento.tbl_ong.nome}" id="meu-perfil-feed" 
                data-idong="${dadosEvento.idOng}">

                <div class="info-nome-data">
                    <h2>${dadosEvento.tbl_ong.nome}</h2>
                    <span>${dataFormat} - EVENTO</span>
                </div>
            </div>

            <img src="assets/img/mais-sobre-postagem.png" alt="">
        </div>

        <div class="info-evento">
            <div class="info-superior">
                <h2>${dadosEvento.titulo}</h2>

                <p>
                    ${dadosEvento.descricao}
                </p>
            </div>

            <div class="imagens-postadas">
                <img src="${dadosEvento.tbl_evento_media[0].url}" alt="{NomeDoPost}" title="Imagem do postagens">

                <div class="imagens-complementos">
                    <img src="${dadosEvento.tbl_evento_media[1].url}" alt="{NomeDoPost}" title="Imagem do postagens" class="cima ocupar-tudo">
                </div>
            </div>

            <div id="interesses">
                <div id="conteudo-btn">
                    <button type="button" id="saiba-mais-evento" data-idOng="${dadosEvento.idOng}" data-idEvento="${dadosEvento.idEventos}">Saiba mais</button>
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
                <img src="${dadosEvento.tbl_ong.foto}" alt="${dadosEvento.tbl_ong.nome}" id="meu-perfil-feed" 
                data-idong="${dadosEvento.idOng}">

                <div class="info-nome-data">
                    <h2>${dadosEvento.tbl_ong.nome}</h2>
                    <span>${dataFormat} - EVENTO</span>
                </div>
            </div>

            <img src="assets/img/mais-sobre-postagem.png" alt="">
        </div>

        <div class="info-evento">
            <div class="info-superior">
                <h2>${dadosEvento.titulo}</h2>

                <p>
                    ${dadosEvento.descricao}
                </p>
            </div>

            <div class="imagens-postadas">
                <img src="${dadosEvento.tbl_evento_media[0].url}" alt="{NomeDoPost}" title="Imagem do postagens">

                <div class="imagens-complementos">
                    <img src="${dadosEvento.tbl_evento_media[1].url}" alt="{NomeDoPost}" title="Imagem do postagens" class="cima">
                    <img src="${dadosEvento.tbl_evento_media[2].url}" alt="{NomeDoPost}" title="Imagem do postagens" class="baixo">
                </div>
            </div>

            <div id="interesses">
                <div id="conteudo-btn">
                    <button type="button" id="saiba-mais-evento" data-idOng="${dadosEvento.idOng}" data-idEvento="${dadosEvento.idEventos}">Saiba mais</button>
                    <button type="button" id="candidatarEvento">Candidata-se</button>
                </div>
            </div>
        </div>
        `;
    }

    return corpo;

}

const CarregarVagasSelecionado = ({target}) => {

    if (target.id === "vagaSelecionado") {

        const idVaga = target.dataset.idvaga;
        const idOng = target.dataset.idong;
        window.scrollTo(0, 0);
        DescarregaVagaSelecionada(idVaga, idOng);
    
    }

}

const DescarregaVagaSelecionada = async (idVaga, idOng) => {

    const container = document.querySelector(".feed");
    let req = await ApiRequest("GET", `http://localhost:3131/vacancy/${idOng}/${idVaga}`);
    const dadosVaga = req.data;
    const vagaSelecionada = CriarVagaSelecionada(dadosVaga);
    container.replaceChildren(vagaSelecionada);

}

const CriarVagaSelecionada = (dadosVaga) => {

    let corpo;
    corpo = document.createElement("div");
    corpo.classList.add("vaga");

    const dataFormat = getFormattedDate(dadosVaga.dataDeCriacao);

    corpo.innerHTML =
    `
    <div class="parte-superior">
        <div class="info-ong">
            <img src="${dadosVaga.tbl_ong.foto}" alt="${dadosVaga.tbl_ong.nome}" title="${dadosVaga.tbl_ong.nome}" id="meu-perfil-feed"
            data-idong="${dadosVaga.idOng}">

            <div class="info-nome-data">
                <h2>${dadosVaga.tbl_ong.nome}</h2>
                <span>${dataFormat} - VAGA</span>
            </div>
        </div>

        <img src="assets/img/mais-sobre-postagem.png" alt="{nomeDoEvento}">
    </div>

    <div class="corpo-vaga">
        <h2>${dadosVaga.titulo}</h2>

        <p>
            ${dadosVaga.descricao}
        </p>

        <div class="vaga-botoes">
            <button type="button" id="saiba-mais-vaga" data-idvaga="${dadosVaga.idVagas}" data-idong="${dadosVaga.idOng}">Saiba Mais</button>
            <button type="button" id="interesse-vaga" data-idvaga="${dadosVaga.idVagas}">Interesse</button>
        </div>
    </div>
    `;

    return corpo;

}

const VisitarPerfilOng = ({target}) => {

    if (target.id === "meu-perfil-feed") {

        const idOng = target.dataset.idong;

        const idOngSelecionado = {
            idOng: idOng
        }

        localStorage.setItem("idOng", JSON.stringify(idOngSelecionado));
        Redirect("perfilONGs");
        
    }

}

document.getElementById("seta-baixo").addEventListener("click", openSetaHeader);
document.getElementById("cancelar-header").addEventListener("click", closeSetaHeader);
document.querySelector("main").addEventListener("click", closeSetaHeader);
document.getElementById("pesquisar").addEventListener("keypress", PesquisarONGs);
CheckWindow();
document.querySelector("#trocar-select-post").addEventListener("change", TrocarTipoPostagem);
document.querySelector("#trocar-select-evento").addEventListener("change",TrocarTipoPostagem);
document.querySelector("#trocar-select-vaga").addEventListener("change",TrocarTipoPostagem);
// Scroll Infinito
window.addEventListener("scroll", () => {
    
    const { clientHeight, scrollHeight, scrollTop } = document.documentElement
    const isPageBottomAlmostReached = scrollTop + clientHeight >= scrollHeight;

    if (isPageBottomAlmostReached) {
        
        showLoaderFeed();

    }

});
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
document.querySelector(".feed").addEventListener("click", CarregarModalInfoEventos);
document.querySelector(".feed").addEventListener("click", CarregarModalInfoVagas);
document.getElementById("info-evento").addEventListener("click", closeModalInfoEvento);
document.getElementById("info-vaga").addEventListener("click", closeModalInfoVaga);
document.querySelector(".feed").addEventListener("click", CandidatarEvento);
document.querySelector(".feed").addEventListener("click", CandidatarVaga);
document.getElementById("fechar").addEventListener("click", MessageValidatorClose);
document.getElementById("previa-eventos").addEventListener("click", CarregarEventoSelecionado);
document.getElementById("vagas-indicadas").addEventListener("click", CarregarVagasSelecionado);
document.querySelector(".feed").addEventListener("keypress", Comentar);
document.querySelector(".feed").addEventListener("click", Curtir);
document.querySelector(".feed").addEventListener("click", VisitarPerfilOng);
document.getElementById("previa-eventos").addEventListener("click", VisitarPerfilOng);
document.getElementById("vagas-indicadas").addEventListener("click", VisitarPerfilOng);