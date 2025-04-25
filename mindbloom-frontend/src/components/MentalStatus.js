import React from "react";
import "./MentalStatus.css";

const MentalStatus = () => {
  const moodStats = [
    { mood: "😊 Happy", count: 4 },
    { mood: "😐 Neutral", count: 2 },
    { mood: "😔 Sad", count: 1 }
  ];

  return (
    <div className="mental-status">
      <ul>
        {moodStats.map((mood, index) => (
          <li key={index}>
            <strong>{mood.mood}</strong>: {mood.count} times
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MentalStatus;