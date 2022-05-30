"use strict";

// Verifica se as APIs de arquivo são suportadas pelo navegador.
if (window.File && window.FileReader && window.FileList && window.Blob) {
    console.log("A API é suportada");
} else {
    console.log("A API não é suportada");
}

async function imagemPreview(evento) {

    var file = evento.target.files[0];

    const preview = new FileReader();

    if (file) {

        preview.readAsDataURL(file);

    } else {

        preview.src = '';

    }
    
    const nomeImagem = document.getElementById("nomeImagem");
    nomeImagem.innerHTML = file.name;

    const imagem = document.querySelector(".preview")
    preview.onloadend = (e) => {
        
        imagem.src = e.target.result;

    }
}

async function imagemPreviewPerfil(evento) {

    var file = evento.target.files[0];

    console.log(file);

    const preview = new FileReader();

    if (file) {

        preview.readAsDataURL(file);

    } else {

        preview.src = '';

    }

    const imagem = document.querySelector(".previewPerfil")
    preview.onloadend = (e) => {
        
        imagem.src = e.target.result;

    }
}

async function imagemPreviewBanner(evento) {

    var file = evento.target.files[0];

    const preview = new FileReader();

    if (file) {

        preview.readAsDataURL(file);

    } else {

        preview.src = '';

    }

    const imagem = document.querySelector(".previewBanner")
    preview.onloadend = (e) => {
        
        imagem.src = e.target.result;

    }
}

export {
    imagemPreview,
    imagemPreviewPerfil,
    imagemPreviewBanner
}