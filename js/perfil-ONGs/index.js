'use strict'

function dadosDetalhesConta() {

    const dadosDetalhes = {
        nome: document.getElementById('name').value,
        email: document.getElementById('mail').value,
        cpnj: document.getElementById('cnpj-input').value
    }
    localStorage.setItem("detalhesConta", JSON.stringify(dadosDetalhes));

    const dadosDetalhesTefones = {
        telefone: document.getElementById('tel').value,
        celular: document.getElementById('cel').value
    }
    localStorage.setItem("detalhesCelular", JSON.stringify(dadosDetalhesTefones));
}



document.getElementById("formButton").addEventListener("click", dadosDetalhesConta);


function dadosDetalhesONG() {

    const detalhesONGs = {
        descricao: document.getElementById('descriacao-input').value,
        quantidaMembro: document.getElementById('quantidade-input').value,
        dataFundacao: document.getElementById('data-input').value,
        historia: document.getElementById('historia-input').value
    }
    localStorage.setItem("detalhesONGs", JSON.stringify(detalhesONGs));

    const dadosDetalhesCategorias = {
        categorias: document.getElementById('categoria-input').value
    }
    localStorage.setItem("detalhescategorias", JSON.stringify(dadosDetalhesCategorias));
}
document.getElementById("button-detalhes-ONG").addEventListener("click", dadosDetalhesONG);

function dadosDetalhesEndereco() {

    const detalhesEndereco = {
        cep: document.getElementById('cep-input').value,
        estado: document.getElementById('estado-input').value,
        cidade: document.getElementById('cidade-input').value,
        bairro: document.getElementById('bairro-input').value,
        rua: document.getElementById('rua-input').value,
        numero: document.getElementById('numero-input').value,
        complemento: document.getElementById('complemento-input').value

    }
    localStorage.setItem("detalhesEndereco", JSON.stringify(detalhesEndereco)); 
}

document.getElementById("button-detalhes-endereco").addEventListener("click", dadosDetalhesEndereco);

function dadosMeiosDoacoes() {

    const meiosDoacoes = {
        site: document.getElementById('site-input').value,
        pix: document.getElementById('pix-input').value
        

    }
    localStorage.setItem("MeiosDoacoes", JSON.stringify(meiosDoacoes)); 

    const detalhesMeiosDoacoes = {
        agencia: document.getElementById('agencia-input').value,
        conta: document.getElementById('conta-input').value,
        tipoConta: document.getElementById('contas-select').value
    }
    localStorage.setItem("detalhesMeiosDoacoes", JSON.stringify(detalhesMeiosDoacoes)); 
}

document.getElementById("button-meiosDoacoes").addEventListener("click", dadosMeiosDoacoes);

function dadosPatocinios() {

    const patrocinios = {
        patrocinador: document.getElementById('patrocinador-input').value,
        link: document.getElementById('link-patrocinios-input').value
        

    }
    localStorage.setItem("Patrocinios", JSON.stringify(patrocinios)); 

}

document.getElementById("button-patrocinios").addEventListener("click", dadosPatocinios);





