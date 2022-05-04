'use strict';

import { 
checkInputsDetalhesConta, 
checkInputsDetalhesOng,
checkInputsDetalhesEndereco,
errorValidation 
} from "../validator/validatorPerfilONG.js";
import ApiRequest from "../utils/ApiRequest.js";
import { validarSession } from "../utils/ValidatorSession.js";

// Objeto de captura das INPUTS
const nome = document.getElementById('nomeOng');
const email = document.getElementById("emailOng");
const cnpj = document.getElementById("cnpjOng");
const celular = document.getElementById("celularOng");
const telefone = document.getElementById("telefoneOng");
const descriacao = document.getElementById("descriacaoOng");
const qtdaMembros = document.getElementById("qtdaMembrosOng");
const dataFundacao = document.getElementById("fundacaoOng");
const historia = document.getElementById("historiaOng");
const cep = document.getElementById("cep");
const estado = document.getElementById("estado");
const cidade = document.getElementById("cidade");
const bairro = document.getElementById("bairro");
const endereco = document.getElementById("endereco");
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

    const validacoesDadosDetalhesConta = checkInputsDetalhesConta();

    let result;
    validacoesDadosDetalhesConta.map(status => {
        status === false ? result = false : "";
    });
    
    if (result != false) {
        const dadosDetalhes = {
            nomeData: nome.value,
            cnpjData: cnpj.value
        }
        console.log(dadosDetalhes);
        localStorage.setItem("detalhesConta", JSON.stringify(dadosDetalhes));
    
        const dadosDetalhesContatos = {
            emailData: email.value,
            celularData: celular.value,
            telefoneData: telefone.value
        }
        localStorage.setItem("detalhesContatos", JSON.stringify(dadosDetalhesContatos));

        const ongData = validarSession("dadosOng");

        const localStorageData = {
            ...JSON.parse(localStorage.getItem("detalhesContatos")),
            ...JSON.parse(localStorage.getItem("detalhesConta")),
            ong: ongData
        }
        console.log(localStorageData);

        const bodyOng = {
            nome: localStorageData.nomeData,
            email: localStorage.emailData,
            celular: localStorage.celularData,
        }

        const bodyContato = {
            email: localStorageData.emailData,
            telefone: localStorageData.telefoneData,
            numero: localStorageData.celularData,
        }

        const reqContato = await ApiRequest("PUT", `http://localhost:3131/contact/${localStorageData.ong.idOng}`, bodyContato);
        const reqOng = await ApiRequest("PUT", `http://localhost:3131/ong/${localStorageData.ong.idOng}`, bodyOng);

        console.log(reqContato, reqOng);

    } else {
        console.log("erro nas validações");
    }
}


document.getElementById("formButton").addEventListener("click", dadosDetalhesConta);




async function dadosDetalhesONG() {

    const validacoesDadosDetalhesONG = checkInputsDetalhesOng();

    let result;
    validacoesDadosDetalhesONG.map(status => {
        status === false ? result = false : "";
    });
    
    if (result != false) {
        const DadosdetalhesONGs = {
            descricaoData: descriacao.value,
            qtdaMembrosData: qtdaMembros.value,
            dataFundacaoData: dataFundacao.value,
            historiaData: historia.value
        }
        localStorage.setItem("detalhesONGs", JSON.stringify(DadosdetalhesONGs));

        const ongDetalhes = validarSession("dadosOng");

        const localStorageDetalhes = {
            ...JSON.parse(localStorage.getItem("detalhesONGs")),
            ong: ongDetalhes
        }
        console.log(localStorageDetalhes);

        const bodyDetalhes = {
            descricao: localStorageDetalhes.descricaoData,
            qtdaMembros: localStorageDetalhes.qtdaMebrosData,
            dataFundacao: localStorageDetalhes.dataFundacaoData,
            historia: localStorageDetalhes.historiaData,
        }

        const reqDetalhes = await ApiRequest("PUT", `http://localhost:3131/ong/${localStorageDetalhes.ong.idOng}`, bodyDetalhes);
        
        console.log(reqDetalhes);
    }

}
document.getElementById("button-detalhes-ONG").addEventListener("click", dadosDetalhesONG);

function dadosDetalhesEndereco() {

    const validacoesDadosDetalhesEndereco = checkInputsDetalhesEndereco();

    console.log(validacoesDadosDetalhesEndereco);

    let result;
    validacoesDadosDetalhesEndereco.map(status => {
        status === false ? result = false : "";
    });
    
    if (result != false) {

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

    } else {
        console.log("error");
    }
}
document.getElementById("button-detalhes-endereco").addEventListener("click", dadosDetalhesEndereco);


function dadosMeiosDoacoes() {

    const validacoesDadosMeiosDoacoes = checkInputsDadosMeiosDoacoes();

    let result;
    validacoesDadosMeiosDoacoes.map(status => {
        status === false ? result = false : "";
    });
    
    if (result != false) {

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

    }
}
document.getElementById("button-meiosDoacoes").addEventListener("click", dadosMeiosDoacoes);


// function dadosPatocinios() {

//     let result;
//     validacoes.map(status => {
//         status === false ? result = false : "";
//     });
    
//     if (result != false) {

//         const dadosPatrocinios = {
//             patrocinadorData: nomePatrocinador.value,
//             sitePatrocinadorData: sitePatrocinador.value
//         }
//         localStorage.setItem("Patrocinios", JSON.stringify(dadosPatrocinios)); 

//     }

// }
// document.getElementById("button-patrocinios").addEventListener("click", dadosPatocinios);