import { useEffect, useContext } from "react";

import { useSelector, useDispatch } from "react-redux";
import { fetchSongLyrics } from "../../helpers/songsSlice";
import { DataContext } from "../../../../context/DataContext";
import ErrorMessage from "../../../error-message/ErrorMessage";
import "./audioLyrics.scss";

const AudioLyrics = () => {
    const { songsLoadingStatus, songIndex } = useSelector(state => state.songs);
    const { dataForLyrics } = useSelector(state => state.songs);
    const { dropLyricsComponent } = useContext(DataContext);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSongLyrics(songIndex));
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