import { ReviewPreview } from '../cmps/ReviewPreview.jsx'

export function ReviewList({ book, onRemoveReview }) {
    return (
        <aside className="review-list">
            <h3 className="review-title">Reviews</h3>
            {
                <ul className="clean-list">
                    {book.reviews.map((review, idx) => (
                        <li key={`${book.id}${idx}`}>
                            <ReviewPreview review={review} onRemoveReview={onRemoveReview} />
                        </li>
                    ))}
                </ul>
            }
        </aside>
    )
}
