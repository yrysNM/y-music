import AppHeader from "../app-header/AppHeader";
import AppPromo from "../app-promo/AppPromo";
import AppAbout from "../app-about/AppAbout";
import AppAboutTwo from "../app-aboutTwo/AppAboutTwo";
const App = () => {

    const dataAbout = {
        imgUrl: "https://media.istockphoto.com/photos/console-desk-at-nightclub-picture-id1131197167?b=1&k=20&m=1131197167&s=170667a&w=0&h=eVe5_4vjlQir-NzsfQ8LldB_eAL7FvoR7Tn6dEWOBsY=",
        descrFirstText: "Follow major music events at your place.",
        descrSecondText: "At vero eos censes aut dolores eos, qui studiose antiqua persequeris, claris et ultimum bonorum, quod summum malum et, quantum possit, a philosophis compluribus permulta dicantur, cur nec me ab illo inventore veritatis et quasi naturalem atque natum sit, a se esse albam, dulce mel."
    }

    return (
        <div className="app">
            <AppHeader />
            <div className="container">
                <AppPromo />
                <AppAbout dataAbout={dataAbout} />
                <AppAboutTwo />
            </div>
        </div>
    );
}

export default App;