import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const MoodGraph = ({ moodData }) => {
  const [selectedDate, setSelectedDate] = useState('');

  const formatDate = (date) => date.toISOString().split('T')[0];
  const todayStr = formatDate(new Date());
  const targetDate = selectedDate || todayStr;

  const filteredMoods = moodData.filter((mood) => {
    const moodDate = formatDate(new Date(mood.createdAt || mood.time));
    return moodDate === targetDate;
  });

  const moodCounts = filteredMoods.reduce((acc, mood) => {
    acc[mood.label] = (acc[mood.label] || 0) + 1;
    return acc;
  }, {});

  const moodLabels = Object.keys(moodCounts);
  const moodFrequencies = Object.values(moodCounts);

  const backgroundColors = {
    Happy: '#fbd46d',
    Sad: '#8aaae5',
    Angry: '#ff6b6b',
    Relaxed: '#9ce5cb',
    Stressed: '#ffa69e',
    Excited: '#f8a5c2',
  };

  const data = {
    labels: moodLabels,
    datasets: [
      {
        label: 'Mood Frequency',
        data: moodFrequencies,
        backgroundColor: moodLabels.map(label => backgroundColors[label] || '#cccccc'),
        borderRadius: 10,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: `Mood Frequency on ${targetDate}`,
        color: '#ffffff',
        font: { size: 18, weight: 'bold' },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const mood = context.label;
            const count = context.parsed.y;
            return `${mood}: ${count} time${count > 1 ? 's' : ''}`;
          },
        },
      },
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: '#ffffff', stepSize: 1 },
        title: {
          display: true,
          text: 'Number of Entries',
          color: '#ffffff',
          font: { size: 14, weight: 'bold' },
        },
      },
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: '#ffffff' },
        title: {
          display: true,
          text: 'Mood Type',
          color: '#ffffff',
          font: { size: 14, weight: 'bo
