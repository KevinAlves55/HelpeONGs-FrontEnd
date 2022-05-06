'use strict'
import { validarSession } from "../utils/ValidatorSession.js";
import ApiRequest from "../utils/ApiRequest.js";


// Objeto de captura das INPUTS
const nome = document.getElementById('name');
const email = document.getElementById("mail");
const data = document.getElementById("date");
const celular = document.getElementById("cel");
const telefone = document.getElementById("tel");
const cep = document.getElementById("cepEndereco");
const estado = document.getElementById('estadoEndereco');
const cidade = document.getElementById('cidadeEndereco');
const bairro = document.getElementById('bairroEndereco');
const endereco = document.getElementById('endereco');
const numero = document.getElementById('numeroEndereco');
const complemento = document.getElementById('complementoEndereco');


async function dadosDetalhesConta() {

    const dadosDetalhes = {
        nomeData: nome.value,
        emailData: email.value
    }

    localStorage.setItem("detalhesConta", JSON.stringify(dadosDetalhes));

    const dadosDetalhesContatos = {
        dadaData: data.value,
        celularData: celular.value,
        telefoneData: telefone.value
    }
    localStorage.setItem("detalhesContatos", JSON.stringify(dadosDetalhesContatos));

    



    const userData = validarSession("dadosUsuario");

    const localStorageData = {
        ...JSON.parse(localStorage.getItem("detalhesContatos")),
        ...JSON.parse(localStorage.getItem("detalhesConta")),
        user: userData
    }
    console.log(localStorageData);

    const bodyUser = {
        nome: localStorageData.nomeData,
        email: localStorage.emailData,
        celular: localStorage.celularData,
    }

    const bodyContato = {
        email: localStorageData.emailData,
        telefone: localStorageData.telefoneData,
        numero: localStorageData.celularData,
    }

    
    const reqContato = await ApiRequest("PUT", `http://localhost:3131/contact/${localStorageData.user.idUsuario}`, bodyContato);
    const reqUser = await ApiRequest("PUT", `http://localhost:3131/user/${localStorageData.user.idUsuario}`, bodyUser);

    console.log(reqContato, reqUser);
     
}
document.getElementById("formButton").addEventListener("click", dadosDetalhesConta);


async function dadosDetalhesEndereco() {

    const dadosDetalhesEndereco = {
        cepData: cep.value,
        estadoData: estado.value,
        cidadeData: cidade.value,
        bairroData: bairro.value,
        ruaData: endereco.value,
        numeroData: numero.value,
        complementoData: complemento.value
    }
    localStorage.setItem("detalhesEndereco", JSON.stringify(dadosDetalhesEndereco)); 

    const userData = validarSession("dadosUsuario");

    const localStorageData = {
        ...JSON.parse(localStorage.getItem("detalhesContatos")),
        ...JSON.parse(localStorage.getItem("detalhesConta")),
        user: userData
    }
    console.log(localStorageData);

    const bodyUser = {
        nome: localStorageData.nomeData,
        email: localStorage.emailData,
        celular: localStorage.celularData,
    }

    const bodyContato = {
        email: localStorageData.emailData,
        telefone: localStorageData.telefoneData,
        numero: localStorageData.celularData,
    }

    const endereco = await ApiRequest("GET", `http://localhost:3131/favorite/5/1`, dadosDetalhesEndereco);
    const reqContato = await ApiRequest("PUT", `http://localhost:3131/contact/${localStorageData.user.idUsuario}`, bodyContato);
    const reqUser = await ApiRequest("PUT", `http://localhost:3131/user/${localStorageData.user.idUsuario}`, bodyUser);

    console.log(reqContato, reqUser);
}

document.getElementById("buttonEnderecos").addEventListener("click", dadosDetalhesEndereco);






// function dadosDetalhesConta() {

//     const dadosDetalhes = {
//         nome: document.getElementById('name').value,
//         email: document.getElementById('mail').value,
//     }
//     localStorage.setItem("dadosDetalhes", JSON.stringify(dadosDetalhes));

//     const dadosDetalhesUsuario = {
//         data: document.getElementById('date').value,
//         celular: document.getElementById('cel').value,
//         telefone: document.getElementById('tel').value,
//     }
//     localStorage.setItem("dadosDetalhesUsuario", JSON.stringify(dadosDetalhesUsuario));
// }


// // ENVIANDO ENDEREÇO LOCALSTORAGE

// function DetalhesEnderecos() {

//     const dadosDetalhesEnderecos = {
//         cep: document.getElementById('cepEndereco').value,
//         estado: document.getElementById('estadoEndereco').value,
//         cidade: document.getElementById('cidadeEndereco').value,
//         bairro: document.getElementById('bairroEndereco').value,
//         rua: document.getElementById('endereco').value,
//         numero: document.getElementById('numeroEndereco').value,
//         complemento: document.getElementById('complementoEndereco').value,
//     }
//     localStorage.setItem("dadosDetalhesEnderecos", JSON.stringify(dadosDetalhesEnderecos));

// }







// document.getElementById("formButton").addEventListener("click", dadosDetalhesConta);
// document.getElementById("buttonEnderecos").addEventListener("click", DetalhesEnderecos);


