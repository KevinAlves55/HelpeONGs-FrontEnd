'use strict'

function dadosDetalhes() {

    const dadosDetalhes = {
        nome: document.getElementById('name').value,
        email: document.getElementById('mail').value,
        cpnj: document.getElementById('cnpj-input').value
    }
    localStorage.setItem("detalhesConta", JSON.stringify(dadosDetalhes));
}

document.getElementById("formButton").addEventListener("click", dadosDetalhes)