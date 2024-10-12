import { Outlet } from "react-router-dom";

const RootPage: React.FC = (): JSX.Element => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default RootPage;
