import { deleteBookById } from "./http-requests.js"

const deleteBtn = document.querySelector('.delete-book')
const closeDeleteBtn=document.querySelector(".moadl-delete-close")
const modalDeletePage = document.querySelector('.modal-delete')
const bookDelete = document.querySelector('.book-delete')
const deleteBookInUpdateModal = document.querySelector('.delete-btn_update-modal')
const loaderBox = document.querySelector('.loader-box')

export function openDeleteModalPage() {
    closeDeleteBtn?.addEventListener("click", () => modalDeletePage.classList.remove('visible'))
    deleteBookInUpdateModal?.addEventListener('click', ()=> modalDeletePage.classList.add('visible') )
} 

export const deleteBook = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    bookDelete?.addEventListener('click', () =>{
        loaderBox.classList.remove('hidden')
        bookDelete.classList.add('hidden')
        setTimeout(async () => {
            const deleteRequest = await deleteBookById(id)
        
            if(deleteRequest) {
                modalDeletePage.classList.remove('visible')
                window.location.href = '/src/home.html'
            }
        }, 2000);
    })
    deleteBtn?.addEventListener('click', () => {
        modalDeletePage.classList.add('visible')
    })
}