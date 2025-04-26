let rollingSoundEffect = new Audio("./snare-roll-84943.mp3")
let dice = document.querySelector(".dice");
let numberOfDices = document.querySelectorAll(".dice-number button");
let rollbtn = document.querySelector(".roll-btn");
let rollhistorySection = document.querySelector(".roll-history");
let clearHistoryBtn = document.querySelector(".clear-history-btn");

let Dices = ["&#9856;", "&#9857;", "&#9858;", "&#9859;", "&#9860;", "&#9861;"];
let [rollHistory, diceCount] = [[], 1];
let rollNumber = 0;
let faces = [0, 0, 0, 0, 0, 0];

window.onload = () => {
    if (window.localStorage.rollHistory) {
        rollHistory = JSON.parse(window.localStorage.rollHistory)
        rollNumber = rollHistory.length !== 0 ? rollHistory[rollHistory.length - 1].id : 0;

    }
    if (window.localStorage.facesYouFinded) faces = JSON.parse(window.localStorage.facesYouFinded).faces;
    createChart();
    updateHistory();
}

rollbtn.addEventListener("click", event => {
    let diceIcon = document.querySelectorAll(".dice span");
    rollbtn.disabled = true;
    diceIcon.forEach((e) => { e.classList.add("roll-animation") });
    numberOfDices.forEach((e) => { e.disabled = true });
    let i = 0;
    let interval = setInterval(() => {
        i += 100
        if (diceCount === 1)
            dice.firstChild.innerHTML = `${Dices[getRandomNum() - 1]}`
        else {
            dice.firstChild.innerHTML = `${Dices[getRandomNum() - 1]}`;
            dice.lastChild.innerHTML = `${Dices[getRandomNum() - 1]}`;
        }
        if (i === 1500) clearInterval(interval);
    }, 100);
    rollingSoundEffect.play();
    rollNumber++;
    RollingDice();
    setTimeout(() => {
        rollbtn.disabled = false;
        diceIcon.forEach((e) => { e.classList.remove("roll-animation") });
        numberOfDices.forEach((e) => { e.disabled = false });
    }, 1500);
})

numberOfDices.forEach((ele) => {
    ele.onclick = () => {
        numberOfDices.forEach((e) => e.classList.remove("active"));
        diceCount = +ele.dataset.value;
        if (ele.dataset.value === '1') dice.innerHTML = `<span>${Dices[Dices.length - 1]}</span>`
        else dice.innerHTML = `<span>${Dices[Dices.length - 1]}</span><span>${Dices[Dices.length - 1]}</span>`
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
    diceface.forEach((e) => {
        faces[e - 1]++;
    })
    let rollingData = {
        id: rollNumber,
        faces: diceface,
    }
    setTimeout(() => {
        dice.innerHTML = diceCount === 1 ? `<span>${Dices[diceface[0] - 1]}</span>` : `<span>${Dices[diceface[0] - 1]}</span><span>${Dices[diceface[1] - 1]}</span>`;
        updateHistory();
    }, 1500);
    rollHistory.push(rollingData);
    updateChartData(faces)
    updateData();
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
    let numOfDiceThrows = faces.reduce((acc, ele) => acc + ele);
    window.localStorage.setItem("rollHistory", JSON.stringify(rollHistory));
    window.localStorage.setItem("facesYouFinded", JSON.stringify({ faces, numOfDiceThrows}));
}

function getRandomNum() {
    return Math.floor(Math.random() * 6) + 1
}
let chart;
function createChart() {
    const ctx = document.getElementById('myChart');

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['1', '2', '3', '4', '5', '6'],
            datasets: [{
                label: 'Number of appearances of the same face',
                data: [faces[0], faces[1], faces[2], faces[3], faces[4], faces[5]],
                borderWidth: 1,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            onClick: (e) => {
            }
        }
    });
}

function updateChartData(newData) {
    if (chart) {
        chart.data.datasets[0].data = newData;
        chart.update();
    }
}
