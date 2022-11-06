import { createContext, useState } from "react";

export const ModalContext = createContext(null);

const ModalContextProvider = ({ children }) => {
    const [modal, setModal] = useState(false);

    function openModal() {
        setModal(true);
    }

    function closeModal() {
        setModal(false);
    }

    return (
        <ModalContext.Provider value={{
            modal,
            openModal,
            closeModal
        }}>
            {children}
        </ModalContext.Provider>
    );
}

export default ModalContextProvider;