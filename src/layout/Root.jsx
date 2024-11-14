// Root.jsx
import NavBar from "@/pages/Home/HomeComponents/Navbar/NavBar";
import { Outlet } from "react-router-dom";

const Root = () => {

  return (
    <div>
      <NavBar />
      {/* Other layout components */}
      <Outlet />
    </div>
  );
};

export default Root;
