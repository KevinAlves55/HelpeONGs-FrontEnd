"use strict"

import ApiRequest from "../utils/ApiRequest.js";
import Redirect from "../utils/Redirect.js";
import { validarSession } from "../utils/ValidatorSession.js";
import { openSetaHeader, closeSetaHeader } from "../utils/MiniOpMenu.js";
import { closeModalEvento, closeModalPostagens, closeModalVaga, openModalPostagens } from "./modalPostagens.js";
import { checkInputs, errorValidation } from "../validator/validatorPostagem.js";
import { imagemPreview } from "./upload.js";
import { getFormattedDate } from "../utils/DataFormat.js";

const descricao = document.getElementById("text-post");

let objeto = await ApiRequest("GET", "http://localhost:3131/ong");
let userLogado;
let ongLogado;

if (localStorage.hasOwnProperty('dadosUsuario') !== false) {
    
    userLogado = validarSession("dadosUsuario");
    let req = await ApiRequest("GET", `http://localhost:3131/user/${userLogado.idUsuario}`);
    const dadosUsuario = req.data

    if (!dadosUsuario.foto || !dadosUsuario.banner || !dadosUsuario.dataDeNascimento) {
        Redirect("perfilUsuario");
    }

    const controlNone = () => document.getElementById("control").style.display = "none";
    controlNone();
    const postagemNone = () => document.getElementById("criar-postagem").style.display = "none";
    postagemNone();

    document.getElementById("sair").addEventListener("click", () => {
        localStorage.clear();
        Redirect("loginUsuario");
    });

    document.getElementById("sair-header").addEventListener("click", () => {
        localStorage.clear();
        Redirect("loginUsuario");
    });

    function CarregarMiniPerfil(objectLocal) {

        let nomeLogado = document.getElementById("mini-perfil-nome");
        let fotoLogado = document.getElementById("mini-perfil-foto");
        let fotoHeader = document.getElementById("foto-header");
    
        if (objectLocal.nome === null && objectLocal.nome === undefined) {
            nomeLogado.innerHTML = `<a href="login.html">Login</a>  / <a href="cadastroUsuario.html">Cadastrar</a>`;
        } else {
            nomeLogado.innerHTML = `${objectLocal.nome}`;
        }
    
        if (objectLocal.foto === null || objectLocal.foto === undefined) {
            fotoLogado.setAttribute("src", "../../assets/img/sem-foto.png");
            fotoHeader.setAttribute("src", "../../assets/img/sem-foto.png");
        } else if (!objectLocal.foto.includes(".jpg") || !objectLocal.foto.includes(".jpeg") || !objectLocal.foto.includes(".png") || !objectLocal.foto.includes(".svg")) {
            fotoLogado.setAttribute("src", `../../assets/img/sem-foto.png`);
            fotoHeader.setAttribute("src", "../../assets/img/sem-foto.png");
        } else {
            fotoLogado.setAttribute("src", `${objectLocal.foto}`);
            fotoHeader.setAttribute("src", `${objectLocal.foto}`);
        }
    
    }
    CarregarMiniPerfil(dadosUsuario);

} else if (localStorage.hasOwnProperty('dadosOng') !== false) {

    ongLogado = validarSession("dadosOng");
    let req = await ApiRequest("GET", `http://localhost:3131/ong/${ongLogado.idOng}`);
    const dadosOng = req.data

    if (!dadosOng.foto || !dadosOng.banner || !dadosOng.historia || !dadosOng.descricao) {
        Redirect("perfilONGs");
    }

    document.getElementById("sair").addEventListener("click", () => {
        localStorage.clear();
        Redirect("loginONGs");
    });

    document.getElementById("sair-header").addEventListener("click", () => {
        localStorage.clear();
        Redirect("loginONGs");
    });

    function CarregarMiniPerfil(objectLocal) {

        let nomeLogado = document.getElementById("mini-perfil-nome");
        let fotoLogado = document.getElementById("mini-perfil-foto");
        let fotoHeader = document.getElementById("foto-header");
    
        if (objectLocal.nome === null || objectLocal.nome === undefined) {
            nomeLogado.innerHTML = `<a href="login.html">Login</a>  / <a href="cadastroUsuario.html">Cadastrar</a>`;
        } else {
            nomeLogado.innerHTML = `${objectLocal.nome}`;
        }
    
        if (objectLocal.foto === null || objectLocal.foto === undefined) {
            fotoLogado.setAttribute("src", "../../assets/img/sem-foto.png");
            fotoHeader.setAttribute("src", "../../assets/img/sem-foto.png");
        } else if (!objectLocal.foto.includes(".jpg") && !objectLocal.foto.includes(".jpeg") && !objectLocal.foto.includes(".png") && !objectLocal.foto.includes(".svg") && !objectLocal.foto.includes(".gif")) {
            fotoLogado.setAttribute("src", `../../assets/img/sem-foto.png`);
            fotoHeader.setAttribute("src", "../../assets/img/sem-foto.png");
        } else {
            fotoLogado.setAttribute("src", `${objectLocal.foto}`);
            fotoHeader.setAttribute("src", `${objectLocal.foto}`);
        }
    
    }
    CarregarMiniPerfil(dadosOng);

    function CarregarBarraPostagem(objectLocal) {

        let nomePostagem = document.getElementById("nome-postagem");
        let imgPostagem = document.getElementById("foto-postagem");

        nomePostagem.innerText = `${objectLocal.nome}`;
        imgPostagem.setAttribute("src", `${objectLocal.foto}`);

    }
    CarregarBarraPostagem(dadosOng);

    function CarregarMiniPerfilPostagem(objectLocal) {

        let imgCriador = document.querySelector("#imgOngPostagem");
        let nomeCriador = document.querySelector("#nomeOngPostagem");
    
        imgCriador.setAttribute("src", objectLocal.foto);
        nomeCriador.innerText = `${objectLocal.nome}`;
    
    }
    CarregarMiniPerfilPostagem(dadosOng);

    function CarregarMiniPerfilEvento(objectLocal) {

        let imgCriador = document.querySelector("#imgOngEvento");
        let nomeCriador = document.querySelector("#nomeOngEvento");
    
        imgCriador.setAttribute("src", objectLocal.foto);
        nomeCriador.innerText = `${objectLocal.nome}`;
    
    }
    CarregarMiniPerfilEvento(dadosOng);

    function CarregarMiniPerfilVaga(objectLocal) {

        let imgCriador = document.querySelector("#imgOngVaga");
        let nomeCriador = document.querySelector("#nomeOngVaga");

        imgCriador.setAttribute("src", objectLocal.foto);
        nomeCriador.innerText = `${objectLocal.nome}`;

    }
    CarregarMiniPerfilVaga(dadosOng);

} else {

    Redirect("cadastroUsuario");

}

