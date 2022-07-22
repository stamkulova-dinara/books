import { deleteBookById, getBooks, updateBook } from "./http-requests.js";

const cards = document.querySelector(".home-cards");
const modalDeletePage = document.querySelector(".modal-delete");
const bookDelete = document.querySelector(".book-deletes");
const loaderBox = document.querySelector('.loader-box')
const booksNo = document.querySelector('.no-books')

export const getAllBooks = async () => {
    if (cards) {
        const arrBooks = await getBooks();
        books(arrBooks);
    }
};

export const books = (arrBooks) => {
  if (  arrBooks.length !== 0){
  cards.innerHTML = "" 
    arrBooks?.map((el) => {
    let card = document.createElement("a");
    card.href = `/src/detail-info.html?id=${el.id}`;
    card.classList.add("home-card");
    cards ? cards.prepend(card) : null;
    let div = document.createElement("div");
    let div2 = document.createElement("div");
    let ela = document.createElement("h3");
    ela.textContent = el.name;
    let favorite = document.createElement("img");
    let del = document.createElement("img");
    del.src = "/src/assets/icons/delete.svg";
    del.setAttribute("id", el.id);
    favorite.src = el.isFavorite
      ? "/src/assets/icons/like.svg"
      : "/src/assets/icons/unlike.svg";
    let author = document.createElement("p");
    author.textContent = el.author;
    favorite.setAttribute("id", el.id);
    div.append(ela);
    div.append(favorite);
    div2.append(author);
    div2.append(del);
    card.append(div);
    card.append(div2);

    favorite.addEventListener("click", async (e) => {
      e.preventDefault();
        await updateBook(e.target.id, {
          isFavorite: !el.isFavorite,
        });
      getAllBooks();
    });

    del.addEventListener("click", (e) => {
      e.preventDefault();
      modalDeletePage.classList.add("visible");
      bookDelete?.addEventListener("click", () => {
        loaderBox.classList.remove('hidden')
        bookDelete.classList.add('hidden')
        setTimeout( async () => {
          const data = await deleteBookById(e.target.id);
          if (data) {
              modalDeletePage.classList.remove("visible");
              getAllBooks();
              loaderBox.classList.add('hidden')
              bookDelete.classList.remove('hidden')
          }
        }, 1000);
      })
    })
  })} else {
    booksNo.classList.remove('hidden') 
    getAllBooks()
  }
  
};
