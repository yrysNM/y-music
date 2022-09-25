import { Link } from "react-router-dom";
import "./appHeader.scss";

const AppHeader = () => {
    return (
        <header className="header">
            <div className="container">

                <div className="nav">
                    <div className="header__logo">
                        <h1 className="header__logo-text">Yrys Musics</h1>
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
                            <a href="#" className="menu_link" >
                                Podcast
                            </a>
                        </li>
                        <li className="menu_item">
                            <a href="#" className="menu_link" >
                                Live
                            </a>
                        </li>
                    </ul>

                    <div className="selectPages">
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
                    </div>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;