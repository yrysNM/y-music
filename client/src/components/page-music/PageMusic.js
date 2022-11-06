import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { tracksFetched, tracksFetching, tracksFetchingError } from "../../actions";
import AudioPlayer from "./components/audio-player/AudioPlayer";
import AudioLists from "./components/audio-lists/AudioLists";
import AudioAdd from "./components/audio-add/AudioAdd";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../error-message/ErrorMessage";



const PageMusic = () => {
    const { tracksLoadingStatus, tracks } = useSelector(state => state.tracks);
    const dispatch = useDispatch();
    const { request } = useHttp();


    async function getData() {

        dispatch(tracksFetching());
        request("http://localhost:4000/tracks/files")
            .then(res => dispatch(tracksFetched(res)))
            .catch(dispatch(tracksFetchingError()));

    }

    useEffect(() => {
        getData();
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
        <div>
            {
                renderTracks(tracksLoadingStatus, tracks)
            }
            <AudioLists />
        </div>
    );
}

export default PageMusic;