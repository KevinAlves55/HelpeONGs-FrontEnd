'use strict';

import { validarSession } from "../utils/ValidatorSession.js";
import ApiRequest from "../utils/ApiRequest.js";
import { closeModal, openModal } from "../doacoes-js/modal.js";
import { getFormattedDate } from "../utils/DataFormat.js";
import { closeModalCategorias, closeModalEditar, openModalCategorias, openModalEditar } from "./modaisPerfil.js";
import { CheckWindow } from "../utils/Menu.js";
import Redirect from "../utils/Redirect.js";

let pagePostPerfil = 0;
let pageEventoPerfil = 0;
let pageVagaPerfil = 0;
const previewPerfil = document.querySelector(".previewPerfil");
const previewBanner = document.querySelector(".previewBanner");
const nome = document.getElementById('nomeOng');
const email = document.getElementById("emailOng");
const cnpj = document.getElementById("cnpjOng");
const celular = document.getElementById("celularOng");
const telefone = document.getElementById("telefoneOng");
const descricao = document.getElementById("descriacaoOng");
const qtdMembros = document.getElementById("qtdaMembrosOng");
const dataFundacao = document.getElementById("fundacaoOng");
const historia = document.getElementById("historiaOng");
const cep = document.getElementById("cep");
const estado = document.getElementById("estado");
const cidade = document.getElementById("cidade");
const bairro = document.getElementById("bairro");
const endereco = document.getElementById("endereco");
const numero = document.getElementById("numero");
const complemento = document.getElementById("complemento");
const linkSite = document.getElementById("linkSiteOng");
const pix = document.getElementById("pixOng");
const agencia = document.getElementById("agenciaOng");
const banco = document.getElementById("bancoOng");
const conta = document.getElementById("contaOng");
const tipoConta = document.getElementById("contaTipoOng");
const nomePatrocinador = document.getElementById("nomePatrocinadorOng");
const sitePatrocinador = document.getElementById("linkSitePatrocinador");
const loaderContainer = document.querySelector(".loader");
const loaderContainerEvento = document.querySelector(".loaderEvento");
const loaderContainerVaga = document.querySelector(".loaderVaga");

let ongLogado;
ongLogado = validarSession("dadosOng");
let dadosSenhaEmail = JSON.parse(localStorage.getItem('emailSenha'));

let reqDados = await ApiRequest("GET", `http://localhost:3131/ong/${ongLogado.idOng}`);
let dados = reqDados.data;

let reqEndereco = await ApiRequest("GET",`http://localhost:3131/adress/${dados.idLogin}`);
let adress = reqEndereco.data;

let reqContatos = await ApiRequest("GET",`http://localhost:3131/contact/${dados.idLogin}`);
let contato = reqContatos.data;

let reqDataDonation = await ApiRequest("GET", `http://localhost:3131/donation-data/${dados.idOng}`);
let donation = reqDataDonation.data;

let reqDataBank = await ApiRequest("GET",`http://localhost:3131/bank-data/${dados.idOng}`);
let bank = reqDataBank.data;

async function OcultarButton() {

    let btnEndereco = document.getElementById("button-detalhes-endereco");
    let btnContatos = document.getElementById("cadastrarContatos");
    let btnBankDonation = document.getElementById("button-meiosDoacoes");

    if (adress.cep) {
        btnEndereco.style.display = "none";
    }

    if (contato.numero || contato.telefone) {
        btnContatos.style.display = "none";
    }

    if (bank.agencia && bank.banco && bank.conta && bank.tipo) {
        btnBankDonation.style.display = "none";
    }

}

function formatarValor(valor) {
    return valor.toLocaleString('pt-BR');
}

