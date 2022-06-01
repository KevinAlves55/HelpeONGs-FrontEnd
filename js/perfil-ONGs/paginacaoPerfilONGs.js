'use strict'

const nav = {
    btnSobre: document.getElementById("item1"),
    btnDetalhesConta: document.getElementById("item2"),
    btnDetalhesOngs: document.getElementById("item3"),
    btnDetalhesEnderecos: document.getElementById("item4"),
    btnDetalhesContatos: document.getElementById("item5"),
    btnMeiosDoacoes: document.getElementById("item6"),
    btnPatrocinios: document.getElementById("item7"),
    btnPost: document.getElementById("item8"),
    btnEvento: document.getElementById("item9"),
    btnVagas: document.getElementById("item10"),
    btnSenha: document.getElementById("item11"),
    btnConta: document.getElementById("item12"),
    btntrocarDireta: document.getElementById("trocar-direita"),
    btntrocaresquerda: document.getElementById("trocar-esquerda"),
    menuOpcoesOutros: document.getElementById("menu-opcoes-outros"),
    menuOpcoesPrincipal: document.getElementById("menu-opcoes-principal"),
}

const dom = {
    sobre: document.getElementById("conteudo-inicio"),
    detalhesConta: document.getElementById("container-conteudo-detalhes-conta"),
    detalhesOngs: document.getElementById("container-conteudo-detalhes-ONGs"),
    detalhesEndereco: document.getElementById("container-conteudo-detalhes-do-endereco"),
    detalhesContatos: document.getElementById("container-conteudo-detalhes-de-contatos"),
    meiosDoacoes: document.getElementById("container-conteudo-meios-doacoes"),
    patrocinios: document.getElementById("container-conteudo-patrocinios"),
    post: document.getElementById("container-post"),
    evento: document.getElementById("container-evento"),
    vagas: document.getElementById("container-vagas"),
    senha: document.getElementById("container-senha"),
    conta: document.getElementById("container-conta"),
    btntrocarDireta: document.getElementById("trocar-direita"),
    btntrocaresquerda: document.getElementById("trocar-esquerda"),
    menuOpcoesOutros: document.getElementById("menu-opcoes-outros"),
    menuOpcoesPrincipal: document.getElementById("menu-opcoes-principal"),
}   

nav.btnSobre.addEventListener("click", event => {
    dom.sobre.style.display = "flex";
    dom.detalhesConta.style.display = "none";
    dom.detalhesOngs.style.display = "none";
    dom.detalhesEndereco.style.display = "none";
    dom.detalhesContatos.style.display = "none";
    dom.meiosDoacoes.style.display = "none";
    dom.patrocinios.style.display = "none";
    dom.post.style.display = "none";
    dom.evento.style.display = "none";
    dom.vagas.style.display = "none";
    dom.senha.style.display = "none";
    dom.conta.style.display = "none";
});

nav.btnDetalhesContatos.addEventListener("click", event => {

    dom.detalhesContatos.style.display = "flex";
    dom.sobre.style.display = "none";
    dom.detalhesEndereco.style.display = "none";
    dom.detalhesOngs.style.display = "none";
    dom.meiosDoacoes.style.display = "none";
    dom.patrocinios.style.display = "none";
    dom.detalhesConta.style.display = "none";
    dom.post.style.display = "none";
    dom.evento.style.display = "none";
    dom.vagas.style.display = "none";
    dom.senha.style.display = "none";
    dom.conta.style.display = "none";

});

nav.btnDetalhesEnderecos.addEventListener("click", event => {
    dom.detalhesEndereco.style.display = "flex";
    dom.detalhesContatos.style.display = "none";
    dom.detalhesConta.style.display = "none";
    dom.sobre.style.display = "none";
    dom.detalhesOngs.style.display = "none";
    dom.meiosDoacoes.style.display = "none";
    dom.patrocinios.style.display = "none";
    dom.post.style.display = "none";
    dom.evento.style.display = "none";
    dom.vagas.style.display = "none";
    dom.senha.style.display = "none";
    dom.conta.style.display = "none";
   
});


nav.btnDetalhesConta.addEventListener("click", event => {
    dom.detalhesConta.style.display = "flex";
    dom.sobre.style.display = "none";
    dom.detalhesContatos.style.display = "none";
    dom.detalhesEndereco.style.display = "none";
    dom.detalhesOngs.style.display = "none";
    dom.meiosDoacoes.style.display = "none";
    dom.patrocinios.style.display = "none";
    dom.post.style.display = "none";
    dom.evento.style.display = "none";
    dom.vagas.style.display = "none";
    dom.senha.style.display = "none";
    dom.conta.style.display = "none";
});

