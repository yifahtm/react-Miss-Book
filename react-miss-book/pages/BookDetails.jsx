const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM

import { LongTxt } from "../cmps/LongTxt.jsx"

import { bookService } from "../services/book.service.js"

export function BookDetails() {
    const [isLoading, setIsLoading] = useState(true)
    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()
    console.log('params', params)

    useEffect(() => {
        loadBook()
    }, [params.bookId])

    function loadBook() {
        setIsLoading(true)
        bookService.get(params.bookId)
            .then(book => setBook(book))
            .catch(err => {
                console.log('Had issues loading book', err)
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


    if (isLoading) return <div>Loading details..</div>
    return <section className="book-details">
        <Link to="/book"><button>Go back</button></Link>

        <h1>{book.title}</h1>
        <h2>{book.subtitle}</h2>
        <h3 className={priceInColor()}>{book.listPrice.amount + ' ' + book.listPrice.currencyCode}</h3>
        <h3 className="on-sale">{(book.listPrice.isOnSale ? ' On Sale' : '')}</h3>
        <h4>{publishDate()}</h4>
        <div>{book.authors.map(author => {
            return <h4 key={author}>{author}</h4>
        })}
        </div>
        <img src={book.thumbnail} />
        <LongTxt txt={book.description} length={30} />
        {/* <p>{book.description}</p> */}
        <p>Publish date: {book.publishedDate}</p>
        <p>Page count: {book.pageCount} {readingLevel()}</p>
        <p>Language: {book.language}</p>
    </section>
}