import { useState } from "react";
import FileUpload from "./file-upload/FileUpload";
import "./audioAdd.scss";

const AudioAdd = () => {
    const [files, setFiles] = useState([{
        name: 'testMusic.mp3'
    }]);

    return (
        <div className="audio-add">

            <p className="title">
                Upload file
            </p>

            <FileUpload files={files} setFiles={setFiles} />
        </div>
    );
}

export default AudioAdd;