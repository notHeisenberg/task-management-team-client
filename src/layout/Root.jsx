// Root.jsx
import { Outlet } from "react-router-dom";

const Root = () => {

  return (
    <div>
      {/* Other layout components */}
      <Outlet />
    </div>
  );
};

export default Root;
