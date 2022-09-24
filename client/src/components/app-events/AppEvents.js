import "./appEvent.scss";
const AppEvent = () => {
    return (
        <section className="event">
            <div className="title event-title">
                <h2 className="title_firstText">
                    Improve your chances of getting event
                </h2>

                <div className="title_secondText mt20 event-secondText">
                    At vero eos censes aut dolores eos, qui studiose antiqua persequeris, claris et ultimum bonorum, quod summum malum et, quantum possit, a philosophis compluribus permulta dicantur, cur nec me
                </div>
            </div>

            <div className="event-video">
                <iframe width="100%" height="455px" src="https://www.youtube.com/embed/dYsTiW8skv0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
        </section>
    );
}

export default AppEvent;