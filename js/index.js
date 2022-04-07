"use strict";

document.getElementById("formButton").addEventListener("click", event => {
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

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({...ongData}),
    };

    fetch("http://localhost:3131/ong/pre-register", options)
        .then(response => {
            console.log(response);
        });
});


