import axios from "axios";
import { useEffect, } from "react";
import "./pagePlayList.scss";

const PagePlaylist = () => {
    // const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=rj&api_key=4f2f703708f16aaa796435d052ed3d51&format=json")
            .then(res => console.log(res.data));
    }, []);

    return (
        <div className="playlist">

            <iframe
                frameBorder="0"
                title="playlist"
                style={{ border: "none", width: "100%", height: "100%", }}
                width="100%"
                height="100%"
                src="https://music.yandex.kz/iframe/#playlist/loxmotov.arcen/3">

                Listen to
                <a href='https://music.yandex.kz/users/loxmotov.arcen/playlists/3?lang=en'>
                    Favorites
                </a> —
                <a href='https://music.yandex.kz/users/loxmotov.arcen'>
                    yrys_NM
                </a>
                on Yandex Music

            </iframe>
        </div>
    );
}

export default PagePlaylist;