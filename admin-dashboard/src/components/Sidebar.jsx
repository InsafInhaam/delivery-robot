import React, { useState, useEffect } from "react";

const Sidebar = () => {
  const [isClosed, setIsClosed] = useState(window.innerWidth < 768);
  const [isHoverable, setIsHoverable] = useState(window.innerWidth < 768);
  const [darkMode, setDarkMode] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsClosed(true);
        setIsHoverable(true);
      } else {
        setIsClosed(false);
        setIsHoverable(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsClosed(!isClosed);
  };

  const handleMouseEnter = () => {
    if (isHoverable) {
      setIsClosed(false);
    }
  };

  const handleMouseLeave = () => {
    if (isHoverable) {
      setIsClosed(true);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark", !darkMode);
  };

  const toggleSubMenu = (index) => {
    if (activeSubMenu === index) {
      setActiveSubMenu(null);
    } else {
      setActiveSubMenu(index);
    }
  };

  return (
    <nav
      className={`sidebar ${isClosed ? "close" : ""} ${
        isHoverable ? "hoverable" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="menu_content">
        <ul className="menu_items">
          <div className="menu_title menu_dashboard" />
          <li className="item">
            <div className="nav_link submenu_item">
              <span className="navlink_icon">
                <i className="bx bx-home-alt" />
              </span>
              <span className="navlink">Home</span>
              {/* <i className="bx bx-chevron-right arrow-left" /> */}
            </div>
          </li>

          {/* Robot */}
          <li className="item">
            <div
              className="nav_link submenu_item"
              onClick={() => toggleSubMenu(0)}
            >
              <span className="navlink_icon">
                <i className="bx bx-chip" />
              </span>
              <span className="navlink">Robot</span>
              <i className="bx bx-chevron-right arrow-left" />
            </div>
            {activeSubMenu === 0 && (
              <ul className="menu_items submenu">
                <li>
                  <a href="/create-robot" className="nav_link sublink">
                    Add Robot
                  </a>
                </li>
                <li>
                  <a href="/robots" className="nav_link sublink">
                    View Robot
                  </a>
                </li>
                <li>
                  <a href="/map-robot" className="nav_link sublink">
                    Map Robot
                  </a>
                </li>
              </ul>
            )}
          </li>

          {/* Admin */}
          <li className="item">
            <div
              className="nav_link submenu_item"
              onClick={() => toggleSubMenu(1)}
            >
              <span className="navlink_icon">
                <i className="bx bx-user-circle" />
              </span>
              <span className="navlink">Admin</span>
              <i className="bx bx-chevron-right arrow-left" />
            </div>
            {activeSubMenu === 1 && (
              <ul className="menu_items submenu">
                <a href="#" className="nav_link sublink">
                  Add Admin
                </a>
              </ul>
            )}
          </li>

          {/* Users */}
          <li className="item">
            <div className="nav_link submenu_item">
              <span className="navlink_icon">
                <i className="bx bx-group" />
              </span>
              <span className="navlink">Users</span>
              {/* <i className="bx bx-chevron-right arrow-left" /> */}
            </div>
          </li>
        </ul>
        {/* Sidebar Open / Close */}
        <div className="bottom_content">
          <div className="bottom expand_sidebar" onClick={toggleSidebar}>
            <span>Expand</span>
            <i className="bx bx-log-in" />
          </div>
          <div className="bottom collapse_sidebar" onClick={toggleSidebar}>
            <span>Collapse</span>
            <i className="bx bx-log-out" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
