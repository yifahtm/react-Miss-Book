
const { useState } = React

import { Home } from './pages/Home.jsx'
import { About } from './pages/About.jsx'
import { BookIndex } from './pages/BookIndex.jsx'

// import { AppHeader } from '../cmps/AppHeader.jsx'

export function RootCmp() {
    const [page, setPage] = useState('book')

    console.log(page)

    return (
        <section className="app main-layout">
            {/* <AppHeader setPage={setPage} /> */}
            <main className="full main-layout">
                {page === 'home' && <Home />}
                {page === 'about' && <About />}
                {page === 'book' && <BookIndex />}
            </main>
        </section>
    )
}


