import "@/App.css";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Login } from "@/pages/Login";
import { Navigate, Route, Routes } from "react-router";
import AppLayout from "./layouts/AppLayout";
import Game from "./pages/Game";
import Home from "./pages/Home";
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <div className="app-component w-[1024px] h-[100%] bg-background shadow-lg">
      <Routes>
        <Route index element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route path="home" element={<ProtectedRoute element={<Home />} />} />
          <Route path="game" element={<ProtectedRoute element={<Game />} />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
