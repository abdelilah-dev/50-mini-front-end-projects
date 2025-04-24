
let Dices = ["&#9856;", "&#9857;", "&#9858;", "&#9859;", "&#9860;"];

let dice = document.querySelector(".dice");
let rollbtn = document.querySelector(".roll-btn");
let rollhistorySection = document.querySelector(".roll-history");
let clearHistoryBtn = document.querySelector(".clear-history-btn");
let rollHistory = [];
let rollNumber = 0;

window.onload = () => {
    if (window.localStorage.rollHistory) {
        rollHistory = JSON.parse(window.localStorage.rollHistory)
        rollNumber = rollHistory[rollHistory.length - 1].id;
    }
    updateHistory();
}

rollbtn.addEventListener("click", event => {
    rollNumber++;
    RollingDice();
})
clearHistoryBtn.addEventListener("click", event => {
    rollHistory = [];
    rollNumber = 0;
    updateData();
    updateHistory();
})
function RollingDice() {
    let diceface = getRandomNum();
    dice.innerHTML = `${Dices[diceface - 1]}`;
    rollHistory.push({ id: rollNumber, face: diceface });
    updateData();
    updateHistory();
}

function updateHistory() {
    rollhistorySection.innerHTML = "";
    if (rollHistory.length === 0) {
        clearHistoryBtn.classList.remove("active")
        rollhistorySection.innerHTML = `History is Empty`
    } else {
        rollHistory.forEach((ele) => {
            clearHistoryBtn.classList.add("active")
            let li = document.createElement("li");
            li.innerHTML = `Roll ${ele.id}:<span>${Dices[ele.face - 1]}</span>`;
            rollhistorySection.appendChild(li);
        })
    }
}

function updateData() {
    window.localStorage.setItem("rollHistory", JSON.stringify(rollHistory))
}

function getRandomNum() {
    return Math.floor(Math.random() * 5) + 1
}

