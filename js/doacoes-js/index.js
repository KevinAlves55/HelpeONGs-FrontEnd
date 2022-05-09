"use strict"

import ApiRequest from "../utils/ApiRequest.js";
import Redirect from "../utils/Redirect.js";
import { validarSession } from "../utils/ValidatorSession.js";
import { openFiltro, filtrar } from "./filtro.js";
import { openModal, closeModal } from "./modal.js"
import { openSetaHeader, closeSetaHeader } from "../utils/MiniOpMenu.js";

let objeto = await ApiRequest("GET", "http://localhost:3131/ong");
let userLogado;
let ongLogado;

if (localStorage.hasOwnProperty('dadosUsuario') !== false) {
    
    userLogado = validarSession("dadosUsuario");

    const controlNone = () => document.getElementById("control").style.display = "none";
    controlNone();

    document.getElementById("sair").addEventListener("click", () => {
        localStorage.clear();
        Redirect("loginUsuario");
    });

    document.getElementById("sair-header").addEventListener("click", () => {
        localStorage.clear();
        Redirect("loginUsuario")
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

    document.getElementById("sair-header").addEventListener("click", () => {
        localStorage.clear();
        Redirect("loginONGs")
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
        } else if (!objectLocal.foto.includes(".jpg") && !objectLocal.foto.includes(".jpeg") && !objectLocal.foto.includes(".png") && !objectLocal.foto.includes(".svg")) {
            fotoLogado.setAttribute("src", `../../assets/img/sem-foto.png`);
            fotoHeader.setAttribute("src", "../../assets/img/sem-foto.png");
        } else {
            fotoLogado.setAttribute("src", `${objectLocal.foto}`);
            fotoHeader.setAttribute("src", `${objectLocal.foto}`);
        }
    
    }
    CarregarMiniPerfil(ongLogado);

    const favoriteNone = () => 
    document.getElementById("favoritos").style.display = "none";
    favoriteNone();

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

    const atalhosNone = () => document.getElementById("atalhos-perfil").style.display = "none";
    atalhosNone();

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
    corpo.classList.add("ongs-opcoes");

    corpo.innerHTML =
    `
    <div>
        <img src="${foto}" alt="Ongs perfil" title="Foto Ong">
        <h2>${nome}</h2>
    </div>
    <button type="button" data-idong="${id}">DOAR</button>
    `;

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
    corpo.classList.add("ongs-card");

    corpo.innerHTML =
    `
    <img src="assets/img/favoritar-sem-preenchimento.png" class="img-coracao" alt="Favoritos" title="Icon Coração" id="favoritar" data-idong="${idOng}">
    <img src="${foto}" alt="${nome}" title="Imagem da ONG" class="img-ong">
    <h2>${nome}</h2>
    <span>${numeroDeSeguidores} seguidores</span>
    <button type="button" data-idong="${idOng}">DOAR</button>
    `;

    return corpo;

}

const Pesquisa = (evento) => {

    console.log(evento);

    if (evento.key == "Enter") {

        const pesquisaNome = evento.target.value;
        pesquisarNomeONG(pesquisaNome);

    }

}

const pesquisarNomeONG = (pesquisaValor) => {

    const container = document.getElementById("ongs");
    const corpo = objeto.data;
    const nomeONG = corpo.filter(({nome}) => nome !== pesquisaValor ? false : true);
    const cards = nomeONG.map(CriarONGs);
    container.replaceChildren(...cards);

    let valor = document.getElementById("resultadoQtda");
    const corpoResult = nomeONG.length;

    if (corpoResult === 0) {
        valor.innerText = `Nenhum resultado encontrado`;
        CarregarTodasONGs();
    } else if (corpoResult === 1) {
        valor.innerText = `${corpoResult} Resultado`;
        console.log("dsad");
    } else {
        valor.innerText = `${corpoResult} Resultados`;
        console.log("dsad");
    }

}

const CarregarEstados = async () => {

    const objetoUf = await ApiRequest("GET", "http://localhost:3131/uf");
    const estados = objetoUf.data;
    const estadoUf = estados.map(CriarOptionEstado);

}

const CriarOptionEstado = ({idEstado, nome, sigla}) => {

    const container = document.querySelector("#estados-select");
    const corpo = document.createElement("option");
    corpo.value = sigla;
    corpo.classList.add("estados-option")
    corpo.id = "opUf";
    corpo.textContent = nome;
    container.appendChild(corpo);

}

async function CarregarTamanhoArray() {

    let valor = document.getElementById("resultadoQtda");
    const corpo = objeto.data.length;

    if (corpo === 0 || corpo === null) {
        valor.innerText = `ONGs não encontradas`;
    } else if (corpo === 1) {
        valor.innerText = `${corpo} Resultado`;
    } else {
        valor.innerText = `${corpo} Resultados`;
    }

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
        <button type="button" data-idong="${idOng}">DOAR</button>
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

const pesquisarEstado = async ({target}) => {

    var opcaoValor = target.options[target.selectedIndex].textContent;

    if (opcaoValor === "Selecione um estado") {

        CarregarTodasONGs();
        CarregarTamanhoArray();

    } else {

        let request = [];
        request = await ApiRequest(
            "POST", 
            "http://localhost:3131/uf/filter", 
            {
                uf: opcaoValor
            }
        );

        if (request.status === 404) {

            let valor = document.getElementById("resultadoQtda");
            let container = document.getElementById("ongs");
            valor.innerText = `Nenhum resultado encontrado`;
            container.innerHTML = ``;

        } else if (request.status === 200) {
    
            let allOngs = [];
            allOngs = await ApiRequest("GET", "http://localhost:3131/ong"); 
    
            const filteredOngs = [];
    
            for(let i = 0; i < request.data.length; i++) {

                for (let j = 0; j < allOngs.data.length; j++) {
                    request.data[i].idOng === allOngs.data[j].idOng? filteredOngs.push(allOngs.data[j]): "";            
                }
            
            }

            var tirarRepetition = filteredOngs.filter(function(este, i) {
                return filteredOngs.indexOf(este) === i;
            });


            CarregarOngsEstados(tirarRepetition);
        }
    }

}

const CarregarOngsEstados = (objeto) => {

    const container = document.getElementById("ongs");
    const corpo = objeto;
    const cards = corpo.map(CriarONGs);
    container.replaceChildren(...cards);
    
    let valor = document.getElementById("resultadoQtda");
    const corpoQtda = corpo.length;

    valor.innerText = `${corpoQtda} Resultados`;

}

const CarregarModal = async ({target}) => {

    if (target.type === "button") {
        const container = document.getElementById("direita-informacoes");
        const req = await RequestModal(target);

        if (req === null || req === undefined) {
            console.log("Objeto vazio");
        } else {
            console.log(`Request inteira: `, req);
            const modal = CriarModal(req.objetoContatos, req.objetoBank, req.objetoDadosDonate);

            if (modal === false) {
                alert("Dados incompletos, escolha outra ONG para doar");
            } else {
                container.replaceChildren(modal);
                openModal();
            }
        }
    }

}

const RequestModal = async (target) => {

    const idOng = target.dataset.idong;
    let dadosContatos = [];
    let dadosBank = [];
    let dadosMeiosDoativos = [];

    dadosContatos = await ApiRequest(
        "GET",
        `http://localhost:3131/contact/${idOng}`
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

        console.log(`param1: `, objetoContatos, objetoBank, objetoDadosDonate);

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
                        <span>Email: </span>
                        <h3>${objetoContatos.email}</h3>
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

const limparCamposFiltro = () => {

    var categorias = document.querySelectorAll('[type=checkbox]');

    for (var i = 0; i < categorias.length; i++) {
        if (categorias[i].type == "checkbox") {
            categorias[i].checked = false;
        }
    }
    ResetarElementos();
    document.getElementById("modal-filtros").classList.remove("active");

}

const ResetarElementos = () => {

    const container = document.getElementById("ongs");
    container.innerHTML = "";
    CarregarTodasONGs();
    CarregarTamanhoArray(objeto);

}

CarregarRecomendados();
CarregarTodasONGs();
document.getElementById("seta-baixo").addEventListener("click", openSetaHeader);
document.getElementById("cancelar-header").addEventListener("click", closeSetaHeader);
document.querySelector("main").addEventListener("click", closeSetaHeader);
document.getElementById("pesquisar").addEventListener("keypress", Pesquisa);
CarregarEstados();
CarregarTamanhoArray();
CarregarTodasCategorias();
document.getElementById("ongs").addEventListener("click", Favoritar);
document.getElementById("favoritos-ong").addEventListener("click", excluirFavorito);
document.getElementById("recomendados-ongs").addEventListener("click", CarregarModal);
document.getElementById("favoritos").addEventListener("click", CarregarModal);
document.getElementById("estados-select").addEventListener("change", pesquisarEstado);
document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("modal").addEventListener("click", closeModal);
document.getElementById("ongs").addEventListener("click", CarregarModal);
document.getElementById("botao-filtro").addEventListener("click", openFiltro);
document.getElementById("filtrar-opcoes").addEventListener("click", filtrar);
document.getElementById("limpar-campos").addEventListener("click", limparCamposFiltro);

export { 
    CriarONGs,
    CarregarTodasONGs
}