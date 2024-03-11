import { LongTxt } from "../cmps/LongTxt.jsx"

export function BookDetails({ book, onGoBack }) {
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


    return <section className="book-details">
        <button onClick={onGoBack}>Go back</button>
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