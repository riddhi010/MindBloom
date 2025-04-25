import React from "react";
import MoodTracker from "../components/Moodtrack";
import FeatureLayout from "../components/feature";
import "./MoodTracker.css"; 



const MoodTrackerPage = () => {
  return (
    <div className="mood-tracker-page">
      <FeatureLayout />
      <div className="content">
        <MoodTracker />
        

      </div>
    </div>
  );
};

export default MoodTrackerPage;
