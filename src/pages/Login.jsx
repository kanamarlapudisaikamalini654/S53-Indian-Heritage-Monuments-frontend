import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/Login.css';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Cultural Enthusiast');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      login(username, role);
      navigate('/dashboard');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>{isLogin ? 'Welcome Back' : 'Join Heritage India'}</h2>
        <p className="login-subtitle">
          {isLogin ? 'Sign in to continue your cultural journey' : 'Create an account to explore India\'s heritage'}
        </p>

        <div className="login-toggle">
          <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>
            Login
          </button>
          <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Select Role</label>
            <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
              <option>Admin</option>
              <option>Cultural Enthusiast</option>
              <option>Content Creator</option>
              <option>Tour Guide</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="login-footer">
          {isLogin ? (
            <span>
              {"Don't have an account? "}
              <button onClick={() => setIsLogin(false)}>Sign up</button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button onClick={() => setIsLogin(true)}>Login</button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}