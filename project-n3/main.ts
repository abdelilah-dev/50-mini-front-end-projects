let paperBtn = document.querySelector(".paper") as HTMLSpanElement;
let rockBtn = document.querySelector(".rock") as HTMLSpanElement;
let scissorsBtn = document.querySelector(".scissors") as HTMLSpanElement;
let gameResult = document.querySelector(".game-result") as HTMLParagraphElement;
let totalScore = {
    userScore: document.querySelector(".user-score") as HTMLSpanElement,
    computerScore: document.querySelector(".computer-score") as HTMLSpanElement,
};
let choosenBtns = document.querySelectorAll(".btns > span");

enum choise {
    rock = "rock",
    paper = "paper",
    scissors = "scissors"
};

let allGuess: choise[] = [choise.rock, choise.paper, choise.scissors];

choosenBtns.forEach((ele) => {
    ele.addEventListener("click", event => {
        let target = event.target as HTMLSpanElement;
        let playerChoice: string = target.className;
        let computerChoice: string = allGuess[randomNum()];
        checkTheWinner(playerChoice, computerChoice);
    })
})

function checkTheWinner(playerChoice: string, computerChoice: string): void {
    let winner: string = "";
    if (playerChoice) {
        if ((playerChoice === "paper" && computerChoice === "rock") ||
            (playerChoice === "scissors" && computerChoice === "paper") ||
            (playerChoice === "rock" && computerChoice === "scissors")) {
            winner = "player";
        } else {
            winner = "computer";
        }
        updateResult(winner, playerChoice, computerChoice);
        updateScore(winner);
    }
}
function updateResult(winner: string, player: string, computer: string) {
    if (winner === "player") gameResult.innerHTML = `You Win! ${player} beats ${computer}`
    else gameResult.innerHTML = `You Lose! ${computer} beats ${player}`
}
function updateScore(winner: string) {
    if (winner === "player") totalScore.userScore.innerHTML = `${+totalScore.userScore.innerHTML + 1}`;
    else totalScore.computerScore.innerHTML = `${+totalScore.computerScore.innerHTML + 1}`;
}

function randomNum(): number {
    return Math.floor(Math.random() * allGuess.length);
}
