import {useRef, useState} from 'react';
import {PageTitle} from '../components';
import {FaUpload} from 'react-icons/fa6';
import axios from 'axios';

interface IUploadState {
  name: string;
  icon: string;
  variant: string;
  textClass: string;
}

export const UploadMusics = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  // const [uploads, setUploads] = useState<IUploadState[]>([]);
  const [progress, setProgress] = useState<number>(0);

  const uploadInput: React.LegacyRef<HTMLInputElement> | undefined =
    useRef(null);

  const uploadFunction = (
    event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();
    event.preventDefault();

    let files: File[] =
      'files' in event.target && event.target.files
        ? [...event.target.files]
        : [...(event as React.DragEvent<HTMLDivElement>).dataTransfer.files];

    setFiles(files);
    initialUpload(0);
  };

  const initialUpload = async (index: number) => {
    if (!files || files.length === 0) return;
    if (!(index >= 0 && index < files.length)) return;

    const file = files[index];

    if (!navigator.onLine) {
      setIsOffline(true);
    } else {
      setIsOffline(true);

      const formData = new FormData();
      formData.append('track', file);
      formData.append(
        'name',
        file.name.substring(0, file.name.lastIndexOf('.'))
      );

      await axios
        .post(`${import.meta.env.VITE_LOCAL_URL}/tracks`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const progress =
              (progressEvent.loaded / (progressEvent.total || 1)) * 50;
            setProgress(progress);
          },
          onDownloadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const progress =
                50 + (progressEvent.loaded / (progressEvent.total || 1)) * 50;
              setProgress(progress);
            }
          },
        })
        .then(() => {
          setIsOffline(false);
          initialUpload((index += 1));
        })
        .catch(() => {
          setIsOffline(true);
        });
    }
  };

  const onClickDropbox = () => {
    if (uploadInput.current) {
      uploadInput.current.click();
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
            onDrop={(e) => uploadFunction(e)}
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
            onChange={(e) => uploadFunction(e)}
          />

          <hr className="my-6" />
          {files.map((upload, i) => (
            <div key={i}>
              <div
                className={
                  'font-bold text-sm' +
                  ` ${isOffline ? 'text-red-400' : 'text-green-400'}`
                }
              >
                <i className={isOffline ? 'fas fa-times' : 'fas fa-check'}></i>
                {upload.name}
              </div>
              <div className="flex h-4  overflow-hidden bg-gray-200 rounded">
                <div
                  className={
                    'transition-all progress-bar bg-blue-400' +
                    ` ${isOffline ? 'bg-red-400' : 'bg-green-400'}`
                  }
                  style={{width: progress + '%'}}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
