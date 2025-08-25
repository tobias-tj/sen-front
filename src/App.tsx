import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
function App() {
  const [token, setToken] = useState<string | null>(
    sessionStorage.getItem("access_token")
  );

  useEffect(() => {
    const handleStorage = () => {
      setToken(sessionStorage.getItem("access_token"));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <BrowserRouter>
      <SidebarProvider>
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route
            path="/home"
            element={
              token ? (
                <Home setToken={setToken} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
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
