import { Error, Loader } from '../components';
import { useAppSelector } from '../hooks/redux.hook';
import { YMApi } from 'ym-api';
import { useGetNewReleasesQuery } from '../redux/services/spotifyCore';
import SpotifySongCard from '../components/Spotify/SpotifySongCard';
import { useEffect } from 'react';
import config from '../utils/configUserData';
import axios from 'axios';
import { MD5 } from 'crypto-js';
import parser from 'fast-xml-parser';

function SpotifyAlbums() {
  const { activeSong, isPlaying } = useAppSelector(state => state.player);

  const { data, isFetching, error } = useGetNewReleasesQuery();

  async function getTrack() {
    try {
      const api = new YMApi();
      await api.init(config.user);
      const getUserPlaylistKind = await api.getUserPlaylists();
      console.log({ getUserPlaylistKind });

      const getPlaylistsOptions = { 'rich-tracks': true };
      const getPlaylist = await api.getPlaylist(
        getUserPlaylistKind[1].kind,
        getUserPlaylistKind[1].uid
        // getPlaylistsOptions
      );
      console.log(getPlaylist);

      const getTrackDownloadInfoResult = await api.getTrackDownloadInfo(
        111339628
      );
      console.log({ getTrackDownloadInfoResult });

      const mp3Tracks = getTrackDownloadInfoResult
        .filter(r => r.codec === 'mp3')
        .sort((a, b) => b.bitrateInKbps - a.bitrateInKbps);
      const hqMp3Track = mp3Tracks[0];
      console.log({ mp3Tracks, hqMp3Track });
      console.log(hqMp3Track.downloadInfoUrl);

      /**
       * @REQUEST -> get track mp3
       */
      await axios
        .get(hqMp3Track.downloadInfoUrl, {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
          },
        })
        .then(res => {
          console.log(res);
          const parseXml = new parser.XMLParser();

          const xmlData = parseXml.parse(res.data);

          console.log(xmlData);

          const host = xmlData['download-info'].host;
          const path = xmlData['download-info'].path;
          const ts = xmlData['download-info'].ts;
          const s = xmlData['download-info'].s;

          const sign = MD5(
            'XGRlBW9FXlekgbPrRHuSiA' + path.slice(1) + s
          ).toString();

          console.log(`https://${host}/get-mp3/${sign}/${ts}${path}`);
        });
    } catch (error) {
      console.error(`error froma api ${error}`);
    }
  }

  useEffect(() => {
    getTrack();
  }, []);

  if (isFetching) return <Loader />;

  if (error) return <Error />;

  return (
    <>
      <div>
        <h3 className="text-white text-lg">Sporify Albums</h3>

        <div className="flex align-items gap-4 flex-wrap mt-10">
          {data?.albums.items.map((item, i) => (
            <SpotifySongCard
              key={item.id}
              song={item}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={data.albums.items}
              i={i}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default SpotifyAlbums;
