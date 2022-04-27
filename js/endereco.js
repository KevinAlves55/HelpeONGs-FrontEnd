'use strict';

const limparFormulario = (estado) =>{
    document.getElementById('estado').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('rua').value = '';
}


const preencherFormulario = (estado) =>{
    document.getElementById('estado').value = estado.uf;
    document.getElementById('cidade').value = estado.localidade;
    document.getElementById('bairro').value = estado.bairro;
    document.getElementById('rua').value = estado.logradouro;
}


const eNumero = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && eNumero(cep); 


const pesquisarCep = async() => {
    limparFormulario();
    
    const cep = document.getElementById('cep');
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    if (cepValido(cep)){
        const dados = await fetch(url);
        const estado = await dados.json();
        if (endereco.hasOwnProperty('erro')){
            document.getElementById('estado').value = 'CEP não encontrado!';
        }else {
            preencherFormulario(estado);
        }
    }else{
        document.getElementById('estado').value = 'CEP incorreto!';
    }
     
}

document.getElementById('cep')
        .addEventListener('focusout',pesquisarCep);