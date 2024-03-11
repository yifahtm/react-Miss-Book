

export function BookDetails({ book, onGoBack }) {

    // Render time methods
    // function getSpeedClass() {
    //     if (car.maxSpeed > 100) return 'fast'
    //     else if (car.maxSpeed < 80) return 'slow'
    //     else return ''
    // }
    const priceDetails = book.listPrice
    return <section className="book-details">
        <button onClick={onGoBack}>Go back</button>
        <h1>Title : {book.title}</h1>
        <h5>Number of pages: {book.numOfPages}</h5>
        <img src={book.thumbnail} />
        <h5>Price: {priceDetails.price}</h5>
        <h5>On Sale: {priceDetails.isOnsale ? 'Yes' : 'No'}</h5>
        <p>{book.description}</p>
    </section>
}