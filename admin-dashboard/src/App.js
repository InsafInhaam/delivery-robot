import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Robotcreate from "./pages/robot/Robotcreate";
import Userview from "./pages/users/Userview";
import RobotList from "./pages/robot/RobotList";
import RobotMap from "./pages/robot/RobotMap";
import OrderList from "./pages/orders/OrderList";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark", !darkMode);
  };

  return (
    <Router>
      <div className={`app ${darkMode ? "dark-mode" : ""}`}>
        <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

        {/* Sidebar */}
        <Sidebar />

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/robots" element={<RobotList />} />
            <Route path="/create-robot" element={<Robotcreate />} />
            <Route path="/map-robot" element={<RobotMap />} />

            <Route path="/users" element={<Userview />} />

            <Route path="/orders" element={<OrderList />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;



