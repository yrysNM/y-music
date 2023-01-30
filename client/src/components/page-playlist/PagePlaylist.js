// import axios from "axios";
import { useEffect, } from "react";
import { YMApi } from "ym-api";

import "./pagePlayList.scss";

const PagePlaylist = () => {
    // const [data, setData] = useState([]);

    useEffect(() => {
        // axios.get("http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=rj&api_key=4f2f703708f16aaa796435d052ed3d51&format=json")
        //     .then(res => console.log(res.data));

        const api = new YMApi();

        (async () => {
            try {
                await api.init({ username: "loxmotov.arcen", password: "J!6tV!FEyms!fHz" });
                const result = await api.getTrack("34653336");
                const feed = await api.getFeed();
                console.log({ result });
                console.log(feed);
            } catch (e) {
                console.log(`api error ${e.message}`);
            }
        })();
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