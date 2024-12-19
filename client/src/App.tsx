import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import auth from "./utils/auth";
import BrandLogo from "./images/Digbi-AI.png";

const App = () => {
  const isLoggedIn = auth.loggedIn();

  return (

    <div>
      {isLoggedIn && <Sidebar />}
      <main>
      <img
        src={BrandLogo}
        alt="brand logo"
        width={300}
        className="absolute top-5 right-10"
      />
      <Outlet />
      </main>
    </div>
  )
};

export default App;