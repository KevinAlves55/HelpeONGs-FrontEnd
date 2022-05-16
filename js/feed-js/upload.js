"use strict";

// Verifica se as APIs de arquivo são suportadas pelo navegador.
if (window.File && window.FileReader && window.FileList && window.Blob) {
    console.log("A API é suportada");
} else {
    console.log("A API não é suportada");
}

function handleFileSelect(evento) {
    
    // Objeto FileList guarda todos os arquivos.
    var files = evento.target.files;
    let media = [];
    
    // PERCORRE O OBJETO E CRIA UM ARRAY DE OBJETOS DENTRO DELE
    for (var i = 0, f; f = files[i]; i++) {
        media.push(
            {
                "fileName": f.name,
                "base64": btoa(f.name),
                "type": f.type
            }
        );
    }

    return media;
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
    handleFileSelect,
    imagemPreview
}