import { useState, useEffect } from 'react';
import axios from 'axios';

import { useGetSongByCountryQuery } from '../redux/services/shazamCore';
import { useAppSelector } from '../hooks/redux.hook';
import { Error, Loader, SongCard } from '../components';

const AroundYou = () => {
  const [country, setCountry] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const { activeSong, isPlaying } = useAppSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongByCountryQuery({
    countryCode: country,
  });

  //   const fetchLocation = useCallback(() => {
  // }, [country]);

  useEffect(() => {
    axios
      .get(
        `https://geo.ipify.org/api/v2/country?apiKey=${
          import.meta.env.VITE_GEO_API_KEY
        }`
      )
      .then((res) => setCountry(`${res?.data?.location?.country}`))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
    // fetchLocation();
  }, [country]);

  if (isFetching && loading) return <Loader title="Loading songs around you" />;
  if (error && country) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around You <span className="font-black">{country}</span>
      </h2>

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

export default AroundYou;
