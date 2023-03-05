import { useState, useEffect, useRef, useContext } from "react"
import { useSelector, useDispatch } from "react-redux";

// import { fetchSong } from "../../helpers/songsSlice";
import { selectAll } from "../../helpers/tracksSlice";
import { useHttp } from "../../../../hooks/http.hook";
import { fetchTrack } from "../../../../actions";
import { songsIndexFetched } from "../../helpers/songsSlice";
import { getUrl } from "../audio-lists/AudioLists";
import { DataContext } from "../../../../context/DataContext";
import AudioControlsComponent from "../audio-controls/AudioControls";
import Spinner from "../../../spinner/Spinner";
import ErrorMessage from "../../../error-message/ErrorMessage";

import "./audioPlayer.scss";

const AudioPlayer = () => {
  // redux states
  const dispatch = useDispatch();
  const tracks = useSelector(selectAll);
  const { indexTrack } = useSelector(state => state.tracks);
  const { songsLoadingStatus } = useSelector(state => state.songs);

  const { toNextTrack, isPlaying, onPlayPauseClick } = useContext(DataContext);

  //just states
  const [trackProgress, setTrackProgress] = useState(0);
  const [durationTrack, setDurationTrack] = useState("");

  const { trackId, title, artistName, year, picture, audioSrc } = tracks[indexTrack];

  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();
  const isReady = useRef(false);
  const currentPercentage = durationTrack ? `${(trackProgress / durationTrack) * 100}%` : '0%';
  const trackStyling = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))`;

  const { request } = useHttp();

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
      onPlayPauseClick(true);
    }
    startTimer();
  }


  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      // clearInterval(intervalRef.current);
      audioRef.current.pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  useEffect(() => {
    /**
     * @payload dispath for get lyrics
     */
    dispatch(songsIndexFetched(trackId));

    /**
     * @access initail track
     */
    dispatch(fetchTrack(request, audioSrc, setTrackProgress, setDurationTrack, audioRef, isPlaying));


    if (isReady.current) {
      onPlayPauseClick(true);
      audioRef.current.play();
      startTimer();
    } else {
      isReady.current = true;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexTrack]);


  useEffect(() => {

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    }
  }, []);


  const calculateDurationTime = (seconds) => {
    const calcMinute = Math.floor(seconds / 60);
    const renderMinute = calcMinute < 10 ? `0${calcMinute}` : `${calcMinute}`;
    const calcSecond = Math.floor(seconds % 60);
    const renderSecond = calcSecond < 10 ? `0${calcSecond}` : `${calcSecond}`;
    return `${renderMinute}:${renderSecond}`;
  }

  const renderElements = () => {
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
            src={getUrl(picture)}
            alt={picture.description}
          />
          <h2 className="audio-title">{`Title - ${title}`}</h2>
          <h3 className="audio-artist">{`Artist - ${artistName}`}</h3>
          <div className="audio-info">
            <p>{`Year - ${year}`}</p>
          </div>

          <AudioControlsComponent />

          <input type="range"
            value={trackProgress}
            step="1"
            min="0"
            max={(!isNaN(durationTrack) && durationTrack) ? durationTrack : `${durationTrack}`}
            className="progess"
            onChange={(e) => onScrub(e.target.value)}
            onMouseUp={onScrubEnd}
            onKeyUp={onScrubEnd}
            style={{ background: trackStyling }} />


          <div className="audio-time">
            <span className="audio-currentTime">
              {calculateDurationTime(trackProgress)}
            </span>
            <span className="audio-duration">
              {(durationTrack && !isNaN(durationTrack)) && calculateDurationTime(durationTrack)}
            </span>
          </div>
        </div>
      </div>
    );
  }

  const elements = renderElements();
  return (
    <>
      {elements}
    </>
  );
}


export default AudioPlayer;