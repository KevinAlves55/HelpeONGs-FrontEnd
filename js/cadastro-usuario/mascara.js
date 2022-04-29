"use strict"

const nome = document.getElementById("nome").value
const email = document.getElementById("email").value
const senha = document.getElementById("senha").value
const confirmPassword = document.getElementById("confirmarSenha").value

function caracteresInvalidosEmail(email) {

    email.value = email.value.replace(/[\[\]}!'-,><|://#"%$°ºª§\\;&*()'ˆß+={]/g, "")
    email.value = email.value.replace(/(\d{})/, "")

}

function caracteresInvalidosNome(nome) {
    
    nome.value = nome.value.replace(/[\[\]}.!'-@,><|://#"%$°ºª§\\;&*'"()_+={]/g, "")
    nome.value = nome.value.replace(/[^\D]/g, "")

}

function mascaraSenha(senha) {

    senha.value = senha.value.replace(/['"]/g, "")
    senha.value = senha.value.replace(/['"]/g, "")

}

function mascaraSenhaConfirm(confirmPassword) {

    confirmPassword.value = confirmPassword.value.replace(/['"]/g, "")
    confirmPassword.value = confirmPassword.value.replace(/[d]/g, "")

}