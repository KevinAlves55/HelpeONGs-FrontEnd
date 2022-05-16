"use strict";

// Verifica se as APIs de arquivo são suportadas pelo navegador.
if (window.File && window.FileReader && window.FileList && window.Blob) {
    console.log("A API é suportada");
} else {
    console.log("A API não é suportada");
}

const imagemPreview = (idFile, corpo) => {

    // Recebendo os valarores
    const file = document.getElementById(idFile).files[0];
    const preview = document.getElementById(corpo);
    
    // // Instanciando um objeto para ler o arquivo
    const fileReader = new FileReader();

    if (file) {

        fileReader.readAsDataURL(file);

    } else {

        preview.src = '';

    }

    fileReader.onloadend = () => preview.src = fileReader.result;
};

export {
    imagemPreview
}