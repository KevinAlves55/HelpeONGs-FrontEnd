'use strict'
import { validarSession } from "../utils/ValidatorSession.js";
import ApiRequest from "../utils/ApiRequest.js";
import { getFormattedDate } from "../utils/DataFormat.js";

let userLogado;
let dadosSenhaEmail = JSON.parse(localStorage.getItem('emailSenha'));

if (localStorage.hasOwnProperty('idUser') !== false) {
    
    userLogado = JSON.parse(localStorage.getItem('idUser'));
    console.log(userLogado.idUsuario);

    const menuNonePerfil = () => document.getElementById("menu").style.display = "none";
    menuNonePerfil();

    const btnModalNone = () => document.getElementById("btnModal").style.display = "none";
    btnModalNone();

    const menusNone = () => document.getElementById("menu-opcoes-perfil").style.display = "none";
    menusNone();

    const containerAjust = () => document.getElementById("container-conteudo").style.marginTop = "35px";
    containerAjust();


} else {

    userLogado = validarSession("dadosUsuario");

}

let req = await ApiRequest("GET", `http://localhost:3131/user/${userLogado.idUsuario}`);
let dados = req.data;

let reqEndereco = await ApiRequest("GET", `http://localhost:3131/adress/${dados.idLogin}`);
let enderecos = reqEndereco.data;

let reqContatos = await ApiRequest("GET", `http://localhost:3131/contact/${dados.idLogin}`);
let contato = reqContatos.data;

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

const limparElementos = elemento => {

    while(elemento.firstChild){
        elemento.removeChild(elemento.lastChild);
    }

}

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
    } else if (!objectLocal.foto.includes(".jpg") && !objectLocal.foto.includes(".jpeg") && !objectLocal.foto.includes(".png") && !objectLocal.foto.includes(".svg") && !objectLocal.foto.includes(".git") && !objectLocal.foto.includes(".webp")) {
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
    } else if (!objectLocal.foto.includes(".jpg") && !objectLocal.foto.includes(".jpeg") && !objectLocal.foto.includes(".png") && !objectLocal.foto.includes(".svg") && !objectLocal.foto.includes(".git") && !objectLocal.foto.includes(".webp")) {
        fotoPerfil.setAttribute("src", `../../assets/img/sem-foto.png`)
    } else {
        fotoPerfil.setAttribute("src", `${objectLocal.foto}`);
    }

    // banner perfil
    if (objectLocal.banner === null || objectLocal.banner === undefined) {
        bannerPerfil.setAttribute("src", "../../assets/img/banner-vazio.png");
    } else if (!objectLocal.foto.includes(".jpg") && !objectLocal.foto.includes(".jpeg") && !objectLocal.foto.includes(".png") && !objectLocal.foto.includes(".svg") && !objectLocal.foto.includes(".git") && !objectLocal.foto.includes(".webp")) {
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

function documentFilter(document){
    const firstDot = document.indexOf(",");
    return document.substring(firstDot + 1, document.length);
}

let curriculum = [];
async function handleFileSelectCurriculo(evento) {

    // Objeto FileList guarda todos os arquivos.
    var files = evento.target.files;

    if (files.length === 1) {
        // PERCORRE O OBJETO E CRIA UM ARRAY DE OBJETOS DENTRO DELE
        for (var i = 0, f; f = files[i]; i++) {
            
            const reader = new FileReader();
            let infoArquivo = f;
            
            reader.addEventListener(
                "load",
                () => {
                    const dadosReader = reader.result;
                    let base64 = documentFilter(dadosReader);

                    curriculum.push(
                        {
                            "fileName": infoArquivo.name,
                            "base64": base64,
                            "type": infoArquivo.type
                        }
                    );
                },
                false
            );

            let nomeArquivo = document.getElementById("caminhoImagem");
            nomeArquivo.innerHTML = `${infoArquivo.name}`;

            if (f) {
                reader.readAsDataURL(f);
            }
        }

    } else {
        alert("Máximo de arquivos permitidos é 1");
    }

}

async function dadosDetalhesConta() {

    let dadosSenhaEmail = JSON.parse(localStorage.getItem('emailSenha'));  

    const bodyUser = {
        
        "usuario": {
           nome: nome.value,
           dataDeNascimento: new Date(data.value) ?? new Date(dados.dataDeNascimento),
        },

        "login": {
            email: email.value ?? dadosSenhaEmail.email
        }
    
    }
  
    let reqUser = await ApiRequest(
        "PUT", 
        `http://localhost:3131/user/${dados.idUsuario}`, 
        bodyUser
    );

    if (reqUser.status === 200) {

        alert("Dados atualizados com sucesso!");
        window.location.reload();
        window.scroll(0, 0);

    } else { 

        alert("Erro ao atualizar dados!");

    }
     
}
document.getElementById("formButton").addEventListener("click", dadosDetalhesConta);

async function cadastrarCurriculo() {

    const curriculo = curriculum[0];

    const dadoCurriculo = {

        "curriculum": {
            type: curriculo.type,
            base64: curriculo.base64,
            fileName: curriculo.fileName
        }
    
    }
    console.log(dadoCurriculo);

    let reqCurriculum = await ApiRequest(
        "PUT", 
        `http://localhost:3131/user/upload/curriculum/${dados.idUsuario}`, 
        dadoCurriculo
    );
    
    if (reqCurriculum.status === 200) {

        alert("Curriculo cadastrado com sucesso!");
        window.location.reload();
        window.scroll(0, 0);

    } else { 

        alert("Erro ao cadastrar curriculo!");

    }

}
document.getElementById("buttonCadastrar").addEventListener("click", cadastrarCurriculo);

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

    if (reqUser.status === 200) {
        alert("Dados atualizados com sucesso");
        window.location.reload();
        window.scroll(0, 0);        
    } else {
        alert("Dados não atualizados");
    }

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

    const bodyEndereco = {
        idLogin: dados.idLogin,
        cep: cep.value,
        bairro: bairro.value,
        numero: Number(numero.value),
        rua: endereco.value,
        municipio: cidade.value, 
        estado: estado.value,
        complemento: complemento.value
    }

    const reqEndereco = await ApiRequest("POST", `http://localhost:3131/adress`, bodyEndereco);

    if (reqEndereco.status === 200) {
        alert("Dados atualizados com sucesso");
        window.location.reload();
        window.scroll(0, 0);
    } else { 
        alert("Erro ao atualizar dados!");
    }

}
document.getElementById("buttonEnderecos").addEventListener("click", dadosDetalhesEndereco);

