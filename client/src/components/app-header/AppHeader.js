import { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";


import { DataContext } from "../../context/DataContext";
import HamburgerComponent from "../hamburger";

import "./appHeader.scss";

const AppHeader = () => {
    const [toggleAnotherService, setToggleAnotherService] = useState(false);
    const [active, setActive] = useState(false);
    const { pathname } = useLocation();

    const { openModal, addLyricsComponent, } = useContext(DataContext);

    const activeHamburger = () => {
        setActive(active => !active);
    }

    const handleClickDrop = (e) => {
        e.stopPropagation();
        setToggleAnotherService(toggleAnotherService => !toggleAnotherService);
    }

    useEffect(() => {
        const handler = () => setToggleAnotherService(false);

        window.addEventListener("click", handler);

        return () => {
            window.addEventListener("click", handler);
        }
    }, []);

    return (
        <header className="header">
            <div className="container">

                <div className="nav">
                    <div className="header__logo">
                        <Link to="/">

                            <h1 className="header__logo-text">Yrys Musics</h1>
                        </Link>
                    </div>

                    <ul className={`menu ${active ? "menu__hamburger" : ""}`} style={{ marginRight: pathname !== "/music" ? "0" : 300 }}>
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

                    {pathname === "/music" ?
                        <div className={`selectPages selectPages__anotherServices_active-${toggleAnotherService}`} onClick={handleClickDrop}>
                            <div className="selectPages_img">
                                <img src="https://avatars.yandex.net/get-music-content/5207413/65a56b90.a.16273827-1/50x50" alt="img select pages" />
                            </div>

                            <div className="selectPages_text">
                                Darwin King
                            </div>

                            <div className="selectPages_arrowDrop">
                                <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.5 1L5.5 6L10.5 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className={`selectPages__anotherServices selectPages__anotherServices-${toggleAnotherService}`}>
                                <div className="selectPages__anotherServices-wrapper">
                                    <div className="selectPages selectPages__anotherServices-wrapper_block">
                                        <DropHeaderNavigation data={{
                                            imgUrl: "https://avatars.yandex.net/get-music-content/5207413/65a56b90.a.16273827-1/50x50",
                                            text: "Add track",
                                            icon: "https://cdn-icons-png.flaticon.com/512/1286/1286915.png",
                                            toggleAnotherService,
                                            openModal
                                        }} />
                                        <DropHeaderNavigation data={{
                                            imgUrl: "https://i.pinimg.com/236x/55/42/74/554274e0ed20f74f051c49b107660fcf.jpg",
                                            text: "Lyrics",
                                            icon: "https://cdn-icons-png.flaticon.com/512/1754/1754193.png",
                                            toggleAnotherService,
                                            addLyricsComponent
                                        }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        : null}
                </div>
                <HamburgerComponent activeHamburger={activeHamburger} active={active} />
            </div>
        </header>
    );
}

const DropHeaderNavigation = ({ data }) => {
    return (
        <div className="selectPages__anotherServices-list">
            <div className="selectPages_img">
                <img src={data.imgUrl} alt="img select pages" />
            </div>

            <div className={`selectPages_text selectPages__anotherServices_text-${data.toggleAnotherService}`}>
                {data.text}
            </div>

            <div
                className={`selectPages_addIcon selectPages__anotherServices_icon-${data.toggleAnotherService}`}
                onClick={data.openModal || data.addLyricsComponent}>
                <img src={data.icon} alt="icon" style={{
                    width: 30,
                    height: 30,
                }} />
            </div>
        </div>
    );
}

export default AppHeader;