function CarregarPerfil(objectLocal) {

    let nomeLogado = document.getElementById("mini-perfil-nome");
    let fotoLogado = document.getElementById("mini-perfil-foto");
    let fotoPerfil = document.getElementById("perfil-foto");
    let nomePerfil = document.getElementById("perfil-nome");
    let bannerPerfil = document.getElementById("perfil-banner");
    let qtdaSeguidores = document.getElementById("qtdaSeguidores");
    
    //Nome de mini perfil
    if (objectLocal.nome === null || objectLocal.nome === undefined) {  
        nomeLogado.innerHTML = `<a href="login.html">Login</a>  / <a href="cadastroUsuario.html">Cadastrar</a>`;
    } else {
        nomeLogado.innerHTML = `${objectLocal.nome}`;
    }

    //Foto Mini Perfil
    if (objectLocal.foto === null || objectLocal.foto === undefined) {
        fotoLogado.setAttribute("src", "../../assets/img/sem-foto.png");
    } else if (!objectLocal.foto.includes(".jpg") && !objectLocal.foto.includes(".jpeg") && !objectLocal.foto.includes(".png") && !objectLocal.foto.includes(".svg") && !objectLocal.foto.includes(".git") && !objectLocal.foto.includes(".webp")) {
        fotoLogado.setAttribute("src", `../../assets/img/sem-foto.png`)
    } else {
        fotoLogado.setAttribute("src", `${objectLocal.foto}`);
    }

    //Foto de Perfil
    if (objectLocal.foto === null || objectLocal.foto === undefined) {
        fotoPerfil.setAttribute("src", "../../assets/img/sem-foto.png");
    }
    else if (!objectLocal.foto.includes(".jpg") && !objectLocal.foto.includes(".jpeg") && !objectLocal.foto.includes(".png") && !objectLocal.foto.includes(".svg") && !objectLocal.foto.includes(".git") && !objectLocal.foto.includes(".webp")) {
        fotoPerfil.setAttribute("src", `../../assets/img/sem-foto.png`)
        console.log("foto não é imagem");
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
    if (objectLocal.banner === null || objectLocal.banner === undefined) {
        bannerPerfil.setAttribute("src", "../../assets/img/banner-vazio.png");
    }
    else if (!objectLocal.banner.includes(".jpg") && !objectLocal.banner.includes(".jpeg") && !objectLocal.banner.includes(".png") && !objectLocal.banner.includes(".svg") && !objectLocal.banner.includes(".git") && !objectLocal.banner.includes("")) {
        bannerPerfil.setAttribute("src", `../../assets/img/banner-vazio.png`)
    } else {
        bannerPerfil.setAttribute("src", `${objectLocal.banner}`)
    }

    //SEGUIDORES
    if (objectLocal.numeroDeSeguidores === null || objectLocal.numeroDeSeguidores === undefined) {
        qtdaSeguidores.innerHTML = `0`;
    } else {
        qtdaSeguidores.innerHTML = `${objectLocal.numeroDeSeguidores} seguidores`;
    }

}

async function CarregarDadosSobre(dadosOng) {

    let descricaosobre = document.getElementById("descricaoSobre");
    let qtdaMembro = document.getElementById("qtdaMembros");
    let anoDeFundacao = document.getElementById("anoFundacao");
    let sedeLocal = document.getElementById("sede");
    let historia = document.getElementById("historiaSobre");

    if (reqEndereco.status === 400) {
        sedeLocal.innerHTML = `Nenhum endereço cadastrado`;
    } else {
        sedeLocal.innerHTML = `${adress.municipio}, ${adress.estado}`;
    }

    if (dadosOng.descricao !== null) {
        descricaosobre.innerText = `${dadosOng.descricao}`;
    } else {
        descricaosobre.innerText = `Nenhuma descrição cadastrada`;
    }

    if (dadosOng.qtdDeMembros !== null) {
        qtdaMembro.innerHTML = `${formatarValor(dadosOng.qtdDeMembros)}`;        
    } else {
        qtdaMembro.innerHTML = `Nada encontrado`;
    }

    if (dadosOng.dataDeFundacao !== null) {

        if (dadosOng.dataDeFundacao === new Date()) {
            anoDeFundacao.innerHTML = `Nada encontrado`;
        } else {
            anoDeFundacao.innerHTML = `${getFormattedDate(dadosOng.dataDeFundacao)}`;
        }
        
    } else {
        anoDeFundacao.innerHTML = `Nada encontrado`;
    }

    if (dadosOng.historia !== null) {
        historia.innerText = `${dadosOng.historia}`;
    } else {
        historia.innerText = `Nada encontrado`;
    }

    
}

const CarregarCategoriasPerfil = async () => {

    const container = document.getElementById("todas-categorias-perfil");
    const objetoCategoriasPerfil = await ApiRequest("GET", `http://localhost:3131/category/${dados.idOng}`);
    const dadosCategoriasPerfil = objetoCategoriasPerfil.data;
    const elementos = dadosCategoriasPerfil.map(CriarCategoriasPerfil);
    container.replaceChildren(...elementos);

}

const CriarCategoriasPerfil = ({tbl_categorias}) => {

    let corpo;
    corpo = document.createElement("div");
    corpo.classList.add("categoria");

    corpo.innerHTML = 
    `
        <span data-idCategoria="${tbl_categorias.idCategorias}">${tbl_categorias.nome}</span>
    `;

    return corpo;

}

async function AtribuirValor(dadosOng) {

    nome.value = dadosOng.nome;
    cnpj.value = dadosOng.cnpj;
    email.value = dadosSenhaEmail.email;
    previewPerfil.src = dadosOng.foto;

    if (dadosOng.banner !== null) {
        previewBanner.src = dadosOng.banner;
    } else {
        previewBanner.src = "./assets/img/image 16.png";
    }

    if (dadosOng.foto !== null) {
        previewPerfil.src = dadosOng.foto;
    } else {
        previewPerfil.src = "./assets/img/sem-foto.png";
    }

    if (reqContatos.status == 404) {
        celular.value = ``;
        celular.placeholder = ``;
    } else {
        celular.value = contato.numero;
    }

    if (reqContatos.status == 404) {
        telefone.value = ``;
        telefone.placeholder = ``;
    } else {
        telefone.value = contato.telefone;
    }

    if (dadosOng.descricao !== null) {
        descricao.value = dadosOng.descricao;        
    } else {
        descricao.value = ``;
    }

    if (dadosOng.qtdDeMembros !== null) {
        qtdMembros.value = dadosOng.qtdDeMembros;        
    } else {
        qtdMembros.value = ``;
    }

    if (dadosOng.dataDeFundacao !== null) {
        dataFundacao.placeholder = getFormattedDate(dadosOng.dataDeFundacao);
    } else {
        dataFundacao.value = ``;
    }

    if (dadosOng.historia !== null) {  
        historia.value = dadosOng.historia;
    } else {
        historia.value = ``;
    }

    if (reqEndereco.status !== 400) {
        cep.value = adress.cep;
        estado.value = adress.estado;
        cidade.value = adress.municipio;
        bairro.value = adress.bairro;
        endereco.value = adress.rua;
        numero.value = adress.numero;
        
        if (adress.complemento === "") {
            complemento.value = ``;
        } else {
            complemento.value = adress.complemento;
        }

    } else {
        console.log("Não tem addrss");
    }

    if (reqDataDonation.status !== 404) {

        if (donation.site === null) {
            linkSite.value = ``;
        } else {
            linkSite.value = donation.site;
        }

        if (donation.pix === null) {
            pix.value = ``;
        } else {
            pix.value = donation.pix;
        }
    } else {

        linkSite.value = ``;
        pix.value = ``;

    }

    if (reqDataBank.status !== 404) {

        agencia.value = bank.agencia;
        banco.value = bank.banco;
        conta.value = bank.conta;

        let tipoDaConta = tipoConta.options[tipoConta.selectedIndex];
        tipoDaConta.textContent = bank.tipo;

        let valueTipoConta
        if (bank.tipo === "Conta Corrente") {
            valueTipoConta = "Conta Corrente";
        } else {
            valueTipoConta = "Poupança";
        }

        tipoDaConta.value = valueTipoConta;
        
    } else {

        agencia.value = ``;
        banco.value = ``;
        conta.value = ``;

    }
}

const CarregarModalPerfil = async () => {

    const container = document.getElementById("direita-informacoes");
    const req = await RequestModal(dados.idOng, dados.idLogin);
    const modal = CriarModal(req.objetoContatos, req.objetoBank, req.objetoDadosDonate);

    if (modal === false) {
        alert("Dados incompletos, escolha outra ONG para doar");
    } else {
        container.replaceChildren(modal);
        openModal();
    }

}

const RequestModal = async (idOng, idLogin) => {

    let dadosContatos = [];
    let dadosBank = [];
    let dadosMeiosDoativos = [];

    dadosContatos = await ApiRequest(
        "GET",
        `http://localhost:3131/contact/${idLogin}`
    );

    dadosBank = await ApiRequest(
        "GET",
        `http://localhost:3131/bank-data/${idOng}`
    );

    dadosMeiosDoativos = await ApiRequest(
        "GET",
        `http://localhost:3131/donation-data/${idOng}`
    );

    if (dadosContatos.status === 404 && dadosBank.status === 404 && dadosMeiosDoativos.status === 404) {
        
        alert("Essa ONG está com os dados incompletos, por favor escolher outra");

    } else {

        var objetoContatos = dadosContatos.data;
        var objetoBank = dadosBank.data;
        var objetoDadosDonate = dadosMeiosDoativos.data;

        // Une todos os dados em um único objeto
        var dadosModal = Object.assign([], {objetoContatos}, {objetoBank}, {objetoDadosDonate});

        return dadosModal;
    
    }

}

const CriarModal = (objetoContatos, objetoBank, objetoDadosDonate) => {

    let status;

    if (objetoContatos === undefined || objetoBank === undefined || objetoDadosDonate === undefined) {

        status = false;
    
    } else {

        const modal = document.createElement("div");
        modal.classList.add("info");

        modal.innerHTML =
        `
            <div id="direita-informacoes">
                <div id="direita-contatos">
                    <h2>Informações de contato</h2>

                    <div class="caixa">
                        <span>Celular: </span>
                        <h3>${objetoContatos.numero}</h3>
                    </div>
                    <div class="caixa">
                        <span>Telefone: </span>
                        <h3>${objetoContatos.telefone}</h3>
                    </div>
                    <div class="caixa">
                        <span>Site: </span>
                        <h3><a target="_blank" href="${objetoDadosDonate.site}">${objetoDadosDonate.site}</a></h3>
                    </div>
                </div>

                <div id="direita-meios-doacoes">
                    <div id="direita-meios">
                        <h2>Meios de doação</h2>

                        <div class="caixa">
                            <span>Conta: </span>
                            <h3>${objetoBank.conta}</h3>
                        </div>
                        <div class="caixa">
                            <span>Tipo: </span>
                            <h3>${objetoBank.tipo}</h3>
                        </div>
                        <div class="caixa">
                            <span>Agência: </span>
                            <h3>${objetoBank.agencia}</h3>
                        </div>
                        <div class="caixa">
                            <span>Banco: </span>
                            <h3>${objetoBank.banco}</h3>
                        </div>
                        <div class="caixa">
                            <span>Pix: </span>
                            <h3>${objetoDadosDonate.pix}</h3>
                        </div>
                    </div>
                </div>
            </div>
        `;

        status = modal;

    }

    return status;

}

// Carrega todos os POSTS
const CarregarPostPeril = async () => {

    const container = document.getElementById("todos-post");
    const objetoPost = await ApiRequest("GET", `http://localhost:3131/feed/post/ong/${dados.idOng}/${pagePostPerfil}`);
    const dadosPostOng = objetoPost.data;
    const elementos = dadosPostOng.map(CriarPostsPerfil);
    const elementosHtml = elementos.map(({outerHTML}) => {
        return outerHTML
    }).join('');
    container.innerHTML += elementosHtml;

}

const CriarPostsPerfil = ({dataDeCriacao, descricao, tbl_post_media}) => {

    let corpo;
        
    const dataFormat = getFormattedDate(dataDeCriacao);

    corpo = document.createElement("div");
    corpo.classList.add("post");

    if (tbl_post_media.length === 0) {
        
        corpo.innerHTML =
        `
        <div class="parte-superior">
                <div class="info-ong">
                    <img src="${dados.foto}" alt="${dados.nome}" title="${dados.nome}">

                    <div class="info-nome-data">
                        <h2>${dados.nome}</h2>
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
        `;

    } else if (tbl_post_media.length === 1) {

        corpo.innerHTML =
        `
        <div class="parte-superior">
                <div class="info-ong">
                    <img src="${dados.foto}" alt="${dados.nome}" title="${dados.nome}">

                    <div class="info-nome-data">
                        <h2>${dados.nome}</h2>
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
        `;
    
    } else if (tbl_post_media.length === 2) {
        corpo.innerHTML =
        `
        <div class="parte-superior">
                <div class="info-ong">
                    <img src="${dados.foto}" alt="${dados.nome}" title="${dados.nome}">

                    <div class="info-nome-data">
                        <h2>${dados.nome}</h2>
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
        `;
    } else {
        corpo.innerHTML =
        `
        <div class="parte-superior">
                <div class="info-ong">
                    <img src="${dados.foto}" alt="${dados.nome}" title="${dados.nome}">

                    <div class="info-nome-data">
                        <h2>${dados.nome}</h2>
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
        `;
    }

    return corpo;

}

const showLoaderPost = () => {

    loaderContainer.classList.add("show");
    removeLoaderPost();

}

const removeLoaderPost = () => {
    
    setTimeout(() => {
        loaderContainer.classList.remove("show");
        GetNextPost();
    }, 1000);

}

const GetNextPost = () => {

    pagePostPerfil++
    CarregarPostPeril();

}

// Carrega todos os EVENTOS
const CarregarEventosPerfil = async () => {
    const container = document.getElementById("todos-evento");
    const objetoEventos = await ApiRequest("GET", `http://localhost:3131/feed/evento/ong/${dados.idOng}/${pageEventoPerfil}`);
    const dadosEventos = objetoEventos.data;
    const elementos = dadosEventos.map(CriarEventosPerfil);
    const elementosHtml = elementos.map(({outerHTML}) => {
        return outerHTML
    }).join('');
    container.innerHTML += elementosHtml;
}

const CriarEventosPerfil = ({dataDeCriacao, titulo, descricao, tbl_evento_media, candidatos, idOng, idEventos}) => {
       
    const dataFormat = getFormattedDate(dataDeCriacao);

    let corpo;
    corpo = document.createElement("div");
    corpo.classList.add("evento-feed");

    let buttonCandidato;
    if (candidatos === true) {

        buttonCandidato = `<button type="button" id="candidatarEvento">Candidata-se</button>`;
        
    } else if (candidatos === false) {

        buttonCandidato = ``;

    }

    if (tbl_evento_media.length === 0) {
        
        corpo.innerHTML = 
        `
        <div class="parte-superior">
            <div class="info-ong">
                <img src="${dados.foto}" alt="${dados.nome}">

                <div class="info-nome-data">
                    <h2>${dados.nome}</h2>
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
                <img src="${dados.foto}" alt="${dados.nome}">

                <div class="info-nome-data">
                    <h2>${dados.nome}</h2>
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
                <img src="${dados.foto}" alt="${dados.nome}">

                <div class="info-nome-data">
                    <h2>${dados.nome}</h2>
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
                <img src="${dados.foto}" alt="${tbl_ong.nome}">

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

const showLoaderEvento = () => {

    loaderContainerEvento.classList.add("show");
    removeLoaderEvento();

}

const removeLoaderEvento = () => {
    
    setTimeout(() => {
        loaderContainerEvento.classList.remove("show");
        GetNextEvento();
    }, 1000);

}

const GetNextEvento = () => {

    pageEventoPerfil++
    CarregarEventosPerfil();

}

// Carrega todas as VAGAS
const CarregarVagasPerfil = async () => {

    const container = document.querySelector("#todas-vaga");
    const objetoVagas = await ApiRequest("GET", `http://localhost:3131/feed/vaga/ong/${dados.idOng}/${pageVagaPerfil}`);
    const dadosVagas = objetoVagas.data;
    const elementos = dadosVagas.map(CriarVagasPerfil);
    const elementosHtml = elementos.map(({outerHTML}) => {
        return outerHTML
    }).join('');
    container.innerHTML += elementosHtml;

}

const CriarVagasPerfil = ({dataDeCriacao, titulo, descricao}) => {
        
    const dataFormat = getFormattedDate(dataDeCriacao);

    let corpo;
    corpo = document.createElement("div");
    corpo.classList.add("vaga");

    corpo.innerHTML =
    `
    <div class="parte-superior">
        <div class="info-ong">
            <img src="${dados.foto}" alt="${dados.nome}" title="${dados.nome}">

            <div class="info-nome-data">
                <h2>${dados.nome}</h2>
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
            <button>Saiba Mais</button>
            <button>Interesse</button>
        </div>
    </div>
    `;

    return corpo;

}

const showLoaderVaga = () => {
    
    loaderContainerVaga.classList.add("show");
    removeLoaderVaga();

}

const removeLoaderVaga = () => {

    setTimeout(() => {
        loaderContainerVaga.classList.remove("show");
        GetNextVaga();
    }, 1000);


}

const GetNextVaga = () => {

    pageVagaPerfil++
    CarregarVagasPerfil();


}

const CarregarCategoriasOng = async () => {

    const container = document.querySelector("#todas-categorias");
    const objetoCategoriasOng = await ApiRequest("GET", `http://localhost:3131/category/${dados.idOng}`);
    const dadosCategoriasOng = objetoCategoriasOng.data;
    const elementos = dadosCategoriasOng.map(CriarCategoriasOng);
    container.replaceChildren(...elementos);

}

const CriarCategoriasOng = ({tbl_categorias}) => {

    let corpo;
    corpo = document.createElement("div");
    corpo.classList.add("categoria");

    corpo.innerHTML = 
    `
        <span data-idCategoria="${tbl_categorias.idCategorias}">${tbl_categorias.nome}</span>
        <img src="assets/img/x-circle.png" alt="${tbl_categorias.nome}" id="image" title="Icone categoria" data-idOng="${dados.idOng}">
    `;

    return corpo;

}

const CarregarTodasCategorias = async () => {

    const container = document.querySelector(".todas-categorias");
    const objetoCategorias = await ApiRequest("GET", "http://localhost:3131/category");
    const categorias = objetoCategorias.data;
    const listaDeCategorias = categorias.map(CriarCategorias);
    container.replaceChildren(...listaDeCategorias);

}

const CriarCategorias = ({idCategorias, nome}) => {

    const corpo = document.createElement("div");
    corpo.classList.add("categoria");

    corpo.innerHTML =
    `
        <span data-idCategorias="${idCategorias}" data-idOng="${dados.idOng}" id="causaSelecionada">${nome}</span>
    `;

    return corpo;

}

const DeletarCategoria = async ({target}) => {

    if (target.id === "image") {

        const nomeCategoria = target.alt;
        const idOng = target.dataset.idong;

        const reqDelete = await ApiRequest("DELETE", `http://localhost:3131/category/ong/${idOng}/${nomeCategoria}`);

        if (reqDelete.status === 200) {
            alert("Categoria deletada com sucesso!");
            window.location.reload();
        } else {
            alert("Erro ao deletar categoria!");
        }
    
    }

}

const SelecionarCategorias = ({target}) => {

    if (target.id === "causaSelecionada") {
        
        const styleParent = target.parentElement.style;
        styleParent.backgroundColor = "#FC595E";
    
    }

}

let arraySelecionados = [];
const AdicionarCategorias = ({target}) => {

    const elementos = target.parentElement.parentElement.parentElement.children[1];

    for (let i = 0; i < elementos.children.length; i++) {
        const elemento = elementos.children[i];

        if (elemento.style.backgroundColor) {
            
            const elementoSelecionados = elemento.children[0].textContent;
            arraySelecionados.push(elementoSelecionados);

        }
    }

    if (arraySelecionados.length <= 3) {

        arraySelecionados.map( async (elemento) => {
        
            let req = await ApiRequest(
                "POST", 
                "http://localhost:3131/category/ong",
                {
                    idOng: dados.idOng,
                    categoria: elemento
                }
            );

            if (req.status === 200) {
                window.location.reload();
                window.scroll(0, 0);
            } else {
                alert("Erro ao selecionar categoria");
            }
        
        });
    
    } else {
        
        alert("Máximo de 3 categorias");
        window.location.reload();

    }

}

CheckWindow();
OcultarButton();
CarregarPerfil(dados);
CarregarDadosSobre(dados);
AtribuirValor(dados);
document.querySelector("#btnModal").addEventListener("click", openModalEditar);
document.querySelector('#botaoSairEditar').addEventListener("click", closeModalEditar);
document.getElementById("doar-ong").addEventListener("click", CarregarModalPerfil);
document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("add-causas-ong").addEventListener("click", openModalCategorias);
document.getElementById("cancelar").addEventListener("click", closeModalCategorias);
document.getElementById("sair").addEventListener("click", () => {
    localStorage.clear();
    Redirect("loginONGs");
});

CarregarPostPeril();
window.addEventListener("scroll", () => {
    
    const { clientHeight, scrollHeight, scrollTop } = document.documentElement
    const isPageBottomAlmostReached = scrollTop + clientHeight >= scrollHeight -1;

    if (isPageBottomAlmostReached) {
        
        showLoaderPost();

    }

});

CarregarEventosPerfil();
window.addEventListener("scroll", () => {
    
    const { clientHeight, scrollHeight, scrollTop } = document.documentElement
    const isPageBottomAlmostReached = scrollTop + clientHeight >= scrollHeight -1;

    if (isPageBottomAlmostReached) {
        
        showLoaderEvento();

    }

});

CarregarVagasPerfil();
window.addEventListener("scroll", () => {
    
    const { clientHeight, scrollHeight, scrollTop } = document.documentElement
    const isPageBottomAlmostReached = scrollTop + clientHeight >= scrollHeight -1;

    if (isPageBottomAlmostReached) {
        
        showLoaderVaga();

    }

});

CarregarCategoriasPerfil();
CarregarCategoriasOng();
CarregarTodasCategorias();
document.querySelector("#todas-categorias").addEventListener("click", DeletarCategoria);
document.querySelector(".todas-categorias").addEventListener("click", SelecionarCategorias)
document.getElementById("adicionarCategorias").addEventListener("click", AdicionarCategorias);