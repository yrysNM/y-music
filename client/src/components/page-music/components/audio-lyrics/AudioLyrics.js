import { useSelector, useDispatch } from "react-redux";
import { useHttp } from "../../../../hooks/http.hook";
import { useEffect, useState, useContext } from "react";
import { songsFetched, songsFetching, songsFetchingError } from "../../helpers/songsSlice";
import { DataContext } from "../../../../context/DataContext";
import ErrorMessage from "../../../error-message/ErrorMessage";
import "./audioLyrics.scss";

const AudioLyrics = () => {
    const [lyrics, setLyrics] = useState("");
    const { request } = useHttp();
    const { dataForLyrics } = useSelector(state => state.tracks);
    const { songsLoadingStatus } = useSelector(state => state.songs);
    const { dropLyricsComponent } = useContext(DataContext);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(songsFetching());
        request(`https://yrysmusic.onrender.com/track/lyrics/${dataForLyrics.id}`)
            .then(res => {
                setLyrics(res);
                dispatch(songsFetched());
            }).catch(e => dispatch(songsFetchingError()));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataForLyrics.id]);

    const View = () => {
        if (songsLoadingStatus === "loading") {
            return;
        } else if (songsLoadingStatus === "error") {
            return <ErrorMessage />
        }

        return (
            <div>
                <p className="audio-lyrics__text">
                    {lyrics}
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