import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import axios from 'axios';
import '../styles/Login.css';

// ✅ YOUR DEPLOYED BACKEND URL
const BASE_URL = "https://s53-indian-heritage-monument-backend-3.onrender.com";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin
      ? `${BASE_URL}/api/users/login`
      : `${BASE_URL}/api/users/register`;

    const userData = isLogin
      ? { email, password }
      : { username, email, password };

    try {
      const response = await axios.post(url, userData, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.status === 200) {
        const fetchedUser = response.data;

        login(fetchedUser.username, fetchedUser.role);

        localStorage.setItem("userEmail", fetchedUser.email);
        localStorage.setItem("userName", fetchedUser.username);
        localStorage.setItem("userRole", fetchedUser.role);

        navigate('/dashboard');
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert(error.response?.data || "Login Failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>{isLogin ? 'Welcome Back' : 'Join Heritage India'}</h2>

        <div className="login-toggle">
          <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>
            Login
          </button>
          <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}