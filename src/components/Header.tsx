import Home from "@/assets/home.svg?react";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router";
import { AvatarDropdown } from "./AvatarDropdown";
import { Button } from "./ui/button";
import CountryFlag from "./CountryFlag";

const Header = () => {
  const navigate = useNavigate();
  const {
    isUserLoggedIn,
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
  if (!isUserLoggedIn) {
    return null;
  }
  return (
    <div className="header-component h-16 w-full bg-[var(--header-bg)] shadow-md flex items-center justify-between px-4">
      <Home className="size-8 invert cursor-pointer" onClick={() => navigate("/app/home")} />
      {/* TODO: Add fullscreen logic */}
      <Button className="hidden" onClick={onToggleFullScreen}>
        {"FS"}
      </Button>
      <div className="flex items-center gap-2 relative">
        <CountryFlag code="IN" className="absolute -right-4 -top-2 scale-50 z-2" />
        <AvatarDropdown onLogout={onLogout} />
      </div>
    </div>
  );
};

export default Header;
