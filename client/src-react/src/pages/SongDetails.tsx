import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux.hook';
import {
  useGetSongDetailsQuery,
  useGetArtistTopSongsQuery,
} from '../redux/services/shazamCore';

import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { setActiveSong, playPause } from '../redux/features/playerSlice';

import type { Track } from '../interfaces/interfaceShazamTopTracks';

const SongDetails = () => {
  const dispatch = useAppDispatch();
  const { activeSong, isPlaying } = useAppSelector((state) => state.player);
  const { songid } = useParams();
  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery({ songid: songid ? songid : '' });
  const {
    data,
    isFetching: isFetchingRelatedSongs,
    error,
  } = useGetArtistTopSongsQuery({ songid: songid ? songid : '' });

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song: Track, i: number) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  if (isFetchingSongDetails || isFetchingRelatedSongs) {
    return <Loader title="Searching song details..." />;
  }

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      {songData && <DetailsHeader songData={songData} />}

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>

        <div className="mt-5">
          {songData?.sections[1].type === 'LYRICS' ? (
            songData?.sections[1].text.map((line, i) => (
              <p key={i} className="text-gray-400 text-base my-1">
                {line}
              </p>
            ))
          ) : (
            <p className="text-gray-400 text-base my-1">
              Sorry no lyrics found!{' '}
            </p>
          )}
        </div>
      </div>
      <RelatedSongs
        data={data?.tracks}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
      />
    </div>
  );
};

export default SongDetails;
