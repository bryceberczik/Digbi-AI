import BrandLogo from "../images/Digbi-AI.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const MobileHeader = () => {

    return (

        <div>
            <header className="flex flex-row items-center justify-around py-2">
                <img src={BrandLogo} width={200} alt="Brand Logo" />
                <FontAwesomeIcon icon={faBars} className="text-3xl text-[#334155] hover:text-[grey]" />
            </header>
        </div>
    )
};

export default MobileHeader;