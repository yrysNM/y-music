import { useSelector, useDispatch } from "react-redux";
import { tracksFetchingError, tracksFetching, tracIsUploadedkFetched } from "../../../helpers/tracksSlice";
import axios from "axios";
import Spinner from "../../../../spinner/Spinner";
import ErrorMessage from "../../../../error-message/ErrorMessage";
import "./fileUpload.scss";

const FileUpload = ({ files, setFiles }) => {

    const dispatch = useDispatch();
    const { isUpload, tracksLoadingStatus } = useSelector(state => state.tracks);

    const uploadHandlker = async (event) => {

        const target = event.target;
        const file = target.files[0];
        const soundBuffer = await file.arrayBuffer();

        if (!file) return;

        setFiles([file]);

        const fileData = {
            buffer: soundBuffer,
        }

        const formData = new FormData();
        formData.append('track', file);
        formData.append('name', file.name.substring(0, file.name.lastIndexOf(".")));

        const obj = {
            'track': fileData,
            'name': file.name,
        }

        /**
         *@abstract convert to slice 
         */
        if (obj.track.buffer.byteLength > 0) {
            dispatch(tracksFetching());
            axios.post(`https://yrysmusic.onrender.com/tracks/`, formData)
                .then(res => dispatch(tracIsUploadedkFetched(res.data.message)))
                .then(res => setTimeout(() => {
                    window.location.reload(false);
                }, 2000))
                .catch(e => dispatch(tracksFetchingError()));
        }

    }

    const Viewer = ({ text }) => {
        return (
            <div className="sucUplod">
                {
                    (text.length > 0)
                        ? <p>Succesfully uploaded</p>
                        : <p></p>
                }
            </div>
        )
    }

    const Components = () => {
        if (tracksLoadingStatus === 'loading') {
            return <Spinner />
        } else if (tracksLoadingStatus === 'error') {
            return <ErrorMessage />;
        }

        return (
            <div className="file-card">
                <div className="file-inputs">
                    <input
                        type="file"
                        name="track"
                        accept="audio/*"
                        onChange={uploadHandlker}
                    />
                </div>

                <Viewer text={isUpload} />
            </div>
        )
    }

    return (
        <Components />
    );
}

export default FileUpload;