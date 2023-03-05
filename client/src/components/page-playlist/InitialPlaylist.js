import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchTracks } from "../page-music/helpers/tracksSlice";
import { selectAll } from "../page-music/helpers/tracksSlice";
import PagePlaylist from "../page-playlist/PagePlaylist";


const InitialPlaylist = () => {

  const tracks = useSelector(selectAll);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTracks());
  }, []);

  return (

    tracks.length > 0 &&
    (
      <PagePlaylist />
    )
  );
}

export default InitialPlaylist;