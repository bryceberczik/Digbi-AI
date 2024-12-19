import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faCheck } from "@fortawesome/free-solid-svg-icons";

import auth from "@/utils/auth";
import { useState } from "react";
import { fetchFiles } from "@/services/fetchFiles";

interface File {
  id: string;
  fileName: string;
  fileSize: number;
}

const JsonFiles = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFetchFiles = async () => {
    let userId = "";

    if (auth.loggedIn()) {
      const profile = auth.getProfile();

      if (profile) {
        userId = profile.id;
      } else {
        console.error("User is not logged in.");
      }

      const fetchedFiles = await fetchFiles(userId);
      setFiles(fetchedFiles);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div>
        <h1 className="text-center mt-[100px] text-[40px] text-[#334155]">
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
        />
        <FontAwesomeIcon
          icon={faCheck}
          className="hover:text[grey] cursor-pointer"
        />
      </div>

      <div className="bg-[#FAFAF8] w-1/4 p-5 rounded shadow-md my-3">
        <div className="flex flex-row justify-between items-center">
          <h1>alien_planets.json</h1>
          <h1>Size: 10kb</h1>
          <FontAwesomeIcon
            icon={faX}
            className="hover:text-[grey] cursor-pointer"
          />
        </div>
      </div>
      <div className="bg-[#FAFAF8] w-1/4 p-5 rounded shadow-md my-3">
        <div className="flex flex-row justify-between items-center">
          <h1>alien_planets.json</h1>
          <h1>Size: 10kb</h1>
          <FontAwesomeIcon
            icon={faX}
            className="hover:text-[grey] cursor-pointer"
          />
        </div>
      </div>
      <div className="bg-[#FAFAF8] w-1/4 p-5 rounded shadow-md my-3">
        <div className="flex flex-row justify-between items-center">
          <h1>alien_planets.json</h1>
          <h1>Size: 10kb</h1>
          <FontAwesomeIcon
            icon={faX}
            className="hover:text-[grey] cursor-pointer"
          />
        </div>
      </div>
      <div className="bg-[#FAFAF8] w-1/4 p-5 rounded shadow-md my-3">
        <div className="flex flex-row justify-between items-center">
          <h1>alien_planets.json</h1>
          <h1>Size: 10kb</h1>
          <FontAwesomeIcon
            icon={faX}
            className="hover:text-[grey] cursor-pointer"
          />
        </div>
      </div>
      <div className="bg-[#FAFAF8] w-1/4 p-5 rounded shadow-md my-3">
        <div className="flex flex-row justify-between items-center">
          <h1>alien_planets.json</h1>
          <h1>Size: 10kb</h1>
          <FontAwesomeIcon
            icon={faX}
            className="hover:text-[grey] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default JsonFiles;
