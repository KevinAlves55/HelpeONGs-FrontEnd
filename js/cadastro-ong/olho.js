"use strict";

const password = document.getElementById("senha");
const passwordDto = document.getElementById("confirmarSenha");
const eyeImg = document.getElementById("eyeImg");
const eyeImgConfirm = document.getElementById("eyeConfirmImg");

function eyeClickConfirm() {

    let inputTypeIsPasswordConfirm = passwordDto.type == "password";

    if (inputTypeIsPasswordConfirm) {
        showPasswordConfirm()
    } else {
        hidePasswordConfirm();
    }

}

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

function showPasswordConfirm() {
    
    passwordDto.setAttribute("type", "text");
    eyeImgConfirm.setAttribute("src", "../../assets/img/eye-off.png");

}

function hidePasswordConfirm() {
    
    passwordDto.setAttribute("type", "password");
    eyeImgConfirm.setAttribute("src", "../../assets/img/eye.png");

}