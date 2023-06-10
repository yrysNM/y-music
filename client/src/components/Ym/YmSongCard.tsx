import { Track } from "ym-api/dist/types";

export interface IPropsSongCard {
  song: {
    id: number,
    timestamp: string,
    track: Track
  };
  i: number;
  isPlaying: boolean;
  activeSong: {
    title: string;
  };
}

const YmSongCard = ({
  song,
}: IPropsSongCard) => {


  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">

        <img
          src={
            song.track?.ogImage ?
              `https://${song.track?.ogImage?.replace(/%%/g, "300x300")}` :
              'https://lastfm.freetls.fastly.net/i/u/300s/2a96cbd8b46e442fc41c2b86b821562f.jpg'
          }
          alt={song.track.title}
        />
      </div>
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          {song.track.title}
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">

          {song.track.type}
        </p>
      </div>
    </div>
  );
};

export default YmSongCard;
