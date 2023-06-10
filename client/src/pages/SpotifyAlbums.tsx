import { Error, Loader } from '../components';
import { useAppSelector, useAppDispatch } from '../hooks/redux.hook';
import { YMApi } from 'ym-api';
import { useGetNewReleasesQuery } from '../redux/services/spotifyCore';
import { useEffect } from 'react';
import config from '../utils/configUserData';
import axios from 'axios';
import { MD5 } from 'crypto-js';
import parser from 'fast-xml-parser';
import { fetchYmLikeFromRadioPlaylist, fetchYmUserPlaylists } from '../redux/services/ymCore';
import YmSongCard from '../components/Ym/YmSongCard';

function SpotifyAlbums() {
  const { activeSong, isPlaying } = useAppSelector(state => state.player);
  const { ymUserPlaylists, ymLikeRadioPlaylist } = useAppSelector(state => state.ym);
  const { isFetching, error } = useGetNewReleasesQuery();
  const dispatch = useAppDispatch();

  /**
   * @TODO get mp3
   */
  async function getTrack() {
    try {
      const api = new YMApi();
      await api.init(config.user);
      const getUserPlaylistKind = await api.getUserPlaylists();
      console.log({ getUserPlaylistKind });

      // const getPlaylistsOptions = { 'rich-tracks': true };
      const getPlaylist = await api.getPlaylist(
        getUserPlaylistKind[1].kind,
        getUserPlaylistKind[1].uid
        // getPlaylistsOptions
      );
      console.log(getPlaylist);

      const getTrackDownloadInfoResult = await api.getTrackDownloadInfo(
        71237778
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
    dispatch(fetchYmLikeFromRadioPlaylist({
      kind: ymUserPlaylists[1]?.kind,
      uid: ymUserPlaylists[1]?.uid,
    }));
  }, [ymUserPlaylists]);

  useEffect(() => {
    dispatch(fetchYmUserPlaylists());;
  }, []);

  if (isFetching) return <Loader />;

  if (error) return <Error />;



  return (
    <>
      <div>
        <h3 className="text-white text-lg">Ym musics</h3>

        <div className="flex align-items gap-4 flex-wrap mt-10">
          {ymLikeRadioPlaylist?.tracks?.map((item, i) => (
            <YmSongCard
              key={item.id}
              isPlaying={isPlaying}
              activeSong={activeSong}
              i={i}
              song={item}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default SpotifyAlbums;
