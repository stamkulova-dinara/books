import { Login } from "./http-requests.js"

const logUserName = document.querySelector('.login-username')
const logPassword = document.querySelector('.login-password')
const formLogin = document.querySelector('#form-login')
const loginBtn = document.querySelector('.login-btn')
const loginErr = document.querySelectorAll('.login-error')

export const login = () => {
    formLogin?.addEventListener('submit', e => {
        e.preventDefault()

        let loginUser = {
            username: logUserName.value,
            password: logPassword.value
        }
        loginBtn.textContent = "loading in progress..."
        loginBtn.classList.add('success')
        setTimeout(async () => {
            await Login(loginUser)
            .then(res => {
                if (res.token) {
                    localStorage.setItem('token', JSON.stringify(res.token))
                    window.location.href = '/src/home.html'
                } else {
                    loginErr.forEach(e => {
                        e.textContent = res
                    })
                    return
                }
            })
            loginBtn.textContent = "SIGN IN"
            loginBtn.classList.remove('success')
        }, 2000);
    })
}