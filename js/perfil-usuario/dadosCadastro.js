'use strict'
import { validarSession } from "../utils/ValidatorSession.js";
import ApiRequest from "../utils/ApiRequest.js";

 // const reqContato = await ApiRequest("PUT", `http://localhost:3131/contact/${localStorageData.user.idUsuario}`, bodyContato);

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

function customFormatter(date) {
    return date.replace("/", "-");
}

async function dadosDetalhesConta() {

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
        senha: "123456789"
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
        `http://localhost:3131/user/${userData.idLogin}`, 
        body
    );

    console.log(`REQ`, reqUser);
     
}
document.getElementById("formButton").addEventListener("click", dadosDetalhesConta);


async function contatosUsuario(){
        const userDataContato = validarSession("dadosContatoUsuario");
        console.log(`ESSES DADOS SÃO DA SESSÃO`, userDataContato);

        const contatoUsuario = {
            celular : celular.value,
            telefone : telefone.value,
        }

        localStorage.setItem("enviarContato", JSON.stringify(contatoUsuario));


        let reqUser = await ApiRequest(
            "POST",`http://localhost:3131/user/${userDataContato.idLogin}`,contatoUsuario
        );
    
        console.log(`REQ`, reqUser);
    }
document.getElementById("buttonCadastrar").addEventListener("click", contatosUsuario);


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

// async function atualizarEndereco(){
//     const atualizarDadosDetalhesEndereco = {
//         cepData: cep.value,
//         estadoData: estado.value,
//         cidadeData: cidade.value,
//         bairroData: bairro.value,
//         ruaData: endereco.value,
//         numeroData: numero.value,
//         complementoData: complemento.value
//     }
//     localStorage.setItem("atualizarEndereco", JSON.stringify(atualizarDadosDetalhesEndereco)); 

//     const userEndereco = validarSession("dadosUsuario");

//     const localStorageEnderecoAtualizado = {
//         ...JSON.parse(localStorage.getItem("atualizarEndereco")),
//         user: userEndereco
//     }
//     console.log(localStorageEnderecoAtualizado);

//     const atualizarEndereco = {
//         cep: localStorageEnderecoAtualizado.cepData,
//         bairro: localStorageEnderecoAtualizado.bairroData,
//         numero: localStorageEnderecoAtualizado.numeroData,
//         rua: localStorageEnderecoAtualizado.ruaData,
//         municipio: localStorageEnderecoAtualizado.cidadeData, 
//         estado: localStorageEnderecoAtualizado.estadoData,
//         complemento: localStorageAtualizarEndereco.complementoData,
//     }

//     console.log("atualizado", atualizarEndereco);

//     const reqAtualizarEndereco = await ApiRequest("PUT", `http://localhost:3131//adress/${localStorageEnderecoAtualizado.user.idUsuario}`, atualizarEndereco);
    

//     console.log(reqAtualizarEndereco, );


// }
// document.getElementById("atualizarEnderecos").addEventListener("click", atualizarEndereco);

// EXEMPLO
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
        const reqEnderecoAtualizado = await ApiRequest("PUT", `http://localhost:3131/adress/${localStorageEnderecoAtualizado.user.idUsuario}`, bodyEnderecoAtualizado);
        
        console.log(reqEnderecoAtualizado);

    }

document.getElementById("atualizarEnderecos").addEventListener("click",atualizarEndereco);
// document.getElementById("button-detalhes-endereco").addEventListener("click", dadosDetalhesEndereco);






// UPLOAD DO CURRICULO