function TrocarTipoPostagem({target}) {

    let opcaoValor = target.options[target.selectedIndex].value;
    console.log(opcaoValor);

    if (opcaoValor === "P") {
        console.log("ESTAMOS EM POST");
        document.getElementById("postagem-vaga").classList.remove("active");
        document.getElementById("postagem-evento").classList.remove("active");
        document.getElementById("postagem-post").classList.add("active");
        document.getElementById("trocar-select-post")[0].selected = true;
    } else if (opcaoValor === "E") {
        console.log("ESTAMOS EM EVENTO");
        document.getElementById("postagem-vaga").classList.remove("active");
        document.getElementById("postagem-post").classList.remove("active");
        document.getElementById("postagem-evento").classList.add("active");
        document.getElementById("trocar-select-evento")[1].selected = true;
    } else if (opcaoValor === "V") {
        console.log("ESTAMOS EM VAGA");
        document.getElementById("postagem-post").classList.remove("active");
        document.getElementById("postagem-evento").classList.remove("active");
        document.getElementById("postagem-vaga").classList.add("active");
        document.getElementById("trocar-select-vaga")[2].selected = true;
    }

}

const PesquisarONGs = (evento) => {

    if (evento.key == "Enter") {

        const pesquisaNome = evento.target.value;
        console.log(pesquisaNome);

    }

}

