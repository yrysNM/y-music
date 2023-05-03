import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/redux.hook';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';

import PlayPause, { IPlayPauseProps } from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import type { Track } from '../interfaces/interfaceShazamTopTracks';

import 'swiper/css';
import 'swiper/css/free-mode';

interface ITopChartCard extends IPlayPauseProps {
  i: number;
}

const _cistomUrl =
  'https://www.shazam.com/resources/6d5bc923785ad71cf6206e7c624a1d77f98274e2/nocoverart.jpg';

const TopChartCard = ({
  song,
  i,
  isPlaying,
  activeSong,
  handlePause,
  handlePlay,
}: ITopChartCard) => (
  <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-2  rounded-lg cursor-pointer mb-2">
    <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img
        src={song?.images?.coverart ?? _cistomUrl}
        alt={`${song.title}`}
        className="w-20 h-20 rounded-lg"
      />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link to={`/songs/${song.key}`}>
          <p className="text-xl font-bold text-white">{song?.title}</p>
        </Link>
        <Link
          to={song?.artists ? `/artists/${song?.artists[0].adamid}` : '/404'}
        >
          <p className="text-base font-bold text-gray-300 mt-1">
            {song?.subtitle}
          </p>
        </Link>
      </div>
    </div>
    <PlayPause
      song={song}
      isPlaying={isPlaying}
      activeSong={activeSong}
      handlePause={handlePause}
      handlePlay={handlePlay}
    />
  </div>
);

const TopPlay = () => {
  const dispatch = useAppDispatch();
  const disRef = useRef<HTMLDivElement>(null);

  const { activeSong, isPlaying } = useAppSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const topPlays = data?.tracks.slice(0, 5);

  useEffect(() => {
    disRef.current?.scrollIntoView({ behavior: 'smooth' });
  });

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song: Track, i: number) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div
      ref={disRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-x-full flex flex-col"
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2x1">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard
              song={song}
              i={i}
              key={song.key}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePause={handlePauseClick}
              handlePlay={() => handlePlayClick(song, i)}
            />
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2x1">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={15}
          freeMode
          centeredSlidesBounds
          centeredSlides
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlays?.map((song) => (
            <SwiperSlide
              key={song.key}
              style={{ width: '25%', height: 'auto' }}
              className="shadow-lg rounded-full animate-slideright "
            >
              <Link
                to={
                  song?.artists ? `/artists/${song?.artists[0].adamid}` : '/404'
                }
              >
                <img
                  src={song?.images?.background ?? _cistomUrl}
                  alt="name"
                  className="rounded-full w-full object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
