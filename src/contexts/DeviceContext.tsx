import { createContext, useContext, useEffect, useState } from "react";

type DeviceType = "Phone" | "Tablet" | "PC";

type DeviceContextType = {
  screenWidth: number;
  isTouchDevice: boolean;
};

const DeviceContext = createContext<DeviceContextType | null>(null);

export const DeviceContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [deviceType, setDeviceType] = useState(null);
  const [screenWidth, setScreenWidth] = useState(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(touch);

    // Handle window resize
    let timeoutId: number;
    const onWindowResize = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setScreenWidth(window.innerWidth);
      }, 100);
    };
    window.addEventListener("resize", onWindowResize);
    onWindowResize();
    return () => {
      window.removeEventListener("resize", onWindowResize);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return <DeviceContext.Provider value={{ screenWidth, isTouchDevice }}>{children}</DeviceContext.Provider>;
};

export const useDevice = () => {
  const context = useContext(DeviceContext);

  if (!context) {
    throw new Error("Context error");
  }

  return context;
};
