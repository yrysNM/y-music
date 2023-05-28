import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

import { Error, Loader, SongCard } from '../components';
import { useAppDispatch, useAppSelector } from '../hooks/redux.hook';
import { setActiveSong } from '../redux/features/playerSlice';
import { useGetNewReleasesQuery } from '../redux/services/spotifyCore';
import SpotifySongCard from '../components/Spotify/SpotifySongCard';

function SpotifyAlbums() {
  const dispatch = useAppDispatch();
  const { activeSong, isPlaying } = useAppSelector(state => state.player);

  const { data, isFetching, error } = useGetNewReleasesQuery();

  // function handlePauseClick(): void {
  //   dispatch(playPause(false));
  // }

  // function handlePlayClick(songId: string, i: number): void {
  //   const dataUris = data?.albums.items.filter(
  //     songData => songData.id === songId
  //   );

  //   if (dataUris) {
  //     dispatch(
  //       setActiveSong({
  //         song: dataUris,
  //         data,
  //         i,
  //       })
  //     );
  //     dispatch(playPause(true));
  //   } else {
  //     dispatch(playPauseSongSpotify(false));
  //   }
  // }

  if (isFetching) return <Loader />;

  if (error) return <Error />;

  return (
    <>
      <div>
        <h3 className="text-white text-lg">Sporify Albums</h3>

        <div className="flex align-items gap-4 flex-wrap mt-10">
          {data?.albums.items.map((item, i) => (
            <SpotifySongCard
              key={item.id}
              song={item}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={data.albums.items}
              i={i}
            />
            // <div key={item.id}>
            //   <div className="spotifyAl w-52 rounded-md pt-7 pb-5 pr-5 pl-5 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup">
            //     <div className="spotifyAl__wrapper flex flex-col justify-between relative w-full h-56 group">
            //       <div
            //         className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            //           activeSong?.name === item.name
            //             ? 'flex bg-black bg-opacity-70'
            //             : 'hidden'
            //         }`}
            //       >
            //         <PlayPauseForSpotify
            //           isPlaying={isPlaying}
            //           activeSong={activeSong}
            //           songName={item.name}
            //           songId={item.id}
            //           index={i}
            //           handlePause={handlePauseClick}
            //           handlePlay={handlePlayClick}
            //         />
            //       </div>

            //       <img
            //         src={item.images[0].url}
            //         alt="album"
            //         width="320"
            //         height="320"
            //         className="grid place-items-center"
            //       />

            //       <div className="mt-4">
            //         <span className="ont-semibold text-lg text-white truncate">
            //           {item.name.length > 10
            //             ? item.name.slice(0, 10) + '...'
            //             : item.name}
            //         </span>
            //       </div>
            //     </div>
            //   </div>
            // </div>
          ))}
        </div>
      </div>
      {/* {activeSong.name && (
        <div className="absolute h-40 sm:h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10"></div>
      )} */}
    </>
  );
}

const PlayPauseForSpotify = (props: {
  handlePause: () => void;
  handlePlay: (spotifySongActive: string, index: number) => void;
  songId: string;
  isPlaying: boolean;
  activeSong: {
    name: string;
  };
  songName: string;
  index: number;
}) => {
  const { isPlaying, handlePause, handlePlay, activeSong, songName, songId } =
    props;

  return isPlaying && activeSong.name === songName ? (
    <FaPauseCircle size={35} className="text-gray-300" onClick={handlePause} />
  ) : (
    <FaPlayCircle
      size={35}
      className="text-gray-300"
      onClick={() => handlePlay(songId, props.index)}
    />
  );
};

export default SpotifyAlbums;
