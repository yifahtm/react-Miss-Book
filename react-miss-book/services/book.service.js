import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
var gFilterBy = { title: '', price: 0 }

_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getNextBookId,
    getFilterBy,
    setFilterBy,
    getDefaultFilter
}

window.bs = bookService

function query() {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (gFilterBy.title) {
                const regex = new RegExp(gFilterBy.title, 'i')
                books = books.filter(book => regex.test(book.title))
            }
            if (gFilterBy.price) {
                books = books.filter(book => book.listPrice.amount >= gFilterBy.price)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '') {
    return { title }
}

function getFilterBy() {
    return { ...gFilterBy }
}

function getDefaultFilter() {
    return { title: '', miPrice: 50, desc: '' }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.title !== undefined) gFilterBy.title = filterBy.title
    if (filterBy.price !== undefined) gFilterBy.price = filterBy.price
    return gFilterBy
}

function getNextBookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            var idx = books.findIndex(book => book.id === bookId)
            if (idx === books.length - 1) idx = -1
            return books[idx + 1].id
        })
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = []
        books.push(_createBook("metus hendrerit", 300))
        books.push(_createBook("morbi", 120))
        books.push(_createBook("at viverra venenatis", 100))
        if (books) utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title, amount) {
    const book = getEmptyBook(title)
    book.id = utilService.makeId(),
        book.description = utilService.makeLorem(100),
        book.thumbnail = "http://coding-academy.org/books-photos/20.jpg",
        book.listPrice = {
            amount,
            currencyCode: "EUR",
            isOnSale: false
        }
    return book
}