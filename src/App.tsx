import "@/App.css";
import { Login } from "@/pages/Login";
import { Route, Routes } from "react-router";

function App() {
  return (
    <div className="app-component w-[1024px] h-[100%] bg-background shadow-lg">
      <Routes>
        <Route index element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
