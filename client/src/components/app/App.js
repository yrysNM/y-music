import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Main, PlayList } from "../pages";
import DataContextProvider from "../../context/DataContext";
import AppHeader from "../app-header/AppHeader";
import Modal from "../app-modalWindow/Modal";
import AudioAdd from "../page-music/components/audio-add/AudioAdd";

const App = () => {

    return (
        <DataContextProvider>
            <Router basename="/">
                <div className="app">
                    <AppHeader />
                    <Routes>
                        <Route path="/" element={<Main />} />

                        {/* <Route path="/music" element={<Music />} /> */}
                        <Route path="/playlist" element={<PlayList />} />
                    </Routes>
                </div>
            </Router>

            <Modal>
                <AudioAdd />
            </Modal>
        </DataContextProvider>
    );
}

export default App;