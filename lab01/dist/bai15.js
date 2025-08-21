"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Library = void 0;
class Library {
    constructor() {
        this.books = [];
        this.users = [];
    }
    /**
     * addBook
     */
    addBook(newBook) {
        this.books.push(newBook);
    }
    get listBooks() {
        return this.books;
    }
}
exports.Library = Library;
