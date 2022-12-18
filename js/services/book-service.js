import { utilService } from './util-service.js'
import { starterBooks } from './starter-books.js'
import { storageService } from './async-storage.service.js'

const BOOKS_KEY = 'books'
_createBooks()

export const bookService = {
    query,
    remove,
    save,
    getEmptyBook,
    get,
}

function query() {
    // return utilService.loadFromStorage(BOOKS_KEY)
    return storageService.query(BOOKS_KEY)
}

function get(bookId) {
    return storageService.get(BOOKS_KEY, bookId)
}

function remove(bookId) {
    // const books = query()
    // const idx = books.findIndex(book => book.id === bookId)
    // books.splice(idx, 1)
    // utilService.saveToStorage(BOOKS_KEY, books)

    return storageService.remove(BOOKS_KEY, bookId)
}


function save(book) {
    // book.id = utilService.makeId()
    // const books = query()
    // books.push(book)
    // utilService.saveToStorage(BOOKS_KEY, books)
    // return book
    if (book.id) {
        return storageService.put(BOOKS_KEY, book)
    }
    else {
        return storageService.post(BOOKS_KEY, book)
    }
}

function getEmptyBook() {
    return {
        id: '',
        title: '',
        thumbnail: (Math.random() > 0.5) ? "http://coding-academy.org/books-photos/11.jpg" : "http://coding-academy.org/books-photos/10.jpg",
        listPrice: {
            amount: '',
            currencyCode: "EUR",
            isOnSale: true
        }
    }
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOKS_KEY)
    if (!books || !books.length) {
        books = []
        books = starterBooks.getgBooks()

        // books.push(_createBook('Audu Mea', 300))
        // books.push(_createBook('Fiak Ibasa', 120))
        // books.push(_createBook('Subali Pesha', 100))
        // books.push(_createBook('Mitsu Bashi', 150))
        utilService.saveToStorage(BOOKS_KEY, books)
    }
    return books
}

function _createBook(vendor, maxSpeed = 250) {
    const book = {
        id: utilService.makeId(),
        vendor,
        maxSpeed,
    }
    return book
}
