import ApiRequest from "../utils/ApiRequest.js";
import Redirect from "../utils/Redirect.js";

const endpoint = "http://localhost:3131/user/1";
// verbo = PUT
const corpoexemplo = {
    nome: "String",
    email: "String",
}

const request = ApiRequest("GET", endpoint, corpoexemplo)