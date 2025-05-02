var watchBtn = document.querySelector(".btn");
var videoEle = document.querySelector("video");
var trailerContainer = document.querySelector(".trailer-container");
var closeBtn = document.querySelector(".close");
watchBtn.addEventListener("click", function (event) {
    trailerContainer.classList.add("active");
    videoEle.play();
});
closeBtn.addEventListener('click', function (event) {
    trailerContainer.classList.remove("active");
    videoEle.pause();
    videoEle.currentTime = 0;
});
