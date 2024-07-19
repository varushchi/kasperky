import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom"
import Hello from './Hello'
import Main from './Main'

function App ()
{
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Hello/>}></Route>
                <Route path="/main" element={<Main/>}></Route>
            </Routes>
        </Router>
    )
}

export default App;
