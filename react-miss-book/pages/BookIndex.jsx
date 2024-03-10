const { useState, useEffect } = React

import { BookList } from '../cmps/BookList.jsx'
import { BookDetails } from '../cmps/BookDetails.jsx'

import { bookService } from '../services/book.service.js'

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [selectedBook, setSelectedBook] = useState(null)

    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks() {
        bookService.query()
            .then((books) => {
                setBooks(books)
            })
    }

    function onSelectBook(book) {
        console.log('selected book', book)
        setSelectedBook(book)
    }

    if (!books) return <div>loading...</div>
    return (
        <section className="book-index">
            {
                !selectedBook && <React.Fragment>
                    <h1>Our books</h1>
                    <BookList
                        books={books}
                        // onRemoveCar={onRemoveCar}
                        // onUpdateCar={onUpdateCar}
                        onSelectBook={onSelectBook}
                    />
                </React.Fragment>
            }
            {
                selectedBook && <BookDetails
                    book={selectedBook}
                    onGoBack={() => onSelectBook(null)}
                />
            }
        </section >
    )
}