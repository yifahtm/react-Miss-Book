
const { useState } = React
const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM

import { Home } from './pages/Home.jsx'
import { About } from './pages/About.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { BookDetails } from './pages/BookDetails.jsx'
// import { CarEdit } from './pages/CarEdit.jsx'

import { AppHeader } from './cmps/AppHeader.jsx'
// import { Team } from './cmps/AboutTeam.jsx'
// import { Vision } from './cmps/AboutVision.jsx'
// import { UserMsg } from './cmps/UserMsg.jsx'

export function RootCmp() {
    return <Router>
        <section className="app main-layout">
            <AppHeader />

            <main className="full main-layout">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} >
                        {/* <Route path="/about" element={<h1>This is default</h1>} />
                        <Route path="/about/team" element={<Team />} />
                        <Route path="/about/vision" element={<Vision />} /> */}
                    </Route>

                    <Route path="/book" element={<BookIndex />} />
                    {/* <Route path="/car/edit" element={<CarEdit />} />
                    <Route path="/car/edit/:carId" element={<CarEdit />} /> */}
                    <Route path="/car/:carId" element={<BookDetails />} />
                </Routes>
            </main>

            {/* <UserMsg /> */}
        </section>
    </Router>
}


