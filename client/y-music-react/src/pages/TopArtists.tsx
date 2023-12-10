import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import { Error, Loader, ArtistCard, PageTitle } from '../components';

const TopArtists = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) return <Loader title="Loading songs around you" />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <PageTitle title="Top Artists" />

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.tracks?.map((track) => (
          <ArtistCard key={track.key} track={track} />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
