"use strict";
let paperBtn = document.querySelector(".paper");
let rockBtn = document.querySelector(".rock");
let scissorsBtn = document.querySelector(".scissors");
let choosenBtns = document.querySelectorAll(".btns > span");
choosenBtns.forEach((ele) => {
    ele.onclick = () => {
        console.log(ele);
    };
});
