var paperBtn = document.querySelector(".paper");
var rockBtn = document.querySelector(".rock");
var scissorsBtn = document.querySelector(".scissors");
var gameResult = document.querySelector(".game-result");
var totalScore = {
    userScore: document.querySelector(".user-score"),
    computerScore: document.querySelector(".computer-score"),
};
var choosenBtns = document.querySelectorAll(".btns > span");
var choise;
(function (choise) {
    choise["rock"] = "rock";
    choise["paper"] = "paper";
    choise["scissors"] = "scissors";
})(choise || (choise = {}));
;
var allGuess = [choise.rock, choise.paper, choise.scissors];
choosenBtns.forEach(function (ele) {
    ele.addEventListener("click", function (event) {
        var target = event.target;
        var playerChoice = target.className;
        var computerChoice = allGuess[randomNum()];
        checkTheWinner(playerChoice, computerChoice);
    });
});
function checkTheWinner(playerChoice, computerChoice) {
    var winner = "";
    if (playerChoice) {
        if ((playerChoice === "paper" && computerChoice === "rock") ||
            (playerChoice === "scissors" && computerChoice === "paper") ||
            (playerChoice === "rock" && computerChoice === "scissors")) {
            winner = "player";
        }
        else {
            winner = "computer";
        }
        updateResult(winner, playerChoice, computerChoice);
        updateScore(winner);
    }
}
function updateResult(winner, player, computer) {
    if (winner === "player")
        gameResult.innerHTML = "You Win! ".concat(player, " beats ").concat(computer);
    else
        gameResult.innerHTML = "You Lose! ".concat(computer, " beats ").concat(player);
}
function updateScore(winner) {
    if (winner === "player")
        totalScore.userScore.innerHTML = "".concat(+totalScore.userScore.innerHTML + 1);
    else
        totalScore.computerScore.innerHTML = "".concat(+totalScore.computerScore.innerHTML + 1);
}
function randomNum() {
    return Math.floor(Math.random() * allGuess.length);
}
