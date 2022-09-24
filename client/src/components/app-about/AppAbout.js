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

                        <h2 className="descr_firstText">
                            {dataAbout.descrFirstText}

                        </h2>
                        <div className="descr_secondText">
                            {dataAbout.descrSecondText}
                        </div>

                        {
                            isAboutTwo ?
                                <div className="descr_bottomText">
                                    {dataAbout.descrBottomText}
                                </div>
                                : null
                        }
                    </div>


                    {
                        isAboutTwo ?
                            <button className="btn2 btn-about">
                                Show All
                            </button>
                            : null
                    }
                </div>
            </div>
        </section>
    );
}

export default AppAbout;