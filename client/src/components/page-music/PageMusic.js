import AudioPlayer from "./components/audio-player/AudioPlayer";
import AudioLists from "./components/audio-lists/AudioLists";
import tracks from "./components/data/tracks";
const PageMusic = () => {
    return (
        <div>
            <AudioPlayer tracks={tracks} />
            <AudioLists />
        </div>
    );
}

export default PageMusic;