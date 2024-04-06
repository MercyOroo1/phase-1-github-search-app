document.addEventListener("DOMContentLoaded",()=> {
    const form = document.querySelector ("form")
    console.log (form)
    form.addEventListener('submit', (e)=> {
        // adding the submit event to the form
        e.preventDefault()
        // to prevent form from refreshing
        const input = document.querySelector("input#search")
        //console.log(input.value)
        fetch (`https://api.github.com/search/users?q=${input.value}`)
        //the client sends a fetch response to obtain a matching name from the server
        .then (res => res.json())
         .then (data => {
            //for each name that is brought back,it is appended to the user list and displayed 
       data.items.forEach(item => { 
        let p = document.createElement("h1")
        p.textContent= item.login
        let avatar = document.createElement("img")
        avatar.src = item.avatar_url
        let link = document.createElement("a")
        link.href = item.url
        link.textContent = "My Profile"
        let userList = document.querySelector("#user-list")
        
        userList.appendChild(p)
        userList.appendChild(avatar)
        userList.appendChild(link)
        avatar.addEventListener("click", (e)=> {
            //when an image is clicked, another fetch request is sent to the server to obtain data on repositories
           fetch (`https://api.github.com/users/${item.login}/repos`,)
           .then (res => res.json())
           .then (repos => {
            console.log(repos)
            let header = document.createElement("h1")
            //Each user is assigned their repositories with a heading
            header.textContent = `${item.login}'s Repositories`
            let repoList = document.querySelector("#repos-list")
            repoList.appendChild(header)
            repos.forEach(repo => {
                //for each repository that is brought back, its name is assigned to an element which is then appended to the repositories list
            let list = document.createElement("li")
            list.innerHTML =  `${repo.name}`
                        repoList.appendChild(list)
            
        })
        
         })
        })
        
        })
       })
        form.reset() 
        //form resets after the submit button is pressed 
         })


    })
