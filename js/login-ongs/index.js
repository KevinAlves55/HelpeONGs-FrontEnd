"use strict"

import ApiRequest from "../utils/ApiRequest.js";
import DEFAULT_URL from "./global-env.js";

const redirect = () => {

    window.location.href = "doacoesONGs.html";

}

const validarLogin = async (e) => {

    e.preventDefault();

    const dom = {
        
        email: document.getElementById("email").value,
        password: document.getElementById("senha").value
    
    };

    const response = await ApiRequest("POST", `${DEFAULT_URL}/user/login`, {
        
        email: dom.email.toString().toLowerCase(),
        senha: String(dom.password)
    
    });

    if (response.status == 200) {

        console.log(response);
        const dados = response.usuario;
        localStorage.setItem('dados', JSON.stringify(dados));
        redirect();
    
    } else if (response.status == 404) {
        
        alert(`Email ou senha não conferem`);
    
    } else if (response.status == 401) {
    
        alert(`Senha incorreta`);
    
    }

}

document.getElementById("btn-login").addEventListener("click", validarLogin);