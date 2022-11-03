import { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux";
import { songsFetched, songsFetchingError, songsFetching } from "../../../../actions";
import axios from "axios";
import AudioControls from "../audio-controls/AudioControls";
import Spinner from "../../../spinner/Spinner";
import ErrorMessage from "../../../error-message/ErrorMessage";
import "./audioPlayer.scss";

const AudioPlayer = () => {
    const [trackIndex, setTrackIndex] = useState(0);
    const [trackProgress, setTrackProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [durationTrack, setDurationTrack] = useState("");

    const dispatch = useDispatch();

    const { tracks } = useSelector(state => state.tracks);
    const { songsLoadingStatus } = useSelector(state => state.songs);

    const { _id, filename, uploadDate } = tracks[trackIndex];

    const audioRef = useRef(new Audio(`http://localhost:4000/tracks/${_id}`));
    /**
     * @todo need to check audioRef is loaded or not 
     */
    const intervalRef = useRef();
    const isReady = useRef(false);
    const { duration } = audioRef.current;

    const currentPercentage = durationTrack ? `${(trackProgress / durationTrack) * 100}%` : '0%';
    const trackStyling = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
    `;

    const loadDurationtrack = async (durationTrackLoaded = 200.0) => {
        if (durationTrackLoaded !== Infinity && !isNaN(durationTrackLoaded)) {
            // dispatch(songsFetched());
            setDurationTrack(durationTrack => durationTrackLoaded);
        } else {
            setDurationTrack('200.0');
            // dispatch(songsFetching());
        }
    }

    function getDataID3() {
        dispatch(songsFetching());

        axios.get(`http://localhost:4000/tracks/${_id}`, {
            "Content-type": "audio/mp3",
            "Accept-Ranges": "bytes"
        }).then(res => {
            dispatch(songsFetched());
            // audioRef.current = new Audio(res);
        }).catch(e => dispatch(songsFetchingError()));

        /**
         * @TODO need to make duration loading
         */
        // audioRef.current.onloadedmetadata = function () {
        // loadDurationtrack(audioRef.current.duration);
        // dispatch(tracksFetchedId3Loading());
        // }
    }


    function startTimer() {
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            if (audioRef.current.ended) {
                toNextTrack();
            } else {
                setTrackProgress(audioRef.current.currentTime);
            }
        }, [1000]);
    }


    const onScrub = (value) => {
        // Clear any timers already running
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = value;
        setTrackProgress(audioRef.current.currentTime);
    }

    const onScrubEnd = () => {
        // If not already playing, start
        if (!isPlaying) {
            setIsPlaying(true);
        }
        startTimer();
    }

    const toPrevTrack = () => {
        if (trackIndex - 1 < 0) {
            setTrackIndex(tracks.length - 1);

        } else if (isPlaying) {
            setIsPlaying(false);
        } else {
            setTrackIndex(trackIndex - 1);

        }
    }

    const toNextTrack = () => {
        if (trackIndex < tracks.length - 1) {
            setTrackIndex(trackIndex + 1);
        } else if (isPlaying) {
            setIsPlaying(false);
        } else {
            setTrackIndex(0);
        }
    }



    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
            startTimer();
        } else {
            audioRef.current.pause();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlaying]);

    const initialTrack = () => {
        audioRef.current.pause();
        audioRef.current = new Audio(`http://localhost:4000/tracks/${_id}`);
        audioRef.current.setAttribute("type", "audio/mp3");
        audioRef.current.setAttribute("codecs", "mp3");

        setTrackProgress(audioRef.current.currentTime);

        audioRef.current.onloadeddata = function () {
            console.log(audioRef.current.duration);
            setDurationTrack(audioRef.current.duration);
            if (audioRef.current.duration === Infinity) {
                getDataID3();
                initialTrack();
            }
        }
    }

    useEffect(() => {
        getDataID3();
        // audioRef.current.pause();
        // audioRef.current = new Audio(`http://localhost:4000/tracks/${_id}`);
        // audioRef.current.setAttribute("type", "audio/mp3");
        // audioRef.current.setAttribute("codecs", 'mp3');
        // setTrackProgress(audioRef.current.currentTime);

        initialTrack();

        audioRef.current.onloadeddata = function () {
            setDurationTrack(audioRef.current.duration);
            console.log(audioRef.current.duration, audioRef, durationTrack === Infinity);
            if (audioRef.current.duration === Infinity) {
                getDataID3();
                initialTrack();
            }
            // setDurationTrack(audioRef.current.duration);
        }

        if (isReady.current && audioRef.current && durationTrack.length > 0 && isPlaying) {
            audioRef.current.play();
            setIsPlaying(true);
            startTimer();
        } else {
            isReady.current = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trackIndex]);

    useEffect(() => {
        return () => {
            audioRef.current.pause();
            clearInterval(intervalRef.current);
        }
    }, []);


    const RenderAudioPlayer = () => {
        if (songsLoadingStatus === "loading") {
            return <Spinner />
        } else if (songsLoadingStatus === "error") {
            return <ErrorMessage />
        }

        return (
            <div className="audio-player">
                <div className="track-info">
                    <img
                        className="artwork"
                        src={"https://i.pinimg.com/736x/db/f7/70/dbf7700c03f893c9ceaf8e4882df9225.jpg"}
                        alt={`track artwork for `}
                    />
                    <h2 className="audio-title">{filename}</h2>
                    <h3 className="audio-artist">{new Date(uploadDate).toDateString()}</h3>
                    <AudioControls
                        isPlaying={isPlaying}
                        onPrevClick={toPrevTrack}
                        onNextClick={toNextTrack}
                        onPlayPauseClick={setIsPlaying} />

                    <input type="range"
                        value={trackProgress}
                        step="1"
                        min="0"
                        max={durationTrack ? durationTrack : `${durationTrack}`}
                        className="progess"
                        onChange={(e) => onScrub(e.target.value)}
                        onMouseUp={onScrubEnd}
                        onKeyUp={onScrubEnd}
                        style={{ background: trackStyling }} />

                    <div className="audio-duration">
                        {durationTrack}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <RenderAudioPlayer />
    );
}

export default AudioPlayer;