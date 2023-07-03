import { tracks } from './helper/mock';
import { SongBar } from '.';
import type { Track } from '../interfaces/interfaceShazamTopTracks';

interface IRelatedSongsProps {
  data: Track[] | undefined;
  isPlaying: boolean;
  activeSong: {
    title: string;
  };
  artistId?: string;
  handlePause?: () => void;
  handlePlay?: (song: Track, i: number) => void;
}

const RelatedSongs = ({
  data,
  artistId = '',
  isPlaying,
  activeSong,
  handlePause = () => {},
  handlePlay = () => {},
}: IRelatedSongsProps) => {
  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-2xl text-white">Related Songs:</h1>

      <div className="mt-6 w-full flex flex-col">
        {data?.map((song, i) => (
          <SongBar
            handlePauseClick={handlePause}
            handlePlayClick={handlePlay}
            i={i}
            key={`${Date.now() + 100 * Math.random()}`}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
          />
        )) ??
          tracks.map((song, i) => (
            <SongBar
              handlePauseClick={handlePause}
              handlePlayClick={handlePlay}
              i={i}
              key={`${song.key}`}
              artistId={artistId}
              isPlaying={isPlaying}
              activeSong={activeSong}
              song={song as unknown as Track}
            />
          ))}
      </div>
    </div>
  );
};

export default RelatedSongs;
