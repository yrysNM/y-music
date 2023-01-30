import { useEffect, useContext } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useHttp } from "../../../../hooks/http.hook";
import { fetchLyrics } from "../../../../actions";
import { DataContext } from "../../../../context/DataContext";
import ErrorMessage from "../../../error-message/ErrorMessage";
import "./audioLyrics.scss";

const AudioLyrics = () => {
    const { request } = useHttp();
    const { songsLoadingStatus, songIndex } = useSelector(state => state.songs);
    const { dataForLyrics } = useSelector(state => state.tracks);
    const { dropLyricsComponent } = useContext(DataContext);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLyrics(request, songIndex));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [songIndex]);

    const View = () => {
        if (songsLoadingStatus === "loading") {
            return;
        } else if (songsLoadingStatus === "error") {
            return <ErrorMessage />
        }

        return (
            <div>
                <p className="audio-lyrics__text">
                    {dataForLyrics}
                </p>

                <div className="audio-lyrics__cancel" onClick={dropLyricsComponent}>
                    <img src={"https://img.icons8.com/nolan/2x/delete-sign.png"} alt="close icon" />
                </div>
            </div>
        );
    }

    return (
        <div className="audio-lyrics">
            <View />
        </div>
    );
}

export default AudioLyrics;