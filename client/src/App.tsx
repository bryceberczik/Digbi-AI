import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import auth from "./utils/auth";
import BrandLogo from "./images/Digbi-AI.png";

const App = () => {
  const isLoggedIn = auth.loggedIn();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {isLoggedIn && !isMobile && <Sidebar />}
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
  );
};

export default App;
