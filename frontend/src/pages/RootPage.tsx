import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

const RootPage: React.FC = (): JSX.Element => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default RootPage;
