import React from "react";
import { motion } from "framer-motion";
import Cursor from "../components/cursor";

const WhatIsMindBloom = () => (
  <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 text-center overflow-hidden">
    <Cursor />

    {/* Floating Effects */}
    <div className="absolute bottom-10 left-10 w-20 h-20 sm:w-32 sm:h-32 bg-secondary/30 rounded-full blur-3xl animate-bounce"></div>
    <div className="absolute top-20 right-10 sm:right-16 w-24 h-24 sm:w-40 sm:h-40 bg-secondary/50 rounded-full blur-2xl animate-spin-slow"></div>

    {/* Image on top (mobile) or left (desktop) */}
    <div className="flex flex-col-reverse sm:flex-row items-center justify-center w-full gap-6">
      {/* Main Content */}
      <div className="relative max-w-[95vw] sm:max-w-4xl p-6 sm:p-10 rounded-2xl border border-white/20 backdrop-blur-lg shadow-2xl transform transition-all duration-500 group">
        <div className="absolute inset-0 rounded-2xl border-[3px] border-transparent bg-gradient-to-r from-[#E3E4E6] to-[#D6B07D] opacity-20 group-hover:opacity-100 transition-all duration-500 blur-md"></div>

        <div className="relative z-10 bg-white/10 rounded-2xl p-6 sm:p-10 shadow-xl transition-all duration-500 group-hover:bg-[#E3E4E6]/20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4 sm:mb-6 drop-shadow-xl animate-fade-up font-[Pacifico] transition-all duration-500 group-hover:text-[#473c28]">
            What is MindBloom? 🌱
          </h2>

          <motion.p
            className="text-base sm:text-lg text-gray-300 leading-relaxed italic transition-all duration-500 group-hover:text-[#2b2a29]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            MindBloom helps people track their mood, check their emotions, and talk anonymously with others. It is designed to support mental well-being and create a safe space for users to express their feelings without fear of judgment.
          </motion.p>

          <h3 className="text-base sm:text-lg text-gray-300 font-semibold mt-6 mb-4 text-left border-l-4 border-secondary pl-4 transition-all duration-500 group-hover:text-[#473c28]">
            Features of MindBloom:
          </h3>

          <ul className="list-disc list-inside text-gray-300 leading-relaxed text-left space-y-2 transition-all duration-500 group-hover:text-[#2b2a29] text-sm sm:text-base">
            <li><strong>Mood Tracking</strong> – Log your emotions daily to uncover trends and gain insights into your mental well-being.</li>
            <li><strong>Streak Management</strong> – Stay consistent with daily check-ins to build healthy habits and grow your MindBloom streak.</li>
            <li><strong>Anonymous Wall</strong> – Express your thoughts freely and connect with others in a safe, anonymous space.</li>
            <li><strong>Bloom Bot</strong> – Chat with our intelligent AI for personalized suggestions, emotional support, and encouragement.</li>
            <li><strong>Journaling</strong> – Reflect on your day, share your thoughts (if you choose), and uplift your mood through the power of writing.</li>

            
          </ul>
        </div>
      </div>

      {/* Image */}
      <div className="w-40 sm:w-64 h-auto object-contain">
        <img
          src="/assets/curiosity brain-rafiki.png"
          alt="Curiosity Brain"
          className="w-full h-auto"
        />
      </div>
    </div>
  </section>
);

export default WhatIsMindBloom;
