"use strict"

const nome = document.getElementById("nome")
const cnpj = document.getElementById("cnpj")
const email = document.getElementById("email")
const senha = document.getElementById("senha")
const confirmPassword = document.getElementById("confirmarSenha")

function mascaraCNPJ(cnpj) {

    cnpj.value = cnpj.value.replace(/[^\d]/g, "")
    cnpj.value = cnpj.value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");

}

function caracteresInvalidosEmail(email) {

    email.value = email.value.replace(/[\[\]}!'-,><|://#"%$°ºª§\\;&*()'ˆß+={]/g, "");
    email.value = email.value.replace(/(\d{})/, "");

}

function caracteresInvalidosNome(nome) {
    
    nome.value = nome.value.replace(/[\[\]}.!'-@,><|://#"%$°ºª§\\;&*'"()_+={]/g, "");
    nome.value = nome.value.replace(/[^\D]/g, "");

}

function mascaraSenha(senha) {

    senha.value = senha.value.replace(/['"]/g, "");
    senha.value = senha.value.replace(/['"]/g, "");

}

function mascaraSenhaConfirm(confirmPassword) {

    confirmPassword.value = confirmPassword.value.replace(/['"]/g, "");
    confirmPassword.value = confirmPassword.value.replace(/[d]/g, "");

}