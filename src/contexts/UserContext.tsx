import { createContext, useContext, useState } from "react";

type User = {
  userId: string | null;
};

type UserContextType = {
  user: User;
  setUser: (user: User) => void;
};

const UserContext = createContext<UserContextType | null>(null);
const Provider = UserContext.Provider;

type UserContextProviderProps = {
  children: React.ReactNode;
};

const initialUser: User = {
  userId: null,
};

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<User>(initialUser);
  return <Provider value={{ user, setUser }}>{children}</Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserContextProvider");
  }

  return context;
};
