let rollingSoundEffect = new Audio("./snare-roll-84943.mp3")
let dice = document.querySelector(".dice");
let numberOfDices = document.querySelectorAll(".dice-number button");
let rollbtn = document.querySelector(".roll-btn");
let rollhistorySection = document.querySelector(".roll-history");
let clearHistoryBtn = document.querySelector(".clear-history-btn");

let Dices = ["&#9856;", "&#9857;", "&#9858;", "&#9859;", "&#9860;", "&#9861;"];
let [rollHistory, diceCount] = [[], 1];
let rollNumber = 0;

window.onload = () => {
    if (window.localStorage.rollHistory) {
        rollHistory = JSON.parse(window.localStorage.rollHistory)
        rollNumber = rollHistory[rollHistory.length - 1].id;
    }
    updateHistory();
}

rollbtn.addEventListener("click", event => {
    rollingSoundEffect.play();
    rollbtn.disabled = true;
    rollNumber++;
    RollingDice();
    setTimeout(() => {
        rollbtn.disabled = false;
    }, 1500);
})

numberOfDices.forEach((ele) => {
    ele.onclick = () => {
        numberOfDices.forEach((e) => e.classList.remove("active"));
        diceCount = +ele.dataset.value;
        ele.classList.add("active");
    }
})


clearHistoryBtn.addEventListener("click", event => {
    rollHistory = [];
    rollNumber = 0;
    updateData();
    updateHistory();
})


function RollingDice() {
    let diceface = diceCount === 2 ? [getRandomNum(), getRandomNum()] : [getRandomNum()];
    let rollingData = {
        id: rollNumber,
        faces: diceface,
    }
    dice.innerHTML = diceCount === 1 ? `${Dices[diceface[0] - 1]}` : `<span>${Dices[diceface[0] - 1]}</span><span>${Dices[diceface[1] - 1]}</span>`;
    rollHistory.push(rollingData);
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
            if (ele.faces.length === 1) {
                li.innerHTML = `Roll ${ele.id}:<div><span>${Dices[ele.faces[0] - 1]}</span></div>`;
            } else {
                li.innerHTML = `Roll ${ele.id}:<div><span>${Dices[ele.faces[0] - 1]}</span><span>${Dices[ele.faces[1] - 1]}</span></div>`;
            }
            rollhistorySection.appendChild(li);
        })
    }
}

function updateData() {
    window.localStorage.setItem("rollHistory", JSON.stringify(rollHistory))
}

function getRandomNum() {
    return Math.floor(Math.random() * 6) + 1
}

