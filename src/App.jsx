import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Permission from "./pages/Permission";
import Dashboard from "./pages/Dashboard";
import EmergencyPage from "./pages/Emergency";
import Profile from "./pages/Profile";
import TermsOfService from "./pages/terms";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route 
          path="/register" 
          element={<Register />} 
        />

        <Route 
          path="/dashboard" 
          element={<Dashboard />} 
        />

        <Route 
          path="/emergency" 
          element={<EmergencyPage />} 
        />

        <Route 
          path="/permission" 
          element={<Permission />} 
        />

        <Route 
          path="/profile" 
          element={<Profile />} 
        />
        {/* TERMS */}
        <Route path="/terms" element={<TermsOfService />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;