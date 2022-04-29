const nome = document.getElementById("nome");
const cnpj = document.getElementById("cnpj");
const email = document.getElementById("email");
const password = document.getElementById("senha");
const passwordDto = document.getElementById("confirmarSenha");

function checkInputs() {

    const nomeValue = nome.value.trim();
    const cnpjValue = cnpj.value.trim();
    const emailValue = email.value.trim();
    const senhaValue = password.value.trim();
    const senhaConfirmadaValue = passwordDto.value.trim();
    let status = [];

    if (nomeValue === "") {
        errorValidation(nome, "Preencha este campo");
        status.push(false);
    } else if (nomeValue.length >= 80) {
        errorValidation(nome, "Exesso de caracteres atingido");
        status.push(false);
    } else if (nomeValue.length < 5) {
        errorValidation(nome, "Deve conter um mínino de 6 caracteres");
        status.push(false);
    } else {
        successValidation(nome);
        status.push(true);
    }

    if (cnpjValue === "") {
        errorValidation(cnpj, "Preencha este campo");
        status.push(false);
    } else {
        successValidation(cnpj);
        status.push(true);
    }

    if (emailValue === "") {
        errorValidation(email, "Preencha este campo");
        status.push(false);
    } else if (!emailValue.includes("@")) {
        errorValidation(email, `Adicione um '@' após o nome do email`);
        status.push(false);
    } else if (emailValue.includes("@.com")) {
        errorValidation(email, `O uso do '.' em '.com' está de forma incorreta`);
        status.push(false);
    } else if (!emailValue.includes(".com")) {
        errorValidation(email, "Adicione um sub dominio no final");
        status.push(false);
    } else if (emailValue.length >= 256) {
        errorValidation(email, "Exesso de caracteres atingido");
        status.push(false);
    } else {
        successValidation(email);
        status.push(true);
    }

    if (senhaValue === "") {
        errorValidation(password, "Preencha este campo");
        status.push(false);
    } else if (senhaValue.length < 7) {
        errorValidation(password, "A senha deve conter no mínimo 8 caracteres");
        status.push(false);
    } else {
        successValidation(password);
        status.push(true);
    }

    if (senhaConfirmadaValue === "") {
        errorValidation(passwordDto, "Preencha este campo");
        status.push(false);
    } else if (senhaConfirmadaValue != senhaValue) {
        errorValidation(passwordDto, "Senhas não conferem");
        status.push(false);
    } else {
        successValidation(passwordDto);
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
};