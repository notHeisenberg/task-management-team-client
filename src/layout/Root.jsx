
import Footer from "@/components/footer/Footer";
import NavBar from "@/pages/Home/HomeComponents/Navbar/NavBar";
import { Outlet } from "react-router-dom";

const Root = () => {

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
