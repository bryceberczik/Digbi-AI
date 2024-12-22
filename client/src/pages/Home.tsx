import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faVolumeXmark,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import "../styles/home.css";

import auth from "@/utils/auth";
import { useState, useEffect } from "react";
import { fetchFiles } from "@/services/file/fetchFiles";
import { promptAI } from "@/services/promptAI";

import GeoComp from "@/components/GeoSphere";

interface File {
  id: string;
  fileName: string;
}

const Home = () => {
  // * UseStates * //

  const [username, setUsername] = useState<string>("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [AIResponse, setAIResponse] = useState<string>("");
  const [displayedText, setDisplayedText] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const defaultMessage =
    "Hello, I am Digbi AI. Ask me a question and select a JSON file so I can analyze it.";

  // * Functions * //

  const truncateText = (text: string) => {
    return text.length > 18 ? text.substring(0, 18) + "..." : text;
  };

  const handleFetchFiles = async () => {
    let userId = "";

    if (auth.loggedIn()) {
      const profile = auth.getProfile();

      if (profile) {
        setUsername(profile.username);
        userId = profile.id;
      } else {
        console.error("User is not logged in.");
      }

      const fetchedFiles = await fetchFiles(userId);
      setFiles(fetchedFiles);
    }
  };

  const handleFileSelect = (id: string) => {
    setSelectedFile(id);
    setDropdownOpen(false);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setDropdownOpen(false);
    }, 150);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleTTS = () => {
    setIsMuted(!isMuted);
  };

  const handleSubmit = async () => {
    if (!userInput || !selectedFile) {
      return;
    }

    setAIResponse("Loading...");
    const analysis = await promptAI(selectedFile, userInput);
    setAIResponse(
      analysis?.text || "An error has occured. Please try again later."
    );
    setAudioUrl(analysis?.audio || null);
  };

  const handleTypingAnimation = (message: string) => {
    let i = 0;
    let currentText = "";

    const typeInterval = setInterval(() => {
      if (i < message.length) {
        currentText += message[i];
        setDisplayedText(currentText);
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, 20); // In milliseconds.

    return typeInterval;
  };

  // * UseEffects * //

  useEffect(() => {
    let intervalID: NodeJS.Timeout | undefined;

    if (AIResponse) {
      intervalID = handleTypingAnimation(AIResponse);
    }

    return () => {
      if (intervalID) clearInterval(intervalID);
    };
  }, [AIResponse]);

  useEffect(() => {
    setAIResponse(defaultMessage);
  }, []);

  useEffect(() => {
    let audio: any;

    if (audioUrl) {
      audio = new Audio(audioUrl);

      if (isMuted === true) {
        audio.pause();
      } else {
        audio.play();
      }
    }

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [audioUrl, isMuted]);

  useEffect(() => {
    handleFetchFiles();
  }, []);

  // * Return Statement * //

  return (
    <div className="mq-home-div flex flex-col items-center justify-center px-4">
      <h1 className="hide-on-mobile text-4xl text-slate-700 mb-12 mt-[100px]">
        Welcome, {username}.
      </h1>
      {/* 3D Model */}
      <div className="mq-geosphere med-geo w-full h-[400px] mb-10">
        {/* <GeoComp loading={AIResponse === "Loading..."} /> */}
      </div>

      {/* AI Response Bubble */}
      <div className="w-full md:w-1/2 mb-16">
        <div className="relative bg-[#ffffff] text-gray-700 p-4 rounded-2xl shadow-md text-center desk-custom mw-custom">
          <p className="mq-response-text">{displayedText}</p>
        </div>
      </div>

      {/* Chat Input Bar */}
      <div className="mq-input-bar w-full md:w-2/3 fixed bottom-8 flex flex-row gap-3">
        <div className="flex items-center border border-gray-300 rounded bg-white w-[1280px] px-4 py-2 shadow-md">
          <input
            type="text"
            placeholder="Ask Digbi AI a question."
            className="flex-1 focus:outline-none"
            maxLength={500}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />

          <div className="relative">
            <button
              className="mq-input-bar-button ml-8 bg-gray-200 px-4 py-1 rounded text-gray-700 hover:bg-gray-300"
              onClick={toggleDropdown}
              onBlur={handleBlur}
            >
              Select JSON
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div
                id="dropdown-group"
                className="mq-dropdown-group absolute bottom-full mt-2 bg-white shadow-lg rounded w-48 mb-2"
              >
                {files.length === 0 ? (
                  <div className="p-2 text-gray-500">No files found.</div>
                ) : (
                  files.map((file) => (
                    <TooltipProvider key={file.id}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            key={file.id}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                            onClick={() => handleFileSelect(file.id)}
                          >
                            {truncateText(file.fileName)}
                          </button>
                        </TooltipTrigger>
                        <TooltipContent
                          side="right"
                          sideOffset={10}
                          className="border-2"
                        >
                          <p>{file.fileName}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))
                )}
              </div>
            )}
          </div>

          <span className="hide-on-mobile ml-4 text-gray-400">
            {userInput.length}/500
          </span>
          <button
            className="mq-submit-button ml-4 text-gray-500 hover:text-gray-700"
            onClick={handleSubmit}
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>

        <div>
          <button
            className="custom-mute-btn"
            onClick={() => {
              toggleTTS();
            }}
          >
            {isMuted ? (
              <FontAwesomeIcon
                icon={faVolumeXmark}
                className="text-[#6B7280] hover:text-[#374151]"
              />
            ) : (
              <FontAwesomeIcon
                icon={faVolumeHigh}
                className="text-[#6B7280] hover:text-[#374151]"
              />
            )}
          </button>
        </div>
      </div>

    </div>
  );
};

export default Home;
