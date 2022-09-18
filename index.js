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

class Book {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.myLibrary = [];
  }

  createBtn() {
    const btn = document.createElement("button");
    btn.setAttribute("class", "removeBtn");
    const textNodeBtn = document.createTextNode(`Remove`);
    btn.appendChild(textNodeBtn);
    return btn;
  }

  readBtn() {
    const btn = document.createElement("button");
    btn.setAttribute("class", "readBtn");
    const textNodeBtn = document.createTextNode(`read`);
    btn.appendChild(textNodeBtn);
    return btn;
  }

  addBookToLibrary(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    const book = { title, author, pages };
    this.myLibrary.push(book);
  }

  bookCard(bookObject, i) {
    const eleTitle = document.createElement("p");
    const eleAuthor = document.createElement("p");
    const elePages = document.createElement("p");
    const removeBtn = this.createBtn(); // using constructor method to create button
    const readButton = this.readBtn();

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

    this.removeBtnFunctionality(removeBtn, bookObject);
    this.readToggle(readButton);
  }

  loopThroughBookArray() {
    let i = -1;
    this.myLibrary.forEach((bookObject) => {
      i++;
      this.bookCard(bookObject, i);
    });
  }
  submitButtonFunctionality() {
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
        this.addBookToLibrary(
          `Title: ${inputTitle.value}`,
          `Author: ${inputAuthor.value}`,
          `Pages: ${inputPages.value}`
        );
        this.loopThroughBookArray();
        modal.classList.add("hidden");
        form.classList.add("hidden");
        inputTitle.value = "";
        inputAuthor.value = "";
        inputPages.value = "";
        this.myLibrary = [];
        numberOfBooks++;
        libraryTitle.innerHTML = `Book Library Now Has ${numberOfBooks} Book`;
        formPara.innerHTML = ``;
      }
    });
  }
  removeBtnFunctionality(removeBtn, bookObject) {
    removeBtn.addEventListener("click", (e) => {
      const btn = e.target;
      const btnParent = btn.parentElement;
      const index = this.myLibrary.indexOf(bookObject);

      if (index > -1) {
        this.myLibrary.splice(index, 1);
      }
      btnParent.remove();
      numberOfBooks--;
      libraryTitle.innerHTML = `Book Library Now Has ${numberOfBooks} Book`;

      if (numberOfBooks === 0) {
        libraryTitle.innerHTML = `Book Library Is Now Empty`;
      }

      console.log(this.myLibrary);
    });
  }
  newBookButton() {
    newBookBtn.addEventListener("click", (button) => {
      modal.classList.remove("hidden");
      button.preventDefault();
      form.classList.remove("hidden");
      checkBox.checked = false;
    });
  }
  readToggle(button) {
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

  render() {
    modal.classList.add("hidden");
    this.newBookButton();
    this.submitButtonFunctionality();
  }
}
const firstBook = new Book();
firstBook.render();
