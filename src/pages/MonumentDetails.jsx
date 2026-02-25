import { useParams, Link } from 'react-router-dom';
import { monuments } from '../data/mockData.js';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/Monuments.css';

export default function MonumentDetails() {
  const { id } = useParams();
  const monument = monuments.find((m) => m.id === parseInt(id));
  const { user, toggleFavorite, isFavorite } = useAuth();

  if (!monument) {
    return (
      <div className="monument-details" style={{ textAlign: 'center', padding: '160px 20px 80px' }}>
        <h2>Monument Not Found</h2>
        <p style={{ color: 'var(--gray)', margin: '16px 0 24px' }}>
          The monument you are looking for does not exist.
        </p>
        <Link to="/monuments" className="btn btn-primary">Browse Monuments</Link>
      </div>
    );
  }

  return (
    <div className="monument-details">
      {/* Hero Image */}
      <div className="monument-detail-hero">
        <img src={monument.image} alt={monument.name} crossOrigin="anonymous" />
        <div className="monument-detail-hero-overlay">
          <h1>{monument.name}</h1>
          <p>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }}>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            {monument.location} | {monument.year}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="monument-detail-content">
        {/* Tags */}
        <div className="detail-tags" style={{ marginBottom: '36px' }}>
          <span className="tag-region">{monument.region}</span>
          <span className="tag-era">{monument.era}</span>
          <span style={{ background: 'rgba(212, 175, 55, 0.12)', color: 'var(--gold)' }}>{monument.type}</span>
        </div>

        {/* Description */}
        <div className="detail-section">
          <h2>About</h2>
          <div className="decorative-bar" style={{ margin: '12px 0 20px' }}></div>
          <p>{monument.description}</p>
        </div>

        {/* History */}
        <div className="detail-section">
          <h2>History</h2>
          <div className="decorative-bar" style={{ margin: '12px 0 20px' }}></div>
          <p>{monument.history}</p>
        </div>

        {/* Key Facts */}
        <div className="detail-section">
          <h2>Key Facts</h2>
          <div className="decorative-bar" style={{ margin: '12px 0 20px' }}></div>
          <ul className="facts-list">
            {monument.facts.map((fact, i) => (
              <li key={i}>{fact}</li>
            ))}
          </ul>
        </div>

        {/* Gallery */}
        <div className="detail-section">
          <h2>Gallery</h2>
          <div className="decorative-bar" style={{ margin: '12px 0 20px' }}></div>
          <div className="detail-gallery">
            {monument.gallery.map((img, i) => (
              <img key={i} src={img} alt={`${monument.name} view ${i + 1}`} crossOrigin="anonymous" />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="detail-actions">
          {user && (
            <button
              className={`btn ${isFavorite(monument.id) ? 'btn-danger' : 'btn-primary'}`}
              onClick={() => toggleFavorite(monument.id)}
            >
              {isFavorite(monument.id) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          )}
          <Link to="/monuments" className="btn btn-outline">Back to Monuments</Link>
        </div>
      </div>
    </div>
  );
}