import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { DataContext } from "../../context/DataContext";
import { tracksFetched, tracksFetching, tracksFetchingError } from "../../actions";
import AudioPlayer from "./components/audio-player/AudioPlayer";
import AudioLists from "./components/audio-lists/AudioLists";
import AudioLyrics from "./components/audio-lyrics/AudioLyrics";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../error-message/ErrorMessage";



const PageMusic = () => {
    const { tracksLoadingStatus, tracks } = useSelector(state => state.tracks);
    const dispatch = useDispatch();
    const { request } = useHttp();
    const { addLyrics } = useContext(DataContext);

    async function getData() {

        dispatch(tracksFetching());
        request("https://yrysmusic.onrender.com/tracks/data")
            .then(res => dispatch(tracksFetched(res)))
            .catch(dispatch(tracksFetchingError()));

    }



    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderTracks = (status, tracks) => {
        if (status === "loading") {
            return <Spinner />;
        } else if (status === "error") {
            return <ErrorMessage />
        }

        if (tracks && tracks.length > 0) {
            return <AudioPlayer />
        }
    }

    return (
        <div style={{ position: "relative" }}>
            {
                renderTracks(tracksLoadingStatus, tracks)
            }
            <AudioLists />

            {
                addLyrics
                    ? <AudioLyrics />
                    : null
            }
        </div>
    );
}

export default PageMusic;