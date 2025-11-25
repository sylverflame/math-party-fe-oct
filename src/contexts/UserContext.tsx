import type { User } from "@/schemas";
import { createContext, useContext, useState } from "react";

type UserContextType = {
  user: User;
  isUserLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (details: Partial<User>) => void
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
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? true : false;
  });

  const login = (user: User) => {
    setUser(user);
    setIsUserLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUser({ id: null, userId: null });
    setIsUserLoggedIn(false);
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
  };

  const updateUser = (details: Partial<User>) => {
    setUser((user) => {
      return {
        ...user,
        ...details,
      };
    });
  };
  return <Provider value={{ user, isUserLoggedIn, login, logout, updateUser }}>{children}</Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserContextProvider");
  }

  return context;
};
