import { Link } from 'react-router-dom';
import { monuments } from '../data/mockData.js';
import '../styles/Home.css';

export default function Home() {
  const featured = monuments.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="home-hero">
        <div className="hero-content">
          <h1>
            Discover the <span>Soul of India</span>
          </h1>
          <p>
            Journey through centuries of art, architecture, and culture. Explore the magnificent
            monuments, vibrant traditions, and timeless heritage that define the spirit of India.
          </p>
          <div className="hero-buttons">
            <Link to="/monuments" className="btn btn-primary">
              Explore Monuments
            </Link>
            <Link to="/virtual-tour" className="btn btn-secondary">
              Take Virtual Tour
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Monuments */}
      <section className="featured-section">
        <h2 className="section-title">Featured Monuments</h2>
        <div className="decorative-bar"></div>
        <p className="section-subtitle">
          Discover India's most iconic architectural masterpieces that have stood the test of time.
        </p>
        <div className="featured-grid">
          {featured.map((m) => (
            <Link to={`/monument/${m.id}`} key={m.id} className="featured-card">
              <div className="featured-card-image">
                <img src={m.image} alt={m.name} crossOrigin="anonymous" />
              </div>
              <div className="featured-card-body">
                <h3>{m.name}</h3>
                <p>{m.shortDesc}</p>
                <div className="featured-card-meta">
                  <span className="tag-region">{m.region}</span>
                  <span className="tag-era">{m.era}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <h2>40+</h2>
            <p>UNESCO Heritage Sites</p>
          </div>
          <div className="stat-item">
            <h2>5000+</h2>
            <p>Years of History</p>
          </div>
          <div className="stat-item">
            <h2>300+</h2>
            <p>Historic Monuments</p>
          </div>
          <div className="stat-item">
            <h2>29</h2>
            <p>States & Cultures</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Explore?</h2>
        <div className="decorative-bar"></div>
        <p>
          Join our community of heritage enthusiasts and embark on a journey through India's glorious past.
        </p>
        <div className="hero-buttons">
          <Link to="/login" className="btn btn-primary">
            Get Started
          </Link>
          <Link to="/quiz" className="btn btn-outline">
            Test Your Knowledge
          </Link>
        </div>
      </section>
    </div>
  );
}