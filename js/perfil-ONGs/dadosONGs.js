'use strict';

import ApiRequest from "../utils/ApiRequest.js";
import { hideLoading, showLoading } from "../utils/Loading.js";
import { validarSession } from "../utils/ValidatorSession.js";
import { imagemPreview, imagemPreviewBanner, imagemPreviewPerfil } from "./imagemPreview.js";
import { CarregarTodosSeguidores } from "./index.js";
import { MessageValidator, MessageValidatorClose } from "./MessageValidator.js";

let ongLogado;
let userLogado;
ongLogado = validarSession("dadosOng");

if (localStorage.hasOwnProperty('dadosUsuario') !== false) {
    
    ongLogado = JSON.parse(localStorage.getItem('idOng'));
    userLogado = validarSession("dadosUsuario");


} else {

    ongLogado = validarSession("dadosOng");

}

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

const limparElementos = elemento => {

    while(elemento.firstChild){
        elemento.removeChild(elemento.lastChild);
    }

}

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

    if (reqOng.status === 200) {
        
        MessageValidator("assets/img/success-icon.svg", "Dados atualizados com sucesso");
        window.location.reload();

    } else {
        
        MessageValidator("assets/img/error-icon.svg", "Erro ao atualizar dados");

    }
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

    if (reqOng.status === 200) {
        
        MessageValidator("assets/img/success-icon.svg", "Dados atualizados com sucesso");
    
    } else {

        MessageValidator("assets/img/error-icon.svg", "Erro ao atualizar dados");
    
    }

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

    const reqEndereco = await ApiRequest(
        "POST", 
        `http://localhost:3131/adress`, 
        bodyEndereco
    );

    if (reqEndereco.status === 200) {
        
        MessageValidator("assets/img/success-icon.svg", "Dados cadastradas com sucesso");

    } else {

        MessageValidator("assets/img/error-icon.svg", "Erro ao atualizar dados");
    
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

    if (reqEnderecoAtualizado.status === 200) {
       
        MessageValidator("assets/img/success-icon.svg", "Dados atualizados com sucesso");
    

    } else {

        MessageValidator("assets/img/error-icon.svg", "Erro ao atualizar dados");
    
    }

}

async function dadosContatos() {

    const contatos = {
        
        idLogin: dados.idLogin,
        numero: celular.value,
        telefone: telefone.value

    }

    let reqContatos = await ApiRequest(
        "POST", 
        `http://localhost:3131/contact`,
        contatos
    );

    if (reqContatos.status === 200) {

        MessageValidator("assets/img/success-icon.svg", "Dados cadastradas com sucesso");

    } else {
        
        MessageValidator("assets/img/error-icon.svg", "Erro ao cadastrar dados");

    }
}

async function dadosContatosAtualizados() {

    const contatos = {
        
        numero: celular.value,
        telefone: telefone.value

    }

    let reqContatosAtualizados = await ApiRequest(
        "PUT", 
        `http://localhost:3131/contact/${dados.idLogin}`,
        contatos
    );

    if (reqContatosAtualizados.status === 200) {
        
        MessageValidator("assets/img/success-icon.svg", "Dados atualizados com sucesso");

    } else {
            
        MessageValidator("assets/img/error-icon.svg", "Erro ao atualizar dados");
    
    }

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

    const dadosBank = {
        banco: banco.value,
        agencia: agencia.value,
        conta: conta.value,
        tipo: tipoSelecionado,
        idOng: dados.idOng
    }

    let reqMeiosDoacoes = await ApiRequest(
        "POST", 
        `http://localhost:3131/donation-data`, 
        dadosDonation
    );

    let reqBancario = await ApiRequest(
        "POST", 
        `http://localhost:3131/bank-data`, 
        dadosBank
    );

    if (reqMeiosDoacoes.status === 400 || reqBancario.status === 400) {
        
        MessageValidator("assets/img/error-icon.svg", "Erro ao cadastrar dados");

    } else {
        
        MessageValidator("assets/img/success-icon.svg", "Dados cadastrados com sucesso");

    }

}

async function dadosMeiosDoacoesAtualizado() {

    let tipoSelecionado = tipoConta.options[tipoConta.selectedIndex].value;
    const dadosDonation = {
        pix: pix.value,
        site: linkSite.value
    }

    const dadosBank = {
        banco: banco.value,
        agencia: agencia.value,
        conta: conta.value,
        tipo: tipoSelecionado,
    }

    let reqMeiosDoacoes = await ApiRequest(
        "PUT", 
        `http://localhost:3131/donation-data/${dados.idOng}`, 
        dadosDonation
    );
    
    let reqBancario = await ApiRequest(
        "PUT", 
        `http://localhost:3131/bank-data/${dados.idOng}`, 
        dadosBank
    );

    if (reqMeiosDoacoes.status === 400 || reqBancario.status === 400) {
        
        MessageValidator("assets/img/success-icon.svg", "Dados cadastrados com sucesso");

    } else {
        
        MessageValidator("assets/img/error-icon.svg", "Erro ao cadastrar dados");

    }

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
        site: sitePatrocinador.value
    }

    let req = await ApiRequest("POST", `http://localhost:3131/sponsor`, bodySponsor);

    if (req.status === 200) { 
        const idSponsor = req.data.idPatrocinadores;

        let reqSponsor = await ApiRequest("POST", `http://localhost:3131/sponsor/sponsoring`, {
            idPatrocinador: idSponsor,
            idOng: dados.idOng
        });

        if (reqSponsor.status === 200) {
            window.scroll(0, 0);
            window.location.reload();
        }

    } else { 
        alert("Erro ao cadastrar dados");
    }

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

    showLoading();
    let reqUpdateMedia = await ApiRequest("PUT", `http://localhost:3131/ong/media/${dados.idOng}`, imagensOng);

    if (reqUpdateMedia.status === 200) {
        window.location.reload();
        hideLoading();
    } else {
        alert("Erro ao atualizar imagens");
    }

}

const SeguirOng = async () => {

    const infoFollows = {
        idOng: Number(ongLogado.idOng),
        idUsuario: userLogado.idUsuario
    }

    let req = await ApiRequest(
        "POST",
        "http://localhost:3131/follower",
        infoFollows
    );

    if (req.status === 200) {
        
        limparElementos(document.querySelector("#seguindo"));
        CarregarTodosSeguidores();

    } else {
        alert("Erro ao seguir essa ONG!");
    }


}

document.getElementById("button-patrocinios").addEventListener("click", dadosPatocinios);
document.getElementById("button-detalhes-conta-Atualizado").addEventListener("click", dadosDetalhesConta);
document.getElementById("button-detalhes-ONG").addEventListener("click", dadosDetalhesONG);
document.getElementById("button-detalhes-endereco").addEventListener("click", dadosDetalhesEndereco);
document.getElementById("button-detalhes-endereco-Atualizado").addEventListener("click",dadosEnderecoAtualizado);
document.getElementById("cadastrarContatos").addEventListener("click", dadosContatos);
document.getElementById("atualizarContatos").addEventListener("click", dadosContatosAtualizados);
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
document.getElementById("seguir-ong").addEventListener("click", SeguirOng);
document.getElementById("fechar").addEventListener("click", MessageValidatorClose);