const btn = document.querySelector("#send");

btn.addEventListener("click", function(e){

    e.preventDefault();

    const cnpj = document.querySelector("#cnpj").value;
    const email = document.querySelector("#email").value;
    const senha = document.querySelector("#senha").value;
    

    const value = {
        cnpj: cnpj,
        email: email,
        senha: senha
    };
  

    console.log(value);

});

function validar(){

    var senha = form.senha.value;
    var confirmarSenha = form.confirmarSenha.value;

    if(senha == "" || senha.length <= 5) {
        alert('Preencha o campo senha com minimo 6 caracteres');
        form.senha.focus();
        return false;
    }

    if(confirmarSenha == "" || confirmarSenha.length <= 5) {
        alert('Preencha o campo senha com minimo 6 caracteres');
        form.confirmarSenha.focus();
        return false;
    }

    if (senha != confirmarSenha) {
        alert('Senhas diferentes');
        form.senha.focus();
        return false;
    }
}