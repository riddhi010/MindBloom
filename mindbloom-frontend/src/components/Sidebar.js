import React, { useState } from "react";
import './Sidebar.css';
import { Link } from 'react-router-dom'; // ✅ Import Link

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Sidebar toggle button */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? (
          <i className="fa fa-times"></i>
        ) : (
          <i className="fa fa-bars"></i>
        )}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul>
          <li><Link to="/login">Login/Register</Link></li>
          <li><Link to="/">Home</Link></li>
          <li><Link to="about">About</Link></li>
          <li><Link to="testimonials">Testimonials</Link></li>
          <li><Link to="gallery">Gallery</Link></li>
          <li><Link to="contact">Contact</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
