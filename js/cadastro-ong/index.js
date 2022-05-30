"use strict";

import ApiRequest from "../utils/ApiRequest.js";
import { openMessage, closeMessage } from "../utils/MessageCadastroOng.js";
import { checkInputs, errorValidation } from "../validator/validatorOng.js";
import Redirect from "../utils/Redirect.js";

/* Captura os valores inseridos(No caso o objeto de captura) */
const nome = document.getElementById("nome");
const cnpj = document.getElementById("cnpj");
const email = document.getElementById("email");
const password = document.getElementById("senha");

const cadastrarOng = async (e) => {

    // Anula o comportamento dá página ao usar um botão SUBMIT
    e.preventDefault();

    // Função responsável por validar todos os campos
    const validacoes = checkInputs();

    // // Validando a resposta da função
    let result;
    validacoes.map(status => {
        status === false ? result = false : "";
    });

    if (result != false) {

        const validatorCnpj = await validarCNPJApi();

        if (validatorCnpj === undefined || validatorCnpj === false) {
            errorValidation(cnpj, "CNPJ inválido");
        } else {
            
            const ongData = {
                nome: nome.value,
                cnpj: cnpj.value,
                email: email.value,
                senha: password.value
            }
    
            let request;
            request = await ApiRequest("POST", "http://localhost:3131/ong/pre-register", ongData);
            console.log(request);
    
            if (request.status === 200) {
                openMessage();
            } else if (request.status === 400) {
                errorValidation(email, "O Email digitado já foi cadastrado");
            }

        }
    }

}

const validarCNPJApi = async () => {

    const cnpjFormatado = limparCnpj();
    const url = `https://publica.cnpj.ws/cnpj/${cnpjFormatado}`;
    const response = await fetch(url);
    const corpo = await response.json();

    if (corpo.status === 400) {
        false
    } else if (response.status === 200) {
        return corpo;
    } 
    else {
        null;
    }

}

function limparCnpj() {

    const cnpjValue = cnpj.value;
    const formatCnpj = cnpjValue.replace(/[^0-9]/g, '');
    return formatCnpj;

}

document.getElementById("formButton").addEventListener("click", cadastrarOng);
document.getElementById("OK").addEventListener("click", closeMessage);
document.getElementById("PageDoar").addEventListener("click",() => {

    Redirect("doacoesONGs");

});