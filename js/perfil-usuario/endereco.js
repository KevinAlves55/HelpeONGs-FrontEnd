"use strict";

const limparFormulario = (endereco) => {
    document.getElementById('endereco').value = '';
    document.getElementById('bairroEndereco').value = '';
    document.getElementById('cidadeEndereco').value = '';
    document.getElementById('estadoEndereco').value = '';
}


const preencherFormulario = (endereco) => {
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairroEndereco').value = endereco.bairro;
    document.getElementById('cidadeEndereco').value = endereco.localidade;
    document.getElementById('estadoEndereco').value = endereco.uf;
}

const eNumero = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && eNumero(cep); 

const pesquisarCep = async() => {
    limparFormulario();
    
    const cep = document.getElementById('cepEndereco').value.replace("-","");
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    if (cepValido(cep)){
        const dados = await fetch(url);
        const endereco = await dados.json();
        if (endereco.hasOwnProperty('erro')){
            document.getElementById('endereco').value = 'CEP não encontrado!';
        }else {
            preencherFormulario(endereco);
        }
    }else{
        document.getElementById('endereco').value = 'CEP incorreto!';
    }
     
}

document.getElementById('cep').addEventListener('focusout',pesquisarCep);

