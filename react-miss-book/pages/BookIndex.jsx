const { useState, useEffect } = React

import { BookList } from '../cmps/BookList.jsx'

import { bookService } from '../services/book.service.js'

export function BookIndex() {
    const [books, setBooks] = useState(null)


    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks() {
        bookService.query()
            .then((books) => {
                setBooks(books)
            })
    }

    if (!books) return <div>loading...</div>
    return (
        <section className="book-index">
            <h1>Our books</h1>
            <BookList
                books={books}
            // onRemoveCar={onRemoveCar}
            // onUpdateCar={onUpdateCar}
            // onSelectCar={onSelectCar}
            />
        </section >
    )
}