"use strict"

import ApiRequest from "../utils/ApiRequest.js";
import DEFAULT_URL from "./global-env.js";
import { checkInputs, errorValidation } from "../validator/validatorLogin.js";
import Redirect from "../utils/ApiRequest.js";

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

        const response = await ApiRequest("POST", `${DEFAULT_URL}/ong/login`, {
            email: dom.email.toString().toLowerCase(),
            senha: dom.senha.toString()
        });

        console.log(response);

        if (response.status == 401) {
            
            errorValidation(email, response.message);
            errorValidation(password, response.message);
        
        } else if (response.status == 200) {

            const dadosOng = response.data[0];
            localStorage.setItem('dadosOng', JSON.stringify(dadosOng));
            window.location.href = "doacoesONGs.html";
        
        }

    }

}

document.getElementById("btn-login").addEventListener("click", validarLogin);