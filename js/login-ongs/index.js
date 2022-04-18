'use strict' 


// import{btn} from './utils/olho.js';


let request;
console.log("Waiting request 0s:", request);
request = ApiResquest("GET", "http://localhost:3131/ong/login", ongData);
console.log("Waiting request 1s:", request);