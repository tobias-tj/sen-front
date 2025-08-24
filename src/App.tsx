import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { SidebarProvider } from "@/components/ui/sidebar";
function App() {
  const token = localStorage.getItem("access_token");

  return (
    <BrowserRouter>
      <SidebarProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={token ? <Home /> : <Navigate to="/login" replace />}
          />
          <Route
            path="*"
            element={<Navigate to={token ? "/home" : "/login"} replace />}
          />
        </Routes>
      </SidebarProvider>
    </BrowserRouter>
  );
}

export default App;
