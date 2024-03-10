// import { CarPreview } from "./CarPreview.jsx"


export function BookList({ books }) {

    // function onChangeSpeed(car) {
    //     car = { ...car, maxSpeed: car.maxSpeed + 10 }
    //     onUpdateCar(car)
    // }

    if (!books.length) return <div>No books to show</div>
    return <ul className="book-list">
        {
            books.map(book => <li key={book.id}>
                {/* <CarPreview car={car} /> */}
                <div className="book-actions">
                    {/* <button className="remove-btn" onClick={() => onRemoveCar(car.id)}>X</button>
                    <button onClick={() => { onChangeSpeed(car) }}>Increase speed</button>
                    <button onClick={() => { onSelectCar(car) }}>Select car</button> */}
                </div>
            </li>)
        }
    </ul>
}