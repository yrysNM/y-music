import { useSelector, useDispatch } from "react-redux";
import { tracksFetchingError, tracksFetching, tracksFetchedId3 } from "../../../../../actions";
import axios from "axios";
import Spinner from "../../../../spinner/Spinner";
import ErrorMessage from "../../../../error-message/ErrorMessage";
import "./fileUpload.scss";

const FileUpload = ({ files, setFiles }) => {

    const dispatch = useDispatch();
    const { id3, tracksLoadingStatus } = useSelector(state => state.tracks);

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


        if (obj.track.buffer.byteLength > 0) {
            dispatch(tracksFetching());
            axios.post(`http://localhost:4000/tracks/`, formData)
                .then(res => dispatch(tracksFetchedId3(res.data.message)))
                .catch(e => dispatch(tracksFetchingError()));
        }

    }

    const Viewer = ({ text }) => {
        return (
            <div className="sucUplod">
                {
                    (text.length > 0)
                        ? <p>Succesfully uploaded</p>
                        : <p>Something wrong</p>
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

                <Viewer text={id3} />
            </div>
        )
    }

    return (
        <Components />
    );
}

export default FileUpload;