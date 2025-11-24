import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Logout from "@/assets/logout.svg?react";
import ThemeToggle from "./ThemeToggle";
import { useUser } from "@/contexts/UserContext";
import CountryFlag from "./CountryFlag";
import { useNavigate } from "react-router";

interface IAvatarDropdownProps {
  onLogout: () => void;
}

export function AvatarDropdown({ onLogout }: IAvatarDropdownProps) {
  const { user } = useUser();
  const navigate = useNavigate()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback className="text-card-foreground cursor-pointer">{user.userId?.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={user.picture} alt={user.name} />
              <AvatarFallback className="rounded-lg">{user.userId?.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.name}</span>
              <div className="flex items-center">
                <span className="truncate text-xs">{user.userId}</span>
                <CountryFlag code={user.country as string} className="scale-50"/>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate("/app/user-profile")}>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Theme
          <DropdownMenuShortcut>
            <ThemeToggle />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onLogout}>
          Log out
          <DropdownMenuShortcut>
            <Logout className="size-6" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
