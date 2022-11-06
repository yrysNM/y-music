import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Main, Music, PlayList } from "../pages";
import ModalContextProvider from "../../context/ModalContext";
import AppHeader from "../app-header/AppHeader";
import Modal from "../app-modalWindow/Modal";
import AudioAdd from "../page-music/components/audio-add/AudioAdd";

const App = () => {

    return (
        <ModalContextProvider>
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

            <Modal>
                <AudioAdd />
            </Modal>
        </ModalContextProvider>
    );
}

export default App;