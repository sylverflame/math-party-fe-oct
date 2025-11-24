import { useUser } from "@/contexts/UserContext";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import CountryFlag from "./CountryFlag";

const UserProfile = () => {
  const { user } = useUser();
  return (
          <div className="flex items-center gap-2 px-10 py-2 text-left text-sm text-foreground bg-muted rounded-xl">
            <Avatar className="h-25 w-25 rounded-full">
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
  );
};

export default UserProfile;
