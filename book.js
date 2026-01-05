const myLibrary = [];

const container = document.querySelector(".books-container");
const dialog = document.querySelector(".add-book-dialog");
const newBookButton = document.querySelector(".new-book-btn");
const addBookButton = document.querySelector(".add");
const closeFormButton = document.querySelector(".close");

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
    console.log(newBook);
}

function displayLibrary() { 
    for (const book of myLibrary) {
        const bookCard = createBookCard(book.title, book.author, book.pages)

        container.appendChild(bookCard);
    }
}

function createBookCard(title, author, pages) {
    const container = document.createElement("div");
    container.classList.add("book");

    addText(container, title, "h3")
    addText(container, author, "p")
    addText(container, pages, "p")
    addText(container, "not read", "p")

    return container;
}


function addText(container, text, type) {
    const textNode = document.createElement(type);
    
    textNode.appendChild(document.createTextNode(text));
    container.appendChild(textNode);
}

newBookButton.addEventListener("click", () => {
    dialog.showModal();
});

addBookButton.addEventListener("click", () => {
    addBookToLibrary(document.getElementById("title").value,
                     document.getElementById("author").value,
                     document.getElementById("pages").value);
    event.preventDefault();
    displayBook(myLibrary[myLibrary.length - 1]);
    dialog.close();
});

function displayBook(book) {
    const bookCard = createBookCard(book.title, book.author, book.pages);

    container.appendChild(bookCard);
}

closeFormButton.addEventListener("click", () => {
    dialog.close();
});

addBookToLibrary("Dora the explorer", "Diego Santiago", 150);
addBookToLibrary("Conan the barbar", "Conan o'brien", 420);
addBookToLibrary("X-Factor", "Jonathan Frakes", 666);
addBookToLibrary("Star-Trek: Next Generation", "Jonathan Frakes", 500)
addBookToLibrary("Die besten Spiele des Jahres 2025", "Der schöne Micha", 67)

displayLibrary();