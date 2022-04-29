"use strict";

import Redirect from "./Redirect.js";

const openMessage = () => 
document.getElementById("modalMessage").classList.add("active");

const closeMessage = () => {
    document.getElementById("modalMessage").classList.remove("active");
    Redirect("loginUsuario");
}

export {
    openMessage,
    closeMessage
};