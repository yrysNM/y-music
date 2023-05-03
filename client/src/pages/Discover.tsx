import { useAppDispatch, useAppSelector } from '../hooks/redux.hook';

import { useGetSongsByGenreQuery } from '../redux/services/shazamCore';
import { selectGenreListId } from '../redux/features/playerSlice';
import { Error, Loader, SongCard } from '../components';
import { genres } from '../assets/constants';

const Discover = () => {
  const dispatch = useAppDispatch();
  const { activeSong, isPlaying, genreListId } = useAppSelector(
    (state) => state.player
  );
  const { data, isFetching, error } = useGetSongsByGenreQuery(
    genreListId || 'genre-global-chart-1'
  );

  if (isFetching) return <Loader title="Loading songs..." />;

  if (error) return <Error />;

  const genreTitle = genres.find((genre) => genre.listid === genreListId)?.name;

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genreTitle}
        </h2>
        <select
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={genreListId || 'pop'}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option key={genre.id} value={genre.listid}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.tracks.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
