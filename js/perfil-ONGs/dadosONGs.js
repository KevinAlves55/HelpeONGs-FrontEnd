'use strict';

import ApiRequest from "../utils/ApiRequest.js";
import { validarSession } from "../utils/ValidatorSession.js";
import { imagemPreview, imagemPreviewBanner, imagemPreviewPerfil } from "./imagemPreview.js";

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
const banco = document.getElementById("bancoOng");
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

async function dadosEnderecoAtualizado() {

    const url = cep.value
    const enderecos = await getEstados(url);

    const bodyEnderecoAtualizado = {
        cep: cep.value,
        bairro: bairro.value,
        numero: Number(numero.value),
        rua: rua.value,
        municipio: cidade.value, 
        estado: enderecos.uf,
        complemento: complemento.value,
    }

    let reqEnderecoAtualizado = await ApiRequest(
        "PUT", 
        `http://localhost:3131/adress/${dados.idLogin}`, 
        bodyEnderecoAtualizado
    );

}

const getEstados = async (cep) => {

    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const dados = await fetch(url);
    const endereco = await dados.json();
    return endereco;

}

async function dadosMeiosDoacoes() {

    let tipoSelecionado = tipoConta.options[tipoConta.selectedIndex].value;

    const dadosDonation = {
        idOng: dados.idOng,
        pix: pix.value,
        site: linkSite.value
    }
    console.log(`DadosDonation`, dadosDonation);

    const dadosBank = {
        banco: banco.value,
        agencia: agencia.value,
        conta: conta.value,
        tipo: tipoSelecionado,
        idOng: dados.idOng
    }
    console.log(`DadosBanck`, dadosBank);

    let reqMeiosDoacoes = await ApiRequest(
        "POST", 
        `http://localhost:3131/donation-data`, 
        dadosDonation
    );
    console.log(`ReqDonation`, reqMeiosDoacoes);

    let reqBancario = await ApiRequest(
        "POST", 
        `http://localhost:3131/bank-data`, 
        dadosBank
    );
    console.log(`reqBanck`, reqBancario);

}

async function dadosMeiosDoacoesAtualizado() {

    let tipoSelecionado = tipoConta.options[tipoConta.selectedIndex].value;
    const dadosDonation = {
        pix: pix.value,
        site: linkSite.value
    }
    console.log(`DadosDonation`, dadosDonation);
    const dadosBank = {
        banco: banco.value,
        agencia: agencia.value,
        conta: conta.value,
        tipo: tipoSelecionado,
    }
    console.log(`DadosBanck`, dadosBank);

    let reqMeiosDoacoes = await ApiRequest(
        "PUT", 
        `http://localhost:3131/donation-data/${dados.idOng}`, 
        dadosDonation
    );
    console.log(`ReqDonation`, reqMeiosDoacoes);
    
    let reqBancario = await ApiRequest(
        "PUT", 
        `http://localhost:3131/bank-data/${dados.idOng}`, 
        dadosBank
    );
    console.log(`reqBanck`, reqBancario);

}

let mediaSponsor = [];
async function handleFileSelectSponsor(evento) {

    // Objeto FileList guarda todos os arquivos.
    var files = evento.target.files;

    if (files.length <= 3) {
        // PERCORRE O OBJETO E CRIA UM ARRAY DE OBJETOS DENTRO DELE
        for (var i = 0, f; f = files[i]; i++) {
            
            const reader = new FileReader();
            let infoArquivo = f;
            
            reader.addEventListener(
                "load",
                () => {
                    const dadosReader = reader.result;
                    let base64 = dadosReader.replace(/^data:image\/[a-z]+;base64,/, "");

                    mediaSponsor.push(
                        {
                            "fileName": infoArquivo.name,
                            "base64": base64,
                            "type": infoArquivo.type
                        }
                    );
                },
                false
            );

            if (f) {
                reader.readAsDataURL(f);;
            }
        }

    } else {
        alert("Máximo de arquivos permitidos é 3");
    }
}

