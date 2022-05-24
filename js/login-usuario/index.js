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

        const response = await ApiRequest("POST", `http://localhost:3131/user/login`, {
            email: dom.email.toString().toLowerCase(),
            senha: dom.senha.toString()
        });

        if (response.status == 404) {
            
            errorValidation(email, "Email incorreto")
        
        } else if (response.status == 400) {
        
            errorValidation(senha, "Senha incorreta")
        
        } else if (response.status == 200) {
    
            const dadosUsuario = response.usuario;
            localStorage.clear();
            localStorage.setItem('dadosUsuario', JSON.stringify(dadosUsuario));
            localStorage.setItem("emailSenha", JSON.stringify(dom));
            window.location.href = "doacoesONGs.html";
        
        }

    }

}

document.getElementById("btn-login").addEventListener("click", validarLogin);