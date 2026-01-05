const myLibrary = [];

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
}

function displayLibrary() { 
    const container = document.querySelector(".books-container");

    for (const book of myLibrary) {
        const bookCard = createBookCard(book.title, book.author, book.pages)

        container.appendChild(bookCard);
    }
}

function createBookCard(title, author, pages) {
    const container = document.createElement("div");
    container.classList.add("book");
    container.appendChild(document.createElement("h3").appendChild(document.createTextNode(title)));
    container.appendChild(document.createElement("p").appendChild(document.createTextNode(author)));
    container.appendChild(document.createElement("p").appendChild(document.createTextNode(pages)));
    container.appendChild(document.createElement("p").appendChild(document.createTextNode("not read")));

    return container;
}

addBookToLibrary("Dora the explorer", "Diego Santiago", 150);
addBookToLibrary("Conan the barbar", "Conan o'brien", 420);
addBookToLibrary("X-Factor", "Jonathan Frakes", 666);
addBookToLibrary("Star-Trek: Next Generation", "Jonathan Frakes", 500)
addBookToLibrary("Die besten Spiele des Jahres 2025", "Der schöne Micha", 67)

displayLibrary();