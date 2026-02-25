import { Link } from 'react-router-dom';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <h3>Heritage India</h3>
          <p>
            Dedicated to preserving and promoting the rich cultural heritage of India.
            Explore monuments, learn history, and connect with our vibrant past.
          </p>
        </div>
        <div className="footer-col">
          <h4>Explore</h4>
          <Link to="/monuments">Monuments</Link>
          <Link to="/virtual-tour">Virtual Tours</Link>
          <Link to="/blog">Cultural Blog</Link>
          <Link to="/quiz">Heritage Quiz</Link>
        </div>
        <div className="footer-col">
          <h4>About</h4>
          <Link to="/about">Our Mission</Link>
          <Link to="/about">Our Team</Link>
          <Link to="/about">Contact Us</Link>
        </div>
        <div className="footer-col">
          <h4>Account</h4>
          <Link to="/login">Login / Sign Up</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; 2026 Heritage India. Preserving our past, inspiring our future.</span>
        <div className="footer-tricolor">
          <span style={{ background: '#FF9933' }}></span>
          <span style={{ background: '#FFFFFF' }}></span>
          <span style={{ background: '#138808' }}></span>
        </div>
      </div>
    </footer>
  );
}