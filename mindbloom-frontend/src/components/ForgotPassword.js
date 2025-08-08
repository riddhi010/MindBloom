import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://mindbloom-pg24.onrender.com/api/auth/forgot-password", { email });
      alert("Reset link sent to your email.");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
      type="email"
      onChange={(e) => setEmail(e.target.value)}
      required
      placeholder="Enter your registered email"
      />

      <button type="submit">Send Reset Link</button>
    </form>
  );
};

export default ForgotPassword; 
