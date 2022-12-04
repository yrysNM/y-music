import { useState } from "react";
import "./appEventBlog.scss";

const AppEventBlog = () => {

    const [dataEvent] = useState([
        {
            id: 1,
            imgUrl: "https://i.ytimg.com/vi/bH2bN5MGG0Y/maxresdefault.jpg",
            headText: "Great Music for Mood",
            subText: "Happened on this day. and everyone..."
        },
        {
            id: 2,
            imgUrl: "https://i.scdn.co/image/ab67616d0000b27348268dfea62106d19a9757e2",
            headText: "Everything it’s fine",
            subText: "The times is very important for listen..."
        },
        {
            id: 3,
            imgUrl: "https://img.freepik.com/free-photo/glad-millenniall-girl-closes-eyes-grins-camera-listens-favorite-music-via-stereo-headphones-wears-comfortable-soft-jumper-isolated-pink-background-people-lifestyle-hobby-concept_273609-59719.jpg",
            headText: "People Glad The music",
            subText: "Is amazing for people enjoy the Music..."
        },
        {
            id: 4,
            imgUrl: "https://i.pinimg.com/originals/d9/d4/40/d9d4406eda8b13a30a6a0de486f93402.gif",
            headText: "Anywhere can listen Music",
            subText: "It’s happen now, with people like the music.."
        }
    ])

    return (
        <section className="eventBlog">
            <div className="title eventBlog-title">

                <h2 className="title_firstText eventBlog-firstText">
                    Event Blog
                </h2>

                <div className="title_secongText eventBlog-secondText">
                    Great blog in different case & interisting
                </div>

            </div>

            <div className="eventBlog-blocks">

                {dataEvent.map((data, i) => (

                    <EventBlogsViewr key={i} dataEvent={data} />
                ))}
            </div>

        </section>
    );
}

const EventBlogsViewr = ({ dataEvent }) => {
    return (
        <div className={`eventBlog-infoEvent eventBlog-infoEvent_${dataEvent.id}`}>
            <img src={dataEvent.imgUrl} alt=" music mood " className="eventImg" />

            <div className="eventBlog-descr">
                <div className="eventBlog-descr_headText">
                    {dataEvent.headText}
                </div>

                <div className="eventBlog-descr_subText">
                    {dataEvent.subText}
                </div>
            </div>
        </div>
    );
}

export default AppEventBlog;