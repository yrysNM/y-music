import { useRef } from "react";
import { PageTitle } from "../components"
import { FaUpload } from "react-icons/fa6";
export const UploadMusics = () => {

    const uploadInput: (React.LegacyRef<HTMLInputElement>) | undefined = useRef(null);

    const upload = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event);
    }

    const onClickDropbox = (event: React.MouseEvent<HTMLInputElement>) => {
        console.log(event);

        if (uploadInput.current) {

            console.log(uploadInput.current.click());
        }
    }


    return (
        <div className="flex flex-col">
            <PageTitle title="Upload favorite musics" />

            <div className="bg-white/50 rounded border border-gray-200 relative flex flex-col">
                <div className="px-6 pt-6 pb-5 font-bold border-b border-gray-200 flex flex-row gap-4 items-center">
                    <span className="card-title text-white">Upload</span>
                    <FaUpload className="text-white" />
                </div>
                <div className="p-6">
                    {/* upload dropbox */}
                    <div className="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-white gray-400 transition duration-500  hover:bg-blue-700 hover:border-blue-700 hover:border-sold" onClick={onClickDropbox}>
                        <h5>Drop your files here</h5>
                    </div>
                    <input type="file" ref={uploadInput} style={{ display: 'none' }} multiple onChange={(e) => upload(e)} />
                </div>
            </div>
        </div>
    )
} 