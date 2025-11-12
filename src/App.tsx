import "@/App.css";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Toaster } from "@/components/ui/sonner";
import { useTheme } from "@/contexts/ThemeContext";
import { Login } from "@/pages/Login";
import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router";
import EBW from "./components/EBWrapper";
import GameWithProviders from "./components/GameWithProviders";
import SW from "./components/SuspenseWrapper";
import AppLayout from "./layouts/AppLayout";

const Home = lazy(() => import("./pages/Home"));

function App() {
  const { isDarkMode } = useTheme();
  return (
    <div className={`app-component w-[1024px] h-[100%] bg-background shadow-lg flex flex-col items-center ${isDarkMode ? "dark" : "light"}`}>
      <Routes>
        <Route index element={<Login />} />
        <Route path="app" element={<ProtectedRoute element={<AppLayout />} />}>
          <Route path="home" element={<EBW children={<SW component={Home} />} />} />
          <Route path="game" element={<GameWithProviders />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster position="top-center" richColors duration={1200}/>
    </div>
  );
}

export default App;
