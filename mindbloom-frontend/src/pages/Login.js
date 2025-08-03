import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styles from './LoginRegister.module.css';
import Cursor from "../components/cursor";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // 👁️ Icons



const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false); 
  const [loading, setLoading] = useState(false); 

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true); 
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });

      toast.success('Login successful! 🎉');
      localStorage.setItem('token', response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user)); 
      const { user } = response.data; 
      localStorage.setItem("userId", user.id);  


      setTimeout(() => {
        setLoading(false);
        navigate('/dashboard'); 
      }, 1500);
    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed. Try again.';
      toast.error(msg);
      setLoading(false); 
    }
  };

  return (
    <div className={styles.container}>
      <Cursor />
      <div className={styles.leavesContainer}>
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`${styles.leaf} leaf-${i % 5}`}></div>
        ))}
      </div>

      <motion.div
        className={styles.glassForm}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2>Welcome Back!</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className={styles.passwordWrapper}>
  <label htmlFor="password">Password</label>
  <div className={styles.passwordInputContainer}>
    <input
      id="password"
      type={showPassword ? "text" : "password"}
      placeholder="Password"
      required
      value={formData.password}
      onChange={handleChange}
      className={styles.passwordInput}
    />
    <span
      className={styles.eyeIcon}
      onClick={() => setShowPassword((prev) => !prev)}
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </span>
  </div>
</div>

<div className="forgot-password-container">
  <span 
    className="forgot-password-link"
    onClick={() => navigate('/forgot-password')}
  >
    Forgot Password?
  </span>
</div>



          <button className={styles.authButton} type="submit" disabled={loading}>
            {loading ? (
              <span className={styles.spinner}></span>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <p>
          Don't have an account?
          <span onClick={() => navigate('/register')} className={styles.link}> Register</span>
        </p>
      </motion.div>

      <ToastContainer position="top-center" autoClose={2500} />
    </div>
  );
};

export default Login;
