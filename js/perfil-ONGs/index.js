'use strict';

import { validarSession } from "../utils/ValidatorSession.js";
import ApiRequest from "../utils/ApiRequest.js";
import { closeModal, openModal } from "../doacoes-js/modal.js";
import { getFormattedDate } from "../utils/DataFormat.js";

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

let ongLogado;
ongLogado = validarSession("dadosOng");

let reqDados = await ApiRequest("GET", `http://localhost:3131/ong/${ongLogado.idOng}`);
let dados = reqDados.data;
console.log(dados);

let reqEndereco = await ApiRequest(
    "GET", 
    `http://localhost:3131/adress/${dados.idLogin}`
);
console.log(reqEndereco);
let adress = reqEndereco.data;

let reqContatos = await ApiRequest(
    "GET", 
    `http://localhost:3131/contact/${dados.idOng}`
);
let contato = reqContatos.data;

let reqDataDonation = await ApiRequest(
    "GET",
    `http://localhost:3131/donation-data/${dados.idOng}`
);
let donation = reqDataDonation.data;

let reqDataBank = await ApiRequest(
    "GET",
    `http://localhost:3131/bank-data/${dados.idOng}`
);
let bank = reqDataBank.data;

let dadosSenhaEmail = JSON.parse(localStorage.getItem('emailSenha'));

function formatarValor(valor) {
    return valor.toLocaleString('pt-BR');
}

function CarregarPerfil(objectLocal) {

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
    if (objectLocal.banner === null || objectLocal.banner === undefined) {
        bannerPerfil.setAttribute("src", "../../assets/img/sem-foto.png");
    }
    else if (!objectLocal.banner.includes(".jpg") && !objectLocal.banner.includes(".jpeg") && !objectLocal.banner.includes(".png") && !objectLocal.banner.includes(".svg") && !objectLocal.banner.includes(".git") && !objectLocal.banner.includes("")) {
        bannerPerfil.setAttribute("src", `../../assets/img/sem-foto.png`)
    } else {
        bannerPerfil.setAttribute("src", `${objectLocal.banner}`)
    }

}
CarregarPerfil(dados);

// Carregar dados no sobre
async function CarregarDadosSobre (dadosOng) {

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
        anoDeFundacao.innerHTML = `${getFormattedDate(dadosOng.dataDeFundacao)}`;        
    } else {
        anoDeFundacao.innerHTML = `Nada encontrado`;
    }

    if (dadosOng.historia !== null) {
        historia.innerText = `${dadosOng.historia}`;
    } else {
        historia.innerText = `Nada encontrado`;
    }

    
}
CarregarDadosSobre(dados);

// Carrega as inputs
async function AtribuirValor(dadosOng) {

    nome.value = dadosOng.nome;
    cnpj.value = dadosOng.cnpj;
    email.value = dadosSenhaEmail.email;

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
        
    } else {

        agencia.value = ``;
        banco.value = ``;
        conta.value = ``;

    }
}
AtribuirValor(dados);

// Carrega todos os POSTS
const CarregarPost = async () => {

    const container = document.getElementById("container-post");
    const objetoPost = await ApiRequest("GET", `http://localhost:3131/feed/post/ong/${dados.idOng}/0`);
    const dadosFeedPost = objetoPost.data;
    console.log(dadosFeedPost);
    const elementos = dadosFeedPost.map(CriarFeedPost);
    const elementosHtml = elementos.map(({outerHTML}) => {
        return outerHTML
    }).join('');
    container.innerHTML += elementosHtml;

}

const CriarFeedPost = (
    {
        dataDeCriacao,
        descricao, 
        idOng,
        tbl_post_media,
    }
) => {

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

            <div id="comentar">
                <input type="text" name="" class="testoComentario" placeholder="Digite seu comentário">
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

            <div id="comentar">
                <input type="text" name="" class="testoComentario" placeholder="Digite seu comentário">
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

            <div id="comentar">
                <input type="text" name="" class="testoComentario" placeholder="Digite seu comentário">
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

            <div id="comentar">
                <input type="text" name="" class="testoComentario" placeholder="Digite seu comentário">
                <button type="button" id="enviarComentario">
                    <img src="assets/img/navigation.png" alt="">
                </button>
            </div>
        `;
    }

    return corpo;

}

// Modal Editar
const openModalEditar = () => 
document.getElementById("modalEditar").classList.add("bg-active");

const closeModalEditar = () => 
document.getElementById("modalEditar").classList.remove("bg-active");

document.querySelector("#btnModal").addEventListener("click", openModalEditar);
document.querySelector('#botaoSairEditar').addEventListener("click", closeModalEditar);
document.getElementById("doar-ong").addEventListener("click", openModal);
document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("sair").addEventListener("click", () => {
    localStorage.clear();
    Redirect("loginONGs");
});
CarregarPost();