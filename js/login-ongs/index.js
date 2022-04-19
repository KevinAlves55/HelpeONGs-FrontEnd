"use strict"

import ApiRequest from "../utils/ApiRequest.js";
import DEFAULT_URL from "./global-env.js";

const redirect = () => {

    window.location.href = "feed.html";

}

const validarLogin = async () => {

    const dom = {
        
        email: document.getElementById("email").value,
        password: document.getElementById("senha").value
    
    };

    const response = await ApiRequest("POST", `${DEFAULT_URL}/ong/login`, {
        
        email: dom.email.toString().toLowerCase(),
        senha: String(dom.password)
    
    });

    console.log(response);

    if (response.status == 200) {

        redirect();
    
    } else if (response.status == 404) {
        
        alert(`Email ou senha não conferem`);
    
    } else if (response.status == 401) {
    
        alert(`Senha incorreta`);
    
    }

}

document.getElementById("btn-login").addEventListener("click", validarLogin);