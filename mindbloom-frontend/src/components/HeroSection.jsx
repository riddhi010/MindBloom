import React from "react";
import { Link } from 'react-router-dom';

const HeroSection = () => (
  <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 overflow-hidden">
    {/* Floating Emojis - Moods and Emotions */}
    <div className="emoji-container absolute top-5 left-5">
      <span className="emoji animate-float text-2xl sm:text-3xl">😊</span>
    </div>
    <div className="emoji-container absolute top-32 right-10 sm:right-40 hidden sm:block">
      <span className="emoji animate-float text-2xl sm:text-3xl">😢</span>
    </div>
    <div className="emoji-container absolute top-32 left-10 sm:left-1/6">
      <span className="emoji animate-float text-2xl sm:text-3xl">😍</span>
    </div>
    <div className="emoji-container absolute top-32 right-10 sm:right-1/6 hidden sm:block">
      <span className="emoji animate-float text-2xl sm:text-3xl">😎</span>
    </div>
    <div className="emoji-container absolute bottom-40 left-10 sm:left-40 hidden sm:block">
      <span className="emoji animate-float text-2xl sm:text-3xl">😱</span>
    </div>
    <div className="emoji-container absolute top-10 left-1/3 hidden sm:block">
      <span className="emoji animate-float text-2xl sm:text-3xl">🤔</span>
    </div>
    <div className="emoji-container absolute top-20 right-1/4 sm:left-2/3 hidden sm:block">
      <span className="emoji animate-float text-2xl sm:text-3xl">🤩</span>
    </div>
    <div className="emoji-container absolute top-2/3 right-10 sm:right-40 hidden sm:block">
      <span className="emoji animate-float text-2xl sm:text-3xl">🥳</span>
    </div>
    <div className="emoji-container absolute top-3/4 left-1/4 hidden sm:block">
      <span className="emoji animate-float text-2xl sm:text-3xl">😇</span>
    </div>
    <div className="emoji-container absolute bottom-10 left-1/2 transform -translate-x-1/2">
      <span className="emoji animate-float text-2xl sm:text-3xl">😤</span>
    </div>
    <div className="emoji-container absolute bottom-5 right-10 sm:left-2/3 hidden sm:block">
      <span className="emoji animate-float text-2xl sm:text-3xl">😜</span>
    </div>
    <div className="emoji-container absolute bottom-1/6 right-10 sm:left-2/3 hidden sm:block">
      <span className="emoji animate-float text-2xl sm:text-3xl">🤯</span>
    </div>

    {/* Background Effects */}
    <div className="absolute top-10 left-10 w-24 sm:w-40 h-24 sm:h-40 bg-secondary/30 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute top-40 right-10 sm:right-20 w-20 sm:w-32 h-20 sm:h-32 bg-secondary/50 rounded-full blur-2xl animate-spin-slow"></div>

    {/* Hero Text */}
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#E3E4E6] to-[#D6B07D] animate-fade-in font-[Pacifico] drop-shadow-lg">
      MindBloom 🌿
    </h1>
    <p className="text-base sm:text-lg md:text-xl mt-4 text-gray-300 italic animate-slide-up">
      Where Ideas Flourish, Creativity Blooms ✨
    </p>

    <Link to="/register">
      <button className="mt-6 px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-secondary to-[#E3E4E6] text-primary font-bold text-base sm:text-lg rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 animate-fade-in">
        Get Started 🚀
      </button>
    </Link>
  </section>
);

export default HeroSection;
