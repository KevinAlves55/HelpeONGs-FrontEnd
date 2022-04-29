'use strict'

function dadosDetalhesConta() {

    const dadosDetalhes = {
        nome: document.getElementById('name').value,
        email: document.getElementById('mail').value,
    }
    localStorage.setItem("dadosDetalhes", JSON.stringify(dadosDetalhes));

    const dadosDetalhesUsuario = {
        data: document.getElementById('date').value,
        celular: document.getElementById('cel').value,
        telefone: document.getElementById('tel').value,
    }
    localStorage.setItem("dadosDetalhesUsuario", JSON.stringify(dadosDetalhesUsuario));
}


// ENVIANDO ENDEREÇO LOCALSTORAGE

function DetalhesEnderecos() {

    const dadosDetalhesEnderecos = {
        cep: document.getElementById('Cep').value,
        estado: document.getElementById('Estado').value,
        cidade: document.getElementById('Cidade').value,
        bairro: document.getElementById('Bairro').value,
        rua: document.getElementById('Rua').value,
        numero: document.getElementById('Numero').value,
        complemento: document.getElementById('Complemento').value,
    }
    localStorage.setItem("dadosDetalhesEnderecos", JSON.stringify(dadosDetalhesEnderecos));

}







document.getElementById("formButton").addEventListener("click", dadosDetalhesConta);
document.getElementById("ButtonEnderecos").addEventListener("click", DetalhesEnderecos);