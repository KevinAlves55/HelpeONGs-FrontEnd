'use strict'


document.getElementById("item1").addEventListener("click", ()=>{
    document.getElementById("container-conteudo-sobre").classList.add("aparecer")
    document.getElementById("container-conteudo-detalhes-de-conta").classList.remove("aparecer")
    document.getElementById("container-conteudo-detalhes-do-endereco").classList.remove("aparecer")
    document.getElementById("senha").classList.remove("aparecer")
    document.getElementById("conta").classList.remove("aparecer")
    
})

document.getElementById("item2").addEventListener("click", ()=>{
    document.getElementById("container-conteudo-sobre").classList.remove("aparecer")
    document.getElementById("container-conteudo-detalhes-de-conta").classList.add("aparecer")
    document.getElementById("container-conteudo-detalhes-do-endereco").classList.remove("aparecer")
    document.getElementById("senha").classList.remove("aparecer")
    document.getElementById("conta").classList.remove("aparecer")
})

document.getElementById("item3").addEventListener("click", ()=>{
    document.getElementById("container-conteudo-sobre").classList.remove("aparecer")
    document.getElementById("container-conteudo-detalhes-de-conta").classList.remove("aparecer")
    document.getElementById("container-conteudo-detalhes-do-endereco").classList.add("aparecer")
    document.getElementById("senha").classList.remove("aparecer")
    document.getElementById("conta").classList.remove("aparecer")
})

document.getElementById("item4").addEventListener("click", ()=>{
    document.getElementById("container-conteudo-sobre").classList.remove("aparecer")
    document.getElementById("container-conteudo-detalhes-de-conta").classList.remove("aparecer")
    document.getElementById("container-conteudo-detalhes-do-endereco").classList.remove("aparecer")
    document.getElementById("senha").classList.add("aparecer")
    document.getElementById("conta").classList.remove("aparecer")
})

document.getElementById("item5").addEventListener("click", ()=>{
    document.getElementById("container-conteudo-sobre").classList.remove("aparecer")
    document.getElementById("container-conteudo-detalhes-de-conta").classList.remove("aparecer")
    document.getElementById("container-conteudo-detalhes-do-endereco").classList.remove("aparecer")
    document.getElementById("senha").classList.remove("aparecer")
    document.getElementById("conta").classList.add("aparecer")
})