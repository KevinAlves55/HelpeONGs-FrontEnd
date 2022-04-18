"use strict";

import ApiRequest from "../utils/ApiRequest.js";
document.getElementById("formButton").addEventListener("click", () => {
    const dom = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        password: document.getElementById("senha").value,
        confirmPassword: document.getElementById("confirmarSenha").value,
    };
    
    if (dom.password !== dom.confirmPassword) {
        alert("Senhas não conferem!");
        return;
    }

    

    const ongData = {
        nome: dom.name,
        email: dom.email,
        senha: dom.password,
    };

    

    let request;
    console.log("Waiting request 0s: ", request);
    request = ApiRequest("POST", "http://localhost:3131/ong/pre-register", ongData);
    console.log("Waiting request 1s: ", request);
});