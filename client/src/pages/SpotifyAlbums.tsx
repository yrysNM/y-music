import { Error, Loader } from '../components';
import { useGetNewReleasesQuery } from '../redux/services/spotifyCore';

function SpotifyAlbums() {
  /**
   * @TODO -> add style card and test play or not music
   */
  const { data, isFetching, error } = useGetNewReleasesQuery();

  if (isFetching) return <Loader />;

  if (error) return <Error />;

  return (
    <div>
      <h3 className="text-white text-lg">Sporify Albums</h3>

      <div className="flex align-items gap-4 flex-wrap mt-10">
        {data?.albums.items.map(item => (
          <div >
            <div key={item.id} className="spotifyAl w-52 rounded-md pt-7 pb-5 pr-5 pl-5 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup">
              <div className="spotifyAl__wrapper flex flex-col justify-between ">
                <img
                  src={item.images[0].url}
                  alt="album"
                  width="320"
                  height="320"
                  className="grid place-items-center"
                />

                <div className="mt-4">
                  <span className="ont-semibold text-lg text-white truncate">
                    {item.name.length > 10 ? item.name.slice(0, 10) + "..." : item.name}
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

export default SpotifyAlbums;
