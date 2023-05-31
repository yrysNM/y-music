import { Error, Loader } from '../components';
import { useAppSelector } from '../hooks/redux.hook';
import { YMApi } from 'ym-api';
import { useGetNewReleasesQuery } from '../redux/services/spotifyCore';
import SpotifySongCard from '../components/Spotify/SpotifySongCard';
import { useEffect } from 'react';

function SpotifyAlbums() {
  const { activeSong, isPlaying } = useAppSelector(state => state.player);

  const { data, isFetching, error } = useGetNewReleasesQuery();

  useEffect(() => {
    // axios.get("http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=rj&api_key=4f2f703708f16aaa796435d052ed3d51&format=json")
    //     .then(res => console.log(res.data));

    const api = new YMApi();

    // (async () => {
    //   try {
    //     await api.init({
    //       username: 'loxmotov.arcen',
    //       password: 'J!6tV!FEyms!fHz',
    //     });
    //     const result = await api.getTrack(34653336);
    //     const feed = await api.getFeed();
    //     console.log({ result });
    //     console.log(feed);
    //   } catch (e) {
    //     console.log(`api error ${e}`);
    //   }
    // })();

    (async () => {
      try {
        await api.init({
          username: 'loxmotov.arcen@yandex.ru',
          password: 'J!6tV!FEyms!fHz',
        });
        const result = await api.searchArtists('gorillaz');
        console.log({ result });
      } catch (e) {
        console.log(`api error ${e}`);
      }
    })();
  }, []);

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
          ))}
        </div>
      </div>
    </>
  );
}

export default SpotifyAlbums;
