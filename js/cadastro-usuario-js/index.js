"use strict";

import ApiRequest from "../utils/ApiRequest.js";

const redirect = () => {
    window.location.href = "login.html";
};

const cadastrarUsuario = async () => {
    
    const dom = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        password: document.getElementById("senha").value,
        confirmPassword: document.getElementById("confirmarSenha").value,
    };

    if (dom.nome === "" || dom.email === "" || dom.password === "" || dom.confirmPassword === "") {
        alert("Preencha todos os campos");
        return;
    } else if (dom.password !== dom.confirmPassword) {
        alert("Senhas não conferem!");
        return;
    }

    const userData = {
        nome: dom.nome,
        email: dom.email,
        senha: dom.password,
    };

    let request;
    request = await ApiRequest("POST", "http://localhost:3131/user/pre-register", userData);
    console.log(request);

    if (request.status === 200) {
        alert("Cadastrado com sucesso");
        redirect();
    } else if (request.status === 400) {
        alert(request.message);
    }
};

document.getElementById("formButton").addEventListener("click", cadastrarUsuario);