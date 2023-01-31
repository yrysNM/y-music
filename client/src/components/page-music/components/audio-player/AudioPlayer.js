import { useState, useEffect, useRef, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux";


import { songsFetched, songsFetching, songsIndexFetched } from "../../helpers/songsSlice";
import { getUrl } from "../audio-lists/AudioLists";
import AudioControls from "../audio-controls/AudioControls";
import Spinner from "../../../spinner/Spinner";
import ErrorMessage from "../../../error-message/ErrorMessage";

import "./audioPlayer.scss";

const AudioPlayer = () => {
    // redux states
    const { tracks, indexTrack } = useSelector(state => state.tracks);
    const { songsLoadingStatus } = useSelector(state => state.songs);

    //just states
    const [trackIndex, setTrackIndex] = useState(0);
    const [trackProgress, setTrackProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [durationTrack, setDurationTrack] = useState("");

    const { trackId, title, artistName, year, picture } = tracks[trackIndex];


    const dispatch = useDispatch();

    const audioRef = useRef(new Audio(`https://yrysmusic.onrender.com/tracks/${trackId}`));
    const intervalRef = useRef();
    const isReady = useRef(false);

    const currentPercentage = durationTrack ? `${(trackProgress / durationTrack) * 100}%` : '0%';
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
        const _url = `https://yrysmusic.onrender.com/tracks/${trackId}`;
        /**
         * @abstract convert to slice
         */
        dispatch(songsFetching());

        getDuration(_url, function (duration) {
            console.log(duration);
            setDurationTrack(duration);
            /**
        * @abstract convert to slice
        */
            dispatch(songsFetched());
        });
        audioRef.current.pause();

        audioRef.current = new Audio(_url);
        audioRef.current.setAttribute("type", "audio/mp3");
        audioRef.current.setAttribute("codecs", "mp3");
        audioRef.current.setAttribute("preload", "metadata");

        audioRef.current.load();

        setTrackProgress(audioRef.current.currentTime);


    }


    function getDuration(url, next) {
        let _player = new Audio(url);

        _player.addEventListener("durationchange", function (e) {
            if (this.duration !== Infinity && !isNaN(this.duration) && this.duration) {
                let duration = this.duration;
                audioRef.current.remove();
                next(duration);
            };
        }, false);

        _player.load();
        _player.currentTime = 24 * 60 * 60;
        _player.volume = 0;
    }

    useMemo(() => {
        setTrackIndex(indexTrack)
    }, [indexTrack]);

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
        /**
         * @payload dispayth for get lyrics
         */
        dispatch(songsIndexFetched(trackId));

        /**
         * @function initilize audio and trans
         */
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
                title,
                artistName,
                picture,
                year,
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

    const calculateDurationTime = (seconds) => {
        const calcMinute = Math.floor(seconds / 60);
        const renderMinute = calcMinute < 10 ? `0${calcMinute}` : `${calcMinute}`;
        const calcSecond = Math.floor(seconds % 60);
        const renderSecond = calcSecond < 10 ? `0${calcSecond}` : `${calcSecond}`;
        return `${renderMinute}:${renderSecond}`;
    }
    return (
        <div className="audio-player">
            <div className="track-info">
                <img
                    className="artwork"
                    src={getUrl(data.picture)}
                    alt={data.picture.description}
                />
                <h2 className="audio-title">{`Title - ${data.title}`}</h2>
                <h3 className="audio-artist">{`Artist - ${data.artistName}`}</h3>
                <div className="audio-info">
                    <p>{`Year - ${data.year}`}</p>
                </div>
                <AudioControls
                    isPlaying={data.isPlaying}
                    onPrevClick={data.toPrevTrack}
                    onNextClick={data.toNextTrack}
                    onPlayPauseClick={data.setIsPlaying} />

                <input type="range"
                    value={data.trackProgress}
                    step="1"
                    min="0"
                    max={(!isNaN(data.durationTrack) && data.durationTrack) ? data.durationTrack : `${data.durationTrack}`}
                    className="progess"
                    onChange={(e) => data.onScrub(e.target.value)}
                    onMouseUp={data.onScrubEnd}
                    onKeyUp={data.onScrubEnd}
                    style={{ background: data.trackStyling }} />


                <div className="audio-time">
                    <span className="audio-currentTime">
                        {calculateDurationTime(data.trackProgress)}
                    </span>
                    <span className="audio-duration">
                        {(data.durationTrack && !isNaN(data.durationTrack)) && calculateDurationTime(data.durationTrack)}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default AudioPlayer;