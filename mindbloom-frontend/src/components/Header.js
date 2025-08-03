import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import Sidebar from "./Sidebar1.js";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [streak, setStreak] = useState(0); // Initialize streak to 0
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const localUser = JSON.parse(localStorage.getItem("user"));
        if (localUser && localUser.id) {
          const res = await fetch(`http://localhost:5000/api/profile/${localUser.id}`);
          const data = await res.json();
          setUserData(data);
          setStreak(data.streak); 
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/"); 
  };

  return (
    <header className={styles.header}>
      
      <div className={styles.leftSection}>
        <Sidebar />
      </div>
      <h1 className={styles.logo}>MindBloom 🌿</h1>

      
      <div className={styles.topRightSection}>
        <div className={styles.streakCounter}>🔥 Streak: {streak || 0} Days</div>

        <div className={styles.profileContainer}>
        <img
  src={
    userData?.profilePicture
      ? `http://localhost:5000/uploads/${userData.profilePicture}`
      : "http://localhost:5000/uploads/default-profile.png"
  }
  alt="User"
  className={styles.profilePic}
  onClick={() => setDropdownOpen(!dropdownOpen)}
/>


          {dropdownOpen && (
            <div className={styles.dropdownMenu}>
              <Link to="/my-account">My Account</Link>
              <p>Settings</p>
              <p onClick={handleLogout} className={styles.logoutBtn}>Logout</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
