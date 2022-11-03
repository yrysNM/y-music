
const FileUpload = ({ files, setFiles }) => {
    return (
        <div className="file-card">
            <div className="file-inputs">
                <input
                    type="file"
                    name="upload file"
                />
            </div>
        </div>
    );
}

export default FileUpload;