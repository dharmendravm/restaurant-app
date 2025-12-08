import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";

import Menu from "@/pages/Menu";
import ProtectedRoutes from "@/routes/ProtectedRoutes";
import HomePage from "@/pages/HomePage";
import Welcome from "@/pages/Welcome";
import AppLayout from "@/layout/AppLayout";
import AdminRoute from "@/routes/AdminRoute";
import AdminMenu from "@/pages/admin/AdminMenu";

function App() {
  return (
    <div className="bg-[#000000] min-h-screen">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes with main app layout */}
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <AppLayout>
                  <HomePage />
                </AppLayout>
              </ProtectedRoutes>
            }
          />

          {/* Menu */}
          <Route
            path="/menu"
            element={
              <ProtectedRoutes>
                <AppLayout>
                  <Menu />
                </AppLayout>
              </ProtectedRoutes>
            }
          />

          {/* Admin dashboard */}
          <Route
            path="/admin/menu"
            element={
              <AdminRoute>
                <AppLayout>
                  <AdminMenu />
                </AppLayout>
              </AdminRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}
export default App;

// bg-[#010103]
