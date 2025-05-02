let paperBtn = document.querySelector(".paper") as HTMLSpanElement;
let rockBtn = document.querySelector(".rock") as HTMLSpanElement;
let scissorsBtn = document.querySelector(".scissors") as HTMLSpanElement;

let choosenBtns = document.querySelectorAll(".btns > span");

choosenBtns.forEach((ele) => {
    ele.onclick = () => {
        console.log(ele);
    }

})
