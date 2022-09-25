import AudioPlayer from "./components/audio-player/AudioPlayer";
import tracks from "./components/data/tracks";
const PageMusic = () => {
    return (
        <div>
            <AudioPlayer tracks={tracks} />
        </div>
    );
}

export default PageMusic;