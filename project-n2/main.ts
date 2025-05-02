let watchBtn = document.querySelector(".btn") as HTMLButtonElement;
let videoEle = document.querySelector("video") as HTMLVideoElement;
let trailerContainer = document.querySelector(".trailer-container") as HTMLDivElement;
let closeBtn = document.querySelector(".close") as HTMLButtonElement;


watchBtn.addEventListener("click", event => {
    trailerContainer.classList.add("active");
    
    videoEle.play();
})

closeBtn.addEventListener('click', event => {
    trailerContainer.classList.remove("active");
    videoEle.pause();
    videoEle.currentTime = 0;
})
