"use strict";

const bookPosition = document.getElementById("book-position");
const shelf = document.getElementById("shelf");
const newBookBtn = document.getElementById("newBookBtn");
const form = document.querySelector(".form");
const checkBox = document.querySelector(".input-read");
const modal = document.querySelector(".modal");
const libraryTitle = document.querySelector(".h1");
const formPara = document.querySelector(".form-p");
let numberOfBooks = 0;

let myLibrary = [];

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
}

Book.prototype = {
  info() {
    return `${this.title} by ${this.author} ${this.pages} pages ${this.read}`;
  },

  createBtn() {
    const btn = document.createElement("button");
    btn.setAttribute("class", "removeBtn");
    const textNodeBtn = document.createTextNode(`Remove`);
    btn.appendChild(textNodeBtn);
    return btn;
  },
  readBtn() {
    const btn = document.createElement("button");
    btn.setAttribute("class", "readBtn");
    const textNodeBtn = document.createTextNode(`read`);
    btn.appendChild(textNodeBtn);
    return btn;
  },
};

function addBookToLibrary(title, author, pages) {
  const book = new Book(title, author, pages);
  myLibrary.push(book);
}

console.log(myLibrary);

function newBookButton() {
  newBookBtn.addEventListener("click", (button) => {
    modal.classList.remove("hidden");
    button.preventDefault();
    form.classList.remove("hidden");
    checkBox.checked = false;
  });
}

function render() {
  modal.classList.add("hidden");
  newBookButton();
  submitButtonFunctionality();
}
render();

function submitButtonFunctionality() {
  const submitButton = document.querySelector(".sub-btn");
  const inputTitle = document.querySelector(".input-title");
  const inputAuthor = document.querySelector(".input-author");
  const inputPages = document.querySelector(".input-pages");

  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (
      inputAuthor.value === "" ||
      inputTitle.value === "" ||
      inputPages.value === "" ||
      +inputPages.value <= 0
    ) {
      formPara.innerHTML = `Please Enter, Title, Author, Pages`;
    } else {
      addBookToLibrary(
        `Title: ${inputTitle.value}`,
        `Author: ${inputAuthor.value}`,
        `Pages: ${inputPages.value}`
      );
      loopThroughBookArray();
      modal.classList.add("hidden");
      form.classList.add("hidden");
      inputTitle.value = "";
      inputAuthor.value = "";
      inputPages.value = "";
      myLibrary = [];
      numberOfBooks++;
      libraryTitle.innerHTML = `Book Library Now Has ${numberOfBooks} Book`;
      formPara.innerHTML = ``;
    }
  });
}

function removeBtnFunctionality(removeBtn, bookObject) {
  removeBtn.addEventListener("click", (e) => {
    const btn = e.target;
    const btnParent = btn.parentElement;
    const index = myLibrary.indexOf(bookObject);

    if (index > -1) {
      myLibrary.splice(index, 1);
    }
    btnParent.remove();
    numberOfBooks--;
    libraryTitle.innerHTML = `Book Library Now Has ${numberOfBooks} Book`;

    if (numberOfBooks === 0) {
      libraryTitle.innerHTML = `Book Library Is Now Empty`;
    }

    console.log(myLibrary);
  });
}

function readToggle(button) {
  if (checkBox.checked === true) {
    button.style.backgroundColor = "green";
    button.textContent = "Read";
  } else {
    button.style.backgroundColor = "red";
    button.textContent = "Not read";
  }

  button.addEventListener("click", (e) => {
    const btn = e.target;

    if (btn.style.backgroundColor === "red") {
      btn.style.backgroundColor = "green";
      btn.textContent = "Read";
    } else {
      btn.style.backgroundColor = "red";
      btn.textContent = "Not read";
    }
  });
}

function loopThroughBookArray() {
  let i = -1;
  myLibrary.forEach((bookObject) => {
    i++;
    bookCard(bookObject, i);
  });
}

function bookCard(bookObject, i) {
  const eleTitle = document.createElement("p");
  const eleAuthor = document.createElement("p");
  const elePages = document.createElement("p");
  const removeBtn = bookObject.createBtn(); // using constructor method to create button
  const readButton = bookObject.readBtn();

  const bookPosition = document.createElement("div");

  bookPosition.setAttribute("class", "book-position");
  bookPosition.setAttribute("Id", "book-position");
  bookPosition.setAttribute("data-number", i);
  removeBtn.setAttribute("class", "remove-btn");
  removeBtn.setAttribute("Id", "remove-btn");
  readButton.setAttribute("class", "read-btn");

  const textNodeTitle = document.createTextNode(`${bookObject.title}`);
  const textNodeAuthor = document.createTextNode(`${bookObject.author}`);
  const textNodePages = document.createTextNode(`${bookObject.pages}`);

  eleTitle.appendChild(textNodeTitle);
  eleAuthor.appendChild(textNodeAuthor);
  elePages.appendChild(textNodePages);

  bookPosition.appendChild(eleTitle);
  bookPosition.appendChild(eleAuthor);
  bookPosition.appendChild(elePages);

  bookPosition.appendChild(readButton);
  bookPosition.appendChild(removeBtn);

  shelf.appendChild(bookPosition);

  removeBtnFunctionality(removeBtn, bookObject);
  readToggle(readButton);
}
