import PlayPause from './PlayPayseSpotify';
import { useAppDispatch } from '../../hooks/redux.hook';
import { playPause, setActiveSong } from '../../redux/features/playerSlice';
import { Item } from '../../interfaces/interfaceSpotifyNewReleases/interfaceSpotifyNewReleases';

export interface IPropsSongCard {
  song: Item;
  i: number;
  isPlaying: boolean;
  activeSong: {
    name: string;
  };
  data: Item[];
}

const SpotifySongCard = ({
  song,
  isPlaying,
  activeSong,
  i,
  data,
}: IPropsSongCard) => {
  const dispatch = useAppDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.name === song.name
              ? 'flex bg-black bg-opacity-70'
              : 'hidden'
          }`}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img
          src={
            song.images[0].url ??
            'https://www.shazam.com/resources/6d5bc923785ad71cf6206e7c624a1d77f98274e2/nocoverart.jpg'
          }
          alt="song_img"
        />
      </div>
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          {/* <Link to={`/songs/${song?.key}`}> */}
          {song.name}
          {/* </Link> */}
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          {/* <Link
            to={
              song.artists
                ? `/artists/${song.artists[0].adamid}`
                : '/top-artist'
            }
          > */}
          {song.type}
          {/* </Link> */}
        </p>
      </div>
    </div>
  );
};

export default SpotifySongCard;
