import { teamMembers } from '../data/mockData.js';
import '../styles/About.css';

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="about-hero">
        <div>
          <h1>About Heritage India</h1>
          <div className="decorative-bar"></div>
          <p>
            Preserving the cultural legacy of India and inspiring the next generation
            to connect with our glorious heritage.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="mission-section">
        <h2>Our Mission</h2>
        <div className="decorative-bar" style={{ margin: '12px 0 24px' }}></div>
        <p>
          Heritage India was born from a passion for preserving and promoting the incredible
          cultural legacy of India. Our mission is to make India's rich heritage accessible to
          everyone through technology, storytelling, and immersive experiences.
        </p>
        <p>
          We believe that understanding our past is essential to building a meaningful future.
          Through virtual tours, detailed monument guides, cultural articles, and interactive
          quizzes, we aim to inspire a deep appreciation for India's timeless contributions to
          art, architecture, science, and philosophy.
        </p>

        <div className="mission-values">
          <div className="value-card">
            <div className="value-icon" style={{ background: 'rgba(255, 153, 51, 0.15)', color: 'var(--saffron)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <h3>Preservation</h3>
            <p>Documenting and digitizing India's cultural heritage for future generations to discover and cherish.</p>
          </div>
          <div className="value-card">
            <div className="value-icon" style={{ background: 'rgba(19, 136, 8, 0.15)', color: 'var(--green)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
            </div>
            <h3>Education</h3>
            <p>Making learning about heritage engaging and interactive through modern technology and storytelling.</p>
          </div>
          <div className="value-card">
            <div className="value-icon" style={{ background: 'rgba(212, 175, 55, 0.15)', color: 'var(--gold)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
            <h3>Community</h3>
            <p>Building a global community of heritage enthusiasts who share a passion for India's cultural richness.</p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="team-section">
        <h2 className="section-title">Our Team</h2>
        <div className="decorative-bar"></div>
        <p className="section-subtitle">
          A passionate team dedicated to bringing India's heritage to the digital world.
        </p>
        <div className="team-grid">
          {teamMembers.map((member, i) => (
            <div className="team-card" key={i}>
              <img
                src={member.avatar}
                alt={member.name}
                className="team-avatar"
                crossOrigin="anonymous"
              />
              <h4>{member.name}</h4>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}