import Navbar from "@/components/layout/Navbar";
import { Outlet } from "react-router-dom";

const RootPage = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default RootPage;
