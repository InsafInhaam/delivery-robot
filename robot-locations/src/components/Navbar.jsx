import React from "react";
import robotIcon from '../assets/robot.png'; // Your custom icon image

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        <img src={robotIcon} alt="Logo" />
      </a>
      
      <div className="collapse navbar-collapse ml-auto" id="navbarTogglerDemo02">
        <div className="form-inline my-2 my-lg-0">
          <img src="https://insafinhaam.com/static/media/insaf.603c6ea84e521ba68b49.jpg" alt="User profile" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
