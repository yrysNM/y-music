import { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux";
import { tracksFetching, tracksFetchedId3 } from "../../../../actions";
import axios from "axios";
import AudioControls from "../audio-controls/AudioControls";
import "./audioPlayer.scss";

const AudioPlayer = () => {
    const [trackIndex, setTrackIndex] = useState(0);
    const [trackProgress, setTrackProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [durationTrack, setDurationTrack] = useState("");

    const dispatch = useDispatch();
    /**
     * @TODO need loading for track (initial track) logic check id3 
     *  if(id3) {
     *    idle
     * }else {
     *  loading
     * }
     */
    const { tracksLoadingStatus, tracks, id3 } = useSelector(state => state.tracks);

    const { _id, filename, uploadDate } = tracks[trackIndex];

    const audioRef = useRef(new Audio(`http://localhost:4000/tracks/${_id}`));
    const intervalRef = useRef();
    const isReady = useRef(false);
    const { duration } = audioRef.current;
    useEffect(() => {
        if (duration && duration !== Infinity && !isNaN(duration)) {
            setDurationTrack(duration);
        }
    }, [duration]);
    const currentPercentage = durationTrack ? `${(trackProgress / durationTrack) * 100}%` : '0%';
    const trackStyling = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
`;

    useEffect(() => {

        axios.get(`http://localhost:4000/tracks/${_id}`,
            {
                "Content-Type": "audio/mp3",
                "Accept-Ranges": "bytes",
            })
            .then(res => dispatch(tracksFetchedId3(res.data)))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trackIndex]);


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
        if (audioRef.current.src.length < 0) {
            dispatch(tracksFetching());
        } else {

            audioRef.current.pause();

            audioRef.current = new Audio(`http://localhost:4000/tracks/${_id}`);

            setTrackProgress(audioRef.current.currentTime);


            if (isReady.current && audioRef.current) {
                audioRef.current.play();
                setIsPlaying(true);
                startTimer();
            } else {
                isReady.current = true;
            }
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
            </div>
        </div>
    );
}

export default AudioPlayer;