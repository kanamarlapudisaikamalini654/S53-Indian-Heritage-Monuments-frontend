import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/Monuments.css';

export default function Monuments() {
  const [dbMonuments, setDbMonuments] = useState([]); 
  const [loading, setLoading] = useState(true);
  const { user, toggleFavorite, isFavorite } = useAuth();

  // 1. HARDCODED IMAGE MAP (The Absolute Fix)
  // This tells React: "I don't care what the database says, use THESE links."
  const forceImages = {
    'Red Fort': 'https://images.unsplash.com/photo-1585123334904-845d60e97b29?q=80&w=800',
    'Taj Mahal': 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800',
    'Qutub Minar': 'https://images.unsplash.com/photo-1523544261025-3159599b1fc3?q=80&w=800'
  };

  useEffect(() => {
  axios.get(`${BASE_URL}/api/monuments`)
    .then(response => {
      const validIds = [2, 3, 5];
      const filtered = response.data.filter(m => validIds.includes(m.id));
      setDbMonuments(filtered);
      setLoading(false);
    })
    .catch(error => {
      console.error("Connection error:", error);
      setLoading(false);
    });
}, []);

  if (loading) return <div className="loader">Refreshing Heritage Data...</div>;

  return (
    <div className="monuments-page">
      <div className="monuments-grid">
        {dbMonuments.map((m) => (
          <div className="monument-card" key={m.id}>
            <div className="monument-card-image">
              <img 
                /* 3. This line checks the name. If it's 'Red Fort', it uses the 
                   Unsplash link from our map above, NOT the one from the DB. */
                src={forceImages[m.name] || m.image_url} 
                alt={m.name} 
              />
              <div className="monument-card-overlay">
                <button 
                  className={`fav-btn ${isFavorite(m.id) ? 'active' : ''}`}
                  onClick={() => toggleFavorite(m.id)}
                >
                  {isFavorite(m.id) ? '❤️' : '🤍'}
                </button>
              </div>
            </div>

            <div className="monument-card-body">
              <h3>{m.name}</h3>
              <div className="monument-location">📍 {m.location}</div>
              <p>{m.short_desc}</p>
              
              <div className="card-footer" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px'}}>
                <span className="year-text" style={{fontWeight: 'bold', color: 'var(--saffron)'}}>{m.year}</span>
                <Link to={`/monument/${m.id}`} className="view-btn" style={{
                  background: 'var(--saffron)', 
                  color: 'white', 
                  padding: '8px 16px', 
                  borderRadius: '4px', 
                  textDecoration: 'none'
                }}>View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}