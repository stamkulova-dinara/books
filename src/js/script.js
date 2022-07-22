import { openModalPage } from "./modules/modal-window.js";
import { signin } from "./modules/auth.js";
import { addBookModal, createBook } from "./modules/add-book-modal.js";
import { openModalEditBook } from "./modules/edit-book-modal.js";
import { me } from "./modules/home.js";
import { getAllBooks } from "./modules/books.js";
import { login } from "./modules/login.js";
import { getInfoById } from "./modules/detail-info.js";
import { deleteBook, openDeleteModalPage } from "./modules/delete.js";
import { privateRoute } from "./modules/privateRoute.js";

openModalPage()
signin()
addBookModal()
openModalEditBook()
me()
login()
createBook()
getInfoById()
deleteBook()
openDeleteModalPage()
getAllBooks()
privateRoute()