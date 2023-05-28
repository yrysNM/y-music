import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';
import type { Item } from '../../interfaces/interfaceSpotifyNewReleases/interfaceSpotifyNewReleases';

export interface IPlayPauseProps {
  song: Item;
  isPlaying: boolean;
  activeSong: {
    name: string;
  };
  handlePause: () => void;
  handlePlay: () => void;
}

const PlayPauseSpotify: React.FC<IPlayPauseProps> = ({
  isPlaying,
  activeSong,
  song,
  handlePause,
  handlePlay,
}) =>
  isPlaying && activeSong?.name === song.name ? (
    <FaPauseCircle size={35} className="text-gray-300" onClick={handlePause} />
  ) : (
    <FaPlayCircle size={35} className="text-gray-300" onClick={handlePlay} />
  );

export default PlayPauseSpotify;
