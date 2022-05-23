"use strict"

function LimparForm() {
    
    document.getElementById("estado").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("rua").value = "";
    document.getElementById("bairro").value = "";

}

function PreencherForm(endereco) {

    document.getElementById("estado").value = endereco.uf;
    document.getElementById("cidade").value = endereco.localidade;
    document.getElementById("rua").value = endereco.logradouro;
    document.getElementById("bairro").value = endereco.bairro;

}

const isNumber = (numero) => /^[0-9]+$/.test(numero)

const CepValido = (cep) => 
cep.length === 8 && isNumber(cep);

const PesquisarCep = async ({target}) => {

    LimparForm();
    
    const cep = target.value;

    if (cep === "") {

        document.getElementById("estado").value = "";
    
    } else {

        const url = `https://viacep.com.br/ws/${cep}/json/`;

        if (CepValido(cep)) {

            let req = await fetch(url);
            const dadosEndereco = await req.json();

            if (dadosEndereco.hasOwnProperty("erro")) {
               
                document.getElementById("estado").value = "CEP não encontrado";
            
            } else {
                
                PreencherForm(dadosEndereco);
                return true;
            
            }

        } else {
            
            document.getElementById("estado").value = "CEP incorreto";
            return false;
        
        }
    }
}

export {
    PesquisarCep
}