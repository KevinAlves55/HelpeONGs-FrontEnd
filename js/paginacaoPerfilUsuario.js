'use strict'

const nav = {
    btnSobre: document.getElementById("item1"),
    btnDetalhesConta: document.getElementById("item2"),
    btnDetalhesEndereco: document.getElementById("item3"),
    btnSenha: document.getElementById("item4"),
    btnConta: document.getElementById("item5")
}

const dom = {
    sobre: document.getElementById("container-conteudo-sobre"),
    detalhesConta: document.getElementById("container-conteudo-detalhes-de-conta"),
    detalhesEndereco: document.getElementById("container-conteudo-detalhes-do-endereco"),
    senha: document.getElementById("senha"),
    conta: document.getElementById("conta"),
}

nav.btnSobre.addEventListener("click", event => {
    dom.detalhesConta.style.display = "none";
    dom.detalhesEndereco.style.display = "none";
    dom.senha.style.display = "none";
    dom.conta.style.display = "none";
    dom.sobre.style.display = "flex";
});

nav.btnDetalhesConta.addEventListener("click", event => {
    dom.sobre.style.display = "none";
    dom.detalhesEndereco.style.display = "none";
    dom.senha.style.display = "none";
    dom.conta.style.display = "none";
    dom.detalhesConta.style.display = "flex";
});

nav.btnDetalhesEndereco.addEventListener("click", event => {
    dom.detalhesConta.style.display = "none";
    dom.sobre.style.display = "none";
    dom.senha.style.display = "none";
    dom.conta.style.display = "none";
    dom.detalhesEndereco.style.display = "flex";
});

nav.btnSenha.addEventListener("click", event => {
    dom.detalhesConta.style.display = "none";
    dom.sobre.style.display = "none";
    dom.detalhesEndereco.style.display = "none";
    dom.conta.style.display = "none";
    dom.senha.style.display = "flex";
});

nav.btnConta.addEventListener("click", event => {
    dom.detalhesConta.style.display = "none";
    dom.sobre.style.display = "none";
    dom.detalhesEndereco.style.display = "none";
    dom.senha.style.display = "none";
    dom.conta.style.display = "flex";
});
