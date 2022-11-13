import { createContext, useState } from "react";

export const DataContext = createContext(null);

const DataContextProvider = ({ children }) => {
    const [modal, setModal] = useState(false);
    const [addLyrics, setAddLyrics] = useState(false);

    function openModal() {
        setModal(true);
    }

    function closeModal() {
        setModal(false);
    }

    function addLyricsComponent() {
        setAddLyrics(true);
    }

    function dropLyricsComponent() {
        setAddLyrics(false);
    }

    return (
        <DataContext.Provider value={{
            modal,
            addLyrics,
            addLyricsComponent,
            dropLyricsComponent,
            openModal,
            closeModal
        }}>
            {children}
        </DataContext.Provider>
    );
}

export default DataContextProvider;