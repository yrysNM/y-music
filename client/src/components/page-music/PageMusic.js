import axios from "axios";
import { useEffect, useState } from "react";
import AudioPlayer from "./components/audio-player/AudioPlayer";
import AudioLists from "./components/audio-lists/AudioLists";
import tracks from "./components/data/tracks";


const PageMusic = () => {
    const [musicData, setMusicData] = useState([]);

    async function getData() {
        const obj = {
            data: "",
        };
        const res = await axios.get("http://localhost:4000/tracks/all");
        obj.data = res.data;

        setMusicData(obj.data);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            {
                (!musicData) ? null :
                    <AudioPlayer tracks={tracks} musicData={musicData} />
            }
            <AudioLists />
        </div>
    );
}

export default PageMusic;