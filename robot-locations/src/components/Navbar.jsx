import React, { useState } from "react";
import robotIcon from "../assets/robot.png"; // Your custom icon image

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        <marquee direction="right">
          <img src={robotIcon} alt="Logo" />
        </marquee>
      </a>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item mr-3">
          <a className="" href="/bookings">
            <b>
              <i className="bx bx-package"></i> Package
            </b>
          </a>
        </li>
        {/* <li className="nav-item mr-3">
          <a className="" href="/bookings">
            <b>
              <i class="bx bx-restaurant"></i> Food
            </b>
          </a>
        </li> */}
      </ul>

      <div
        className="collapse navbar-collapse ml-auto"
        id="navbarTogglerDemo02"
      >
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-3">
            <a className="" href="/bookings">
              <b>
                <i className="bx bx-chip"></i> Robot Booking
              </b>
            </a>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              onClick={handleDropdownToggle}
            >
              <img
                src="https://insafinhaam.com/static/media/insaf.603c6ea84e521ba68b49.jpg"
                alt="User profile"
                className="rounded-circle"
              />
            </a>
            {isDropdownOpen && (
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">
                  <strong>
                    <i className="bx bx-support"></i> Support
                  </strong>
                </a>
                <a className="dropdown-item" href="#">
                  <strong>
                    <i className="bx bx-user"></i> Manage Account
                  </strong>
                </a>
                <a className="dropdown-item" href="#">
                  <strong>
                    <i className="bx bx-cog"></i> Settings
                  </strong>
                </a>
                <a className="dropdown-item" href="#">
                  <strong>
                    <i className="bx bx-wallet"></i> Wallet
                  </strong>
                </a>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
