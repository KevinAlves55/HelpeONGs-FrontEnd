"use strict"

import ApiRequest from "../utils/ApiRequest.js";
import DEFAULT_URL from "./global-env.js";
import { checkInputs, errorValidation } from "../validator/validatorLogin.js";
import Redirect from "../utils/Redirect.js";

const email = document.getElementById("email");
const password = document.getElementById("senha");

const validarLogin = async (e) => {

    e.preventDefault();

    const validacoes = checkInputs();

    let result;
    validacoes.map(status => {
        status === false ? result = false : "";
    });

    if (result != false) {

        const dom = {
        
            email: email.value,
            senha: password.value
        
        };

        const response = await ApiRequest("POST", "http://localhost:3131/ong/login", {
            email: dom.email.toString().toLowerCase(),
            senha: dom.senha.toString()
        });

        if (response.status == 404) {

            errorValidation(email, "Email não encontrado");
            errorValidation(password, "Senha inválida")

        } else if (response.status == 401) {
            
            errorValidation(email, "Email ou senha não conferem");
            errorValidation(password, "Email ou senha não conferem");
        
        } else if (response.status == 200) {

            const dadosOng = response.data;
            localStorage.clear();
            localStorage.setItem('dadosOng', JSON.stringify(dadosOng));
            localStorage.setItem("emailSenha", JSON.stringify(dom));
            Redirect("feed");
        
        }

    }

}

document.getElementById("btn-login").addEventListener("click", validarLogin);