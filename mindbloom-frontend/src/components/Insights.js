import React, { useEffect, useState } from "react";
import "./Insights.css";

const Insights = () => {
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const userPosts = posts.filter(p => p.userId === user.id || p.userId === user._id);
  
    if (userPosts.length === 0) return;
  
    const dates = userPosts.map(p => new Date(p.date));
    const uniqueDays = new Set(dates.map(d => d.toDateString()));
  
    const postHours = dates.map(d => d.getHours());
    const avgHour = Math.round(postHours.reduce((a, b) => a + b, 0) / postHours.length);
    const bestTime = `${avgHour % 12 || 12}${avgHour >= 12 ? "PM" : "AM"}`;
  
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const mostActiveDay = days[
      dates.reduce((acc, date) => {
        const day = date.getDay();
        acc[day] = (acc[day] || 0) + 1;
        return acc;
      }, []).indexOf(Math.max(...Object.values(dates.reduce((acc, date) => {
        const day = date.getDay();
        acc[day] = (acc[day] || 0) + 1;
        return acc;
      }, {}))))
    ];
  
    const wordCounts = userPosts.map(p => p.content.split(" ").length);
    const avgWords = Math.round(wordCounts.reduce((a, b) => a + b, 0) / wordCounts.length);
  
    // Mood frequency
    const moodCounts = userPosts.reduce((acc, p) => {
      if (p.mood) acc[p.mood] = (acc[p.mood] || 0) + 1;
      return acc;
    }, {});
    const mostFrequentMood = Object.keys(moodCounts).reduce((a, b) => moodCounts[a] > moodCounts[b] ? a : b, null);
  
    const generatedInsights = [
      `You've journaled on ${uniqueDays.size} unique day${uniqueDays.size > 1 ? "s" : ""}.`,
      `Most common journaling time: ${bestTime}`,
      `Most active on: ${mostActiveDay}`,
      `Average words per post: ${avgWords}`,
      mostFrequentMood ? `Most frequent mood: ${mostFrequentMood}` : "No mood data yet.",
    ];
  
    setInsights(generatedInsights);
  }, []);
  

  return (
    <div className="insights">
      <h3 className="insights-title">Your Insights</h3>
      <ul>
        {insights.map((insight, index) => (
          <li key={index}>{insight}</li>
        ))}
      </ul>
    </div>
  );
};

export default Insights;
