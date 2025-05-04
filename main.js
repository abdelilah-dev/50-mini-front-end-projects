let projectList = document.querySelector(".container ul")

window.onload = function () {
    updateDom();
}

async function updateDom() {
    let allProjects = await fetchData();
    allProjects.forEach(project => {
        let li = document.createElement("li");
        li.className = "project-item";
        let div = document.createElement("div");
        div.className = "box";
        div.innerHTML = `
            <a href="${project.previewLink}">${project.title}</a>
            <p>${project.description}</p>
        ` ;
        li.appendChild(div);
        li.style.backgroundImage = `url("${project.previewImg}")`;
        projectList.appendChild(li);
    })
}

async function fetchData() {
    return fetch("./projectData.json").then(response => response.json());
}
