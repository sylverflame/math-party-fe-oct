import { createContext, useContext, useState } from "react";

type DeviceType = "Phone" | "Tablet" | "PC";

type DeviceContextType = {
  screenWidth: number;
  setScreenWidth: React.Dispatch<React.SetStateAction<number>>;
};

const DeviceContext = createContext<DeviceContextType | null>(null);

export const DeviceContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [deviceType, setDeviceType] = useState(null);
  const [screenWidth, setScreenWidth] = useState(0);
  return <DeviceContext.Provider value={{ screenWidth, setScreenWidth }}>{children}</DeviceContext.Provider>;
};

export const useDevice = () => {
  const context = useContext(DeviceContext);

  if (!context) {
    throw new Error("Context error");
  }

  return context;
};
