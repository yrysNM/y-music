import { Error, Loader } from '../components';
import { useGetNewReleasesQuery } from '../redux/services/spotifyCore';

function SpotifyAlbums() {


  const { data, isFetching, error } = useGetNewReleasesQuery();

  if (isFetching) return <Loader />;

  if (error) return <Error />;

  return (
    <div>
      <h3 className="text-white text-lg">Sporify Albums</h3>

      <div>
        {data?.albums.items.map((item) => (
          <div key={item.id} className="text-white">{item.name}</div>
        ))}
      </div>
    </div>
  );
}

export default SpotifyAlbums;
