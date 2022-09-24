import logoImg from "../../resources/imgs/yrysMusicLogo.png";
import "./appFooter.scss";

const AppFooter = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="info">
                    <div className="logoBlock">
                        <img src={logoImg} alt="logo img" className="footerImg" />

                        <span>Yrys Musics</span>
                    </div>

                    <div className="navPage">
                        <div className="navPage__headeTitle">
                            About Music
                        </div>

                        <div className="navPage__subLinks">
                            <span className="navPage__item">Music</span>
                            <span className="navPage__item">About</span>
                            <span className="navPage__item">Blog</span>
                            <span className="navPage__item">Request Demo</span>
                        </div>
                    </div>
                </div>

                <div className="footer_subBlock">
                    <div className="bottomText">
                        {`© ${new Date().getFullYear()} YRYS MUSIC. All Rights Reserved`}
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default AppFooter;