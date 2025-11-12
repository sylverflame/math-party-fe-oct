import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router";
import ThemeToggle from "./ThemeToggle";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import Logout from "@/assets/logout.svg?react";
import Home from "@/assets/home.svg?react";


const Header = () => {
  const navigate = useNavigate();
  const {
    user: { userId },
    logout,
  } = useUser();
  const onClickLogout = () => {
    logout();
  };

  const onToggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };
  return (
    <div className="header-component h-12 w-full bg-[var(--header-bg)] shadow-md flex items-center justify-between px-4">
      <Home className="size-8 invert cursor-pointer" onClick={() => navigate("/app/home")}/>
      {/* TODO: Add fullscreen logic */}
      <Button className="hidden" onClick={onToggleFullScreen}>{"FS"}</Button>
      <div className="flex items-center gap-6">
        <ThemeToggle />
        <Logout className="size-8 invert cursor-pointer" onClick={onClickLogout}/>
        <Avatar>
          <AvatarFallback className="text-card-foreground cursor-pointer">{userId?.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Header;
