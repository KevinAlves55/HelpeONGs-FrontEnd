"use strict";

import ApiRequest from "../utils/ApiRequest.js";

document.getElementById("formButton").addEventListener("click", async () => {
    const dom = {
        cnpj: document.getElementById("CNPJ").value,
        email: document.getElementById("email").value,
        password: document.getElementById("senha").value,
        confirmPassword: document.getElementById("confirmarSenha").value,
    };
    
    if (dom.password !== dom.confirmPassword) {
        alert("Senhas não conferem!");
        return;
    }

    const ongData = {
        cnpj: dom.cnpj,
        nome: "unnamed",
        email: dom.email,
        senha: dom.password,
    };

    const request = await ApiRequest("POST", "http://localhost:3131/ong/pre-register", ongData);

    if (request.status === 200) {
        alert(`Usuário cadastrado com sucesso!`);
        window.location.href = `loginONGs.html`;
    } else if (request.status === 401) {
        alert(`Senha inválida!`);
        window.location.href = `cadastroOng.html`;
    } else if (request.status === 400) {
        alert(`Usuario ja cadastrado`);
        window.location.href = `cadastroOng.html`;
    }

});

// nao deixar campo vazio
// minimo de caracteres
// nao permitir aspas simples