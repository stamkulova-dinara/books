import { signUpPost } from "./http-requests.js"

const name = document.querySelector('.name')
const password = document.querySelector('.password')
const form = document.getElementById('form')
const firstName = document.querySelector('.firstName')
const age = document.querySelector('.age')
const nameError = document.querySelector('.name-error')
const err = document.querySelectorAll('.error')
const password2 = document.querySelector('.try-password')
const passwordErr = document.querySelectorAll('.password-error')
const inputs = document.querySelectorAll('.form__input')
const signinBtn = document.querySelector('.signin-btn')

export function signin() {
    const nameErr = () => {
            if(name.value.length < 3) {
                nameError.textContent = 'length shoulbe be at least 3 characters*'
                name.classList.add('inp-err')
            } else {
                nameError.textContent = ''
                name.classList.remove('inp-err')
            }
    };

    const checkPass = () => {
        if(password.value !== password2.value) {
            passwordErr.forEach(el => {
                el.textContent = 'password do not match'
            })
            password.classList.add('inp-err')
            password2.classList.add('inp-err')
            return false
        } else {
            passwordErr.forEach(el => {
                el.textContent = ''
            })
            password.classList.remove('inp-err')
            password2.classList.remove('inp-err')
            return true
        }
    }

    const check = () => {
        if (checkPass() && name.value.length > 3) {
            signinBtn.textContent = "loading in progress..."
            signinBtn.classList.add('success')

            let info = {
                username: name.value,
                password: password.value,
                firstName: firstName.value,
                age: age.value
            }
            setTimeout(async () => {
                const response = await signUpPost(info) 
                console.log(response, "stat");
                    // if (response !== null) {
                    //     localStorage.setItem('token', JSON.stringify(response.token))
                    // }
                    if (response) {
                        localStorage.setItem('token', JSON.stringify(response.token))
                        window.location.href = '/src/home.html'
                    }
            }, 1000);
    
        }
    }
    form?.addEventListener('submit', e => {
        e.preventDefault()
        check()
        nameErr()
        err.forEach(e => {
            e?.addEventListener('input', () => {
                nameErr([name, firstName])
            })
        })
        console.log(checkPass());
        // let info = {
        //     username: name.value,
        //     password: password.value,
        //     firstName: firstName.value,
        //     age: age.value
        // }
        // const data = async () => {
        //     const response = await signUpPost(info) 
        //     console.log(response, "stat");
        //     if (response !== null) {
        //         localStorage.setItem('token', JSON.stringify(response.token))
        //         // window.location.href = '/src/home.html'
        //     }
        // }
        // data()
        // console.log(data());
    })

}