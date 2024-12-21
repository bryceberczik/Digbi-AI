import { useState } from "react";
import BrandLogo from "../images/Digbi-AI.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import auth from "@/utils/auth";

const MobileHeader = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      {/* Header */}
      <header className="flex flex-row items-center justify-between px-4 py-2">
        <img src={BrandLogo} width={200} alt="Brand Logo" />
        <FontAwesomeIcon
          icon={faBars}
          className="text-3xl text-[#334155] hover:text-gray-500 cursor-pointer"
          onClick={handleShow}
        />
      </header>

      {/* Offcanvas */}
      <div
        className={`fixed top-0 right-0 h-full w-[300px] bg-white shadow-lg z-[999] transform ${
          show ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b bg-[#f3f4f6]">
          <h2 className="text-3xl">Menu</h2>
          <button
            className="text-gray-500 hover:text-gray-700 text-4xl"
            onClick={handleClose}
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="p-4 bg-[#f3f4f6] flex flex-col">
          <p className="text-2xl mb-8" onClick={() => (window.location.href = "/")}>Home</p>
          <p className="text-2xl mb-8" onClick={() => (window.location.href = "/json-files")}>Json-files</p>
          <p className="text-2xl mb-[500px]" onClick={() => (window.location.href = "/feedback")}>Feedback</p>
          <p className="text-2xl mb-8" onClick={() => (window.location.href = "/settings")}>Settings</p>
          <p  className="text-2xl mb-5" onClick={() => auth.logout()}>Logout</p>
        </div>
      </div>

      {/* Overlay */}
      {show && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[998]"
          onClick={handleClose}
        ></div>
      )}
    </div>
  );
};

export default MobileHeader;
