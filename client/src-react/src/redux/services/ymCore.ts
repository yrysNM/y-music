import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import parser from "fast-xml-parser";
import { MD5 } from "crypto-js";

import { ymApi } from "../../api/ym";

export const fetchYmUserPlaylists = createAsyncThunk(
    "ym/fetchUserPlaylist",
    async () => {
        return await ymApi().getUserPlaylists();
    }
)

export const fetchYmLikeFromRadioPlaylist = createAsyncThunk(
    "ym/fetchLikeFromRadioPlayList",
    async (playlistData: {
        kind: number,
        uid: number
    }) => {
        return await ymApi().getPlaylist(playlistData.kind, playlistData.uid);
    }
)

type ymMp3 = {
    trackId: number,
    indexTrack: number
}

export const fetchTrackMp3 = createAsyncThunk(
    "ym/fetchTrackMp3",
    async ({ trackId, indexTrack }: ymMp3) => {
        const getTrackDownloadInfoResult = await ymApi().getTrackDownloadInfo(trackId);

        const mp3Tracks = getTrackDownloadInfoResult.filter(r => r.codec === 'mp3').sort((a, b) => b.bitrateInKbps - a.bitrateInKbps);

        const hqMp3Track = mp3Tracks[0];

        return await axios.get(hqMp3Track.downloadInfoUrl, {
            headers: {
                "Content-Type": "application/xml; charset=utf-8"
            }
        })
            .then(res => {
                const parseXml = new parser.XMLParser();
                const xmlData = parseXml.parse(res.data);

                const host = xmlData['download-info'].host;
                const path = xmlData['download-info'].path;
                const ts = xmlData['download-info'].ts;
                const s = xmlData['download-info'].s;

                const signDecode = MD5(
                    'XGRlBW9FXlekgbPrRHuSiA' + path.slice(1) + s
                ).toString();

                return {
                    uri: `https://${host}/get-mp3/${signDecode}/${ts}${path}`,
                    id: trackId,
                    i: indexTrack
                }
            })

    }
)