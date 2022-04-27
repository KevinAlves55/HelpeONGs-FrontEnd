'use strict'

// const nome = document.getElementById('nome'); 
// const email = document.getElementById('email'); 
// const cnpj = document.getElementById('cnpj'); 
// const celular = document.getElementById('celular');
// const telefone = document.querySelector('#telefone');


// const local = localStorage.getItem('telefone');

// document.getElementById('formButton').addEventListener('click');

// localStorage.setItem('telefone', 'celular');

// console.log(localStorage.celular);

function salvarDados() {

    const nome = document.getElementById('name').value;
    console.log(nome);
    const email = document.getElementById('mail').value;
    const cnpj = document.getElementById('cnpj-input').value;
    const celular = document.getElementById('cel').value;
    const telefone = document.getElementById('tel').value;

    localStorage.setItem('nome', nome);
    localStorage.setItem('email', email);
    localStorage.setItem('cnpj', cnpj);
    localStorage.setItem('celular', celular);
    localStorage.setItem('telefone', telefone);


}

document.onchange = salvarDados;