let mediaProfile = [];
async function handleFileSelectProfile(evento) {

    // Objeto FileList guarda todos os arquivos.
    var files = evento.target.files;

    if (files.length <= 3) {
        // PERCORRE O OBJETO E CRIA UM ARRAY DE OBJETOS DENTRO DELE
        for (var i = 0, f; f = files[i]; i++) {
            
            const reader = new FileReader();
            let infoArquivo = f;
            
            reader.addEventListener(
                "load",
                () => {
                    const dadosReader = reader.result;
                    let base64 = dadosReader.replace(/^data:image\/[a-z]+;base64,/, "");

                    mediaProfile.push(
                        {
                            "fileName": infoArquivo.name,
                            "base64": base64,
                            "type": infoArquivo.type
                        }
                    );
                },
                false
            );

            if (f) {
                reader.readAsDataURL(f);
            }
        }

    } else {
        alert("Máximo de arquivos permitidos é 3");
    }
}

let mediaBanner = [];
async function handleFileSelectBanner(evento) {

    // Objeto FileList guarda todos os arquivos.
    var files = evento.target.files;

    if (files.length <= 3) {
        // PERCORRE O OBJETO E CRIA UM ARRAY DE OBJETOS DENTRO DELE
        for (var i = 0, f; f = files[i]; i++) {
            
            const reader = new FileReader();
            let infoArquivo = f;
            
            reader.addEventListener(
                "load",
                () => {
                    const dadosReader = reader.result;
                    let base64 = dadosReader.replace(/^data:image\/[a-z]+;base64,/, "");

                    mediaBanner.push(
                        {
                            "fileName": infoArquivo.name,
                            "base64": base64,
                            "type": infoArquivo.type
                        }
                    );
                },
                false
            );

            if (f) {
                reader.readAsDataURL(f);
            }
        }

    } else {
        alert("Máximo de arquivos permitidos é 3");
    }
}

async function dadosPatocinios() {

    const imagemSponsor = mediaSponsor;
    console.log(imagemSponsor);

    const bodySponsor = {
        nome: nomePatrocinador.value,
        media: imagemSponsor,
        link: sitePatrocinador.value
    }
    console.log(`Sponsor`, bodySponsor);

}

async function atualizarImagensPerfil() {

    const foto = mediaProfile;
    const banner = mediaBanner;

    const imagensOng = {
        "foto": [
            foto[0]
        ],
        "banner": [
            banner[0]
        ]
    };

    console.log(imagensOng.foto);

    let reqUpdateMedia = await ApiRequest("PUT", `http://localhost:3131/ong/media/${dados.idOng}`, imagensOng);
    console.log(reqUpdateMedia);

    if (reqUpdateMedia.status === 200) {
        alert("Imagens atualizadas com sucesso!");
        window.location.reload();
    } else {
        alert("Erro ao atualizar imagens");
    }

}

document.getElementById("button-patrocinios").addEventListener("click", dadosPatocinios);
document.getElementById("button-detalhes-conta-Atualizado").addEventListener("click", dadosDetalhesConta);
document.getElementById("button-detalhes-ONG").addEventListener("click", dadosDetalhesONG);
document.getElementById("button-detalhes-endereco").addEventListener("click", dadosDetalhesEndereco);
document.getElementById("button-detalhes-endereco-Atualizado").addEventListener("click",dadosEnderecoAtualizado);
document.getElementById("button-meiosDoacoes").addEventListener("click", dadosMeiosDoacoes);
document.getElementById("button-meiosDoacoes-atualizar").addEventListener("click", dadosMeiosDoacoesAtualizado);
document.getElementById("fileSponsor").addEventListener("change", handleFileSelectSponsor, false);
document.getElementById("fileSponsor").addEventListener('change', imagemPreview);
document.getElementById("button-patrocinios").addEventListener("click", dadosPatocinios);
document.getElementById("filePerfil").addEventListener("change", handleFileSelectProfile, false);
document.getElementById("fileBanner").addEventListener("change", handleFileSelectBanner, false);
document.getElementById("filePerfil").addEventListener("change", imagemPreviewPerfil);
document.getElementById("fileBanner").addEventListener("change", imagemPreviewBanner);
document.getElementById("botaoModalEditar").addEventListener("click", atualizarImagensPerfil);
