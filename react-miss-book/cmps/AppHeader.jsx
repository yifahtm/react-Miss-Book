const { useNavigate } = ReactRouter
const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    const navigate = useNavigate()

    function onGoHome() {
        navigate('/')
    }

    return <header className="app-header full">
        <h1 onClick={onGoHome}>Miss Book</h1>

        <nav className="app-nav">
            <NavLink to="/">Home</NavLink> |
            <NavLink to="/about">About</NavLink> |
            <NavLink to="/book">Books</NavLink>
        </nav>
    </header>
}