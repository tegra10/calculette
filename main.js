"use strict";
const btns = document.querySelectorAll(".btn");
const h3 = document.querySelector("h3");

btns.forEach(btn => {
    btn.addEventListener("click", e => {
        h3.textContent += e.target.id;
    });
});

equal.addEventListener("click", () => {
    let result = eval(h3.textContent); // Utilisez h3.textContent au lieu de h3
    h3.textContent = result;
    console.log(result);
});
clear.addEventListener("click", () => {
    h3.textContent = ''
});
