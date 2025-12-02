import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Navbar from "./components/Navbar";
import Menu from "./pages/Menu";
import ProtectedRoutes from "./components/ProtectedRoutes";
import HomePage from "./pages/HomePage";


const App = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Router>
        <Routes>
          {/*Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <HomePage />
              </ProtectedRoutes>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
};
export default App;
