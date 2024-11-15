
import Footer from "@/components/footer/Footer";
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
