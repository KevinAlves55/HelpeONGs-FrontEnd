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
const qtdMembros = document.getElementById("qtdaMembrosOng");
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
    let dadosSenhaEmail = JSON.parse(localStorage.getItem('emailSenha'));
    if (result != false) {
        const dadosDetalhes = {
            nome: nome.value,
            descricao: "",
            numeroDeSeguidores: 0,
            cnpj: "",
            banner: "",
            historia: "",
            foto: "",
            qtdDeMembros: "",
            dataDeFundacao: "",
            email: email.value,
            senha: dadosSenhaEmail.senha
           
        }
        console.log(dadosDetalhes);
        localStorage.setItem("detalhesConta", JSON.stringify(dadosDetalhes));
            
        const dadosDetalhesContatos = {
            celularData: celular.value,
            telefoneData: telefone.value
        };

        localStorage.setItem(
            "detalhesContatos",
            JSON.stringify(dadosDetalhesContatos)
        );


        const ongData = validarSession("dadosOng");

        const localStorageData = {
            ...JSON.parse(localStorage.getItem("detalhesConta")),
            ...JSON.parse(localStorage.getItem("detalhesContatos")),
            ong: ongData
        }

        const bodyOng = {
            "ong":{
                nome: localStorageData.nome,
                descricao: localStorageData.descricao,
                numeroDeSeguidores: localStorageData.numeroDeSeguidores,
                cnpj: localStorageData.cnpj,
                banner: localStorageData.banner,
                historia: localStorageData.historia,
                foto: localStorageData.foto,
                qtdDeMembros: Number(localStorageData.qtdDeMembros),
                dataDeFundacao: new Date(localStorageData.dataDeFundacao)
                
               
            },
            "login":{
                email: localStorageData.email,
                senha: localStorageData.senha

            }
        }

        const contactBody = {
            telefone: localStorageData.telefoneData,
            numero:  localStorageData.celularData,

        }


        const reqContato = await ApiRequest("PUT", `http://localhost:3131/contact/${localStorageData.ong.idLogin}`, contactBody);
        const reqOng = await ApiRequest("PUT", `http://localhost:3131/ong/${localStorageData.ong.idLogin}`, bodyOng);

        console.log(reqContato, reqOng);


    } else {
        console.log("erro nas validações");
    }
}


document.getElementById("formButton").addEventListener("click", dadosDetalhesConta);

document.getElementById("button-detalhes-conta-Atualizado").addEventListener("click", dadosDetalhesConta);




async function dadosDetalhesONG() {

    const validacoesDadosDetalhesONG = checkInputsDetalhesOng();

    let result;
    validacoesDadosDetalhesONG.map(status => {
        status === false ? result = false : "";
    });
    
    if (result != false) {
        const DadosdetalhesONGs = {
            descricaoData: descriacao.value,
            qtdaMembrosData: qtdMembros.value,
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
            ong: {
                descricao: localStorageDetalhes.descricaoData,
                qtdDeMembros: Number(localStorageDetalhes.qtdaMembrosData),
                dataDeFundacao: new Date(localStorageDetalhes.dataFundacaoData),
                historia: localStorageDetalhes.historiaData,
            }
        }
        console.log(`body: `, bodyDetalhes);

        const reqDetalhes = await ApiRequest("PUT", `http://localhost:3131/ong/${localStorageDetalhes.ong.idOng}`, bodyDetalhes);
        
        console.log(reqDetalhes);
    }

}
document.getElementById("button-detalhes-ONG").addEventListener("click", dadosDetalhesONG);



async function dadosDetalhesEndereco() {

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

        const ongEndereco = validarSession("dadosOng");

        const localStorageEndereco = {
            ...JSON.parse(localStorage.getItem("detalhesEndereco")),
            ong: ongEndereco
        }
        console.log(localStorageEndereco);

        const bodyEndereco = {
            idLogin: localStorageEndereco.ong.idLogin,
            cep: localStorageEndereco.cepData,
            bairro: localStorageEndereco.bairroData,
            numero: localStorageEndereco.numeroData,
            rua: localStorageEndereco.ruaData,
            municipio: localStorageEndereco.cidadeData, 
            estado: localStorageEndereco.estadoData,
            complemento: localStorageEndereco.complementoData,
           
          
        }

        const reqEndereco = await ApiRequest("POST", `http://localhost:3131/adress/`, bodyEndereco);
        
        console.log(reqEndereco);

    } else {
        console.log("error");
    }
}

async function dadosEnderecoAtualizado(){

    const validacoesDadosDetalhesEndereco = checkInputsDetalhesEndereco();

    console.log(validacoesDadosDetalhesEndereco);

    let result;
    validacoesDadosDetalhesEndereco.map(status => {
        status === false ? result = false : "";
    });
    
    if (result != false) {

        const dadosEnderecoAtualizado = {
            cepData: cep.value,
            estadoData: estado.value,
            cidadeData: cidade.value,
            bairroData: bairro.value,
            ruaData: endereco.value,
            numeroData: numero.value,
            complementoData: complemento.value
        }
        localStorage.setItem("detalhesEnderecoAtualizado", JSON.stringify(dadosEnderecoAtualizado));

        const ongEnderecoAtualizado = validarSession("dadosOng");

        const localStorageEnderecoAtualizado = {
            ...JSON.parse(localStorage.getItem("detalhesEnderecoAtualizado")),
            ong: ongEnderecoAtualizado
        }
        console.log(localStorageEnderecoAtualizado);

        const bodyEnderecoAtualizado = {
            idLogin: localStorageEnderecoAtualizado.ong.idLogin,
            cep: localStorageEnderecoAtualizado.cepData,
            bairro: localStorageEnderecoAtualizado.bairroData,
            numero: Number(localStorageEnderecoAtualizado.numeroData),
            rua: localStorageEnderecoAtualizado.ruaData,
            municipio: localStorageEnderecoAtualizado.cidadeData, 
            estado: localStorageEnderecoAtualizado.estadoData,
            complemento: localStorageEnderecoAtualizado.complementoData,
           
          
        }
        const reqEnderecoAtualizado = await ApiRequest("PUT", `http://localhost:3131/adress/${localStorageEnderecoAtualizado.ong.idOng}`, bodyEnderecoAtualizado);
        
        console.log(reqEnderecoAtualizado);

    }else {
        console.log("error");
    }

}
document.getElementById("button-detalhes-endereco-Atualizado").addEventListener("click",dadosEnderecoAtualizado);
document.getElementById("button-detalhes-endereco").addEventListener("click", dadosDetalhesEndereco);







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

//     let result;
//     validacoes.map(status => {
//         status === false ? result = false : "";
//     });
    
//     if (result != false) {

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

//  }

}
document.getElementById("button-patrocinios").addEventListener("click", dadosPatocinios);