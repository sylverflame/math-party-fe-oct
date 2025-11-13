import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import { UserContextProvider } from "./contexts/UserContext.tsx";
import "./index.css";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import EventEmitter from "eventemitter3";
export const eventEmitter = new EventEmitter()

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <BrowserRouter>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </BrowserRouter>
  </ThemeProvider>
);
