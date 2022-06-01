'use strict'
import { validarSession } from "../utils/ValidatorSession.js";
import ApiRequest from "../utils/ApiRequest.js";
import { getFormattedDate } from "../utils/DataFormat.js";

let userLogado;
userLogado = validarSession("dadosUsuario");

let dadosSenhaEmail = JSON.parse(localStorage.getItem('emailSenha'));


let req = await ApiRequest("GET", `http://localhost:3131/user/${userLogado.idUsuario}`);

const dados = req.data;

let reqEndereco = await ApiRequest("GET", `http://localhost:3131/adress/${userLogado.idUsuario}`);
let enderecos = reqEndereco.data;


let reqContatos = await ApiRequest("GET", `http://localhost:3131/contact/${userLogado.idLogin}`);
const contato = reqContatos.data;

// Objeto de captura das INPUTS
const previewPerfil = document.querySelector(".previewPerfil");
const previewBanner = document.querySelector(".previewBanner");
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
const senhaDigitada = document.getElementById('senhaAtual');
const senhaNova = document.getElementById('novaSenha');
const senhaConfirmada = document.getElementById('confirmarSenha');

function CarregarPerfil(objectLocal) {

    let nomeLogado = document.getElementById("mini-perfil-nome");
    let fotoLogado = document.getElementById("mini-perfil-foto");
    let nomePerfil = document.getElementById("perfil-nome");
    let fotoPerfil = document.getElementById("perfil-foto");
    let bannerPerfil = document.getElementById("perfil-banner");

    // mini nome perfil
    if (objectLocal.nome === null || objectLocal.nome === undefined) {
        nomeLogado.innerHTML = `<a href="login.html">Login</a>  / <a href="cadastroUsuario.html">Cadastrar</a>`;
    } else {
        nomeLogado.innerHTML = `${objectLocal.nome}`;
    }

    // mini foto perfil
    if (objectLocal.foto === null || objectLocal.foto === undefined) {
        fotoLogado.setAttribute("src", "../../assets/img/sem-foto.png");
    } else if (!objectLocal.foto.includes(".jpg") && !objectLocal.foto.includes(".jpeg") && !objectLocal.foto.includes(".png") && !objectLocal.foto.includes(".svg")) {
        fotoLogado.setAttribute("src", `../../assets/img/sem-foto.png`)
    } else {
        fotoLogado.setAttribute("src", `${objectLocal.foto}`);
    }

    // nome perfil
    if (objectLocal.nome === null || objectLocal.nome === undefined) {
        nomePerfil.innerHTML = `<a href="login.html">Login</a>  / <a href="cadastroUsuario.html">Cadastrar</a>`;
    } else {
        nomePerfil.innerHTML = `${objectLocal.nome}`;
    }

    // foto perfil
    if (objectLocal.foto === null || objectLocal.foto === undefined) {
        fotoPerfil.setAttribute("src", "../../assets/img/sem-foto.png");
    } else if (!objectLocal.foto.includes(".jpg") && !objectLocal.foto.includes(".jpeg") && !objectLocal.foto.includes(".png") && !objectLocal.foto.includes(".svg")) {
        fotoPerfil.setAttribute("src", `../../assets/img/sem-foto.png`)
    } else {
        fotoPerfil.setAttribute("src", `${objectLocal.foto}`);
    }

    // banner perfil
    if (objectLocal.banner === null || objectLocal.banner === undefined) {
        bannerPerfil.setAttribute("src", "../../assets/img/banner-vazio.png");
    } else if (!objectLocal.banner.includes(".jpg") && !objectLocal.banner.includes(".jpeg") && !objectLocal.banner.includes(".png") && !objectLocal.banner.includes(".svg") && !objectLocal.banner.includes(".git")) {
        bannerPerfil.setAttribute("src", `../../assets/img/banner-vazio.png`)
    } else {
        bannerPerfil.setAttribute("src", `${objectLocal.banner}`);
    }
     //SEGUIDORES
     if (objectLocal.numeroDeSeguidores === null || objectLocal.numeroDeSeguidores === undefined) {
        qtdaSeguidores.innerHTML = `0`;
    } else {
        qtdaSeguidores.innerHTML = `${objectLocal.numeroDeSeguidores} seguidores`;
    }

}
CarregarPerfil(dados);

document.getElementById("sair").addEventListener("click", () => {
    localStorage.clear();
    Redirect("loginUsuario");
});

function customFormatter(date) {
    return date.replace("/", "-");
}