let btnEndereco = document.getElementById("buttonEnderecos");
if (enderecos) {
    btnEndereco.style.display = "none";
}

async function atualizarEndereco() {

    const enderecos = await getEstados(cep.value);

    const bodyEnderecoAtualizado = {
        cep: cep.value,
        bairro: bairro.value,
        numero: Number(numero.value),
        rua: endereco.value,
        municipio: cidade.value, 
        estado: enderecos.uf,
        complemento: complemento.value,
    } 

    const reqEnderecoAtualizado = await ApiRequest("PUT", `http://localhost:3131/adress/${dados.idLogin}`, bodyEnderecoAtualizado);
    
    if (reqEnderecoAtualizado.status === 200) {
        alert("Dados atualizados com sucesso");
        window.location.reload();
        window.scroll(0, 0);
    } else {  
        alert("Erro ao atualizar dados!");
    }
        
}
document.getElementById("atualizarEnderecos").addEventListener("click",atualizarEndereco);

const getEstados = async (cep) => {

    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const dados = await fetch(url);
    const endereco = await dados.json();
    return endereco;

}

async function carregarDadosUsuario(dados, enderecos, contato){

    let dataNascimento = document.getElementById("data");
    let cidade = document.getElementById("cidadeUsuario");
    let numeroCelular = document.getElementById("celular");
    let numeroTelefone = document.getElementById("telefone");

    if (dados.dataDeNascimento === null) {
        dataNascimento.innerHTML = "Não informado";
    } else {
        dataNascimento.innerHTML = `${getFormattedDate(dados.dataDeNascimento)}`;
    }

    if (!enderecos) {
        cidade.innerHTML = "Não informado";
    } else {
        cidade.innerHTML = `${enderecos.municipio}, ${enderecos.estado}`;
    }

    if (!contato) {
        numeroCelular.innerHTML = "Não informado";
        numeroTelefone.innerHTML = "Não informado";
    } else { 
        numeroCelular.innerHTML = `${contato.numero}`;
        numeroTelefone.innerHTML = `${contato.telefone}`;
    }


}
carregarDadosUsuario(dados, enderecos, contato);

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
import { hideLoading, showLoading } from "../utils/Loading.js";

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

    showLoading();
    let reqUpdateMedia = await ApiRequest("PUT", `http://localhost:3131/user/media/${dados.idUsuario}`, imagensUsuario);
    console.log(reqUpdateMedia);

    if (reqUpdateMedia.status === 200) {
        hideLoading();
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
document.getElementById("arquivoCurriculo").addEventListener("change", handleFileSelectCurriculo);
document.getElementById("sair").addEventListener("click", () => {
    localStorage.clear();
    Redirect("loginUsuario");
});


// carregar dados na inputs
function AtribuirValor() {

    nome.value = dados.nome;
    email.value = dadosSenhaEmail.email;
    previewPerfil.src = dados.foto;
    previewBanner.src = dados.banner;

    if (dados.banner !== null) {
        previewBanner.src = dados.banner;
    } else {
        previewBanner.src = "./assets/img/image 16.png";
    }

    if (dados.foto !== null) {
        previewPerfil.src = dados.foto;
    } else {
        previewPerfil.src = "./assets/img/sem-foto.png";
    }
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

    if (reqEndereco.status !== 400) {

        cep.value = enderecos.cep;
        estado.value = enderecos.estado;
        cidade.value = enderecos.municipio;
        bairro.value = enderecos.bairro;
        endereco.value = enderecos.rua;
        numero.value = enderecos.numero;
        
        if (enderecos.complemento === "") {
            complemento.value = ``;
       
        } else {
            complemento.value = enderecos.complemento;
        }

    } else {
        console.log("Não tem endereço");
    }

}
AtribuirValor();


async function excluirConta (){
    let reqUserDelete = await ApiRequest("DELETE", `http://localhost:3131/user/${userLogado.idUsuario}`);
    
    console.log(`REQ`, reqUserDelete);
    alert("CONTA EXCLUIDA COM SUCESSO")

    window.location.href = "../loginUsuario.html"
    
}
document.getElementById("excluirUsuario").addEventListener("click", excluirConta);