import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { useGetTracksQuery } from "../../api/apiSlice";

import AudioPlayer from "./components/audio-player/AudioPlayer";
import AudioLists from "./components/audio-lists/AudioLists";
import AudioLyrics from "./components/audio-lyrics/AudioLyrics";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../error-message/ErrorMessage";
import { fetchTracks, selectAll } from "../page-music/helpers/tracksSlice";
import { DataContext } from "../../context/DataContext";



const PageMusic = () => {
  const tracks = useSelector(selectAll);
  const { tracksLoadingStatus } = useSelector(state => state.tracks);
  const { addLyrics } = useContext(DataContext);
  const dispatch = useDispatch();
  // const {
  //   data: tracks,
  //   isFetching,
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   error
  // } = useGetTracksQuery()

  function getData() {
    dispatch(fetchTracks());
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
      return (
        <>
          <AudioPlayer />
          <AudioLists />
        </>
      );
    }

  }

  const elements = renderTracks(tracksLoadingStatus, tracks);
  return (
    <div style={{ position: "relative" }}>
      {elements}

      {
        addLyrics
          ? <AudioLyrics />
          : null
      }
    </div>
  );
}

export default PageMusic;