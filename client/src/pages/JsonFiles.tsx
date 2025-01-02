import "../styles/jsonfiles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faCheck } from "@fortawesome/free-solid-svg-icons";

import auth from "@/utils/auth";
import { useState, useEffect } from "react";
import { fetchFiles, fetchAllFiles } from "@/services/file/fetchFiles";
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
  const [fileText, setFileText] = useState("No file chosen");

  const fileLimit = 5;
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
      const file = event.target.files[0];
      setSelectedFile(file);
      setFileText(file.name); // Update text with file name
    }
  };

  const handleUploadFile = async () => {
    if (!selectedFile) {
      alert("Please select a JSON file to upload.");
      return;
    }

    const uploadedFiles = await fetchFiles(userId);
    if (uploadedFiles.length >= fileLimit) {
      alert(
        `You have reached the max file limit of ${fileLimit}. Remove other files to upload ${selectedFile.name}.`
      );
      return;
    }

    // const allFiles = await fetchAllFiles();
    // for (let i = 0; i < allFiles.length; i++) {
    //   if (selectedFile.name === allFiles[i].fileName) {
    //     alert("Each file must have a unique name.");
    //     setSelectedFile(null);
    //     return;
    //   }
    // }

    try {
      await uploadFile(selectedFile, userId);
      handleFetchFiles();
      setSelectedFile(null);
      setFileText("No file chosen");
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
    <div className="flex flex-col items-center mt-[100px]">
      <div>
        <h1 className="mq-heading text-gray-800 text-center mt-[100px] text-[40px]">
          Your files
        </h1>
        <h3 className="text-center text-[25px] text-[#334155]">
          Import your JSON files here.
        </h3>
      </div>

      {/* File Input Section */}
      <div className="flex flex-row items-center justify-center my-10 bg-gray-100 gap-2">
        <label
          htmlFor="fileInput"
          className="p-2 bg-slate-500 text-white rounded cursor-pointer hover:bg-slate-600"
        >
          Choose File
        </label>
        <span className="text-gray-500">{fileText}</span>
        <input
          id="fileInput"
          type="file"
          accept="application/json"
          className="hidden"
          onChange={handleFileChange}
        />
        <FontAwesomeIcon
          icon={faCheck}
          className="mq-upload hover:text[grey] cursor-pointer ml-6"
          onClick={handleUploadFile}
        />
      </div>

      {/* Display Files */}
      {files.length === 0 ? (
        <div className="bg-[#FAFAF8] w-1/5 p-5 rounded shadow-md my-3 flex justify-center mq-nofiles">
          No files uploaded.
        </div>
      ) : (
        files.map((file) => (
          <div
            key={file.id}
            className="mq-files bg-[#FAFAF8] w-1/4 p-5 rounded shadow-md my-3"
          >
            <div className="flex flex-row justify-between items-center">
              <h1>
                <span className="font-bold">File:</span> {file.fileName}
              </h1>
              <h1 className="hide-on-mobile">
                <span className="font-bold">Size:</span> {file.fileSize} Bytes
              </h1>
              <FontAwesomeIcon
                icon={faX}
                className="mq-remove hover:text-[grey] cursor-pointer mr-2"
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
