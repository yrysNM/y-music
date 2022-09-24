import AppAbout from "../app-about/AppAbout";
const AppAboutTwo = () => {
    const dataAboutTwo = {
        imgUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bXVzaWN8ZW58MHx8MHx8&w=1000&q=80",
        descrFirstText: "Music is the greatest \nthing in your life",
        descrSecondText: "At vero eos censes aut dolores eos, qui studiose antiqua persequeris, claris et ultimum bonorum, quod summum malum et, quantum possit, a philosophis compluribus permulta dicantur, cur nec me ab illo inventore veritatis et quasi naturalem atque natum sit, a se esse albam, dulce mel.",
        descrBottomText: "At vero eos censes aut dolores eos, qui studiose antiqua persequeris, claris et ultimum bonorum.",
    }

    return (
        <>
            <AppAbout dataAbout={dataAboutTwo} />
        </>
    );
}

export default AppAboutTwo;