import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Ava Thompson",
    text: "MindBloom transformed my creativity! I feel more inspired every day.",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    name: "James Carter",
    text: "A platform where ideas truly bloom! Love the intuitive design.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sophia Lee",
    text: "The best place to brainstorm and connect with creative minds.",
    image: "https://randomuser.me/api/portraits/women/72.jpg",
  },
];

const TestimonialSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 overflow-hidden">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary drop-shadow-lg mb-8 sm:mb-10 font-[Pacifico]">
        What People Say 🌟
      </h2>

      <div className="relative w-full max-w-[95vw] sm:max-w-3xl">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-2xl border border-white/20 transform hover:scale-105 transition-all duration-500"
        >
          <img
            src={testimonials[current].image}
            alt={testimonials[current].name}
            className="w-16 sm:w-20 h-16 sm:h-20 rounded-full mx-auto mb-3 sm:mb-4 border-4 border-secondary"
          />
          <p className="text-base sm:text-lg text-gray-300 italic">{testimonials[current].text}</p>
          <h3 className="text-lg sm:text-xl font-bold text-secondary mt-3 sm:mt-4">
            — {testimonials[current].name}
          </h3>
        </motion.div>
      </div>

      {/* Navigation dots */}
      <div className="flex space-x-2 sm:space-x-3 mt-5 sm:mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${
              index === current ? "bg-secondary" : "bg-gray-500"
            } transition-all duration-300`}
          />
        ))}
      </div>

      {/* Background effects */}
      <div className="absolute top-10 left-10 w-24 sm:w-40 h-12 bg-secondary/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-40 right-10 sm:right-20 w-20 sm:w-32 h-10 bg-secondary/50 rounded-full blur-2xl animate-spin-slow"></div>
    </section>
  );
};

export default TestimonialSection;
