"use strict";

import Redirect from "../utils/Redirect.js";

const openMessage = () => 
document.getElementById("modalMessage").classList.add("active");

const closeMessage = () => {
    Redirect("login");
    document.getElementById("modalMessage").classList.remove("active");
}

export {
    openMessage,
    closeMessage
};