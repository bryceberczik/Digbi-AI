import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
  faPlus,
  faHouse,
  faArrowsRotate,
  faFile,
  faGear,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <div className="absolute h-screen w-16 bg-customLight flex flex-col justify-between items-center py-4">
      {/* Top Section */}
      <div className="flex flex-col gap-4 items-center">
          <FontAwesomeIcon icon={faRightToBracket} className="text-lg pt-3 text-slate-700" />

          <div className="w-full h-px bg-gray-300 mt-3"></div>

                {/* Middle Section */}
      <div className="flex flex-col gap-4 items-center mt-3">
        <button className="h-8 w-8 flex justify-center items-center rounded bg-white shadow-md hover:bg-gray-200">
          <FontAwesomeIcon icon={faPlus} className="text-lg text-slate-700" />
        </button>
          <FontAwesomeIcon icon={faHouse} className="text-lg pt-2 text-slate-700" />
          <FontAwesomeIcon icon={faArrowsRotate} className="text-lg pt-2 text-slate-700" />
          <FontAwesomeIcon icon={faFile} className="text-lg pt-2 text-slate-700" />
      </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-6 items-center">
          <FontAwesomeIcon icon={faGear} className="text-lg pd-2 text-slate-700" />
        <button className="h-10 w-10 flex justify-center items-center rounded-full bg-white shadow-md hover:bg-gray-200">
          <FontAwesomeIcon icon={faStar} className="text-lg text-slate-700" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
