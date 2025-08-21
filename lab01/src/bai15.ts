import { Book } from "./bai6";
import { User } from "./bai7";

export class Library {
    private books: Book[] = [];
    private users: User[] = [];

    constructor() {

    }

    /**
     * addBook
     */
    public addBook(newBook: Book) {
        this.books.push(newBook);
    }

    
    public get listBooks() : Book[] {
        return this.books;
    }    
}