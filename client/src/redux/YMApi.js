import { YMApi } from 'ym-api';

const api = new YMApi();

(async () => {
  try {
    await api.init({
      username: 'loxmotov.arcen',
      password: 'J!6tV!FEyms!fHz',
    });
    const searchResult = await api.search('gorillaz', { type: 'artist' });
    const gorillaz = searchResult.artists?.results[0];
    const gorillazMostPopularTrack = gorillaz?.popularTracks[0];
    const gorillazMostPopularTrackId = gorillazMostPopularTrack?.id;
    console.log({
      searchResult,
      gorillaz,
      gorillazMostPopularTrack,
    });

    /**
     * @payload track method
     */
    const getTrackResult = await api.getTrack(gorillazMostPopularTrackId);
    console.log({ getTrackResult });

    const getTracksSupplementResult = await api.getTrackSupplement(
      gorillazMostPopularTrackId
    );
    console.log({ getTracksSupplementResult });

    const getTrackDownloadInfoResult = await api.getTrackDownloadInfo(
      gorillazMostPopularTrackId
    );
    console.log({ getTrackDownloadInfoResult });

    const mp3Tracks = getTrackDownloadInfoResult
      .filter(r => r.codec === 'mp3')
      .sort((a, b) => b.bitrateInKbps - a.bitrateInKbps);

    const hqMp3Track = mp3Tracks[0];
    console.log(`-----------trackmp3: ${mp3Tracks}---------------
                        ------------hqMp3: ${hqMp3Track}-----------------`);

    const getTracksDirectLinkResult = await api.getTrackDirectLink(
      hqMp3Track.downloadInfoUrl
    );
    console.log(`Link: ${getTracksDirectLinkResult}`);
  } catch (e) {
    console.log(`api error ${e}`);
  }
})();
