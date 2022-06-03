"use strict";

const CheckWindow = () => {

    const windowThis = window.location.href;

    if (windowThis.includes("feed")) {

        const feed = document.getElementById("feedLink");
        const barraActivity = document.getElementById("barraFeed");
        const feedActivity = document.getElementById("feedActivity");
        feed.style.color = "#FF9F45";
        feed.style.fontWeight = "600";
        feedActivity.style.backgroundColor = "#F8F9FA";
        barraActivity.classList.add("active");

    } else if (windowThis.includes("doacoesONGs")) {

        const donate = document.getElementById("donateLink");
        const barraActivity = document.getElementById("barraDonate");
        const donateActivity = document.getElementById("donateActivity");
        donate.style.color = "#FF9F45";
        donate.style.fontWeight = "600";
        donateActivity.style.backgroundColor = "#F8F9FA";
        barraActivity.classList.add("active");

    } else if (windowThis.includes("perfilONGs")) {

        const profile = document.getElementById("profileLink");
        const barraActivity = document.getElementById("barraProfile");
        const profileActivity = document.getElementById("profileActivity");
        profile.style.color = "#FF9F45";
        profile.style.fontWeight = "600";
        profileActivity.style.backgroundColor = "#F8F9FA";
        barraActivity.classList.add("active");


    } else if (windowThis.includes("perfilUsuario")) {

        const profile = document.getElementById("profileLink");
        const barraActivity = document.getElementById("barraProfile");
        const profileActivity = document.getElementById("profileActivity");
        profile.style.color = "#FF9F45";
        profile.style.fontWeight = "600";
        profileActivity.style.backgroundColor = "#F8F9FA";
        barraActivity.classList.add("active");

    } else if (windowThis.includes("controles")) {

        const control = document.getElementById("controlLink");
        const barraActivity = document.getElementById("barraControl");
        const controlActivity = document.getElementById("control");
        control.style.color = "#FF9F45";
        control.style.fontWeight = "600";
        controlActivity.style.backgroundColor = "#F8F9FA";
        barraActivity.classList.add("active");


    }

}

export {
    CheckWindow
}