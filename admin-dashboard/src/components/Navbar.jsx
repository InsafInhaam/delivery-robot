import React from "react";

const Navbar = ({ toggleDarkMode, darkMode }) => {
  return (
    <nav className="navbar">
      <div className="logo_item">
        <i className="bx bx-menu" id="sidebarOpen" />
        <img src="https://cdn5.vectorstock.com/i/1000x1000/96/09/delivery-robot-icon-flat-design-vector-23739609.jpg" alt="Logo" />
        Robot Delivery
      </div>
      <div className="search_bar">
        <input type="text" placeholder="Search" />
      </div>
      <div className="navbar_content">
        <i className="bi bi-grid" />
        <i
          className={`bx ${darkMode ? "bx-moon" : "bx-sun"}`}
          id="darkLight"
          onClick={toggleDarkMode}
        />
        <i className="bx bx-bell" />
        <img src="images/profile.jpg" alt="Profile" className="profile" />
      </div>
    </nav>
  );
};

export default Navbar;
