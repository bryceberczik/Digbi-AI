import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faFile,
  faCamera,
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
import { imageUrlFunction } from "@/services/images/imageUrl";
import { promptAI } from "@/services/promptAI";
import { generateTalk } from "@/services/generateTalk";

import GeoComp from "@/components/GeoSphere";
import VideoComponent from "@/components/VideoComponent";

interface JSONFile {
  id: string;
  fileName: string;
}

const Home = () => {
  // * UseStates * //

  const [AIResponse, setAIResponse] = useState<string>("");
  const [displayedText, setDisplayedText] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [files, setFiles] = useState<JSONFile[]>([]);
  const [isOpened, setIsOpened] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | File>("");
  const [sourceUrl, setSourceUrl] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [videoVoice, setVideoVoice] = useState<"man" | "woman">("woman");

  const defaultMessage =
    "Hello, I am Digbi AI. Ask me a question and select a JSON file so I can analyze it.";

  const defaultVideoFace =
    "https://d-id-public-bucket.s3.us-west-2.amazonaws.com/alice.jpg";

  // * Functions * //

  const truncateText = (text: string) => {
    return text.length > 12 ? text.substring(0, 12) + "..." : text;
  };

  const handleFetchFiles = async () => {
    let userId = "";

    if (auth.loggedIn()) {
      const profile = auth.getProfile();

      if (profile) {
        setUsername(profile.username);
        userId = profile.id;
        setEmail(profile.email);
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

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.type === "file") {
      const file = event.target.files?.[0];
      if (file) {
        console.log("Selected File:", file);
        setSelectedImage(file);
      }
    } else if (event.target.type === "text") {
      const url = event.target.value;
      console.log("Pasted URL:", url);
      setSelectedImage(url);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleModal = () => {
    setIsOpened(!isOpened);
  };

  const handleSubmit = async () => {
    if (!userInput || !selectedFile) {
      alert("Please provide a prompt and JSON file.");
      return;
    }

    try {
      setIsFinished(false);

      setAIResponse("Generating Response...");
      const AIResult = await promptAI(selectedFile, userInput, email);
      setAIResponse("Creating Video...");
      const videoResult = await generateTalk(sourceUrl, AIResult?.text);

      setAIResponse(
        AIResult?.text || "An error has occured. Please try again later."
      );
      setVideoUrl(videoResult);
      setIsFinished(true);
    } catch (error) {
      console.error("handleSubmit Error:", error);
    }
  };

  const handleModalSubmit = async () => {
    toggleModal();

    if (selectedImage instanceof File) {
      if (selectedImage) {
        try {
          console.log("Uploading file...");
          const imageUrl = await imageUrlFunction(selectedImage, email);
          console.log("Done!");

          setSourceUrl(imageUrl);
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    } else if (typeof selectedImage === "string") {
      console.log("Using URL:", selectedImage);
    }
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
    setSourceUrl(defaultVideoFace);
  }, []);

  useEffect(() => {
    handleFetchFiles();
  }, []);

  // * Return Statement * //

  return (
    <div className="mq-home-div flex flex-col items-center justify-center px-4">
      <h1 className="hide-on-mobile text-4xl text-slate-700 mb-12 mt-[50px]">
        Welcome, {username}.
      </h1>
      {/* 3D Model */}
      <div className="mq-geosphere med-geo w-full h-[300px]">
        {!isFinished ? (
          <GeoComp
            loading={
              AIResponse === "Generating Response..." ||
              AIResponse === "Creating Video..."
            }
          />
        ) : (
          <VideoComponent videoUrl={videoUrl} />
        )}
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
            className="flex-1 mr-5 focus:outline-none"
            maxLength={500}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />

          <div className="relative">
            <FontAwesomeIcon
              icon={faFile}
              onClick={toggleDropdown}
              onBlur={handleBlur}
              className="text-[#6A7280] cursor-pointer hover:text-gray-700"
            />

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div
                id="dropdown-group"
                className="mq-dropdown-group absolute bottom-full mt-2 bg-white shadow-lg rounded w-[120px] mb-2"
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
          <button className="custom-mute-btn" onClick={toggleModal}>
            <FontAwesomeIcon
              className="text-gray-500 hover:text-gray-700"
              icon={faCamera}
            />
          </button>
        </div>
      </div>

      {isOpened && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              toggleModal();
            }
          }}
        >
          <div className="bg-white w-[90%] md:w-[600px] p-8 rounded-[10px] shadow-xl relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-semibold"
              onClick={toggleModal}
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Select an Avatar
            </h2>

            <div className="space-y-6">
              {/* Paste image URL */}
              <div>
                <label className="text-gray-700 font-medium block mb-2">
                  Paste image URL
                </label>
                <input
                  type="text"
                  placeholder="Insert link"
                  onChange={handleImageSelect}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-600"
                />
              </div>

              {/* Or */}
              <div className="text-center">
                <p className="text-gray-500">or</p>
              </div>

              {/* Choose JPEG */}
              <div>
                <label className="text-gray-700 font-medium block mb-2">
                  Choose a JPEG
                </label>
                <input
                  type="file"
                  accept="image/jpeg"
                  onChange={handleImageSelect}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-600"
                />
              </div>
            </div>

            <div className="flex flex-col items-center mt-8">
              {/* Voice Selection */}
              <div className="flex flex-col items-start mb-6">
                <label className="text-lg font-medium text-gray-800 mb-2">
                  Choose a Voice:
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="voice"
                      value="man"
                      checked={videoVoice === "man"}
                      onChange={() => setVideoVoice("man")}
                      className="accent-slate-500"
                    />
                    <span>Man</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="voice"
                      value="woman"
                      checked={videoVoice === "woman"}
                      onChange={() => setVideoVoice("woman")}
                      className="accent-slate-500"
                    />
                    <span>Woman</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                className="bg-slate-600 text-white py-3 px-8 rounded-[5px] hover:bg-slate-700 transition-all"
                onClick={handleModalSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
