import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import GreyOrb from "../images/Orb_detail.png";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      {/* Image */}
      <img src={GreyOrb} width={300} alt="grey orb" className="mb-20" />

      {/* AI Response Bubble */}
      <div className="w-full md:w-1/2 mb-16">
        <div className="relative bg-gray-100 text-gray-700 p-4 rounded-2xl shadow-md text-center">
          <p>
            "Hello! How can I assist you today? Feel free to ask about data
            cleaning, matching leads, or creating a master list!"
          </p>
        </div>
      </div>

      {/* Chat Input Bar */}
      <div className="w-full md:w-2/3 fixed bottom-8">
        <div className="flex items-center border border-gray-300 rounded bg-white px-4 py-2 shadow-md">
          <input
            type="text"
            placeholder="Ask AI a question or make a request..."
            className="flex-1 focus:outline-none"
          />
          <button className="ml-2 bg-gray-200 px-4 py-1 rounded text-gray-700 hover:bg-gray-300">
            Select JSON
          </button>
          <span className="ml-4 text-gray-400">0/2000</span>
          <button className="ml-4 text-gray-500 hover:text-gray-700">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