async function dadosDetalhesConta() {

    let dadosSenhaEmail = JSON.parse(localStorage.getItem('emailSenha'));  

    const dataFormatada = customFormatter(data.value);

    const userData = validarSession("dadosUsuario");
    console.log(`ESSES DADOS SÃO DA SESSÃO`, userData);

    const dadosUpdatePerfil = {
        nome: nome.value,
        banner: "",
        curriculo: "",
        foto: "",
        dataDeNascimento: dataFormatada,
        email: email.value,
        senha: dadosSenhaEmail.emailSenha
    }
    
    localStorage.setItem("atualizarPerfilConta", JSON.stringify(dadosUpdatePerfil));
    let dadosUserUpdate = JSON.parse(localStorage.getItem('atualizarPerfilConta'));

    const body = {
        "usuario": {
           nome: dadosUserUpdate.nome,
           banner: dadosUserUpdate.banner,
           curriculo: dadosUserUpdate.curriculo,
           foto: dadosUserUpdate.foto,
           dataDeNascimento: new Date(dadosUserUpdate.dataDeNascimento)
        },
        "login": {
            email: dadosUserUpdate.email,
            senha: dadosUserUpdate.senha
        }
    }
  
    let reqUser = await ApiRequest(
        "PUT", 
        `http://localhost:3131/user/${userData.idUsuario}`, 
        body
    );

    console.log(`REQ`, reqUser);
    alert("DADOS ATUALIZADO COM SUCESSO")
     
}
document.getElementById("formButton").addEventListener("click", dadosDetalhesConta);

async function contatosUsuario(){
        const userDataContato = validarSession("dadosUsuario");
        console.log(`ESSES DADOS SÃO DA SESSÃO`, userDataContato);

        const contatoUsuario = {
            celular : celular.value,
            telefone : telefone.value,
        }

        localStorage.setItem("enviarContato", JSON.stringify(contatoUsuario));
        let contatosUserUpdate = JSON.parse(localStorage.getItem('enviarContato'));

        const contatos = {
            idLogin: userDataContato.idLogin,
            numero: contatosUserUpdate.celular,
            telefone: contatosUserUpdate.telefone
        }
        
        console.log(contatos);
        let reqUser = await ApiRequest(
            "POST",`http://localhost:3131/contact`,contatos
        );
    
        console.log(`REQ`, reqUser);
        alert("CONTATO CADASTRADO COM SUCESSO")
    }
document.getElementById("cadastrarContatos").addEventListener("click", contatosUsuario);

async function AtualizarcontatosUsuario(){
    const userDataContato = validarSession("dadosUsuario");
    console.log(`ESSES DADOS SÃO DA SESSÃO`, userDataContato);

    const atualizarcontatoUsuario = {
        celular : celular.value,
        telefone : telefone.value,
    }

    localStorage.setItem("atualizarContato", JSON.stringify(atualizarcontatoUsuario));
    let contatosUserUpdate = JSON.parse(localStorage.getItem('atualizarContato'));

    const atualizarcontatos = {
      
            idLogin: userDataContato.idLogin,
            numero: contatosUserUpdate.celular,
            telefone: contatosUserUpdate.telefone,
            
    
    }
    
    console.log(`contato atualizado`, atualizarcontatos);
    let reqUser = await ApiRequest("PUT", `http://localhost:3131/contact/${userLogado.idLogin}`,atualizarcontatos
    );
    
    console.log(`REQ`, reqUser);
    alert("CONTATO ATUALIZADO COM SUCESSO")
}
document.getElementById("editarContatos").addEventListener("click", AtualizarcontatosUsuario);

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

        const usuarioEnderecoAtualizado = validarSession("dadosUsuario");

        const localStorageEnderecoAtualizado = {
            ...JSON.parse(localStorage.getItem("detalhesEnderecoAtualizado")),
            user: usuarioEnderecoAtualizado
        }
        console.log(localStorageEnderecoAtualizado);

        const bodyEnderecoAtualizado = {
            idLogin: localStorageEnderecoAtualizado.user.idLogin,
            cep: localStorageEnderecoAtualizado.cepData,
            bairro: localStorageEnderecoAtualizado.bairroData,
            numero: Number(localStorageEnderecoAtualizado.numeroData),
            rua: localStorageEnderecoAtualizado.ruaData,
            municipio: localStorageEnderecoAtualizado.cidadeData, 
            estado: localStorageEnderecoAtualizado.estadoData,
            complemento: localStorageEnderecoAtualizado.complementoData,
           
          
        } 
        const reqEnderecoAtualizado = await ApiRequest("PUT", `http://localhost:3131/adress/${userLogado.idUsuario}`, bodyEnderecoAtualizado);
        
        console.log(reqEnderecoAtualizado);
        alert("ENDEREÇO ATUALIZADO COM SUCESSO")
        
    }
document.getElementById("atualizarEnderecos").addEventListener("click",atualizarEndereco);

