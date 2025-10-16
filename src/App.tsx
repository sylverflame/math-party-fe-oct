import "@/App.css";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Toaster } from "@/components/ui/sonner";
import { Login } from "@/pages/Login";
import { Navigate, Route, Routes } from "react-router";
import EBWrapper from "./components/EBWrapper";
import { useTheme } from "@/contexts/ThemeContext";
import AppLayout from "./layouts/AppLayout";
import Game from "./pages/Game";
import Home from "./pages/Home";

function App() {
  const { isDarkMode } = useTheme();
  return (
    <div className={`app-component w-[1024px] h-[100%] bg-background shadow-lg flex flex-col items-center ${isDarkMode ? "dark" : "light"}`}>
      <Routes>
        <Route index element={<Login />} />
        <Route path="app" element={<ProtectedRoute element={<AppLayout />} />}>
          <Route path="home" element={<Home />} />
          <Route path="game" element={<EBWrapper component={Game} />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
