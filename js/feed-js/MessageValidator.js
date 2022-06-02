"use strict";

const MessageValidator = (imgModal, msgModal) => {

    const modal = document.getElementById('modalMessageEvent');
    modal.classList.add('active');

    let img = document.getElementById('statusImage');
    let msg = document.getElementById('statusMessage');

    img.src = imgModal;
    msg.innerHTML = msgModal;

    if (imgModal == "assets/img/success-icon.svg") {
        document.getElementById("fechar").style.backgroundColor = '#00b300';
    } else {
        document.getElementById("fechar").style.backgroundColor = '#b30000';
    }

}

const MessageValidatorClose = () => {

    const modal = document.getElementById('modalMessageEvent');
    modal.classList.remove('active');


}

export {

    MessageValidator,
    MessageValidatorClose

}