async function carregarDadosUsuario(dados, enderecos, contato){

    let dataNascimento = document.getElementById("data");
    let cidade = document.getElementById("cidadeUsuario");
    let numeroCelular = document.getElementById("celular");
    let numeroTelefone = document.getElementById("telefone");

    dataNascimento.innerHTML = `${getFormattedDate(dados.dataDeNascimento)}`;
    cidade.innerHTML = `${enderecos.municipio}, ${enderecos.estado}`;
    numeroCelular.innerHTML = `${contato.numero}`;
    numeroTelefone.innerHTML = `${contato.telefone}`;

}
carregarDadosUsuario(dados, enderecos, contato);

// CARREGAR SEGUIDORES
async function carregarComentarios (){
    
   

}

// ALTERAR SENHA
async function editarSenha(){
    const emailSenha = {
      senha : senha.value
    }
    localStorage.setItem("emailSenha", JSON.stringify(emailSenha));
    console.log(editarSenha);
    
    if (senhaDigitada == senha) {
        
    } else {
        
    }
    
    const reqSenhaAtualizada = await ApiRequest("PUT", `http://localhost:3131/user/${userLogado.idUsuario}`, emailSenha);

    console.log(reqSenhaAtualizada);
    alert("SENHA ATUALIZADA COM SUCESSO")
}
document.getElementById("butao-editar").addEventListener("click",editarSenha);

import { imagemPreview, imagemPreviewBanner, imagemPreviewPerfil } from "./imagenPreview.js";

async function atualizarImagensPerfil() {

    const foto = mediaProfile;
    const banner = mediaBanner;

    const imagensUsuario = {
        "foto": [
            foto[0]
        ],
        "banner": [
            banner[0]
        ]
    };

    console.log(imagensUsuario.foto);

    let reqUpdateMedia = await ApiRequest("PUT", `http://localhost:3131/user/media/${dados.idUsuario}`, imagensUsuario);
    console.log(reqUpdateMedia);

    if (reqUpdateMedia.status === 200) {
        alert("Imagens atualizadas com sucesso!");
        window.location.reload();
    } else {
        alert("Erro ao atualizar imagens");
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
document.getElementById("filePerfil").addEventListener("change", handleFileSelectProfile, false);

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
document.getElementById("fileBanner").addEventListener("change", handleFileSelectBanner, false);




// document.getElementById("fileSponsor").addEventListener('change', imagemPreview);
document.getElementById("filePerfil").addEventListener("change", imagemPreviewPerfil);
document.getElementById("fileBanner").addEventListener("change", imagemPreviewBanner);
document.getElementById("botaoModalEditar").addEventListener("click", atualizarImagensPerfil);


// carregar dados na inputs
function AtribuirValor() {
    nome.value = dados.nome;
    email.value = dadosSenhaEmail.email;
    // previewPerfil.src = dadosUsuario.foto;

    // if (dadosUsuario.banner !== null) {
    //     previewBanner.src = dadosUsuario.banner;
    // } else {
    //     previewBanner.src = "./assets/img/image 16.png";
    // }

    // if (dadosUsuario.foto !== null) {
    //     previewPerfil.src = dadosUsuario.foto;
    // } else {
    //     previewPerfil.src = "./assets/img/sem-foto.png";
    // }

    if (reqContatos.status == 404) {
        celular.value = ``;
        celular.placeholder = ``;
    } else {
        celular.value = contato.numero;
    }

    if (reqContatos.status == 404) {
        telefone.value = ``;
        telefone.placeholder = ``;
    } else {
        telefone.value = contato.telefone;
    }

    if (dados.dataDeNascimento !== null) {
        data.placeholder = getFormattedDate(dados.dataDeNascimento);
    } else {
        data.value = ``;
    }

    // if (reqEndereco.status !== 400) {

    //     cep.value = endereco.cep;
    //     estado.value = endereco.estado;
    //     cidade.value = endereco.municipio;
    //     bairro.value = endereco.bairro;
    //     endereco.value = endereco.rua;
    //     numero.value = endereco.numero;
        
    //     if (endereco.complemento === "") {
    //         complemento.value = ``;
       
    //     } else {
    //         complemento.value = endereco.complemento;
    //     }

    // } else {
    //     console.log("Não tem endereço");
    // }

}
AtribuirValor();


async function excluirConta (){
    let reqUserDelete = await ApiRequest("DELETE", `http://localhost:3131/user/${userLogado.idUsuario}`);
    
    console.log(`REQ`, reqUserDelete);
    alert("CONTA EXCLUIDA COM SUCESSO")

    window.location.href = "../loginUsuario.html"
    
}
document.getElementById("excluirUsuario").addEventListener("click", excluirConta);

