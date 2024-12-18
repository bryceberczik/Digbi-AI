import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import auth from "./utils/auth";

const App = () => {
  const isLoggedIn = auth.loggedIn();

  return (

    <div>
      {isLoggedIn && <Sidebar />}
      <main>
      <Outlet />
      </main>
    </div>
  )
};

export default App;