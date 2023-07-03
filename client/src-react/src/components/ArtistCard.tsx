import { useNavigate } from 'react-router-dom';
import type { Track } from '../interfaces/interfaceShazamTopTracks';

const ArtistCard = ({ track }: { track: Track }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80  backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
      onClick={() =>
        track?.artists
          ? navigate(`/artists/${track?.artists[0].adamid}`)
          : navigate('/404')
      }
    >
      <img
        src={
          track?.images?.background ??
          'https://www.shazam.com/resources/6d5bc923785ad71cf6206e7c624a1d77f98274e2/nocoverart.jpg'
        }
        alt="artist"
        className="w-full h-56 rounded-lg"
      />
      <p className="mt-4 font-semibold text-lf text-white truncate">
        {track.subtitle}
      </p>
    </div>
  );
};

export default ArtistCard;
