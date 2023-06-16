import { Track } from "ym-api/dist/types";
import { playPause, setActiveSong } from "../../redux/features/playerSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import PlayPauseYM from "./PlayPauseYm";
import { fetchTrackMp3 } from "../../redux/services/ymCore";
import { useCallback } from "react";

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
  data: Track[] | undefined
}

const YmSongCard = ({
  song,
  isPlaying,
  activeSong,
  i,
  data
}: IPropsSongCard) => {
  const dispatch = useAppDispatch();
  const { track } = useAppSelector(state => state.ym);



  const handlePauseClick = () => {
    dispatch(playPause(false));
  }

  const handlePlayClick = () => {
    dispatch(fetchTrackMp3(song.id));
    getInitialMp3();
  }

  /**
   * @TODO change play or pause method or working out
   */
  const getInitialMp3 = useCallback(() => {
    if (track?.hub?.actions) {
      dispatch(setActiveSong({ song: track, data, i }));
      dispatch(playPause(true));
    }
  }, [track]);

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title === song.track.title
            ? 'flex bg-black bg-opacity-70'
            : 'hidden'
            }`}
        >
          <PlayPauseYM
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
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
