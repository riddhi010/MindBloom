import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleAnchorClick = (id) => {
    setIsOpen(false);
    // Go to homepage and scroll after navigation
    navigate("/");
    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); // Give time for Home to load
  };

  return (
    <div>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? <i className="fa fa-times"></i> : <i className="fa fa-bars"></i>}
      </button>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul>
          <li><a href="/#/login" onClick={toggleSidebar}>Login/Register</a></li>
          <li><a onClick={() => handleAnchorClick("home")}>Home</a></li>
          <li><a onClick={() => handleAnchorClick("about")}>About</a></li>
          <li><a onClick={() => handleAnchorClick("testimonials")}>Testimonials</a></li>
          <li><a onClick={() => handleAnchorClick("gallery")}>Gallery</a></li>
          <li><a onClick={() => handleAnchorClick("contact")}>Contact</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
