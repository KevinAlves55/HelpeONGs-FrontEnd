"use strict";

const password = document.getElementById("senha");
const eyeImg = document.getElementById("eyeImg");

function eyeClick() {
    
    let inputTypeIsPassword = password.type == "password";

    if (inputTypeIsPassword) {
        showPassword()
    } else {
        hidePassword();
    }

}

function showPassword() {
    
    password.setAttribute("type", "text");
    eyeImg.setAttribute("src", "../../assets/img/eye-off.png");

}

function hidePassword() {
    
    password.setAttribute("type", "password");
    eyeImg.setAttribute("src", "../../assets/img/eye.png");

}