"use strict"

import ApiRequest from "../utils/ApiRequest.js";
import Redirect from "../utils/Redirect.js";
import { validarSession } from "../utils/ValidatorSession.js";
import { openSetaHeader, closeSetaHeader } from "../utils/MiniOpMenu.js";
import { checkInputs, errorValidation } from "../validator/validatorPostagem.js";
import { CheckWindow } from "../utils/Menu.js";
import { CalcularIdade } from "../utils/CalcularIdade.js";

const dataDeHoje = new Date();
console.log(dataDeHoje);

let objeto = await ApiRequest("GET", "http://localhost:3131/ong");
let ongLogado;

if (localStorage.hasOwnProperty('dadosUsuario') !== false) {
    
    Redirect("feed");

} else if (localStorage.hasOwnProperty('dadosOng') !== false) {

    ongLogado = validarSession("dadosOng");

    let linkPerfil = document.getElementById("profileLink");
    linkPerfil.href = `perfilONGs.html`;

    let req = await ApiRequest("GET", `http://localhost:3131/ong/${ongLogado.idOng}`);
    let dadosOng = req.data

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

} else {

    Redirect("cadastroUsuario");

}

// Variavel que vai conter a opção selecionada
let volumeDeDadosEvento = document.getElementById("sltOpcaoEvento");
let volumeDeDadosVaga = document.getElementById("sltOpcaoVaga");
console.log(volumeDeDadosEvento);

const SelecionarTipoControle = ({target}) => {

    let tipoControle = target.options[target.selectedIndex].value;
    console.log(tipoControle);

    if (tipoControle === "E") {
        
        document.getElementById("sltOpcaoEvento").style.display = "block";
        document.getElementById("sltOpcaoVaga").style.display = "none";
        document.getElementById("sltOpcaoEvento")[0].textContent = "Selecione o evento que deseja";
        PopularizarEventos();


    } else if (tipoControle === "V") {

        document.getElementById("sltOpcaoVaga").style.display = "block";
        document.getElementById("sltOpcaoEvento").style.display = "none";
        document.getElementById("sltOpcaoVaga")[0].textContent = "Selecione a vaga que deseja";
        PopularizarVagas();
    
    } else {

        document.getElementById("sltOpcaoEvento").style.display = "none";
        document.getElementById("sltOpcaoVaga").style.display = "none";
    
    }

}

const PopularizarEventos = async () => {

    const objetoEvento = await ApiRequest("GET", `http://localhost:3131/event/${ongLogado.idOng}`);
    const eventosOng = objetoEvento.data;
    const evento = eventosOng.map(CriarOptionEvento);

}

const CriarOptionEvento = ({idEventos, titulo}) => {

    let option = document.createElement("option");
    option.value = idEventos;
    option.textContent = titulo;
    option.dataset.tipo =  "E";
    volumeDeDadosEvento.appendChild(option);

}

const PopularizarVagas = async () => {

    const objetoVaga = await ApiRequest("GET", `http://localhost:3131/vacancy/${ongLogado.idOng}`);
    const vagasOng = objetoVaga.data;
    const vaga = vagasOng.map(CriarOptionVaga);

}

const CriarOptionVaga = ({idVagas, titulo}) => {

    let option = document.createElement("option");
    option.value = idVagas;
    option.textContent = titulo;
    option.dataset.tipo =  "V";
    volumeDeDadosVaga.appendChild(option);

}

const PesquisarSelecionado = async ({target}) => {

    let optionSelecionado = target.options[target.selectedIndex];
    console.log(optionSelecionado.parentElement);

    if (optionSelecionado.dataset.tipo === "E") {

        CarregarEventControler(optionSelecionado.value);        

    } else if (optionSelecionado.dataset.tipo === "V") {
        
        CarregarVagaControler(optionSelecionado.value);

    } else {

        console.log("Nada");
    
    }

}

const CarregarEventControler = async (idEvento) => {

    const container = document.querySelector("tbody");
    let req = await ApiRequest("GET", `http://localhost:3131/event-controller/${ongLogado.idOng}/${idEvento}/0`);
    const dados = req.data;
    const interessados = dados.map(CriarInteressados);
    container.replaceChildren(...interessados);

}

const CarregarVagaControler = async (idVaga) => {

    const container = document.querySelector("tbody");
    let req = await ApiRequest("GET", `http://localhost:3131/vacancy-controller/${ongLogado.idOng}/${idVaga}/0`);
    const dados = req.data;
    const interessados = dados.map(CriarInteressados);
    container.replaceChildren(...interessados);

}

const CriarInteressados = ({nome, curriculo, dataDeNascimento, tbl_login}) => {

    const tr = document.createElement("tr");

    const idade = CalcularIdade(dataDeNascimento);

    tr.innerHTML = 
    `
        <tr>
            <td class="resultados">${nome}</td>
            <td class="resultados">${idade}</td>
            <td class="resultados">${tbl_login.email}</td>
            <td class="resultados"><a href="${curriculo}" download>Baixar</a></td>
            <td>
                <img src="assets/img/mais-opcoes.png" alt="Mais opções">
            </td>
        </tr>
    `;

    return tr;

}

CheckWindow();
document.getElementById("seta-baixo").addEventListener("click", openSetaHeader);
document.getElementById("cancelar-header").addEventListener("click", closeSetaHeader);
document.querySelector("main").addEventListener("click", closeSetaHeader);
document.querySelector("#sltTipo").addEventListener("change", SelecionarTipoControle);
document.querySelector("#sltOpcaoEvento").addEventListener("change", PesquisarSelecionado);
document.querySelector("#sltOpcaoVaga").addEventListener("change", PesquisarSelecionado);