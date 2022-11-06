import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ModalContext } from "../../context/ModalContext";
import "./appHeader.scss";

const AppHeader = () => {
    const [toggleAnotherService, setToggleAnotherService] = useState(false);
    const { openModal } = useContext(ModalContext);

    return (
        <header className="header">
            <div className="container">

                <div className="nav">
                    <div className="header__logo">
                        <Link to="/">

                            <h1 className="header__logo-text">Yrys Musics</h1>
                        </Link>
                    </div>

                    <ul className="menu">
                        <li className="menu_item">
                            <Link to="/music">
                                <span className="menu_link" >
                                    Music
                                </span>
                            </Link>
                        </li>
                        <li className="menu_item">
                            <a href="/playlist" className="menu_link" >
                                PlayList
                            </a>
                        </li>
                        <li className="menu_item">
                            <a href="/" className="menu_link" >
                                Live
                            </a>
                        </li>
                    </ul>

                    <div className={`selectPages selectPages__anotherServices_active-${toggleAnotherService}`}>
                        <div className="selectPages_img">
                            <img src="https://avatars.yandex.net/get-music-content/5207413/65a56b90.a.16273827-1/50x50" alt="img select pages" />
                        </div>

                        <div className="selectPages_text">
                            Darwin King
                        </div>

                        <div className="selectPages_arrowDrop" onClick={() => setToggleAnotherService(toggleAnotherService => !toggleAnotherService)}>
                            <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 1L5.5 6L10.5 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        <div className={`selectPages__anotherServices selectPages__anotherServices-${toggleAnotherService}`}>
                            <div className="selectPages selectPages__anotherServices-list">
                                <div className="selectPages_img">
                                    <img src="https://avatars.yandex.net/get-music-content/5207413/65a56b90.a.16273827-1/50x50" alt="img select pages" />
                                </div>

                                <div className={`selectPages_text selectPages__anotherServices_text-${toggleAnotherService}`}>
                                    Add track
                                </div>

                                <div
                                    className={`selectPages_addIcon selectPages__anotherServices_icon-${toggleAnotherService}`}
                                    onClick={openModal}>
                                    +
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;