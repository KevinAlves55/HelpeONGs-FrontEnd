'use strict';

import ApiRequest from "../utils/ApiRequest.js";


const nomeDaCategoria = document.getElementById('categoria-input');


function cartegoriaMudar(){

    const category = document.getElementById("categoria-detalhes").value;
    console.log(category);

    document.getElementById("categoria-span").innerHTML =  category;


}

 async function receberDados(){
    var categorias = document.getElementById('categoria-input').value;

    console.log(categorias);

    const cadastrarCategoria = {
        nome: nomeDaCategoria.value
    }
    localStorage.setItem("categoria", JSON.stringify(cadastrarCategoria)); 

}

const nomeCategoria = (evento) => {

    if (evento.key == "Enter") {

        const pesquisaNome = evento.target.value;
        console.log(pesquisaNome);

    }

}

document.getElementById("categoria-input").addEventListener("keypress", 
nomeCategoria);

document.getElementById("categoria-input").addEventListener("keypress", 
cartegoriaMudar);




// let reqCategoria = await ApiRequest("GET", `http://localhost:3131/category${localStorageData.ong.idLogin}`,);



// function dadosCategorias (){

//     const categoriasDetalhes = { 
//         categoriaONG: nomeDaCategoria.value

//     }
//     localStorage.setItem("dadosCategorias", JSON.stringify(categoriasDetalhes));
    

// }

// const reqCategoria = await ApiRequest("GET", `http://localhost:3131/category/{$localStoreCategorias.ong.idOng}`);

// console.log(reqCategoria);
