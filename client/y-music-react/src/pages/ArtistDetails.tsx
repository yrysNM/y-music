import { useParams } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux.hook';

import { useGetArtistDetailsQuery } from '../redux/services/shazamCore';

import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { Track } from '../interfaces/interfaceShazamTopTracks';

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useAppSelector((state) => state.player);
  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    error,
  } = useGetArtistDetailsQuery({ artistId: artistId ? artistId : '' });

  if (isFetchingArtistDetails) {
    return <Loader title="Searching artist details..." />;
  }

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData} />

      {/* ERROR need change for GENERICS */}
      <RelatedSongs
        data={
          artistData?.resources?.songs &&
          (Object.values(artistData?.resources?.songs) as unknown as Track[])
        }
        isPlaying={isPlaying}
        activeSong={activeSong}
        artistId={artistId}
      />
    </div>
  );
};

export default ArtistDetails;
