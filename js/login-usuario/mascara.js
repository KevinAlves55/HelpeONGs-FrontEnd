"use strict"

const senha = document.getElementById("senha").value
const email = document.getElementById("email").value

function mascaraSenha(senha) {

    senha.value = senha.value.replace(/['"]/g, "")
    senha.value = senha.value.replace(/['"]/g, "")

}
function caracteresInvalidos(email) {
    
    email.value = email.value.replace(/[\[\]}!'-,><|://#"%$\\;&*()°º'ˆß+={]/g, "")
    email.value = email.value.replace(/(\d{})/, "")
    
}