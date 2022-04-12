/**
 * Função para fazer requisições a API
 * @param {string} method Método HTTP que será usado para a requisição
 * @param {string} URL URL do endpoint que será requisitado
 * @param {JSON} body (OPCIONAL) Objeto que será enviado como corpo da requisição
 * @returns {JSON} Objeto que representa a resposta da requisição
 * @example ApiRequest("POST", "http://localhost:3131/ong/pre-register", {cnpj: "12345678901234", nome: "NomeDaOng", email: "email@email.com", senha: "123456789"})
 */

 async function ApiRequest(method, URL, body = { method: "GET" }) {
    const bodyJson = JSON.stringify({...body});

    const options = {
        method: method,
        headers: {"Content-Type": "application/json"},
        body: bodyJson,
    };

    let response = await fetch(URL, options);
    return response = await response.json();
}

export default ApiRequest;
