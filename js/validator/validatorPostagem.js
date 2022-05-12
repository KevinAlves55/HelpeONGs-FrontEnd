"use strict"

const descricao = document.getElementById("text-post");

function checkInputs() {

    const descricaoValue = descricao.value.trim();
    let status = [];

    if (descricaoValue === "") {
        errorValidation(descricao, "Este campo é obrigatório");
        status.push(false);
    } else if (descricaoValue.length >= 800) {
        errorValidation(descricao, "Exesso de caracteres atingido");
        status.push(false);
    } else if (descricaoValue.length <= 6) {
        errorValidation(descricao, "Deve conter um mínino de 7 caracteres");
        status.push(false);
    } else {
        successValidation(descricao);
        status.push(true);
    }

    return status;
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

export {

    checkInputs,
    errorValidation

}