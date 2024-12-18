import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
  faArrowsRotate,
  faHouse,
  faCommentDots,
  faFile,
  faGear,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

import "../styles/sidebar.css"

const Sidebar = () => {
  const [isRotated, setIsRotated] = useState(false);
  const [isOffcanvas, setIsOffcanvas] = useState(false);

  const handleOffCanvas = () => {
    setIsRotated(!isRotated);
    setIsOffcanvas(!isOffcanvas);
  };

  const handleReset = () => {
    window.location.reload();
  }
  return (
    <>
      {/* Greyed-out Overlay */}
      {isOffcanvas && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10 transition duration-300 ease-in-out"
          onClick={handleOffCanvas} // Clicking on the overlay will close the sidebar
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`absolute top-0 left-0 h-screen bg-customLight transition-all duration-300 ease-in-out shadow-lg z-20 ${
          isOffcanvas ? "w-64" : "w-16"
        }`}
      >
        {/* Sidebar Content */}
        <div
          className={`flex flex-col ${
            isRotated ? "items-end mr-5" : ""
          } justify-between h-full py-4`}
        >
          {/* Top Section */}
          <div className="flex flex-col gap-4 items-center">
            {/* Toggle Button */}
            {isOffcanvas ? <h1 className="absolute custom-minimize">Minimize</h1> : ""}
            <FontAwesomeIcon
              icon={faArrowRight}
              className={`text-lg pt-3 text-slate-700 transition-transform duration-300 hover:text-slate-500 cursor-pointer ${
                isRotated ? "rotate-180 translate-y-3" : ""
              }`}
              onClick={handleOffCanvas}
            />

            <div className="w-full h-px bg-gray-300 mt-3"></div>

            {/* Middle Section */}
            <div className="flex flex-col gap-4 items-center mt-3">
              {isOffcanvas ? <h1 className="absolute custom-newchat">Refresh Bot</h1> : ""}
              <button className="h-8 w-8 flex justify-center items-center rounded bg-white shadow-md hover:bg-gray-200 transition duration-300" onClick={handleReset}>
                <FontAwesomeIcon icon={faArrowsRotate} className="text-lg text-slate-700" />
              </button>
              <Link to={"/"}>
              {isOffcanvas ? <h1 className="absolute custom-home">Home</h1> : ""}
                <FontAwesomeIcon
                  icon={faHouse}
                  className="text-lg text-slate-700 hover:text-slate-500 cursor-pointer"
                />
              </Link>
              <Link to={"/json-files"}>
              {isOffcanvas ? <h1 className="absolute custom-json-files">JSON Files</h1> : ""}
                <FontAwesomeIcon
                  icon={faFile}
                  className="text-lg text-slate-700 hover:text-slate-500 cursor-pointer"
                />
              </Link>
              <Link to={"/feedback"}>
              {isOffcanvas ? <h1 className="absolute custom-feedback">Feedback</h1> : ""}
                <FontAwesomeIcon
                  icon={faCommentDots}
                  className="text-lg text-slate-700 hover:text-slate-500 cursor-pointer"
                />
              </Link>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col gap-6 items-center">
            <Link to={"/settings"}>
            {isOffcanvas ? <h1 className="absolute custom-settings">Settings</h1> : ""}
              <FontAwesomeIcon
                icon={faGear}
                className="text-lg text-slate-700 hover:text-slate-500 cursor-pointer"
              />
            </Link>
            {isOffcanvas ? <h1 className="absolute custom-profilebtn">Log out</h1> : ""}
              <button className="h-10 w-10 flex justify-center items-center rounded-full bg-white shadow-md hover:bg-gray-200 transition duration-300">
                <FontAwesomeIcon icon={faRightToBracket} className="text-lg text-slate-700" />
              </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
