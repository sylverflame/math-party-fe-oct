import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import { UserContextProvider } from "./contexts/UserContext.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </BrowserRouter>
);
