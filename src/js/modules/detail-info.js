import { getBooksById, updateBook } from "./http-requests.js";

const bookTitle = document.querySelector('.book-title')
const bookAuthor = document.querySelector('.book-author')
const bookHouse = document.querySelector('.book-house')
const bookLanguage = document.querySelector('.book-language')
const bookYear = document.querySelector('.book-year')
const bookPages = document.querySelector('.book-pages')
const bookGenres = document.querySelector('.book-genres')
const likeImg = document.querySelector('.like-img')
const back = document.querySelector('.back-icon')

export const getInfoById = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (id) {
        const bookData = async () => {
            likeImg ? likeImg.innerHTML = '' : null

            const data = await getBooksById(id)
            bookTitle.textContent = data.name
            bookAuthor.textContent = data.author
            bookHouse.textContent = data.publishHouse
            bookLanguage.textContent = data.originalLanguage
            bookYear.textContent = data.publishYear
            bookPages.textContent = data.pagesNumber
            bookGenres.textContent = data.genres
            let favorite = document.createElement('img')
            favorite.src = data.isFavorite ? '/src/assets/icons/like.svg' : '/src/assets/icons/unlike.svg'
            likeImg.prepend(favorite)

            favorite?.addEventListener('click', () => {
                const favData = async () => {
                    let a = await updateBook(id, {
                        isFavorite: !data.isFavorite 
                    })
                    console.log(a);
                }
                favData()
                setTimeout(() => {
                    getInfoById()
                });
            })
            
        }
        bookData()
    }
    back?.addEventListener('click', () => window.location.href = '/src/home.html')
}