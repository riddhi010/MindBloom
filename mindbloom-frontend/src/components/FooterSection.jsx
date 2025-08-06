import React from "react";

const FooterSection = () => (
  <footer className="relative bg-gray-900 text-white pt-10 pb-6">
    {/* Footer Content */}
    <div className="footer-content px-4 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      {/* Text */}
      <p className="footer-text text-center md:text-left text-sm sm:text-base">
        © 2025 MindBloom. All Rights Reserved.
      </p>

      {/* Social Icons */}
      <div className="social-links flex gap-4 text-lg">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noreferrer noopener"
          className="social-icon hover:text-blue-500 transition-colors"
        >
          <i className="fab fa-facebook"></i>
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noreferrer noopener"
          className="social-icon hover:text-sky-400 transition-colors"
        >
          <i className="fab fa-twitter"></i>
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noreferrer noopener"
          className="social-icon hover:text-pink-500 transition-colors"
        >
          <i className="fab fa-instagram"></i>
        </a>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noreferrer noopener"
          className="social-icon hover:text-blue-300 transition-colors"
        >
          <i className="fab fa-linkedin"></i>
        </a>
      </div>
    </div>

    {/* Wavy SVG Shape */}
    <svg
      className="absolute top-0 left-0 w-full h-20"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path
        d="M0 20 C 20 40, 40 40, 60 20 C 80 0, 100 0, 100 20 L 100 100 L 0 100 Z"
        fill="#111827"
      />
    </svg>
  </footer>
);

export default FooterSection;
