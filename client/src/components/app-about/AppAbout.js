import { useState } from "react";

import "./appAbout.scss";

const AppAbout = ({ dataAbout }) => {

    const [isAboutTwo] = useState(dataAbout.descrBottomText || false);

    return (
        <section className="about">
            <div className={`about-wrapper`}>
                <div className={`about-wrapper_img ${isAboutTwo ? "order2" : ""}`}>
                    <img src={dataAbout.imgUrl} alt="events imgs " />
                </div>
                <div className={`about-wrapper_descr ${isAboutTwo ? "order1" : ""}`}>
                    <div className="descr">

                        <div className="descr_firstText">
                            {dataAbout.descrFirstText}

                        </div>
                        <div className="descr_secondText">
                            {dataAbout.descrSecondText}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AppAbout;