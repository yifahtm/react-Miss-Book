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

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks((prevBooks) => prevBooks.filter(book => book.id !== bookId))
                // flashMsg(`Book removed successfully (${bookId})`)
            })
            .catch((err) => {
                console.log('Had issues removing book', err)
                // flashMsg(`Could not remove book (${bookId})`)
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
                        onRemoveBook={onRemoveBook}
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