// import SpotifyPlayer from 'react-spotify-web-playback';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

import { Error, Loader } from '../components';
import { useAppDispatch , useAppSelector} from '../hooks/redux.hook';
import { playPauseSongSpotify, setSpotifySong } from '../redux/features/spotifyPlayerSlice';
import { useGetNewReleasesQuery } from '../redux/services/spotifyCore';

function SpotifyAlbums() {
  const dispatch = useAppDispatch();
  const {isPlayingSong, spotifySongActive} = useAppSelector(state => state.playerSpotify); 
  const { data, isFetching, error } = useGetNewReleasesQuery();


  function handlePauseClick(): void {
    dispatch(playPauseSongSpotify(false));
  }

  function handlePlayClick(songName: string): void {
    const dataUris = data?.albums.items.map(songData => songData.uri);
    
    if(dataUris) {

      dispatch(setSpotifySong({spotifySongActive: {name: songName}, dataUris: dataUris}))
      dispatch(playPauseSongSpotify(true));
    }else {
      dispatch(playPauseSongSpotify(false));
    }

  }

  if (isFetching) return <Loader />;

  if (error) return <Error />;

  return (
    <div>
      <h3 className="text-white text-lg">Sporify Albums</h3>

      <div className="flex align-items gap-4 flex-wrap mt-10">
        {data?.albums.items.map((item) => (
          <div key={item.id}>
            <div className="spotifyAl w-52 rounded-md pt-7 pb-5 pr-5 pl-5 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup">
              <div className="spotifyAl__wrapper flex flex-col justify-between relative w-full h-56 group">
              <div
                className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
                  spotifySongActive?.name === item.name
                    ? 'flex bg-black bg-opacity-70'
                    : 'hidden'
                }`}
              >
                <PlayPauseForSpotify
                  isPlaying={isPlayingSong}
                  activeSong={spotifySongActive}
                  songName={item.name}
                  handlePause={handlePauseClick}
                  handlePlay={handlePlayClick}
                />
              </div>

                <img
                  src={item.images[0].url}
                  alt="album"
                  width="320"
                  height="320"
                  className="grid place-items-center"
                />

                <div className="mt-4">
                  <span className="ont-semibold text-lg text-white truncate">
                    {item.name.length > 10
                      ? item.name.slice(0, 10) + '...'
                      : item.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const PlayPauseForSpotify = (props: {
  isPlaying: boolean;
  handlePause: () => void;
  handlePlay: (spotifySongActive: string) => void;
  activeSong: {
    name: string;
  };
  songName: string;
}) => {
  const { isPlaying, handlePause, handlePlay, activeSong, songName } = props;

  return isPlaying && activeSong.name === songName ? (
    <FaPauseCircle size={35} className="text-gray-300" onClick={handlePause} />
  ) : (
    <FaPlayCircle size={35} className="text-gray-300" onClick={() => handlePlay(songName)} />
  );
};

export default SpotifyAlbums;
