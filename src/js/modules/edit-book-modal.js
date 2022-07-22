import { getInfoById } from "./detail-info.js"
import { getBooksById, updateBook } from "./http-requests.js"

const openEditBook=document.querySelector("#open__edit-book")
const close=document.querySelector(".edit-book-modal__close")
const modalEditBook = document.querySelector('.edit-book-modal')
const updateForm = document.querySelector('.update-form')
const updateName = document.querySelector('.update-name')
const updateAuthor = document.querySelector('.update-author')
const updateYear = document.querySelector('.update-year')
const updateHouse = document.querySelector('.update-house')
const updatePages = document.querySelector('.update-pages')
const updateGenres = document.querySelector('.update-genres')
const updateLanguage = document.querySelector('.update-language')
const editBookModalHeader = document.querySelector('.edit-book-modal__header')
const likeImg = document.querySelector('.like-img')

export function openModalEditBook() {
    openEditBook?.addEventListener("click", async ()=> {
        modalEditBook.classList.add('visible')
        s()
    })
    close?.addEventListener("click", () => {
        modalEditBook.classList.remove('visible')
        getInfoById()
    })
} 

export async function s() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const res = await getBooksById(id)
    update(res)
}

export const update = (currentInfo) => {
    editBookModalHeader.innerHTML = ''
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (modalEditBook) {
        updateName.value = currentInfo.name
        updateAuthor.value = currentInfo.author
        updateYear.value = currentInfo.publishYear
        updateHouse.value = currentInfo.publishHouse
        updatePages.value = currentInfo.pagesNumber
        updateGenres.value = currentInfo.genres
        updateLanguage.value = currentInfo.originalLanguage   
    }

    let favoriteImg = document.createElement('img')
    favoriteImg.src = currentInfo.isFavorite ? '/src/assets/icons/like.svg' : '/src/assets/icons/unlike.svg'

    favoriteImg?.addEventListener('click', async () => {
        const res = await updateBook(id, {isFavorite : !currentInfo.isFavorite})
        s()
        console.log(res);
    })

    editBookModalHeader.append(favoriteImg)
    
    updateForm?.addEventListener('submit', e => {
        e.preventDefault()
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        let newInfo = {
            name: updateName.value,
            author: updateAuthor.value,
            publishYear: Number(updateYear.value),
            publishHouse: updateHouse.value,
            pagesNumber: Number(updatePages.value),
            genres: [updateGenres.value],
            originalLanguage:updateLanguage.value
        }

        const updated = async () => {
            const updateData = await updateBook(id, newInfo)
            if (updateData) {
                setTimeout(() => {
                    modalEditBook.classList.remove('visible')
                    getInfoById()
                    likeImg ? likeImg.innerHTML = '' : null
                });
            }
        }
        updated()

        
    })
}