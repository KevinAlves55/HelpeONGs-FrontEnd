'use strict'
import { validarSession } from "../utils/ValidatorSession.js";
import ApiRequest from "../utils/ApiRequest.js";
import { getFormattedDate } from "../utils/DataFormat.js";

let userLogado;
userLogado = validarSession("dadosUsuario");

let dadosSenhaEmail = JSON.parse(localStorage.getItem('emailSenha'));
console.log(dadosSenhaEmail);

let req = await ApiRequest("GET", `http://localhost:3131/user/${userLogado.idUsuario}`);

const dados = req.data;

let reqEndereco = await ApiRequest("GET", `http://localhost:3131/adress/${userLogado.idUsuario}`);
let enderecos = reqEndereco.data;


let reqContatos = await ApiRequest("GET", `http://localhost:3131/contact/${userLogado.idLogin}`);
const contato = reqContatos.data;

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
const SenhaAtual = document.getElementById('senhaAtual');

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
    } else if (!objectLocal.foto.includes(".jpg") || !objectLocal.foto.includes(".jpeg") || !objectLocal.foto.includes(".png") || !objectLocal.foto.includes(".svg")) {
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
    } else if (!objectLocal.foto.includes(".jpg") || !objectLocal.foto.includes(".jpeg") || !objectLocal.foto.includes(".png") || !objectLocal.foto.includes(".svg")) {
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

//  
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

// ALTERAR SENHA
// async function editarSenha(){

//     if (SenhaAtual == dadosSenhaEmail) {
//         senha.value = ``;
     
//     } else {
       
//     }
// }
// document.getElementById("butao-editar").addEventListener("click",editarSenha);


// Carregar dados no sobre

// async function CarregarDadosSobre (dadosUsuario) {

//     let descricaosobre = document.getElementById("descricaoSobre");
//     let qtdaMembro = document.getElementById("qtdaMembros");
//     let anoDeFundacao = document.getElementById("anoFundacao");
//     let sedeLocal = document.getElementById("sede");
//     let historia = document.getElementById("historiaSobre");

//     if (reqEndereco.status === 400) {
//         sedeLocal.innerHTML = `Nenhum endereço cadastrado`;
//     } else {
//         sedeLocal.innerHTML = `${adress.municipio}, ${adress.estado}`;
//     }

//     if (dadosOng.descricao !== null) {
//         descricaosobre.innerText = `${dadosOng.descricao}`;
//     } else {
//         descricaosobre.innerText = `Nenhuma descrição cadastrada`;
//     }

//     if (dadosOng.qtdDeMembros !== null) {
//         qtdaMembro.innerHTML = `${formatarValor(dadosOng.qtdDeMembros)}`;        
//     } else {
//         qtdaMembro.innerHTML = `Nada encontrado`;
//     }

//     if (dadosOng.dataDeFundacao !== null) {
//         anoDeFundacao.innerHTML = `${getFormattedDate(dadosOng.dataDeFundacao)}`;        
//     } else {
//         anoDeFundacao.innerHTML = `Nada encontrado`;
//     }

//     if (dadosOng.historia !== null) {
//         historia.innerText = `${dadosOng.historia}`;
//     } else {
//         historia.innerText = `Nada encontrado`;
//     }

    
// }



// carregar dados na inputs

function AtribuirValor() {
    nome.value = dados.nome;
    email.value = dadosSenhaEmail.email;
 
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



//deletar usuario => /user/$id