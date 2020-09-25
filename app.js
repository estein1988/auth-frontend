let form = document.querySelector('#auth-form')
let loginButton = document.querySelector('#login-button')
let logoutButton = document.querySelector('#logout-button')
let baseURL = 'http://localhost:3000/'
let token = localStorage.token

if(token){
    authorizeUser(token)
}

form.addEventListener('submit', (event) => signup(event, 'users'))
loginButton.addEventListener('click', event => signup(event, 'login'))
logoutButton.addEventListener('click', logout)

function logout(){
    localStorage.removeItem('token')
}

function authorizeUser(token){
    fetch(baseURL + 'profile', {
        method: "GET",
        headers: {
            "Content-type": 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(result => {
    console.log(result)
        if (!result.message){
            document.body.innerHTML = `<h1>${result.username}</h1>`
        }
    })
}

function signup(event, path) {
    event.preventDefault()

    let formData = new FormData(form)
    let username = formData.get('username') //name of inputs
    let password = formData.get('password') 

    let user = {
        username,
        password
    }

    fetch(baseURL + path, {
        method: "POST",
        headers: {
            "Content-type": 'application/json'
        },
        body: JSON.stringify( user ) //if have strong params MUST be an opject
    })
    .then(response => response.json())
    .then(result => {
        if(path === 'login'){
            login(result)
        }
    })
}

function login({user, token}){
    console.log(user, token)
    localStorage.setItem('token', token)
}