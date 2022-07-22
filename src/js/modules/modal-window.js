const openModal=document.querySelector("#open-modal")
const closeBtn=document.querySelector(".modal__close")
const modalPage = document.querySelector('.modal')
const logUserName = document.querySelector('.login-username')
const logPassword = document.querySelector('.login-password')
const loginErr = document.querySelectorAll('.login-error')

export function openModalPage() {
    openModal?.addEventListener("click", ()=> modalPage.classList.add('visible'))
    closeBtn?.addEventListener("click", () => {
        modalPage.classList.remove('visible')
        logUserName.value = ''
        logPassword.value = ''
        loginErr.forEach(e => {
            e.textContent = ''
        })
    })
} 