let media = [];
let imagens = [];
async function handleFileSelect(evento) {

    // Objeto FileList guarda todos os arquivos.
    var files = evento.target.files;

    if (files.length <= 3) {
        // PERCORRE O OBJETO E CRIA UM ARRAY DE OBJETOS DENTRO DELE
        for (var i = 0, f; f = files[i]; i++) {
            
            const reader = new FileReader();
            let infoArquivo = f;
            // console.log("File: ", infoArquivo);
            
            reader.addEventListener(
                "load",
                () => {
                    const dadosReader = reader.result;
                    let base64 = dadosReader.replace(/^data:image\/[a-z]+;base64,/, "");

                    media.push(
                        {
                            "fileName": infoArquivo.name,
                            "base64": base64,
                            "type": infoArquivo.type
                        }
                    );
                },
                false
            );

            if (f) {
                reader.readAsDataURL(f);
                // console.log("OBT", reader);
            } else {
                // console.log("Não existe arquivos");
            }
        }

    } else {
        alert("Máximo de arquivos permitidos é 3");
    }
}

async function previewImagem(evento) {

    var files= evento.target.files;
    // console.log(files.item(0));
    const imageArray = [files.item(0), files.item(1), files.item(2)]
    // for (var i = 0; i < files.length -1 ; i++) {

    //     let f = files[i]

        // const preview = new FileReader();
        // console.log(files[i]);
        var array = [];
        
        imageArray.map((row,i)=>{
            
            const preview = new FileReader();
            console.log(files.item(0));
            console.log(row);
            preview.readAsDataURL(row);
            // console.log("ARQUIVOS SELECIONADOS", preview);
            
            preview.onloadend = (e) => {

                array.push(
                    document.querySelector(`.preview${i}`)
                );
                // console.log(document.querySelector(`.preview${i}`));
                
                array[i].src = e.target.result;
                // console.log("PREVIEW", array);

            }
        })

       

        
        
        // if (files[0]) {
        //     preview.readAsDataURL(files[0]);
        // } else if(files[0] && files[1]){
        //     preview.readAsDataURL(files[0]);
        //     preview.readAsDataURL(files[1]);
        // }else if(files[0] && files[1] && files[2]){
        //     preview.readAsDataURL(files[0]);
        //     preview.readAsDataURL(files[1]);
        //     preview.readAsDataURL(files[2]);
        // }

        // preview.onloadend = (e) => {

        //     let img = document.querySelector(`.preview0`)
        //     let img1 = document.querySelector(`.preview1`)
        //     let img2 = document.querySelector(`.preview2`)
           
        //     img[i].src = e.target.result;
        //     console.log(e.target.result);

        // }

        // preview.addEventListener(
        //     "load",
        //     () => {
        //         const dadosReader = preview.result;
        //         let base64 = dadosReader.replace(/^data:image\/[a-z]+;base64,/, "");

        //         imagens.push(
        //             {
        //                 "base64": base64,
        //             }
        //         );
        //     },
        //     false
        // );

    // }

    // setInterval(() => {
    //     const base64Preview = imagens;
    //     console.log("FINALMENTE", base64Preview);
    // }, 5000);
    // clearInterval()
    // const leituraArquivo = reader.onload = () => {

    //     const readerPreview = reader.result;
    //     let base64Preview = readerPreview.replace(/^data:image\/[a-z]+;base64,/, "");
    //     // console.log(base64Preview);
    //     // const position = e.target.result.indexOf(",")+1;
    //     // const tamanho = e.target.result.length;
    //     imagens.push(
    //         base64Preview
    //     );

    //     return imagens;
    // }
    // let img2 = document.querySelector(".preview2");
    // let img3 = document.querySelector(".preview3");


    // console.log("IMAGENS", leituraArquivo);

    // // // A leitura do arquivo é assíncrona 
    // // reader.onload = (function () {
    // //     return function (e) {
            
    // //         const position = e.target.result.indexOf(",")+1;
    // //         const tamanho = e.target.result.length;
    // //         poha.push(
    // //             e.target.result.substring(position, tamanho)
    // //         );
        
    // //     };
    // // })(f);
}

const PostarPost = async (e) => {

    e.preventDefault();

    const validacoes = checkInputs();
    const arquivosSelecionados = media;

    let result;
    validacoes.map(status => {
        status === false ? result = false : "";
    });

    if (result != false) {

        const dom = {
            idOng: ongLogado.idOng,
            descricao: descricao.value,
            media: arquivosSelecionados
        }

        const request = await ApiRequest("POST", "http://localhost:3131/post", dom);
        console.log(request);

        // if (request.status === 200) {
        //     closeModalPostagens();
        //     location.reload();
        // }

    }

}

const CarregarTodosPost = async () => {

    const container = document.querySelector(".feed");
    const objetoPost = await ApiRequest("GET", "http://localhost:3131/post");
    const dadosPost = objetoPost.data;
    const post = dadosPost.map(CriarPosts);
    container.replaceChildren(...post);

}

