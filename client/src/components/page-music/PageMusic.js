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
        // const res = await axios.get("http://localhost:4000/tracks/all");
        // obj.data = res.data;

        // setMusicData(musicData => [...musicData, ...obj.data]);
    }

    useEffect(() => {
        axios.get("http://localhost:4000/tracks/all")
            .then(res => setMusicData(res.data));

        axios.get("http://localhost:4000/tracks/6349befcfde82ff8b0227f16")
            .then(res => console.log(res.data));
    }, []);

    return (
        <div>
            {
                (musicData.length < 0) ? null :
                    <>
                        <AudioPlayer tracks={tracks} musicData={musicData} />
                    </>
            }
            <AudioLists />
        </div>
    );
}

export default PageMusic;