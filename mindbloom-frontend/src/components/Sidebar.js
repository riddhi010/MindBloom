import React, { useState } from "react";
import './Sidebar.css'; 

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      
      {/* Sidebar toggle button with icon */}
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
        <li><a href="/login">Login/Register</a></li>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#testimonials">Testimonials</a></li>
        <li><a href="#gallery">Gallery</a></li>
        <li><a href="#contact">Contact</a></li>
        
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
