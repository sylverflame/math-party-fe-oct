import { useUser } from "@/contexts/UserContext";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useNavigate } from "react-router";
import { useTheme } from "@/contexts/ThemeContext";

const Header = () => {
  const { setIsDarkMode } = useTheme();
  const navigate = useNavigate();
  const {
    user: { userId },
    logout,
  } = useUser();
  const onClickLogout = () => {
    logout();
  };
  return (
    <div className="header-component h-12 w-full bg-[var(--header-bg)] shadow-md flex items-center justify-between px-2">
      <Button variant="outline" onClick={() => navigate("/app/home")}>
        {"Home"}
      </Button>
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarFallback className="text-card-foreground">{userId?.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <Button
          onClick={() => {
            setIsDarkMode((prev) => !prev);
          }}
        >
          {"Theme"}
        </Button>
        <Button variant="outline" onClick={onClickLogout}>
          {"Logout"}
        </Button>
      </div>
    </div>
  );
};

export default Header;
