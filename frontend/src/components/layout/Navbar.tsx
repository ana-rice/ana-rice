import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { H1 } from "@/components/ui/typography";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div className="flex justify-between px-12 py-5">
        <H1>
          <Link to="/">Ana Rice</Link>
        </H1>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className={navigationMenuTriggerStyle()}>
              <Link to="/dashboard">Dashboard</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button>Sign In</Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default Navbar;
