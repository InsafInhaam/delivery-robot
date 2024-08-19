import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import OrderForm from "./screens/OrderForm";
import "./App.css";
import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./PrivateRoute";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <AuthProvider>
      <Navbar/>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute element={Home} />} />
          <Route
            path="/order-form"
            element={<PrivateRoute element={OrderForm} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
