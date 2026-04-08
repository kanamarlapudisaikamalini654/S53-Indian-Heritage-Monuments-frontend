import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">H</span>
          <span className="logo-text">Heritage India</span>
        </Link>

        {/* Desktop Links */}
        <div className={`navbar-links ${menuOpen ? 'mobile-open' : ''}`}>
          <Link to="/" className={isActive('/')}>Home</Link>
          <Link to="/monuments" className={isActive('/monuments')}>Monuments</Link>
          <Link to="/virtual-tour" className={isActive('/virtual-tour')}>Virtual Tour</Link>
          <Link to="/blog" className={isActive('/blog')}>Blog</Link>
          <Link to="/quiz" className={isActive('/quiz')}>Quiz</Link>
          {/* Dashboard link appears only when logged in */}
          {user && <Link to="/dashboard" className={isActive('/dashboard')}>Dashboard</Link>}
          <Link to="/about" className={isActive('/about')}>About</Link>
        </div>

        <div className="navbar-auth">
          {user ? (
            <div className="user-profile">
              <span className="username" style={{ marginRight: '15px', fontWeight: 'bold', color: 'var(--saffron)' }}>
                {user.username}
              </span>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className="auth-buttons" style={{ display: 'flex', gap: '10px' }}>
              <Link to="/login" className="login-btn">Login</Link>
              {/* Added Signup Button */}
              <Link to="/signup" className="signup-btn" style={{ 
                padding: '8px 16px', 
                backgroundColor: 'var(--saffron, #f39c12)', 
                color: 'white', 
                borderRadius: '5px',
                textDecoration: 'none',
                fontWeight: '600'
              }}>
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Hamburger for Mobile */}
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>
    </nav>
  );
}