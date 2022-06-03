"use strict"

const CalcularIdade = (dataDeNascimento) => {

    const anoAtual = new Date().getFullYear();
    const anoNascimento = dataDeNascimento.split("-")[0];
    const idade = anoAtual - anoNascimento;
    return idade;

}

export {
    CalcularIdade
}