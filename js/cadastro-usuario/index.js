"use strict";

const nome = document.getElementById("nome");
const email = document.getElementById("email");
const password = document.getElementById("senha");
const passwordDto = document.getElementById("confirmarSenha");

// import ApiRequest from "../utils/ApiRequest.js";

// const nome = document.getElementById("nome");
// const email = document.getElementById("email");
// const password = document.getElementById("senha");
// const passwordDto = document.getElementById("confirmarSenha");

const cadastrarUsuario = (e) => {

    e.preventDefault();

    checkInputs();

    console.log(checkInputs);

    // if (dom.nome === "" || dom.email === "" || dom.password === "" || dom.confirmPassword === "") {
    //     alert("Preencha todos os campos");
    //     return;
    // } else if (dom.password !== dom.confirmPassword) {
    //     alert("Senhas não conferem!");
    //     return;
    // }

    // const userData = {
    //     nome: dom.nome,
    //     email: dom.email,
    //     senha: dom.password,
    // };

    // let request;
    // request = await ApiRequest("POST", "http://localhost:3131/user/pre-register", userData);
    // console.log(request);

    // if (request.status === 200) {
    //     alert("Cadastrado com sucesso");
    //     redirect();
    // } else if (request.status === 400) {
    //     alert(request.message);
    // }
}

function checkInputs() {

    const nomeValue = nome.value.trim();
    const emailValue = email.value.trim();
    const senhaValue = password.value.trim();
    const senhaConfirmadaValue = passwordDto.value.trim();

    if (nomeValue === "") {
        errorValidation(nome, "Preencha este campo");
    } else if (nomeValue.length >= 80) {
        errorValidation(nome, "Exesso de caracteres atingido");
    } else if (nomeValue.length < 5) {
        errorValidation(nome, "Deve conter um mínino de 6 caracteres");
    } else {
        successValidation(nome);
    }

    if (emailValue === "") {
        errorValidation(email, "Preencha este campo");
    } else if(!emailValue.includes("@")) {
          errorValidation(email, `Adicione um "@" depois de "${emailValue}"`); 
    } else if(!emailValue.includes(".com")) {
        errorValidation(email, "Adicione um sudDominio no final");
    } else if(emailValue.length >= 256) {
        errorValidation(email, "Exesso de caracteres atingido");
    } else { 
        successValidation(email);
    }

    if (senhaValue === "") {
        errorValidation(password, "Preencha este campo");
    } else if (senhaValue.length < 7) {
        errorValidation(password, "A senha deve conter + de 8 caracteres");
    } else {
        successValidation(password);
    }

    if (senhaConfirmadaValue === "") {
        errorValidation(passwordDto, "Preencha este campo");
    } else if (senhaConfirmadaValue != senhaValue) {
        errorValidation(passwordDto, "Senhas não conferem");
    } else {
        successValidation(passwordDto);
    }

}

function errorValidation(input, message) {

    const styleInput = input.parentElement;
    const small = styleInput.querySelector("small");

    small.innerText = message
    styleInput.className = "style-input error"; 

}

function successValidation(input) {

    const styleInput = input.parentElement;

    styleInput.className = "style-input sucess";

}

document.getElementById("formButton").addEventListener("click", cadastrarUsuario);