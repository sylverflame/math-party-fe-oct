import Home from "@/assets/home.svg?react";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router";
import { AvatarDropdown } from "./AvatarDropdown";
import { Button } from "./ui/button";

const Header = () => {
  const navigate = useNavigate();
  const {
    user: { userId },
    logout,
  } = useUser();
  const onLogout = () => {
    logout();
  };

  const onToggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };
  if (!userId) {
    return null;
  }
  return (
    <div className="header-component h-12 w-full bg-[var(--header-bg)] shadow-md flex items-center justify-between px-4">
      <Home className="size-8 invert cursor-pointer" onClick={() => navigate("/app/home")} />
      {/* TODO: Add fullscreen logic */}
      <Button className="hidden" onClick={onToggleFullScreen}>
        {"FS"}
      </Button>
      <div className="flex items-center gap-6">
        <AvatarDropdown userId={userId} onLogout={onLogout} />
      </div>
    </div>
  );
};

export default Header;
