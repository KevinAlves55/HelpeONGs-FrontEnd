"use strict"



const btn = document.querySelector('.lnr-eye');
btn.addEventListener('click', function() {
    const olho = document.querySelector('#password');
    if(olho.getAttribute('type') == 'password') {
        olho.setAttribute('type', 'text');
    } else {
        olho.setAttribute('type', 'password');
    }

});
export{btn};
