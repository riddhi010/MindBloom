import React, { useState, useEffect } from 'react';
import './Moodtrack.css';
import MoodGraph from "../components/MoodGraph";
import axios from 'axios';

const MoodTracker = () => {
  const [moods, setMoods] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")); 

  const moodList = [
    { emoji: '😊', label: 'Happy' },
    { emoji: '😞', label: 'Sad' },
    { emoji: '😠', label: 'Angry' },
    { emoji: '😌', label: 'Relaxed' },
    { emoji: '😣', label: 'Stressed' },
    { emoji: '😃', label: 'Excited' },
  ];

  
  const handleMoodClick = async (mood) => {
    if (!user) return alert("Please log in to track your mood.");

    const newEntry = {
      emoji: mood.emoji,
      label: mood.label,
      userId: user.id, 
    };

    try {
      const res = await axios.post("http://localhost:5000/api/moods", newEntry);
      setMoods(prev => [res.data, ...prev]); 
    } catch (err) {
      console.error("❌ Error saving mood:", err);
    }
  };

  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/moods/${id}`);
      setMoods(prev => prev.filter(m => m._id !== id));
    } catch (err) {
      console.error("❌ Error deleting mood:", err);
    }
  };

  
  useEffect(() => {
    const fetchMoods = async () => {
      if (!user) return;

      try {
        const res = await axios.get(`http://localhost:5000/api/moods/${user.id}`);
        setMoods(res.data); 
      } catch (err) {
        console.error("❌ Error fetching moods:", err);
      }
    };

    fetchMoods();
  }, [user]);

  return (
    <>
      <div className="mood-tracker-container">
        <h2 className="mood-tracker-title">🌼 How are you feeling today?</h2>

        <div className="mood-options">
          {moodList.map((mood, index) => (
            <button
              key={index}
              className="mood-button"
              onClick={() => handleMoodClick(mood)}
            >
              <span className="emoji">{mood.emoji}</span>
              <span className="label">{mood.label}</span>
            </button>
          ))}
        </div>

        <div className="mood-log">
          <h3 className="mood-log-title">📝 Your Mood Log</h3>
          {moods.length === 0 ? (
            <p className="empty-log">No moods recorded yet. Click an emoji above!</p>
          ) : (
            <ul className="log-list">
              {moods.map((m, index) => (
                <li key={index} className="mood-entry">
                  <span className="log-emoji">{m.emoji}</span>
                  <span className="log-label">{m.label}</span>
                  <span className="log-time">
                    {new Date(m.createdAt || m.time).toLocaleString()}
                  </span>
                  <button  onClick={() => handleDelete(m._id)}>
                  ❌
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mood-graph-wrapper">
        <MoodGraph moodData={moods} />
      </div>
    </>
  );
};

export default MoodTracker;
