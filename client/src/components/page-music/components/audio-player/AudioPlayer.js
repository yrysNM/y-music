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
    const [durationTrack, setDurationTrack] = useState("");

    const dispatch = useDispatch();

    const { tracks } = useSelector(state => state.tracks);
    const { songsLoadingStatus } = useSelector(state => state.songs);

    const { _id, filename, uploadDate } = tracks[trackIndex];

    const audioRef = useRef(new Audio(`http://localhost:4000/tracks/${_id}`));
    const intervalRef = useRef();
    const isReady = useRef(false);

    const currentPercentage = durationTrack ? `${(trackProgress / durationTrack) * 100}%` : '0%';
    const trackStyling = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
    `;


    function getDataID3() {
        dispatch(songsFetching());

        axios.get(`http://localhost:4000/tracks/${_id}`, {
            "Content-type": "audio/mp3",
            "Accept-Ranges": "bytes"
        }).then(res => {
            dispatch(songsFetched());
            // audioRef.current = new Audio(res);
        }).catch(e => dispatch(songsFetchingError()));
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
        } else {
            setTrackIndex(trackIndex - 1);
        }
    }

    const toNextTrack = () => {
        if (trackIndex < tracks.length - 1) {
            setTrackIndex(trackIndex + 1);
        } else {
            setTrackIndex(0);
        }
    }

    const initialTrack = () => {

        audioRef.current.pause();

        audioRef.current = new Audio(`http://localhost:4000/tracks/${_id}`);
        audioRef.current.setAttribute("type", "audio/mp3");
        audioRef.current.setAttribute("codecs", "mp3");
        audioRef.current.setAttribute("preload", "metadata");

        audioRef.current.load();

        setTrackProgress(audioRef.current.currentTime);

        audioRef.current.addEventListener('loadedmetadata', function (e) {
            // console.log(audioRef.current.duration);
            if (audioRef.current.duration === Infinity || isNaN(audioRef.current.duration)) {
                initialTrack();
                setIsPlaying(isPlaying => !isPlaying);
            } else {
                setDurationTrack(audioRef.current.duration);
            }
        });
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

    useEffect(() => {
        if (audioRef.current.paused) {
            setIsPlaying(false);
        } else {
            setIsPlaying(true);
        }
    }, [audioRef.current.paused])

    useEffect(() => {
        getDataID3();
        initialTrack();

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




    return (
        <RenderAudioPlayer data={
            {
                songsLoadingStatus,
                filename,
                uploadDate,
                isPlaying,
                trackStyling,
                trackProgress,
                durationTrack,
                toPrevTrack,
                toNextTrack,
                setIsPlaying,
                onScrubEnd,
                onScrub,

            }
        } />
    );
}

const RenderAudioPlayer = ({ data }) => {
    if (data.songsLoadingStatus === "loading") {
        return <Spinner />
    } else if (data.songsLoadingStatus === "error") {
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
                <h2 className="audio-title">{data.filename}</h2>
                <h3 className="audio-artist">{new Date(data.uploadDate).toDateString()}</h3>
                <AudioControls
                    isPlaying={data.isPlaying}
                    onPrevClick={data.toPrevTrack}
                    onNextClick={data.toNextTrack}
                    onPlayPauseClick={data.setIsPlaying} />

                <input type="range"
                    value={data.trackProgress}
                    step="1"
                    min="0"
                    max={data.durationTrack ? data.durationTrack : `${data.durationTrack}`}
                    className="progess"
                    onChange={(e) => data.onScrub(e.target.value)}
                    onMouseUp={data.onScrubEnd}
                    onKeyUp={data.onScrubEnd}
                    style={{ background: data.trackStyling }} />

                <div className="audio-duration">
                    {data.durationTrack}
                </div>
            </div>
        </div>
    );
}

export default AudioPlayer;