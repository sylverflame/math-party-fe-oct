import { useUser } from "@/contexts/UserContext";
import { Button } from "./ui/button";

const Header = () => {
  const { logout } = useUser();
  const onClickLogout = () => {
    logout();
  };
  return (
    <div className="header-component h-12 w-full bg-gray-800 shadow-md">
      <Button variant="ghost" onClick={onClickLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Header;
