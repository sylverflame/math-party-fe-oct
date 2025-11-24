import type { User } from "@/schemas";
import { createContext, useContext, useState } from "react";

type UserContextType = {
  user: User;
  isUserLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | null>(null);
const Provider = UserContext.Provider;

type UserContextProviderProps = {
  children: React.ReactNode;
};

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<User>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : { id: null, userId: null };
  });
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const login = (user: User) => {
    setUser(user);
    setIsUserLoggedIn(false)
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUser({ id: null, userId: null });
    setIsUserLoggedIn(false)
    localStorage.removeItem("user");
  };
  return <Provider value={{ user, isUserLoggedIn, login, logout }}>{children}</Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserContextProvider");
  }

  return context;
};
