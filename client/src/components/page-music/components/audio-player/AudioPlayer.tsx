import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectAll } from "../../helpers/tracksSlice";
import { songsIndexFetched } from "../../helpers/songsSlice";
import { getUrl } from "../audio-lists/AudioLists";
import AudioControlsComponent from "../audio-controls/AudioControls";

import "./audioPlayer.scss";

const AudioPlayer = () => {
  const tracks = useSelector(selectAll);

}