import React, { useState } from "react";
import './Sidebar.css';
import Cursor from "../components/cursor";
import { Link } from "react-router-dom"; // ✅ Import Link

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Cursor />
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? <i className="fa fa-times"></i> : <i className="fa fa-bars"></i>}
      </button>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul>
          <li><Link to="/dashboard">Home</Link></li>
          <li><Link to="/mood-tracker">MoodTracker</Link></li>
          <li><Link to="/journal">Journal</Link></li>
          <li><Link to="/chat">AI chat</Link></li>
          <li><Link to="/anowall">AnonymousWall</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
