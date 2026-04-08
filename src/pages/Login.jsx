import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import axios from 'axios';
import '../styles/Login.css';

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
      ? "http://localhost:8081/api/users/login" 
      : "http://localhost:8081/api/users/register";

    const userData = isLogin ? { email, password } : { username, email, password };

    try {
      const response = await axios.post(url, userData, {
        withCredentials: true
      });
      
      if (response.status === 200) {
        const fetchedUser = response.data; 

        // SAFE LOGIN CALL:
        // We pass the username first (for the greeting) and role second.
        // This matches your 'previous code' so it won't go empty!
        login(fetchedUser.username, fetchedUser.role); 

        // THE SECRET TRICK: Save the email and name to localStorage.
        // This allows your Quiz and Dashboard to find the REAL data
        // even if the login function only takes two arguments.
        localStorage.setItem("userEmail", fetchedUser.email);
        localStorage.setItem("userName", fetchedUser.username);
        localStorage.setItem("userRole", fetchedUser.role);
        
        navigate('/dashboard');
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert(error.response?.data || "Login Failed.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>{isLogin ? 'Welcome Back' : 'Join Heritage India'}</h2>
        <div className="login-toggle">
          <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>Login</button>
          <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>Sign Up</button>
        </div>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
          )}
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}