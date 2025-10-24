const container = document.getElementById("bookGrid");
const addBookBtn = document.getElementById("newBookBtn");
const dialog = document.querySelector("dialog");
const form = document.getElementById("bookForm");
const cancelBtn = document.getElementById("formClose");
const submitBtn = document.getElementById("formSubmit");

const myLibrary = [];
class Book {
  constructor(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    this.read = !this.read;

    const card = document.getElementById(this.id);
    const readBtn = card.querySelector(".read-btn");

    readBtn.textContent = this.read ? "Read" : "Unread";
    readBtn.classList.toggle("btn-light-green", this.read);
    readBtn.classList.toggle("btn-light-red", !this.read);
  }
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  createCard(book);
}

function removeBook(bookId) {
  const index = myLibrary.findIndex((b) => b.id === bookId);
  if (index === -1) return;

  document.getElementById(String(bookId))?.remove();
  myLibrary.splice(index, 1);
}

function renderLibrary() {
  for (book of myLibrary) {
    createCard(book);
  }
}

function createCard(book) {
  const card = document.createElement("article");
  card.classList.add("card");
  card.id = book.id;

  const statusBar = document.createElement("div");
  statusBar.classList.add("status-bar");

  const readBtn = document.createElement("button");
  readBtn.classList.add("read-btn");
  readBtn.classList.add(book.read ? "btn-light-green" : "btn-light-red");
  readBtn.textContent = book.read ? "Read" : "Unread";

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("remove-btn", "btn-light-red");
  deleteBtn.textContent = "Delete";

  statusBar.appendChild(readBtn);
  statusBar.appendChild(deleteBtn);

  const cardInfo = document.createElement("div");
  cardInfo.classList.add("card-info");

  const title = document.createElement("h2");
  title.classList.add("card-title");
  title.textContent = book.title;

  const author = document.createElement("h3");
  author.classList.add("card-author");

  const span = document.createElement("span");
  span.textContent = "written by";

  author.appendChild(span);
  author.appendChild(document.createElement("br"));
  author.appendChild(document.createTextNode(book.author));

  const pages = document.createElement("p");
  pages.classList.add("card-pages");
  pages.textContent = `${book.pages} pages`;

  cardInfo.appendChild(title);
  cardInfo.appendChild(author);
  cardInfo.appendChild(pages);

  card.appendChild(statusBar);
  card.appendChild(cardInfo);

  container.appendChild(card);
}

container.addEventListener("click", (e) => {
  if (e.target.classList.contains("read-btn")) {
    const card = e.target.closest(".card");
    const book = myLibrary.find((b) => b.id === card.id);

    if (book) book.toggleRead();
  } else if (e.target.classList.contains("remove-btn")) {
    const card = e.target.closest(".card");
    removeBook(card.id);
  }
});

cancelBtn.addEventListener("click", () => {
  form.reset();
  dialog.close();
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const titleValue = form.title.value;
  const authorValue = form.author.value;
  const pagesValue = form.pages.value;
  const readValue = form.read.checked;

  if (!titleValue || !authorValue || !pagesValue) {
    console.log("Values are empty!");
    console.log(myLibrary);
  } else {
    addBookToLibrary(titleValue, authorValue, pagesValue, readValue);
    console.log(myLibrary);
    form.reset();
    dialog.close();
  }
});

function openDialog() {
  dialog.showModal();
}

addBookBtn.addEventListener("click", () => {
  openDialog();
});

renderLibrary();
