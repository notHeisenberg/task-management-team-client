<<<<<<< HEAD

=======
// Root.jsx
import Footer from "@/components/footer/Footer";
import NavBar from "@/pages/Home/HomeComponents/Navbar/NavBar";
>>>>>>> origin/development
import { Outlet } from "react-router-dom";

const Root = () => {

  return (
    <div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
