import { createContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { tracksIndexFetched } from "../components/page-music/helpers/tracksSlice";

export const DataContext = createContext(null);

const DataContextProvider = ({ children }) => {
    const [modal, setModal] = useState(false);
    const [addLyrics, setAddLyrics] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const dispatch = useDispatch();
    const { indexTrack, tracks } = useSelector(state => state.tracks);

    /**
     * @function musicControler
     */
    const toPrevTrack = () => {
        if (indexTrack - 1 < 0) {
            dispatch(tracksIndexFetched(tracks.length - 1));
        } else {
            dispatch(tracksIndexFetched(indexTrack - 1));
        }
    }

    const toNextTrack = () => {
        if (indexTrack < tracks.length - 1) {
            dispatch(tracksIndexFetched(indexTrack + 1));
        } else {
            dispatch(tracksIndexFetched(0));
        }
    }

    const onPlayPauseClick = (valuePlayPause) => {
        setIsPlaying(valuePlayPause);
    }

    function openModal() {
        setModal(true);
    }

    function closeModal() {
        setModal(false);
    }

    function addLyricsComponent() {
        setAddLyrics(true);
    }

    function dropLyricsComponent() {
        setAddLyrics(false);
    }

    return (
        <DataContext.Provider value={{
            modal,
            addLyrics,
            addLyricsComponent,
            dropLyricsComponent,
            openModal,
            closeModal,
            toPrevTrack,
            toNextTrack,
            onPlayPauseClick,
            isPlaying
        }}>
            {children}
        </DataContext.Provider>
    );
}

export default DataContextProvider;