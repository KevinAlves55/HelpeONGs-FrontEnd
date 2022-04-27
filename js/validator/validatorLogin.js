const email = document.getElementById("email");
const password = document.getElementById("senha");

function checkInputs() {

    const emailValue = email.value.trim();
    const senhaValue = password.value.trim();
    let status = [];

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
    } else {
        successValidation(password);
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