const CriarPosts = ({createdAt, descricao, idOng, idPost, tbl_ong, tbl_post_media}) => {
    
    const dataFormat = getFormattedDate(createdAt);

    let corpo;
   
    corpo = document.createElement("div");
    corpo.classList.add("feed");

    if (tbl_post_media.length === 0) {
        
        corpo.innerHTML =
        `
        <div class="post">
            <div class="parte-superior">
                <div class="info-ong">
                    <img src="${tbl_ong.foto}" alt="${tbl_ong.nome}" title="${tbl_ong.nome}">

                    <div class="info-nome-data">
                        <h2>${tbl_ong.nome}</h2>
                        <span>${dataFormat}</span>
                    </div>
                </div>

                <img src="assets/img/mais-sobre-postagem.png" alt="Mais sobre {nomeDaOng}" title="Icone more horizontal">
            </div>

            <p>
                ${descricao}
            </p>

            <div class="interacoes">
                <div class="icone-funcao">
                    <img src="assets/img/curtir-sem-preencimento.png" alt="Curtiram" title="Icone curtir" class="curtir">
                    <span>28.5k Curtiram</span>
                </div>
                <div class="icone-funcao">
                    <img src="assets/img/comentario-post-feed.png" alt="Comentar" title="Icone comentar" class="comentar">
                    <span>3 Comentários</span>
                </div>
                <div class="icone-funcao">
                    <img src="assets/img/compartilhar.png" alt="Compartilhar" title="Icone compartilhar" class="compartilhar">
                    <span>Compartilhar</span>
                </div>
            </div>

            <div id="comentar">
                <input name="" id="" placeholder="Digite seu comentário">
                <button type="button" id="enviarComentario">
                    <img src="assets/img/navigation.png" alt="">
                </button>
            </div>
        </div>
        `;

    } else if (tbl_post_media.length === 1) {
        corpo.innerHTML =
        `
        <div class="post">
            <div class="parte-superior">
                <div class="info-ong">
                    <img src="${tbl_ong.foto}" alt="${tbl_ong.nome}" title="${tbl_ong.nome}">

                    <div class="info-nome-data">
                        <h2>${tbl_ong.nome}</h2>
                        <span>${dataFormat}</span>
                    </div>
                </div>

                <img src="assets/img/mais-sobre-postagem.png" alt="Mais sobre {nomeDaOng}" title="Icone more horizontal">
            </div>

            <div class="imagens-postadas">
                <img src="${tbl_post_media[0].url}" class="principal"  alt="{NomeDoPost}" title="Imagem do postagens">

                <div class="imagens-complementos">
                </div>
            </div>

            <p>
                ${descricao}
            </p>

            <div class="interacoes">
                <div class="icone-funcao">
                    <img src="assets/img/curtir-sem-preencimento.png" alt="Curtiram" title="Icone curtir" class="curtir">
                    <span>28.5k Curtiram</span>
                </div>
                <div class="icone-funcao">
                    <img src="assets/img/comentario-post-feed.png" alt="Comentar" title="Icone comentar" class="comentar">
                    <span>3 Comentários</span>
                </div>
                <div class="icone-funcao">
                    <img src="assets/img/compartilhar.png" alt="Compartilhar" title="Icone compartilhar" class="compartilhar">
                    <span>Compartilhar</span>
                </div>
            </div>

            <div id="comentar">
                <input name="" id="" placeholder="Digite seu comentário">
                <button type="button" id="enviarComentario">
                    <img src="assets/img/navigation.png" alt="">
                </button>
            </div>
        </div>
        `;
    } else if (tbl_post_media.length === 2) {
        corpo.innerHTML =
        `
        <div class="post">
            <div class="parte-superior">
                <div class="info-ong">
                    <img src="${tbl_ong.foto}" alt="${tbl_ong.nome}" title="${tbl_ong.nome}">

                    <div class="info-nome-data">
                        <h2>${tbl_ong.nome}</h2>
                        <span>${dataFormat}</span>
                    </div>
                </div>

                <img src="assets/img/mais-sobre-postagem.png" alt="Mais sobre {nomeDaOng}" title="Icone more horizontal">
            </div>

            <div class="imagens-postadas">
                <img src="${tbl_post_media[0].url}" class="principal"  alt="{NomeDoPost}" title="Imagem do postagens">

                <div class="imagens-complementos">
                    <img src="${tbl_post_media[1].url}" alt="{NomeDoPost}" title="Imagem do postagens" class="cima">
                </div>
            </div>

            <p>
                ${descricao}
            </p>

            <div class="interacoes">
                <div class="icone-funcao">
                    <img src="assets/img/curtir-sem-preencimento.png" alt="Curtiram" title="Icone curtir" class="curtir">
                    <span>28.5k Curtiram</span>
                </div>
                <div class="icone-funcao">
                    <img src="assets/img/comentario-post-feed.png" alt="Comentar" title="Icone comentar" class="comentar">
                    <span>3 Comentários</span>
                </div>
                <div class="icone-funcao">
                    <img src="assets/img/compartilhar.png" alt="Compartilhar" title="Icone compartilhar" class="compartilhar">
                    <span>Compartilhar</span>
                </div>
            </div>

            <div id="comentar">
                <input name="" id="" placeholder="Digite seu comentário">
                <button type="button" id="enviarComentario">
                    <img src="assets/img/navigation.png" alt="">
                </button>
            </div>
        </div>
        `;
    } else {
        corpo.innerHTML =
        `
        <div class="post">
            <div class="parte-superior">
                <div class="info-ong">
                    <img src="${tbl_ong.foto}" alt="${tbl_ong.nome}" title="${tbl_ong.nome}">

                    <div class="info-nome-data">
                        <h2>${tbl_ong.nome}</h2>
                        <span>${dataFormat}</span>
                    </div>
                </div>

                <img src="assets/img/mais-sobre-postagem.png" alt="Mais sobre {nomeDaOng}" title="Icone more horizontal">
            </div>

            <div class="imagens-postadas">
                <img src="${tbl_post_media[0].url}" class="principal"  alt="{NomeDoPost}" title="Imagem do postagens">

                <div class="imagens-complementos">
                    <img src="${tbl_post_media[1].url}" alt="{NomeDoPost}" title="Imagem do postagens" class="cima">
                    <img src="${tbl_post_media[2].url}" class="baixo">
                </div>
            </div>

            <p>
                ${descricao}
            </p>

            <div class="interacoes">
                <div class="icone-funcao">
                    <img src="assets/img/curtir-sem-preencimento.png" alt="Curtiram" title="Icone curtir" class="curtir">
                    <span>28.5k Curtiram</span>
                </div>
                <div class="icone-funcao">
                    <img src="assets/img/comentario-post-feed.png" alt="Comentar" title="Icone comentar" class="comentar">
                    <span>3 Comentários</span>
                </div>
                <div class="icone-funcao">
                    <img src="assets/img/compartilhar.png" alt="Compartilhar" title="Icone compartilhar" class="compartilhar">
                    <span>Compartilhar</span>
                </div>
            </div>

            <div id="comentar">
                <input name="" id="" placeholder="Digite seu comentário">
                <button type="button" id="enviarComentario">
                    <img src="assets/img/navigation.png" alt="">
                </button>
            </div>
        </div>
        `;
    }

    return corpo;

}

document.getElementById("pesquisar").addEventListener("keypress", PesquisarONGs)
document.getElementById("seta-baixo").addEventListener("click", openSetaHeader);
document.getElementById("cancelar-header").addEventListener("click", closeSetaHeader);
document.querySelector("main").addEventListener("click", closeSetaHeader);
document.getElementById("postagens").addEventListener("click", openModalPostagens);
document.getElementById("modalClose").addEventListener("click", closeModalPostagens);
document.getElementById("modalCloseEvento").addEventListener("click", closeModalEvento);
document.getElementById("modalCloseVaga").addEventListener("click", closeModalVaga);
document.getElementById('files').addEventListener('change', handleFileSelect, false);
document.getElementById("files").addEventListener('change', previewImagem);
document.querySelector("#trocar-select-post")
.addEventListener(
    "change", 
    TrocarTipoPostagem
);
document.querySelector("#trocar-select-evento")
.addEventListener(
    "change", 
    TrocarTipoPostagem
);
document.querySelector("#trocar-select-vaga")
.addEventListener(
    "change", 
    TrocarTipoPostagem
);
document.getElementById("publicarPost").addEventListener("click", PostarPost);
CarregarTodosPost();