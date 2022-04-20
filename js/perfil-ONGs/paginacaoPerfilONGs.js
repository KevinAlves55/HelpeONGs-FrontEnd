'use strict'

const nav = {
    btnSobre: document.getElementById("item1"),
    btnDetalhesConta: document.getElementById("item2"),
    btnDetalhesOngs: document.getElementById("item3"),
    btnDetalhesEnderecos: document.getElementById("item4"),
    // btnMeiosDoacoes: document.getElementById("item5"),
    // btnPatrocinios: document.getElementById("item6"),
    // btnPostal: document.getElementById("item7"),
    // btnEventoPostal: document.getElementById("item8"),
    // btnVagas: document.getElementById("item9"),
}

const dom = {
    sobre: document.getElementById("conteudo-inicio"),
    detalhesConta: document.getElementById("container-conteudo-detalhes-conta"),
    detalhesOngs: document.getElementById("container-conteudo-detalhes-ONGs"),
    detalhesEndereco: document.getElementById("container-conteudo-detalhes-do-endereco"),
}

nav.btnSobre.addEventListener("click", event => {
    dom.sobre.style.display = "flex";
    dom.detalhesConta.style.display = "none";
    dom.detalhesOngs.style.display = "none";
    dom.detalhesEnderecos.style.display = "none";
});

nav.btnDetalhesConta.addEventListener("click", event => {
    dom.detalhesConta.style.display = "flex";
    dom.sobre.style.display = "none";
    dom.detalhesEndereco.style.display = "none";
    dom.detalhesOngs.style.display = "none";
   
});

nav.btnDetalhesEndereco.addEventListener("click", event => {
    dom.detalhesEndereco.style.display = "flex";
    dom.detalhesConta.style.display = "none";
    dom.sobre.style.display = "none";
    dom.detalhesOngs.style.display = "none";
   
});

nav.btnDetalhesOngs.addEventListener("click", event => {
    dom.detalhesOngs.style.display = "flex";
    dom.detalhesConta.style.display = "none";
    dom.sobre.style.display = "none";
    dom.detalhesEndereco.style.display = "none";
   
});

