// Validações

"use strict"

const senha = document.getElementById("senha").value
const email = document.getElementById("email").value

function mascaraSenha(senha) {

    senha = senha.value = email.value.replace(/[\[\]}!'-,><|://#"%$\\;&*()'ˆß+={]/g, "")
    senha.value = senha.value.replace(/[^\D]/g, "")

}

function caracteresInvalidos(email) {
    
    email.value = email.value.replace(/[\[\]}!'-,><|://#"%$\\;&*()'ˆß+={]/g, "")

    email.value = email.value.replace(/(\d{})/, "")
    

}