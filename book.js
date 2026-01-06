const myLibrary = [];

const container = document.querySelector(".books-container");
const dialog = document.querySelector(".add-book-dialog");
const newBookButton = document.querySelector(".new-book-btn");
const addBookButton = document.querySelector(".add-button");
const closeFormButton = document.querySelector(".close-button");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

Book.prototype.toggleReadStatus = function() {
    this.read = !this.read;
}

function addBookToLibrary(title, author, pages) {
    let newBook = new Book(title, author, pages, false);

    myLibrary.push(newBook);
}

function displayLibrary() { 
    for (const book of myLibrary) {
        const bookCard = createBookCard(book);

        container.appendChild(bookCard);
    }
}

function createBookCard(book) {
    const container = document.createElement("div");
    container.classList.add("book");
    container.setAttribute("data-id", book.id);

    const removeButton = createButton("Remove", "remove-button");
    addRemoveBookEvent(container, removeButton);
    const readButton = createButton("Toggle Read Status", "toggle-read-button");
    addToggleReadEvent(book, readButton);
    
    addText(container, book.title, "h3");
    addText(container, book.author, "p");
    addText(container, book.pages, "p");
    const readText = addText(container, "not read", "p");
    readText.setAttribute("id", "read-text");
    container.appendChild(removeButton);
    container.appendChild(readButton);

    return container;   
}

function addText(container, text, type) {
    const textNode = document.createElement(type);
    
    textNode.appendChild(document.createTextNode(text));
    container.appendChild(textNode);

    return textNode;
}

function createButton(text, className) {
   const btn = document.createElement("button");

   btn.classList.add(className);
   btn.appendChild(document.createTextNode(text));
   return btn;
}

function addRemoveBookEvent(container, button) {
    button.addEventListener("click", () => {
        for (let i = 0; i < myLibrary.length; i++) {
            if (myLibrary[i].id === container.dataset.id) {
                myLibrary.splice(i, 1);
                break;
            }
        }
        container.remove();
    });
}

function addToggleReadEvent(book, button) {
    button.addEventListener("click", () => {
        const readText = document.getElementById("read-text");

        if (book.read) {
            readText.textContent = "not read"
        }
        else {
            readText.textContent = "read"
        }
        book.toggleReadStatus();
    })
}

newBookButton.addEventListener("click", () => {
    dialog.showModal();
})

addBookButton.addEventListener("click", () => {
    if (isFormValid()) {
        addBookToLibrary(document.getElementById("title").value,
                        document.getElementById("author").value,
                        document.getElementById("pages").value);
        event.preventDefault();
        displayBook(myLibrary[myLibrary.length - 1]);
        document.getElementById("add-book-form").reset();
        dialog.close();
    }
})

function isFormValid() {
    if(document.getElementById("title").value == "") return false;
    else if (document.getElementById("author").value == "") return false;
    else if (document.getElementById("pages").value == "") return false;
    else return true;
}

function displayBook(book) {
    const bookCard = createBookCard(book);

    container.appendChild(bookCard);
}

closeFormButton.addEventListener("click", () => {
    document.getElementById("add-book-form").reset();
    dialog.close();
})

addBookToLibrary("Dora the explorer", "Diego Santiago", 150);
addBookToLibrary("Conan the barbar", "Conan o'brien", 420);
addBookToLibrary("X-Factor", "Jonathan Frakes", 666);
addBookToLibrary("Star-Trek: Next Generation", "Jonathan Frakes", 500)
addBookToLibrary("Die besten Spiele des Jahres 2025", "Der schöne Micha", 67)

displayLibrary();