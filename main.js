
let projectItems = document.querySelectorAll(".project-item");
projectItems.forEach((ele, index) => {
    ele.style.backgroundImage = `url('./project-n${index + 1}/preview.jpg')`;
})
