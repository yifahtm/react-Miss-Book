const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM

import { LongTxt } from "../cmps/LongTxt.jsx"
import { AddReview } from '../cmps/AddReview.jsx'
import { ReviewList } from '../cmps/ReviewList.jsx'

import { bookService } from "../services/book.service.js"
import { showSuccessMsg, showErrorMsg, showUserMsg } from '../services/event-bus.service.js'


export function BookDetails() {
    const [isLoading, setIsLoading] = useState(true)
    const [book, setBook] = useState(null)
    const [isOnReview, setIsOnReview] = useState(false)
    const params = useParams()
    const navigate = useNavigate()
    console.log('params', params)

    useEffect(() => {
        loadBook()
    }, [params.bookId])

    function loadBook() {
        setIsLoading(true)
        bookService.get(params.bookId)
            .then(setBook)
            .catch(err => {
                console.log('Had issues loading book', err)
                showUserMsg('Could not load book')
                navigate('/book')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }
    function readingLevel() {
        if (book.pageCount > 500) return 'Serious Reading'
        if (book.pageCount > 200) return 'Descent Reading'
        if (book.pageCount < 100) return 'Light Reading'
        return ''
    }

    function publishDate() {
        const date = new Date
        if (date.getFullYear() - book.publishedDate > 10) return 'Vintage'
        if (date.getFullYear() - book.publishedDate < 1) return 'New'
        return ''
    }

    function priceInColor() {
        if (book.listPrice.amount > 150) return 'red'
        if (book.listPrice.amount < 20) return 'green'
    }

    function onAddReview(review) {
        bookService.addReview(book.id, review)
            .then(savedBook => {
                setBook(savedBook)
                showSuccessMsg(`Review added successfully to ${savedBook.title}`)
            })
            .catch(err => {
                console.log('Had issues with adding review:', err)
                showErrorMsg('Could not add review')
            })
            .finally(() => setIsOnReview(false))
    }

    function onRemoveReview(reviewId) {
        bookService.removeReview(book.id, reviewId)
            .then(savedBook => {
                setBook(savedBook)
                showSuccessMsg(`Review removed successfully from ${savedBook.title}`)
            })
            .catch(err => {
                console.log('Had issues with removing review:', err)
                showErrorMsg('Could not remove review')
            })
            .finally(() => setIsOnReview(false))
    }

    if (isLoading) return <div>Loading details..</div>
    const { amount, currencyCode, isOnSale } = book.listPrice
    return <section className="book-details">
        <Link to="/book"><button>Go back</button></Link>
        {isOnReview && (
            <AddReview
                bookId={params.bookId}
                addReview={onAddReview}
                onCloseReview={() => setIsOnReview(false)}
            />
        )}

        <h1>{book.title}</h1>
        <h2>{book.subtitle}</h2>
        <p className={`book-price ${priceInColor()}`}>
            Price:{' '}
            <span>
                {amount + ' '}
                {currencyCode}
            </span>
        </p>
        {isOnSale && <p className="sale">On sale!</p>}
        <div>{book.authors.map(author => <h4 key={author}>{author}</h4>)}
        </div>
        <img src={book.thumbnail} />
        <LongTxt txt={book.description} length={100} />
        <p>Publish date:{book.publishedDate}| {publishDate()}</p>
        <p>Page count: {book.pageCount}| {readingLevel()}</p>
        <span className="book-categories">
            {book.categories.join(' | ')},
        </span>
        <p>Language: {book.language}</p>
        {book.reviews && book.reviews.length && (
            <ReviewList book={book} onRemoveReview={onRemoveReview} />
        )}
        <button
            onClick={() => setIsOnReview(prevIsOnReview => !prevIsOnReview)}
        >
            Add Review
        </button>
    </section>
}