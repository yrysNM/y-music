import { useEffect } from 'react';
import { Playlist } from 'ym-api/dist/types';
import { useAppSelector, useAppDispatch } from '../hooks/redux.hook';
import { useGetNewReleasesQuery } from '../redux/services/spotifyCore';
import { fetchYmLikeFromRadioPlaylist, fetchYmUserPlaylists } from '../redux/services/ymCore';
import YmSongCard from '../components/Ym/YmSongCard';
import { Error, Loader } from '../components';

function YmAlbumsTracks() {
  const { activeSong, isPlaying } = useAppSelector(state => state.player);
  const { ymLikeRadioPlaylist } = useAppSelector(state => state.ym);
  const { isFetching, error } = useGetNewReleasesQuery();
  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(fetchYmUserPlaylists()).then((res) => {
      const ymUserPlaylists = res.payload as Playlist[];

      dispatch(fetchYmLikeFromRadioPlaylist({
        kind: ymUserPlaylists[1]?.kind,
        uid: ymUserPlaylists[1]?.uid,
      }));
    });
  }, []);

  if (isFetching) return <Loader />;

  if (error) return <Error />;

  return (
    <>
      <div>
        <h3 className="text-white text-lg">Ym musics</h3>

        <div className="flex align-items gap-4 flex-wrap mt-10 justify-center">
          {ymLikeRadioPlaylist?.tracks?.map((item, i) => (
            <YmSongCard
              key={item.id}
              isPlaying={isPlaying}
              activeSong={activeSong}
              i={i}
              song={item}
              data={ymLikeRadioPlaylist.tracks?.map(o => o.track)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default YmAlbumsTracks;
