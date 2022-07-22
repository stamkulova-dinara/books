import { getAllBooks } from "./books.js"
import { createBooks } from "./http-requests.js"

const modalEditBook = document.querySelector('.modal__add-book')
const editBookClose = document.querySelector('.modal__add-book-close')
const openModalAddBook = document.querySelector('#open__add-book-modal')
const formAddBook = document.querySelector('.form-add-book')
const bookName = document.querySelector('.create-name')
const bookYear = document.querySelector('.create-year')
const bookPages = document.querySelector('.create-pages')
const bookGenres = document.querySelector('.create-genres')
const bookLanguage = document.querySelector('.create-language')
const bookAuthor = document.querySelector('.craete-author')
const bookHouse = document.querySelector('.create-house')
const createBookBtn = document.querySelector('.create-book__btn')
const successText = document.querySelector('.success-text')

export const addBookModal = () => {
    openModalAddBook?.addEventListener('click', () => modalEditBook.classList.add('visible'))
    editBookClose?.addEventListener('click', () => modalEditBook.classList.remove('visible'))
}

export const createBook = () => {
    formAddBook?.addEventListener('submit', e => {
        e.preventDefault()
        createBookBtn.textContent = "loading in progress..."
        createBookBtn.classList.add('success')
        let bookInfo = {
            name: bookName.value,
            author: bookAuthor.value,
            publishYear: Number(bookYear.value),
            publishHouse: bookHouse.value,
            pagesNumber:Number(bookPages.value),
            genres: [bookGenres.value],
            originalLanguage:bookLanguage.value
        }
        setTimeout(async() => {
            const data = await createBooks(bookInfo)
            if (data) {
                successText.classList.remove('hidden')
                setTimeout(() => {
                    modalEditBook.classList.remove('visible')
                    getAllBooks()
                    createBookBtn.textContent = "Save"
                    createBookBtn.classList.remove('success')
                    successText.classList.add('hidden')
                    bookName.value = ''
                    bookAuthor.value = ''
                    bookYear.value = ''
                    bookHouse.value = ''
                    bookPages.value = ''
                    bookGenres.value = ''
                    bookLanguage.value = ''
                }, 900);
            }
        }, 1000);
    })
}