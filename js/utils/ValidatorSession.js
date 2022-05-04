const validarSession = (objetoLocalStorage) => {

    let dados;

    if (objetoLocalStorage.includes("dadosUsuario")) {
        dados = JSON.parse(localStorage.getItem('dadosUsuario'));
    } 
    else if (objetoLocalStorage.includes("dadosOng")) {
        dados = JSON.parse(localStorage.getItem('dadosOng'));
    }

    return dados;

}

export {
    validarSession
}