import React, { useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? (
          <i className="fa fa-times"></i>
        ) : (
          <i className="fa fa-bars"></i>
        )}
      </button>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul>
          <li><Link to="/login">Login/Register</Link></li>
          <li><Link smooth to="#home">Home</Link></li>
          <li><Link smooth to="#about">About</Link></li>
          <li><Link smooth to="#testimonials">Testimonials</Link></li>
          <li><Link smooth to="#gallery">Gallery</Link></li>
          <li><Link smooth to="#contact">Contact</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
