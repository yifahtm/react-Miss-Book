const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from './../cmps/BookFilter.jsx'

import { bookService } from '../services/book.service.js'

// import { eventBusService, showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState
        (bookService.getFilterBy())
    const [userMsg, setUserMsg] = useState('')

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function onSetFilter(fieldsToUpdate) {
        bookService.setFilterBy({ ...fieldsToUpdate })
        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
    }

    function loadBooks() {
        bookService.query(filterBy)
            .then((books) => {
                setBooks(books)
            })
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks((prevBooks) => prevBooks.filter(book => book.id !== bookId))
                flashMsg(`Book removed successfully (${bookId})`)
                //     showSuccessMsg(`Book removed successfully (${bookId})`)
            })
            .catch((err) => {
                console.log('Had issues removing book', err)
                flashMsg(`Could not remove book (${bookId})`)
                // showErrorMsg(`Could not remove book(${bookId})`)
            })
    }

    function flashMsg(txt) {
        setUserMsg(txt)
        setTimeout(() => {
            setUserMsg('')
        }, 3000)
    }

    if (!books) return <div>loading...</div>
    return <section className="book-index">
        <BookFilter
            onSetFilter={onSetFilter}
            filterBy={filterBy} />
        <Link to="/book/edit"><button>Add a book</button></Link>
        <h1>Our books</h1>
        <BookList
            books={books}
            onRemoveBook={onRemoveBook}
        />
    </section >
}