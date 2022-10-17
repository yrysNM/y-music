import { YMApi } from "ym-api";
import { useEffect } from "react";
import AudioPlayer from "./components/audio-player/AudioPlayer";
import AudioLists from "./components/audio-lists/AudioLists";
import tracks from "./components/data/tracks";


const PageMusic = () => {
    const api = new YMApi();

    useEffect(() => {
        (async () => {
            try {
                await api.init({
                    username: "6328d8137c954a6aaa3863260eaeefe9",
                    password: "8d8b050b9320450d9da155753f58cedc"
                });
                const result = await api.searchArtists("gorillaz");
                console.log({ result });
            } catch (e) {
                console.log(`api error ${e.message}`);
            }
        })();

    })

    return (
        <div>
            <AudioPlayer tracks={tracks} />
            <AudioLists />
        </div>
    );
}

export default PageMusic;