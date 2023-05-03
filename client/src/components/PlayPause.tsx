import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';
import { Track } from '../interfaces/interfaceShazamTopTracks';

export interface IPlayPauseProps {
  song: Track;
  isPlaying: boolean;
  activeSong: {
    title: string;
  };
  handlePause: () => void;
  handlePlay: () => void;
}

const PlayPause: React.FC<IPlayPauseProps> = ({
  isPlaying,
  activeSong,
  song,
  handlePause,
  handlePlay,
}) =>
  isPlaying && activeSong?.title === song.title ? (
    <FaPauseCircle size={35} className="text-gray-300" onClick={handlePause} />
  ) : (
    <FaPlayCircle size={35} className="text-gray-300" onClick={handlePlay} />
  );

export default PlayPause;
