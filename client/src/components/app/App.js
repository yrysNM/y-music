import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Main, Music, PlayList } from "../pages";
import AppHeader from "../app-header/AppHeader";


const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader />
                <Routes>
                    <Route path="/" element={<Main />} />

                    <Route path="/music" element={<Music />} />
                    <Route path="/playlist" element={<PlayList />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;