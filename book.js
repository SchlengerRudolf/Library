function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        let status = "not read yet";
        if(this.read){
            status = "already read";
        }

        return (this.title + " by " + this.author + ", " + this.pages + " pages, " + status);
    }
}

const dora = new Book("Dora the explorer", "Diego Santiago", 150, true);

console.log(dora.info());