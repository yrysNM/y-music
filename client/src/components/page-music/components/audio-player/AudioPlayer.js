import { useState, useEffect, useRef } from "react"
import AudioControls from "../audio-controls/AudioControls";
import "./audioPlayer.scss";
import data from "../data/tracks";

const AudioPlayer = ({ tracks, musicData }) => {
    const [trackIndex, setTrackIndex] = useState(0);
    const [trackProgress, setTrackProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [dataTrack, setDataTrack] = useState("6349211739789eec901abf45");

    useEffect(() => {
        if (musicData.length > 0) {
            setDataTrack(musicData[trackIndex]._id);
        }
    }, [trackIndex]);

    const audioRef = useRef(new Audio(`http://localhost:4000/tracks/${dataTrack}`));
    const intervalRef = useRef();
    const isReady = useRef(false);
    const { duration } = audioRef.current;

    const currentPercentage = duration ? `${(trackProgress / duration) * 100}%` : '0%';
    const trackStyling = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
`;

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
            setTrackIndex(musicData.length - 1);
        } else {
            setTrackIndex(trackIndex - 1);
        }
    }

    const toNextTrack = () => {
        if (trackIndex < musicData.length - 1) {
            setTrackIndex(trackIndex + 1);
        } else {
            setTrackIndex(0);
        }
    }



    useEffect(() => {
        if (isPlaying) {
            if (audioRef.current.play) {
                audioRef.current.play();
                startTimer();
            }

        } else {
            // clearInterval(intervalRef.current);
            audioRef.current.pause();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlaying]);


    useEffect(() => {
        audioRef.current.pause();

        audioRef.current = new Audio(`http://localhost:4000/tracks/${dataTrack}`);

        setTrackProgress(audioRef.current.currentTime);

        if (isReady.current) {
            audioRef.current.play();
            setIsPlaying(true);
            startTimer();
        } else {
            isReady.current = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trackIndex]);

    useEffect(() => {
        setIsPlaying(!audioRef.current.paused);
    }, [audioRef.current.paused])


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
                <h2 className="audio-title">{"default"}</h2>
                <h3 className="audio-artist">{"none"}</h3>
                <AudioControls
                    isPlaying={isPlaying}
                    onPrevClick={toPrevTrack}
                    onNextClick={toNextTrack}
                    onPlayPauseClick={setIsPlaying} />

                <input type="range"
                    value={trackProgress}
                    step="1"
                    min="0"
                    max={duration ? duration : `${duration}`}
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