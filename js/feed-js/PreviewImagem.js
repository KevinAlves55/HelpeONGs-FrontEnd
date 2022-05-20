"use strict";

// Verifica se as APIs de arquivo são suportadas pelo navegador.
if (window.File && window.FileReader && window.FileList && window.Blob) {
    console.log("A API é suportada");
} else {
    console.log("A API não é suportada");
}

async function imagemPreview(evento) {

    var files = evento.target.files;
    const imageArray = [files.item(0), files.item(1), files.item(2)]
    var array = [];

    if (files.length >= 4) {

        console.log("Sem preview");

    } else {

        imageArray.map((row,i) => {

            const preview = new FileReader();

            if (row) {
    
                preview.readAsDataURL(row);
        
            } else {
        
                preview.src = '../../assets/img/sem-imagem-feed.jpeg';
        
            }
            
            preview.onloadend = (e) => {
    
                array.push(
                    document.querySelector(`.preview${i}`)
                );
                
                array[i].src = e.target.result;
    
            }
            
        });

    }   
}

export {
    imagemPreview
}