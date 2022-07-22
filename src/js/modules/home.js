import { getMe } from "./http-requests.js"

const user = document.querySelector('.user-name')
const signout = document.querySelector('.signout')

export const me = () => {
    if (user) {
        const data = async () => {
            const me = await getMe()
            user.textContent = me.username 
        }
        data()
    }

    signout?.addEventListener('click', () => {
        window.location.href = '/src/index.html'
        localStorage.removeItem('token')
    })
}