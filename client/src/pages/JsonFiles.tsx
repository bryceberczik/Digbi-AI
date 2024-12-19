import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faCheck } from "@fortawesome/free-solid-svg-icons";

import auth from "@/utils/auth";
import { useState, useEffect } from "react";
import { fetchFiles } from "@/services/file/fetchFiles";
import { uploadFile } from "@/services/file/uploadFile";
import { removeFile } from "@/services/file/removeFile";

interface DisplayFile {
  id: string;
  fileName: string;
  fileSize: number;
}

const JsonFiles = () => {
  const [files, setFiles] = useState<DisplayFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // userId for fetching & uploading files.
  let userId = "";

  if (auth.loggedIn()) {
    const profile = auth.getProfile();

    if (profile) {
      userId = profile.id;
    }
  }

  const handleFetchFiles = async () => {
    const fetchedFiles = await fetchFiles(userId);
    setFiles(fetchedFiles);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUploadFile = async () => {
    if (!selectedFile) {
      console.error("No file selected.");
      return;
    }

    try {
      await uploadFile(selectedFile, userId);
      handleFetchFiles();
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const handleRemoveFile = async (fileId: string) => {
    try {
      await removeFile(fileId);
      handleFetchFiles();
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  useEffect(() => {
    handleFetchFiles();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div>
        <h1 className="font-bold text-gray-800 text-center mt-[100px] text-[40px]">
          Your files
        </h1>
        <h3 className="text-center text-[25px] text-[#334155]">
          Import your JSON files here.
        </h3>
      </div>

      <div className="flex flex-row items-center justify-center my-10 bg-gray-100 gap-2">
        <input
          type="file"
          accept="application/json"
          className="p-2 border border-gray-300 rounded"
          onChange={handleFileChange}
        />
        <FontAwesomeIcon
          icon={faCheck}
          className="hover:text[grey] cursor-pointer ml-6"
          onClick={handleUploadFile}
        />
      </div>

      {files.length === 0 ? (
        <div className="bg-[#FAFAF8] w-1/4 p-5 rounded shadow-md my-3">
          No files uploaded.
        </div>
      ) : (
        files.map((file) => (
          <div
            key={file.id}
            className="bg-[#FAFAF8] w-1/4 p-5 rounded shadow-md my-3"
          >
            <div className="flex flex-row justify-between items-center">
              <h1>
                <span className="font-bold">File:</span> {file.fileName}
              </h1>
              <h1>
                <span className="font-bold">Size:</span> {file.fileSize} Bytes
              </h1>
              <FontAwesomeIcon
                icon={faX}
                className="hover:text-[grey] cursor-pointer mr-2"
                onClick={() => handleRemoveFile(file.id)}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default JsonFiles;
