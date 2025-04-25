import React from "react";
import Header from "../components/Header";
import Greeting from "../components/greeting"; 
import styles from "./Dashboard.module.css"; 
import QuoteCard from "../components/Quoteweather";
import Cursor from "../components/cursor";
import Sidebar from "../components/Sidebar1.js";
const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <Cursor/>
      <Sidebar/>
      <Header />

      {/* Main Content Area */}
      <div className={styles.content}>
        <div className={styles.leftSection}>
          <Greeting /> 
          <QuoteCard />

        </div>
        <div className={styles.rightSection}>
         
          <img
  className={styles.dashboardImage}
  src="/assets/dash-Photoroom.png" 
  alt="Inspiration"
/>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
