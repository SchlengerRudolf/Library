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
    this.info = function() {
        let status = "not read yet";
        if(this.read){
            status = "already read";
        }

        return (this.title + " by " + this.author + ", " + this.pages + " pages, " + status);
    }
}

function addBookToLibrary(title, author, pages) {
    let newBook = new Book(title, author, pages, false);

    myLibrary.push(newBook);
    console.log(myLibrary);
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

    addText(container, book.title, "h3");
    addText(container, book.author, "p");
    addText(container, book.pages, "p");
    addText(container, "not read", "p");
    container.appendChild(removeButton);

    return container;   
}

function addText(container, text, type) {
    const textNode = document.createElement(type);
    
    textNode.appendChild(document.createTextNode(text));
    container.appendChild(textNode);
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