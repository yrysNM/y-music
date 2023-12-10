import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import { useAppSelector } from '../hooks/redux.hook';
import { Error, Loader, SongCard, PageTitle } from '../components';

const TopCharts = () => {
  const { activeSong, isPlaying } = useAppSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) return <Loader title="Loading songs around you" />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <PageTitle title="Discover Top Charts" />

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.tracks?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCharts;
