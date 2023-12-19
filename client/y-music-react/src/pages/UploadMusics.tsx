import {useRef, useState} from 'react';
import {PageTitle} from '../components';
import {FaUpload} from 'react-icons/fa6';
export const UploadMusics = () => {
  const [isDragOver, setIsDragOver] = useState(false);

  const uploadInput: React.LegacyRef<HTMLInputElement> | undefined =
    useRef(null);

  const upload = (
    event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    console.log(event);

    // const files = 'files' in event.target ? [...event.target.files] : [...event.dataTransfer.files]
    /**
     * @TODO change files
     */
    let files: File[] | null = null;

    if ('files' in event.target) {
      /**
       * @ERROR Type 'FileList | null' must have a '[Symbol.iterator]()' method that returns an iterator.
       */
      files = [...event.target.files];
    } else {
      event = event as React.DragEvent<HTMLDivElement>;
      files = [...event.dataTransfer.files];
    }

    if (files) {
    }
  };

  const onClickDropbox = (event: React.MouseEvent<HTMLInputElement>) => {
    console.log(event);

    if (uploadInput.current) {
      console.log(uploadInput.current.click());
    }
  };

  const preventStop = (
    e: React.DragEvent<HTMLDivElement>,
    isDragOver?: boolean
  ) => {
    e.stopPropagation();
    e.preventDefault();

    if (typeof isDragOver === 'boolean') {
      setIsDragOver(isDragOver);
    }
  };

  return (
    <div className="flex flex-col">
      <PageTitle title="Upload musics" />

      <div className="bg-white/50 rounded border border-gray-200 relative flex flex-col">
        <div className="px-6 pt-6 pb-5 font-bold border-b border-gray-200 flex flex-row gap-4 items-center">
          <span className="card-title text-white">Upload</span>
          <FaUpload className="text-white" />
        </div>
        <div className="p-6">
          {/* upload dropbox */}
          <div
            onClick={onClickDropbox}
            onDrag={preventStop}
            onDragStart={preventStop}
            onDragEnd={(e) => {
              preventStop(e, false);
            }}
            onDragOver={(e) => {
              preventStop(e, true);
            }}
            onDragEnter={(e) => {
              preventStop(e, true);
            }}
            onDragLeave={(e) => {
              preventStop(e, false);
            }}
            onDrop={(e) => upload(e)}
            className={
              'w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-white gray-400 transition duration-500  hover:bg-blue-700 hover:border-blue-700 hover:border-sold' +
              ` ${isDragOver && 'bg-blue-700 border-blue-400 border-sold'}`
            }
          >
            <h5>Drop your files here</h5>
          </div>
          <input
            type="file"
            ref={uploadInput}
            style={{display: 'none'}}
            multiple
            onChange={(e) => upload(e)}
          />
        </div>
      </div>
    </div>
  );
};
