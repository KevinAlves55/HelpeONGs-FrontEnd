"use strict";

import ApiRequest from "../utils/ApiRequest.js";
import { openMessage, closeMessage } from "../utils/MessageCadastroUser.js";
import { checkInputs, errorValidation } from "../validator/validatorUsuario.js";
import Redirect from "../utils/Redirect.js";

/* Captura os valores inseridos(No caso o objeto de captura) */
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const password = document.getElementById("senha");

const cadastrarUsuario = async (e) => {

    // Anula o comportamento dá página ao usar um botão SUBMIT
    e.preventDefault();

    // Função responsável por validar todos os campos
    const validacoes = checkInputs();

    // Validando a resposta da função
    let result;
    validacoes.map(status => {
        status === false ? result = false : "";
    });
    
    if (result != false) {
        
        const userData = {
            nome: nome.value,
            email: email.value,
            senha: password.value,
        }

        let request;
        request = await ApiRequest("POST", "http://localhost:3131/user/pre-register", userData);
        console.log(request);

        if (request.status === 200) {
            openMessage();
        } else if (request.status === 400) {
            errorValidation(email, "O Email digitado já foi cadastrado");
        }
    }

}

document.getElementById("formButton").addEventListener("click", cadastrarUsuario);
document.getElementById("OK").addEventListener("click", closeMessage);
document.getElementById("PageDoar").addEventListener("click",() => {

    Redirect("doacoesONGs");

});