nav.btnDetalhesOngs.addEventListener("click", event => {
    dom.detalhesOngs.style.display = "flex";
    dom.detalhesContatos.style.display = "none";
    dom.detalhesConta.style.display = "none";
    dom.sobre.style.display = "none";
    dom.detalhesEndereco.style.display = "none";
    dom.meiosDoacoes.style.display = "none";
    dom.patrocinios.style.display = "none";
    dom.post.style.display = "none";
    dom.evento.style.display = "none";
    dom.vagas.style.display = "none";
    dom.senha.style.display = "none";
    dom.conta.style.display = "none";
   
});


nav.btnMeiosDoacoes.addEventListener("click", event => {
    dom.meiosDoacoes.style.display = "flex";
    dom.detalhesContatos.style.display = "none";
    dom.detalhesOngs.style.display = "none";
    dom.detalhesConta.style.display = "none";
    dom.sobre.style.display = "none";
    dom.detalhesEndereco.style.display = "none";
    dom.patrocinios.style.display = "none";
    dom.post.style.display = "none";
    dom.evento.style.display = "none";
    dom.vagas.style.display = "none";
    dom.senha.style.display = "none";
    dom.conta.style.display = "none";
   
});

nav.btnPatrocinios.addEventListener("click", event => {
    dom.patrocinios.style.display = "flex";
    dom.detalhesContatos.style.display = "none";
    dom.detalhesOngs.style.display = "none";
    dom.detalhesConta.style.display = "none";
    dom.sobre.style.display = "none";
    dom.detalhesEndereco.style.display = "none";
    dom.meiosDoacoes.style.display = "none";
    dom.post.style.display = "none";
    dom.evento.style.display = "none";
    dom.vagas.style.display = "none";
    dom.senha.style.display = "none";
    dom.conta.style.display = "none";
});

nav.btnPost.addEventListener("click", event => {
    dom.post.style.display = "flex";
    dom.detalhesContatos.style.display = "none";
    dom.detalhesOngs.style.display = "none";
    dom.detalhesConta.style.display = "none";
    dom.sobre.style.display = "none";
    dom.detalhesEndereco.style.display = "none";
    dom.meiosDoacoes.style.display = "none";
    dom.patrocinios.style.display = "none";
    dom.evento.style.display = "none";
    dom.vagas.style.display = "none";
    dom.senha.style.display = "none";
    dom.conta.style.display = "none";
   
});

nav.btnEvento.addEventListener("click", event => {
    dom.evento.style.display = "flex";
    dom.detalhesContatos.style.display = "none";
    dom.detalhesOngs.style.display = "none";
    dom.detalhesConta.style.display = "none";
    dom.sobre.style.display = "none";
    dom.detalhesEndereco.style.display = "none";
    dom.meiosDoacoes.style.display = "none";
    dom.patrocinios.style.display = "none";
    dom.post.style.display = "none";
    dom.vagas.style.display = "none";
    dom.senha.style.display = "none";
    dom.conta.style.display = "none";
   
});

nav.btnVagas.addEventListener("click", event => {
    dom.vagas.style.display = "flex";
    dom.detalhesContatos.style.display = "none";
    dom.detalhesOngs.style.display = "none";
    dom.detalhesConta.style.display = "none";
    dom.sobre.style.display = "none";
    dom.detalhesEndereco.style.display = "none";
    dom.meiosDoacoes.style.display = "none";
    dom.patrocinios.style.display = "none";
    dom.post.style.display = "none";
    dom.evento.style.display = "none";
    dom.senha.style.display = "none";
    dom.conta.style.display = "none";
   
});

nav.btnSenha.addEventListener("click", event => {
    dom.senha.style.display = "flex";
    dom.detalhesContatos.style.display = "none";
    dom.detalhesOngs.style.display = "none";
    dom.detalhesConta.style.display = "none";
    dom.sobre.style.display = "none";
    dom.detalhesEndereco.style.display = "none";
    dom.meiosDoacoes.style.display = "none";
    dom.patrocinios.style.display = "none";
    dom.post.style.display = "none";
    dom.evento.style.display = "none";
    dom.vagas.style.display = "none";
    dom.conta.style.display = "none";
   
});

nav.btnConta.addEventListener("click", event => {
    dom.conta.style.display = "flex";
    dom.detalhesContatos.style.display = "none";
    dom.detalhesOngs.style.display = "none";
    dom.detalhesConta.style.display = "none";
    dom.sobre.style.display = "none";
    dom.detalhesEndereco.style.display = "none";
    dom.meiosDoacoes.style.display = "none";
    dom.patrocinios.style.display = "none";
    dom.post.style.display = "none";
    dom.evento.style.display = "none";
    dom.vagas.style.display = "none";
    dom.senha.style.display = "none";
   
});

dom.menuOpcoesPrincipal.style.display = "flex";
dom.menuOpcoesOutros.style.display = "none";

nav.btntrocaresquerda.addEventListener("click", event => {
    dom.menuOpcoesPrincipal.style.display = "none";
    dom.menuOpcoesOutros.style.display = "flex";

});

nav.btntrocarDireta.addEventListener("click", event => {
    dom.menuOpcoesPrincipal.style.display = "flex";
    dom.menuOpcoesOutros.style.display = "none";

});