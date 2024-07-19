import { Link } from 'react-router-dom'
import './Hello.css'

function Hello () {
    return(
        <main>
            <p>Hello</p>
            <Link to="/main">START</Link>
        </main>
    )
}

export default Hello
