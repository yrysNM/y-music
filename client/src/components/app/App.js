import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainPage } from "../pages";
import { MusicPage } from "../pages";
import AppHeader from "../app-header/AppHeader";


const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader />
                <Routes>
                    <Route path="/" element={<MainPage />} />

                    <Route path="/music" element={<MusicPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;