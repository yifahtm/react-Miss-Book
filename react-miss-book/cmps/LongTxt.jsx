const { useState } = React

export function LongTxt({ txt, length = 100 }) {
    const [showMore, setShowMore] = useState(false)

    function onShowMore() {
        setShowMore(prev => !prev)
    }

    return <div className="long-txt">
        <p>{showMore ? txt : txt.substr(0, length) + '...'}</p>
        <button onClick={onShowMore}>{showMore ? 'Show less' : 'Show more'}</button>
    </div>
}