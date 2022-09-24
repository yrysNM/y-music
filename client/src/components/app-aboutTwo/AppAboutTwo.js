import AppAbout from "../app-about/AppAbout";
import yellowStar from "../../resources/icons/yellowStar.svg";
import emptyStar from "../../resources/icons/emptyStar.svg";
import "./appAboutTwo.scss";

const AppAboutTwo = () => {
    const dataAboutTwo = {
        imgUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bXVzaWN8ZW58MHx8MHx8&w=1000&q=80",
        descrFirstText: "Music is the greatest \nthing in your life",
        descrSecondText: "At vero eos censes aut dolores eos, qui studiose antiqua persequeris, claris et ultimum bonorum, quod summum malum et, quantum possit, a philosophis compluribus permulta dicantur, cur nec me ab illo inventore veritatis et quasi naturalem atque natum sit, a se esse albam, dulce mel.",
        descrBottomText: "At vero eos censes aut dolores eos, qui studiose antiqua persequeris, claris et ultimum bonorum.",
    }

    return (
        <div className="appAboutOne">
            <AppAbout dataAbout={dataAboutTwo} />


            <div className="blockSearch blockSearchOrder">
                <div className="blockSearchOrder-block">

                    <div className="iconStars">
                        <img src={yellowStar} alt="icon star " />
                        <img src={yellowStar} alt="icon star " />
                        <img src={yellowStar} alt="icon star " />
                        <img src={yellowStar} alt="icon star " />
                        <img src={emptyStar} alt="icon star " />
                    </div>

                    <div className="blockSearchOrder-descr">
                        At vero eos censes aut dolores eos, qui studiose antiqua persequeris, claris et ultimum bonorum.
                    </div>

                    <div className="blockSearchOrder-personName">
                        Yrysbek Nessipkulov
                    </div>

                </div>
            </div>
        </div>
    );
}

export default AppAboutTwo;