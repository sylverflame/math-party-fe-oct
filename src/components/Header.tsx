import { useUser } from "@/contexts/UserContext";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";

const Header = () => {
  const {
    user: { userId },
    logout,
  } = useUser();
  const onClickLogout = () => {
    logout();
  };
  return (
    <div className="header-component h-12 w-full bg-gray-800 shadow-md flex items-center justify-end">
      <Avatar>
        <AvatarFallback>{userId?.substring(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <Button variant="outline" onClick={onClickLogout} className="mx-2">
        Logout
      </Button>
    </div>
  );
};

export default Header;
