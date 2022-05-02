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

function checkInputsDetalhesConta() {

    const nomeValue = nome.value.trim();
    const emailValue = email.value.trim();
    const cnpjValue = cnpj.value.trim();
    const celularValue = celular.value.trim();
    const telefoneValue = telefone.value.trim();
    // const linkSiteValue = linkSite.value.trim();
    // const pixValue = pix.value.trim();
    // const agenciaValue = agencia.value.trim();
    // const contaValue = conta.value.trim();
    // const tipoContaValue = tipoConta.value.trim();
    // const nomePatrocinadorValue = nomePatrocinador.value.trim();
    // const sitePatrocinadorValue = sitePatrocinador.value.trim();
    let statusDetalhesConta = [];

    if (nomeValue === "") {
        errorValidation(nome, "Preencha este campo");
        statusDetalhesConta.push(false);
    } else if (nomeValue.length >= 80) {
        errorValidation(nome, "Exesso de caracteres atingido");
        statusDetalhesConta.push(false);
    } else if (nomeValue.length < 5) {
        errorValidation(nome, "Deve conter um mínino de 2 caracteres");
        statusDetalhesConta.push(false);
    } else {
        successValidation(nome);
        statusDetalhesConta.push(true);
    }

    if (emailValue === "") {
        errorValidation(email, "Preencha este campo");
        statusDetalhesConta.push(false);
    } else if (!emailValue.includes("@")) {
        errorValidation(email, `Adicione um '@' após o nome do email`);
        statusDetalhesConta.push(false);
    } else if (emailValue.includes("@.com")) {
        errorValidation(email, `O uso do '.' em '.com' está de forma incorreta`);
        statusDetalhesConta.push(false);
    } else if (!emailValue.includes(".com")) {
        errorValidation(email, "Adicione um sub dominio no final");
        statusDetalhesConta.push(false);
    } else if (emailValue.length >= 256) {
        errorValidation(email, "Exesso de caracteres atingido");
        statusDetalhesConta.push(false);
    } else {
        successValidation(email);
        statusDetalhesConta.push(true);
    }

    if (cnpjValue === "") {
        errorValidation(cnpj, "Preencha este campo");
        statusDetalhesConta.push(false);
    } else {
        successValidation(cnpj);
        statusDetalhesConta.push(true);
    }

    if (celularValue === "") {
        errorValidation(celular, "Preencha este campo");
        statusDetalhesConta.push(false);
    } else {
        successValidation(celular);
        statusDetalhesConta.push(true);
    }

    if (telefoneValue === "") {
        errorValidation(telefone, "Preencha este campo");
        statusDetalhesConta.push(false);
    } else {
        successValidation(telefone);
        statusDetalhesConta.push(true);
    }

    // if (linkSiteValue === "") {
    //     errorValidation(linkSite, "Preencha este campo");
    //     status.push(false);
    // } else {
    //     successValidation(linkSite);
    //     status.push(true);
    // }

    // if (pixValue === "") {
    //     errorValidation(pix, "Preencha este campo");
    //     status.push(false);
    // } else {
    //     successValidation(pix);
    //     status.push(true);
    // }

    // if (agenciaValue === "") {
    //     errorValidation(agencia, "Preencha este campo");
    //     status.push(false);
    // } else {
    //     successValidation(agencia);
    //     status.push(true);
    // }

    // if (contaValue === "") {
    //     errorValidation(conta, "Preencha este campo");
    //     status.push(false);
    // } else {
    //     successValidation(conta);
    //     status.push(true);
    // }

    // if (tipoContaValue === "") {
    //     errorValidation(tipoConta, "Preencha este campo");
    //     status.push(false);
    // } else {
    //     successValidation(tipoConta);
    //     status.push(true);
    // }

    // if (nomePatrocinadorValue === "") {
    //     errorValidation(nomePatrocinador, "Preencha este campo");
    //     status.push(false);
    // } else {
    //     successValidation(nomePatrocinador);
    //     status.push(true);
    // }

    // if (sitePatrocinadorValue === "") {
    //     errorValidation(sitePatrocinador, "Preencha este campo");
    //     status.push(false);
    // } else {
    //     successValidation(sitePatrocinador);
    //     status.push(true);
    // }

    return statusDetalhesConta;
}

function checkInputsDetalhesOng() {

    const descriacaoValue = descriacao.value.trim();
    const qtdaMembrosValue = qtdaMembros.value.trim();
    const dataFundacaoValue = dataFundacao.value.trim();
    const historiaValue = historia.value.trim();
    let statusDetalhesOng = [];

    if (descriacaoValue === "") {
        errorValidation(descriacao, "Preencha este campo");
        statusDetalhesOng.push(false);
    } else {
        successValidation(descriacao);
        statusDetalhesOng.push(true);
    }

    if (qtdaMembrosValue === "") {
        errorValidation(qtdaMembros, "Preencha este campo");
        statusDetalhesOng.push(false);
    } else {
        successValidation(qtdaMembros);
        statusDetalhesOng.push(true);
    }

    if (dataFundacaoValue === "") {
        errorValidation(dataFundacao, "Preencha este campo");
        statusDetalhesOng.push(false);
    } else {
        successValidation(dataFundacao);
        statusDetalhesOng.push(true);
    }

    if (historiaValue === "") {
        errorValidation(historia, "Preencha este campo");
        statusDetalhesOng.push(false);
    } else {
        successValidation(historia);
        statusDetalhesOng.push(true);
    }

    return statusDetalhesOng;

}

function checkInputsDetalhesEndereco() {

    const cepValue = cep.value.trim();
    const estadoValue = estado.value.trim();
    const cidadeValue = cidade.value.trim();
    const bairroValue = bairro.value.trim();
    const enderecoValue = endereco .value.trim();
    const numeroValue = numero.value.trim();
    const complementoValue = complemento.value.trim();
    let statusDetalhesEndereco = [];

    if (cepValue === "") {
        errorValidation(cep, "Preencha este campo");
        statusDetalhesEndereco.push(false);
    } else {
        successValidation(cep);
        statusDetalhesEndereco.push(true);
    }

    if (estadoValue === "") {
        errorValidation(estado, "Preencha este campo");
        statusDetalhesEndereco.push(false);
    } else {
        successValidation(estado);
        statusDetalhesEndereco.push(true);
    }

    if (cidadeValue === "") {
        errorValidation(cidade, "Preencha este campo");
        statusDetalhesEndereco.push(false);
    } else {
        successValidation(cidade);
        statusDetalhesEndereco.push(true);
    }

    if (bairroValue === "") {
        errorValidation(bairro, "Preencha este campo");
        statusDetalhesEndereco.push(false);
    } else {
        successValidation(bairro);
        statusDetalhesEndereco.push(true);
    }

    if (enderecoValue === "") {
        errorValidation(endereco, "Preencha este campo");
        statusDetalhesEndereco.push(false);
    } else {
        successValidation(endereco);
        statusDetalhesEndereco.push(true);
    }

    if (numeroValue === "") {
        errorValidation(numero, "Preencha este campo");
        statusDetalhesEndereco.push(false);
    } else {
        successValidation(numero);
        statusDetalhesEndereco.push(true);
    }

    if (complementoValue === "") {
        errorValidation(complemento, "Preencha este campo");
        statusDetalhesEndereco.push(false);
    } else {
        successValidation(complemento);
        statusDetalhesEndereco.push(true);
    }

    return statusDetalhesEndereco;

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
    checkInputsDetalhesConta,
    checkInputsDetalhesOng,
    checkInputsDetalhesEndereco,
    errorValidation
};