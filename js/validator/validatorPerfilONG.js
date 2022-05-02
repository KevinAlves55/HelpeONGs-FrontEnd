const nome = document.getElementById('nomeOng');
const email = document.getElementById("emailOng");
const cnpj = document.getElementById("cnpjOng");
const celular = document.getElementById("celularOng");
const telefone = document.getElementById("telefoneOng");
const descriacao = document.getElementById("descriacaoOng");
const qtdaMembros = document.getElementById("qtdaMembrosOng");
const dataFundacao = document.getElementById("fundacaoOng");
const historia = document.getElementById("historiaOng");
const cep = document.getElementById("cep");
const estado = document.getElementById('estado');
const cidade = document.getElementById('cidade');
const bairro = document.getElementById('bairro');
const endereco = document.getElementById('endereco');
const numero = document.getElementById('numero');
const complemento = document.getElementById('complemento');
const linkSite = document.getElementById('linkSiteOng');
const pix = document.getElementById("pixOng");
const agencia = document.getElementById("agenciaOng");
const conta = document.getElementById("contaOng");
const tipoConta = document.getElementById("contaTipoOng");
const nomePatrocinador = document.getElementById("nomePatrocinadorOng");
const sitePatrocinador = document.getElementById("linkSitePatrocinador");

function checkInputs() {

    const nomeValue = nome.value.trim();
    const emailValue = email.value.trim();
    const cnpjValue = cnpj.value.trim();
    const celularValue = celular.value.trim();
    const telefoneValue = telefone.value.trim();
    const descriacaoValue = descriacao.value.trim();
    const qtdaMembrosValue = qtdaMembros.value.trim();
    const dataFundacaoValue = dataFundacao.value.trim();
    const historiaValue = historia.value.trim();
    const cepValue = cep.value.trim();
    const estadoValue = estado.value.trim();
    const cidadeValue = cidade.value.trim();
    const bairroValue = bairro.value.trim();
    const enderecoValue = endereco .value.trim();
    const numeroValue = numero.value.trim();
    const complementoValue = complemento.value.trim();
    const linkSiteValue = linkSite.value.trim();
    const pixValue = pix.value.trim();
    const agenciaValue = agencia.value.trim();
    const contaValue = conta.value.trim();
    const tipoContaValue = tipoConta.value.trim();
    const nomePatrocinadorValue = nomePatrocinador.value.trim();
    const sitePatrocinadorValue = sitePatrocinador.value.trim();
    let status = [];

    if (nomeValue === "") {
        errorValidation(nome, "Preencha este campo");
        status.push(false);
    } else if (nomeValue.length >= 80) {
        errorValidation(nome, "Exesso de caracteres atingido");
        status.push(false);
    } else if (nomeValue.length < 5) {
        errorValidation(nome, "Deve conter um mínino de 2 caracteres");
        status.push(false);
    } else {
        successValidation(nome);
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