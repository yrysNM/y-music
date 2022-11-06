import { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import "./modal.scss";

const Modal = ({ children }) => {
    const { modal, closeModal } = useContext(ModalContext);

    return (
        <div
            className={`overlay overlay__active-${modal}`}
            onClick={closeModal}>
            <div className="modal">
                <div
                    className="modal__content"
                    onClick={e => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;