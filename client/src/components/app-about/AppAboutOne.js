import AppAbout from "./AppAbout";
import "./appAbout.scss";

const AppAboutOne = () => {
    const dataAbout = {
        imgUrl: "https://media.istockphoto.com/photos/console-desk-at-nightclub-picture-id1131197167?b=1&k=20&m=1131197167&s=170667a&w=0&h=eVe5_4vjlQir-NzsfQ8LldB_eAL7FvoR7Tn6dEWOBsY=",
        descrFirstText: "Follow major music events at your place.",
        descrSecondText: "At vero eos censes aut dolores eos, qui studiose antiqua persequeris, claris et ultimum bonorum, quod summum malum et, quantum possit, a philosophis compluribus permulta dicantur, cur nec me ab illo inventore veritatis et quasi naturalem atque natum sit, a se esse albam, dulce mel."
    }

    return (
        <div className="appAboutOne">
            <AppAbout dataAbout={dataAbout} />

            <div className="blockSearch">
                <form className="form">
                    <div className="form-wrapper">
                        <div className="form-container">

                            <label className="form-label">
                                <input type="text" name="nameMusic" className="form-input" />
                                <span className="form-label_span">
                                    Name
                                </span>
                            </label>
                        </div>

                        <div className="form-container">

                            <label className="form-label">
                                <input type="text" name="executor name" className="form-input" />
                                <span className="form-label_span">
                                    Executor name
                                </span>
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="form-btn">Search now</button>
                </form>
            </div>
        </div>
    );
}

export default AppAboutOne;