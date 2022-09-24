import promoHeadPhone from "../../resources/imgs/promoHeadPhone.webp";
import "./appPromo.scss";

const AppPromo = () => {
    return (
        <section className="promo">
            <div className="promo-wrapper">
                <div className="promo-wrapper_firstBlock">

                    <div className="promo__title">
                        MUSIC SHOW
                    </div>
                    <div className="title">

                        <h2 className="title_firstText">
                            Enjoy your life by
                            listening to music
                        </h2>
                        <div className="title_secondText mt39">
                            Simple Music with the traditional arransmen for
                            new event in the World
                        </div>


                    </div>
                    <div className="promo__btns">
                        <button className="btn">Event</button>
                        <button className="btn2">
                            Show Videos
                            <span className="iconPlay">
                                <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.97144 3.88571L0.185721 7.22609L0.185721 0.545323L5.97144 3.88571Z" fill="#222222" />
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
                <div className="promo-wrapper__secondBlock">
                    <img src={promoHeadPhone} alt="head phone" />
                </div>
            </div>
        </section>
    );
}
export default AppPromo;