
export function BookPreview({ book }) {
    return <article className="book-preview">
        <h2>{book.title}</h2>
        <h5>Number of pages : {book.maxPages}</h5>
        <img src={`${book.thumbnail}`} />
    </article>
}