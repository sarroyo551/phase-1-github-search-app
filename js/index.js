const gitHubForm = document.getElementById("github-form");
const inputSearch = document.getElementById("search");
const userList = document.getElementById('user-list');
const reposList = document.getElementById('repos-list')

function search(e) {
  e.preventDefault();

  fetch(`https://api.github.com/search/users?q=${inputSearch.value}`)
    .then((r) => r.json())
    .then((d) => {
        //console.log(d)
    userList.innerHTML = ''  
      d.items.forEach((person) => {
        const data = {
          name: person.login,
          gitHubLink: person.html_url,
          avatar: person.avatar_url,
        };

        renderPeople(data)
      });
    });
}

document.addEventListener("DOMContentLoaded", () => {
  gitHubForm.addEventListener("submit", search);
});

function renderPeople (people) {

    let peopleDiv = document.createElement('div')
    //peopleDiv.id = 'peopleDiv'
    peopleDiv.addEventListener('click', () => {
      fetch(`https://api.github.com/users/${people.name}/repos`)
      .then((r) => r.json())
      .then((d) => {
        reposList.innerText = ''
        d.forEach(renderProject)
      })
    })

    let paraOne = document.createElement('p')
    //paraOne.id = 'paraOne'
    paraOne.innerText = people.name

    let paraTwo = document.createElement('p')
    //paraTwo.id = 'paraTwo'
    paraTwo.innerText = people.gitHubLink

    let paraThree = document.createElement('img')
    //paraThree.id = 'paraThree'
    paraThree.src = people.avatar

    peopleDiv.append(paraOne, paraTwo, paraThree)

    userList.appendChild(peopleDiv)
}

function renderProject (project) {
  let projectDiv = document.createElement('div')

  projectDiv.innerText = project.full_name

  reposList.appendChild(projectDiv)


}