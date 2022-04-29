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
        cep: document.getElementById('cepEndereco').value,
        estado: document.getElementById('estadoEndereco').value,
        cidade: document.getElementById('cidadeEndereco').value,
        bairro: document.getElementById('bairroEndereco').value,
        rua: document.getElementById('endereco').value,
        numero: document.getElementById('numeroEndereco').value,
        complemento: document.getElementById('complementoEndereco').value,
    }
    localStorage.setItem("dadosDetalhesEnderecos", JSON.stringify(dadosDetalhesEnderecos));

}







document.getElementById("formButton").addEventListener("click", dadosDetalhesConta);
document.getElementById("buttonEnderecos").addEventListener("click", DetalhesEnderecos);