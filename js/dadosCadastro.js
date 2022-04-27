'use strict'

document.getElementById('name').value = localStorage.nome;
document.getElementById('email').value = localStorage.email;
document.getElementById('data').value = localStorage.dataNascimento;
document.getElementById('celular').value = localStorage.celular;
document.getElementById('telefone').value = localStorage.telefone;


var salvarDados = function(){

    var nome = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var dataNascimento = document.getElementById('data').value;
    var celular = document.getElementById('celular').value;
    var telefone = document.getElementById('telefone').value;

    localStorage.setItem('nome', nome);
    localStorage.setItem('email', email);
    localStorage.setItem('dataNascimento', dataNascimento);
    localStorage.setItem('celular', celular);
    localStorage.setItem('telefone', telefone);
}

document.onchange = salvarDados;