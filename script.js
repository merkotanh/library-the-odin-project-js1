/* ===============================
   My Library Project - The Odin Project
   JavaScript Logic
   Author: Merkotanh
   3.01.26
   =============================== */

// ===== DOM Elements =====
const form = document.getElementById('new-book-form')
const newBookBtn = document.getElementById('new-book-btn');
const modal = document.getElementById('new-book-modal');
const modalContent = document.querySelector(".modal-content");
const closeModalBtn = document.getElementById('close-modal_btn');
const booksContainer = document.getElementById('books-container');
const viewListBtn = document.getElementById('view-list-btn');
const viewGridBtn = document.getElementById('view-grid-btn');

// ====== DATA =====
const myLibrary = [
    new Book('Wölfe','Stepan Rudansky', 17, true),
    new Book('Zakhar Berkut', 'Ivan Franko', 239, true),
    new Book('Vasyl Stus: Life in Creativity', 'Dmytro Stus', 388, false),
   // new Book('The Hobbit', 'J.R.R. Tolkien', 295, false),
    new Book('Clean Code', 'Robert C. Martin', 464, true)
];

// ===== Constructor =====
function Book(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

// ====== UI Functions =====
function openModal() {
    console.log('Close modal clicked'); // <-- додай
    modal.hidden = false;
}

function closeModal() {
      console.log('Close modal clicked'); // <-- додай
    modal.hidden = true;
}

function stopPropagation(e) {
    e.stopPropagation();
}

// ===== Library Logic =====
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function createBookCard(book, index) {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');

    const title = document.createElement('h3');
    title.textContent = book.title;

    const author = document.createElement('p');
    author.textContent = `Author: ${book.author}`;

    const pages = document.createElement('p');
    pages.textContent = `Pages: ${book.pages}`;

    const read = document.createElement('p');
    read.textContent = book.read ? 'Read ✔️' : 'Not read ❌';

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'Toggle read';
    toggleBtn.addEventListener('click', () => {
        book.toggleRead();
        renderLibrary();
    });

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
        myLibrary.splice(index, 1);
        renderLibrary();
    })

    bookDiv.append(title, author, pages, read, toggleBtn, removeBtn);
    booksContainer.appendChild(bookDiv);
}

function renderLibrary() {
    booksContainer.innerHTML = '';

    myLibrary.forEach((book, index) => {
        createBookCard(book, index);
    });
}

// ===== Events Handlers =====
function handleFormSubmit(e) {
    e.preventDefault();

    const title = form.title.value;
    const author = form.author.value;
    const pages = parseInt(form.pages.value);
    const read = form.read.checked;

    addBookToLibrary(title, author, pages, read);
    renderLibrary();
    closeModal();
    form.reset();
}

function handleEscape(e) {
    if (e.key == 'Escape') {
        closeModal();
    }
}

// ===== Event Listeners ======
newBookBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', closeModal); // клік по фону
modalContent.addEventListener('click', stopPropagation); // зупиняємо закриття при кліку всередині вікна
form.addEventListener('submit', handleFormSubmit); // ❗ зупиняємо submit
document.addEventListener('keydown', handleEscape);


// ===== INIT =====
renderLibrary();
setView('grid');
