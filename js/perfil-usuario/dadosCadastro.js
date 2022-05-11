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

    const userEndereco = validarSession("dadosUsuario");

    const localStorageEndereco = {
        ...JSON.parse(localStorage.getItem("detalhesEndereco")),
        user: userEndereco
    }
    console.log(localStorageEndereco);

    const bodyEndereco = {
        idLogin: localStorageEndereco.user.idLogin,
        cep: localStorageEndereco.cepData,
        bairro: localStorageEndereco.bairroData,
        numero: localStorageEndereco.numeroData,
        rua: localStorageEndereco.ruaData,
        municipio: localStorageEndereco.cidadeData, 
        estado: localStorageEndereco.estadoData,
        complemento: localStorageEndereco.complementoData
    }

    

    console.log("corp", bodyEndereco);

    const reqEndereco = await ApiRequest("POST", `http://localhost:3131/adress/`, bodyEndereco);

    

    console.log(reqEndereco, );

    
}
document.getElementById("buttonEnderecos").addEventListener("click", dadosDetalhesEndereco);

async function atualizarEndereco(){
    const atualizarDadosDetalhesEndereco = {
        cepData: cep.value,
        estadoData: estado.value,
        cidadeData: cidade.value,
        bairroData: bairro.value,
        ruaData: endereco.value,
        numeroData: numero.value,
        complementoData: complemento.value
    }
    localStorage.setItem("atualizarEndereco", JSON.stringify(atualizarDadosDetalhesEndereco)); 

    const userEndereco = validarSession("dadosUsuario");

    const localStorageEnderecoAtualizado = {
        ...JSON.parse(localStorage.getItem("atualizarEndereco")),
        user: userEndereco
    }
    console.log(localStorageEnderecoAtualizado);

    const atualizarEndereco = {
        cep: localStorageEnderecoAtualizado.cepData,
        bairro: localStorageEnderecoAtualizado.bairroData,
        numero: localStorageEnderecoAtualizado.numeroData,
        rua: localStorageEnderecoAtualizado.ruaData,
        municipio: localStorageEnderecoAtualizado.cidadeData, 
        estado: localStorageEnderecoAtualizado.estadoData,
        complemento: localStorageAtualizarEndereco.complementoData,
    }

    console.log("atualizado", atualizarEndereco);

    const reqAtualizarEndereco = await ApiRequest("PUT", `http://localhost:3131//adress/${localStorageEnderecoAtualizado.user.idUsuario}`, atualizarEndereco);
    

    console.log(reqAtualizarEndereco, );


}
document.getElementById("atualizarEnderecos").addEventListener("click", atualizarEndereco);







