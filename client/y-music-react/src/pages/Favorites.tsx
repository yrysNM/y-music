import {useEffect, useState} from 'react';
import {PageTitle, Error, Loader, SongCard} from '../components';
import type {
  IShazamTopTracks,
  Track,
} from '../interfaces/interfaceShazamTopTracks';
import {Picture, useGetTracksQuery} from '../redux/services/localCore';
import {useAppSelector} from '../hooks/redux.hook';
import {
  ActionType,
  Displayname,
  HubType,
  Name,
  TrackType,
} from '../interfaces/interfaceShazamTopTracks/interfaceShazamTopTracks';

export const Favorites = () => {
  const {activeSong, isPlaying} = useAppSelector((state) => state.player);
  const [track, setTrack] = useState<IShazamTopTracks>({
    properties: {},
    tracks: [],
  });
  const {data, isFetching, error} = useGetTracksQuery();

  useEffect(() => {
    initalTrack(0);
  }, [data]);

  function getUrl(data8: Picture) {
    const content = new Uint8Array(data8.data);
    return URL.createObjectURL(
      new Blob([content.buffer], {
        type: data8.format,
      })
    );
  }

  async function initalTrack(index: number) {
    if (!data || data.length === 0) return;
    if (!(index >= 0 && index < data.length)) return;

    const songUrl = `${import.meta.env.VITE_LOCAL_URL}/tracks/${
      data[index].trackId
    }`;

    const trackObj: Track = {
      attributes: '',
      highlightsurls: {
        artisthighlightsurl: '',
        trackhighlighturl: '',
      },
      images: {
        background: getUrl(data[index].picture),
        coverart: getUrl(data[index].picture),
      },
      key: data[index]._id,
      layout: 'y-music',
      properties: {},
      subtitle: data[index].genre,
      title: data[index].title,
      type: TrackType.Music,
      url: songUrl,
      hub: {
        actions: [
          {
            name: Name.Apple,
            type: ActionType.Applemusicplay,
          },
          {
            name: Name.yMusic,
            type: ActionType.URI,
            uri: songUrl,
          },
        ],
        displayname: Displayname.yMusic,
        explicit: false,
        image: '',
        type: HubType.yMusic,
      },
      artists: [
        {
          adamid: data[index].year,
          alias: data[index].artistName,
          id: data[index].trackId,
        },
      ],
    };

    setTrack((tracksObj) => ({
      properties: {},
      tracks: tracksObj.tracks.concat([trackObj]),
    }));

    initalTrack((index += 1));
  }

  if (isFetching) return <Loader title="Loading songs around you" />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <PageTitle title="Favorites" />

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {track.tracks.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={track}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};
