import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { fetchFiles } from "@/services/fetchFiles";
import { promptAI } from "@/services/promptAI";

import GreyOrb from "../images/Orb_detail.png";

interface File {
  id: string;
  fileName: string;
}

const defaultMessage =
  "Hello! How can I assist you today? Feel free to ask about data cleaning, matching leads, or creating a master list!";

const Home = () => {
  const [AIResponse, setAIResponse] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleFetchFiles = async () => {
    const fetchedFiles = await fetchFiles();
    setFiles(fetchedFiles);
  };

  const handleFileSelect = (id: string) => {
    console.log(id);
    setSelectedFile(id);
    setDropdownOpen(false);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setDropdownOpen(false);
    }, 150);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleSubmit = async () => {
    if (!userInput || !selectedFile) {
      return;
    }

    setAIResponse("Loading...");
    const analysis = await promptAI(selectedFile, userInput);
    setAIResponse(analysis || "No explanation available.");
  };

  useEffect(() => {
    setAIResponse("");

    let i = -1;
    const typeInterval = setInterval(() => {
      if (i < defaultMessage.length - 1) {
        setAIResponse((prev) => prev + defaultMessage[i]);
        i += 1;
      } else {
        clearInterval(typeInterval);
      }
    }, 10); // In milliseconds.

    return () => clearInterval(typeInterval);
  }, []);

  useEffect(() => {
    handleFetchFiles();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      {/* Image */}
      <img src={GreyOrb} width={300} alt="grey orb" className="mb-20" />

      {/* AI Response Bubble */}
      <div className="w-full md:w-1/2 mb-16">
        <div className="relative bg-gray-100 text-gray-700 p-4 rounded-2xl shadow-md text-center">
          <p>{AIResponse}</p>
        </div>
      </div>

      {/* Chat Input Bar */}
      <div className="w-full md:w-2/3 fixed bottom-8">
        <div className="flex items-center border border-gray-300 rounded bg-white px-4 py-2 shadow-md">
          <input
            type="text"
            placeholder="Ask AI a question or make a request..."
            className="flex-1 focus:outline-none"
            value={userInput}
            maxLength={500}
            onChange={(e) => setUserInput(e.target.value)}
          />

          <div className="relative">
            <button
              className="ml-2 bg-gray-200 px-4 py-1 rounded text-gray-700 hover:bg-gray-300"
              onClick={toggleDropdown}
              onBlur={handleBlur}
            >
              Select JSON
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div
                id="dropdown-group"
                className="absolute bottom-full mt-2 bg-white shadow-lg rounded w-full"
              >
                {files.length === 0 ? (
                  <div className="p-2 text-gray-500">No files found</div>
                ) : (
                  files.map((file) => (
                    <button
                      key={file.id}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => handleFileSelect(file.id)}
                    >
                      {file.fileName}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          <span className="ml-4 text-gray-400" >{userInput.length}/500</span>
          <button
            className="ml-4 text-gray-500 hover:text-gray-700"
            onClick={handleSubmit}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
