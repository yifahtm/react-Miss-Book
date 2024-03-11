const { Link } = ReactRouterDOM

import { BookPreview } from "./BookPreview.jsx"


export function BookList({ books, onRemoveBook }) {

    // function onChangeSpeed(car) {
    //     car = { ...car, maxSpeed: car.maxSpeed + 10 }
    //     onUpdateCar(car)
    // }

    if (!books.length) return <div>No books to show</div>
    return <ul className="book-list">
        {
            books.map(book => <li key={book.id}>
                <Link to={`/book/${book.id}`}>
                    <BookPreview book={book} />
                </Link>
                <div className="book-actions">
                    <button className="remove-btn" onClick={() => onRemoveBook(book.id)}>X</button>
                </div>
            </li>)
        }
    </ul>
}