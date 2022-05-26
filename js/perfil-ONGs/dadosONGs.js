'use strict';

import ApiRequest from "../utils/ApiRequest.js";
import { validarSession } from "../utils/ValidatorSession.js";

let ongLogado;
ongLogado = validarSession("dadosOng");

let reqDados = await ApiRequest("GET", `http://localhost:3131/ong/${ongLogado.idOng}`);
let dados = reqDados.data;

let dadosSenhaEmail = JSON.parse(localStorage.getItem('emailSenha'));

// Objeto de captura das INPUTS
const nome = document.getElementById('nomeOng');
const email = document.getElementById("emailOng");
const cnpj = document.getElementById("cnpjOng");
const celular = document.getElementById("celularOng");
const telefone = document.getElementById("telefoneOng");
const descricao = document.getElementById("descriacaoOng");
const qtdMembros = document.getElementById("qtdaMembrosOng");
const dataFundacao = document.getElementById("fundacaoOng");
const historia = document.getElementById("historiaOng");
const cep = document.getElementById("cep");
const estado = document.getElementById("estado");
const cidade = document.getElementById("cidade");
const bairro = document.getElementById("bairro");
const rua = document.getElementById("endereco");
const numero = document.getElementById("numero");
const complemento = document.getElementById("complemento");
const linkSite = document.getElementById("linkSiteOng");
const pix = document.getElementById("pixOng");
const agencia = document.getElementById("agenciaOng");
const conta = document.getElementById("contaOng");
const tipoConta = document.getElementById("contaTipoOng");
const nomePatrocinador = document.getElementById("nomePatrocinadorOng");
const sitePatrocinador = document.getElementById("linkSitePatrocinador");

async function dadosDetalhesConta() {

    const bodyOng = {
        "ong": {
            nome: nome.value ?? dados.nome,
            cnpj: cnpj.value ?? dados.cnpj,
        },
        "login":{
            email: email.value ?? dadosSenhaEmail.email,
        }
    };

    const reqOng = await ApiRequest(
        "PUT", 
        `http://localhost:3131/ong/${dados.idOng}`, 
        bodyOng
    );
}

async function dadosDetalhesONG() {

    const bodyOng = {
        "ong": {
            descricao: descricao.value ?? dados.descriacao,
            qtdDeMembros: Number(qtdMembros.value) ?? dados.qtdDeMembros,
            dataDeFundacao: new Date(dataFundacao.value) ?? new Date(dados.dataDeFundacao),
            historia: historia.value ?? dados.historia
        }
    };

    const reqOng = await ApiRequest(
        "PUT", 
        `http://localhost:3131/ong/${dados.idOng}`, 
        bodyOng
    );
    console.log(reqOng);

}

async function dadosDetalhesEndereco() {

    console.log(cep.value);

    const bodyEndereco = {
        idLogin: dados.idLogin,
        cep: cep.value,
        bairro: bairro.value,
        numero: Number(numero.value),
        rua: rua.value,
        municipio: cidade.value, 
        estado: estado.value,
        complemento: complemento.value,
    }
    console.log(bodyEndereco);

    const reqEndereco = await ApiRequest(
        "POST", 
        `http://localhost:3131/adress`, 
        bodyEndereco
    );

    if (reqEndereco.status === 400) {
        alert("Endereço já cadastrado");
    } else {
        alert("Endereço cadastrado com sucesso");
    }
}

async function dadosEnderecoAtualizado(){

    const bodyEnderecoAtualizado = {
        cep: cep.value,
        bairro: bairro.value,
        numero: Number(numero.value),
        rua: rua.value,
        municipio: cidade.value, 
        estado: estado.value,
        complemento: complemento.value,
    }
    const reqEnderecoAtualizado = await ApiRequest(
        "PUT", 
        `http://localhost:3131/adress/${dados.idLogin}`, 
        bodyEnderecoAtualizado
    );
    
    console.log(reqEnderecoAtualizado);

}

async function dadosMeiosDoacoes() {

    const dadosMeiosDoacoes = {
        siteData: linkSite.value,
        pixData: pix.value
    }
    localStorage.setItem("MeiosDoacoes", JSON.stringify(dadosMeiosDoacoes)); 
    
    const dadosBancarios = {
        agenciaData: agencia.value,
        contaData: conta.value,
        tipoContaData: tipoConta.value
    }
    localStorage.setItem("Bancario", JSON.stringify(dadosBancarios)); 

    const ongMeiosDoacoes = validarSession("dadosOng");

    const localStorageMeiosDoacoes = {
        ...JSON.parse(localStorage.getItem("MeiosDoacoes")),
        ...JSON.parse(localStorage.getItem("Bancario")),
        ong: ongMeiosDoacoes
    }
    console.log(`Dados de agora`, localStorageMeiosDoacoes);

    const bodyMeiosDoacoes = {
        site: localStorageMeiosDoacoes.siteData,
        pix: localStorageMeiosDoacoes.pixData,
    }

    const bodyBancario = {
        agencia: localStorageMeiosDoacoes.agenciaData,
        conta: localStorageMeiosDoacoes.contoData,
        tipoConta: localStorageMeiosDoacoes.tipoContaData,
    }

    const reqMeiosDoacoes = await ApiRequest("PUT", `http://localhost:3131/donation-data/${localStorageMeiosDoacoes.ong.idOng}`, bodyMeiosDoacoes);
    const reqBancario = await ApiRequest("PUT", `http://localhost:3131/bank-data/${localStorageMeiosDoacoes.ong.idOng}`, bodyBancario);
        
    console.log(reqMeiosDoacoes, reqBancario);

}
document.getElementById("button-meiosDoacoes").addEventListener("click", dadosMeiosDoacoes);

async function dadosPatocinios() {

    const dadosPatrocinios = {
        patrocinadorData: nomePatrocinador.value,
        sitePatrocinadorData: sitePatrocinador.value
    }
    localStorage.setItem("Patrocinios", JSON.stringify(dadosPatrocinios)); 

    const ongPatrocinios = validarSession("dadosOng");

    const localStoragePatrocinios = {
        ...JSON.parse(localStorage.getItem("Patrocinios")),
        ong: ongPatrocinios
    }
    console.log(localStoragePatrocinios);

    const bodyPatrocinador = {
        nome: localStoragePatrocinios.patrocinadorData,
        link: localStoragePatrocinios.sitePatrocinadorData,
    }

    const reqPatrocinios = await ApiRequest("PUT", `http://localhost:3131/sponsor/${localStoragePatrocinios.ong.idOng}`, bodyPatrocinador);

    console.log(reqPatrocinios);

}
document.getElementById("button-patrocinios").addEventListener("click", dadosPatocinios);

document.getElementById("button-detalhes-conta-Atualizado").addEventListener("click", dadosDetalhesConta);
document.getElementById("button-detalhes-ONG").addEventListener("click", dadosDetalhesONG);
document.getElementById("button-detalhes-endereco").addEventListener("click", dadosDetalhesEndereco);
document.getElementById("button-detalhes-endereco-Atualizado").addEventListener("click",dadosEnderecoAtualizado);