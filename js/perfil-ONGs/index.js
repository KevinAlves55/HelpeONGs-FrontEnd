// import ApiRequest from "../utils/ApiRequest.js";
// import Redirect from "../utils/Redirect.js";



// let objeto = await ApiRequest("GET", "http://localhost:3131/ong");
// let userLogado;
// let ongLogado;



// function CarregarMiniPerfil(objectLocal) {

//     let nomeLogado = document.getElementById("mini-perfil-nome");
//     let fotoLogado = document.getElementById("mini-perfil-foto");

//     if (objectLocal.nome === null || objectLocal.nome === undefined) {
//         nomeLogado.innerHTML = `<a href="login.html">Login</a>  / <a href="cadastroUsuario.html">Cadastrar</a>`;
//     } else {
//         nomeLogado.innerHTML = `${objectLocal.nome}`;
//     }

//     if (objectLocal.foto === null || objectLocal.foto === undefined) {
//         fotoLogado.setAttribute("src", "../../assets/img/sem-foto.png");
//     } else if (!objectLocal.foto.includes(".jpg") || !objectLocal.foto.includes(".jpeg") || !objectLocal.foto.includes(".png") || !objectLocal.foto.includes(".svg")) {
//         fotoLogado.setAttribute("src", `../../assets/img/sem-foto.png`)
//     } else {
//         fotoLogado.setAttribute("src", `${objectLocal.foto}`);
//     }

// }
// CarregarMiniPerfil(userLogado);