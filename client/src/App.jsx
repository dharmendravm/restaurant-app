import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "@/pages/auth/login/Login";
import Register from "@/pages/auth/register/Register";

import Menu from "./pages/Menu";
import ProtectedRoutes from "./components/ProtectedRoutes";
import HomePage from "./pages/HomePage";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <div className="bg-[#010103]">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/*Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <HomePage />
              </ProtectedRoutes>
            }
          />
          
          <Route path="menu" element={
            <ProtectedRoutes>
              <Menu/>
            </ProtectedRoutes>
          }/>

        </Routes>
      </Router>
    </div>
  );
}
export default App;

// bg-[#010103]
