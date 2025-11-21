import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import { UserContextProvider } from "./contexts/UserContext.tsx";
import "./index.css";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import EventEmitter from "eventemitter3";
import { DeviceContextProvider } from "./contexts/DeviceContext.tsx";
import { SpinnerProvider } from "./contexts/GlobalSpinnerContext.tsx";
export const eventEmitter = new EventEmitter();

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <BrowserRouter>
      <DeviceContextProvider>
        <UserContextProvider>
          <SpinnerProvider>
            <App />
          </SpinnerProvider>
        </UserContextProvider>
      </DeviceContextProvider>
    </BrowserRouter>
  </ThemeProvider>
);
