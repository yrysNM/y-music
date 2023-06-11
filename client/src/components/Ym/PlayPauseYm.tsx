import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';
import { Track as YmTrack } from 'ym-api/dist/types';


type ymSong = {
    id: number,
    timestamp: string,
    track: YmTrack
}


export interface IPlayPauseProps {
    song: ymSong;
    isPlaying: boolean;
    activeSong: {
        title: string;
    };
    handlePause: () => void;
    handlePlay: () => void;
}

const PlayPauseYM: React.FC<IPlayPauseProps> = ({
    isPlaying,
    activeSong,
    song,
    handlePause,
    handlePlay,
}) =>
    isPlaying && activeSong?.title === song.track.title ? (
        <FaPauseCircle size={35} className="text-gray-300" onClick={handlePause} />
    ) : (
        <FaPlayCircle size={35} className="text-gray-300" onClick={handlePlay} />
    );

export default PlayPauseYM;
