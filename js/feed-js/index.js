import ApiRequest from "../utils/ApiRequest.js";
import Redirect from "../utils/Redirect.js";
import { validarSession } from "../utils/ValidatorSession.js";
import { openSetaHeader, closeSetaHeader } from "../utils/MiniOpMenu.js";
import { openModalPostagens } from "./modalPostagens.js";

let objeto = await ApiRequest("GET", "http://localhost:3131/ong");
let userLogado;
let ongLogado;

if (localStorage.hasOwnProperty('dadosUsuario') !== false) {
    
    userLogado = validarSession("dadosUsuario");

    const controlNone = () => document.getElementById("control").style.display = "none";
    controlNone();

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
    CarregarMiniPerfil(userLogado);

} else if (localStorage.hasOwnProperty('dadosOng') !== false) {

    ongLogado = validarSession("dadosOng");

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
        } else if (!objectLocal.foto.includes(".jpg") && !objectLocal.foto.includes(".jpeg") && !objectLocal.foto.includes(".png") && !objectLocal.foto.includes(".svg")) {
            fotoLogado.setAttribute("src", `../../assets/img/sem-foto.png`);
            fotoHeader.setAttribute("src", "../../assets/img/sem-foto.png");
        } else {
            fotoLogado.setAttribute("src", `${objectLocal.foto}`);
            fotoHeader.setAttribute("src", `${objectLocal.foto}`);
        }
    
    }
    CarregarMiniPerfil(ongLogado);

} else {

    Redirect("cadastroUsuario");

}

function trocarTipoPostagem({target}) {

    // let opcaoValor = target.options[target.selectedIndex].value;
    // alert("teste");

    // if (opcaoValor === "P") {
    //     document.getElementById("postagem-post").classList.add("active");
    //     document.getElementById("postagem-evento").classList.remove("active");
    // } else if (opcaoValor === "E") {
    //     document.getElementById("postagem-post").classList.remove("active");
    //     document.getElementById("postagem-evento").classList.add("active");
    // }

}

document.getElementById("seta-baixo").addEventListener("click", openSetaHeader);
document.getElementById("cancelar-header").addEventListener("click", closeSetaHeader);
document.querySelector("main").addEventListener("click", closeSetaHeader);
document.getElementById("criar-postagem").addEventListener("click", openModalPostagens);
// document.querySelector(".trocar-select").addEventListener("click", trocarTipoPostagem);

const selectElement = document.querySelector('.trocar-select');

selectElement.addEventListener('change', (event) => {
  const teste = event.target.value;
  console.log(teste);

  if (teste === "P") {
      console.log("POST");
    //   post.innerHTML = `

    //   `;
    document.getElementById("postEvent").style.opacity = "0";
    document.getElementById("postEvent").style.zIndex = "-1";
    document.getElementById("postModal").style.opacity = "1";
    document.getElementById("postModal").style.zIndex = "999";
    // document.getElementById("postEvent").classList.remove("active");
    // document.getElementById("postModal").classList.add("active");
} else if (teste === "E") {
    console.log("EVENTO");
    document.getElementById("postModal").style.opacity = "0";
    document.getElementById("postModal").style.zIndex = "-1";
    document.getElementById("postEvent").style.opacity = "1";
    document.getElementById("postEvent").style.zIndex = "999";
    // document.getElementById("postModal").classList.remove("active");
    // document.getElementById("postEvent").classList.add("active");
}
  
});