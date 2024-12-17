import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

const App = () => {

  return (

    <div>
      <Sidebar />
      <main>
      <Outlet />
      </main>
      <Footer />
    </div>
  )
};

export default App;