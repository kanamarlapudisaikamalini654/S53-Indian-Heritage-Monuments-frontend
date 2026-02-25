import { useState } from 'react';
import { Link } from 'react-router-dom';
import { monuments } from '../data/mockData.js';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/Monuments.css';

export default function Monuments() {
  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState('All');
  const [eraFilter, setEraFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const { user, toggleFavorite, isFavorite } = useAuth();

  const regions = ['All', ...new Set(monuments.map((m) => m.region))];
  const eras = ['All', ...new Set(monuments.map((m) => m.era))];
  const types = ['All', ...new Set(monuments.map((m) => m.type))];

  const filtered = monuments.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.location.toLowerCase().includes(search.toLowerCase());
    const matchRegion = regionFilter === 'All' || m.region === regionFilter;
    const matchEra = eraFilter === 'All' || m.era === eraFilter;
    const matchType = typeFilter === 'All' || m.type === typeFilter;
    return matchSearch && matchRegion && matchEra && matchType;
  });

  return (
    <div className="monuments-page">
      <section className="monuments-hero">
        <h1>Monuments of India</h1>
        <div className="decorative-bar"></div>
        <p className="section-subtitle">
          Explore the architectural masterpieces that tell the story of India's glorious past.
        </p>
      </section>

      <div className="monuments-filters">
        <input
          type="text"
          className="search-input"
          placeholder="Search monuments by name or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="filter-select" value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)}>
          {regions.map((r) => (
            <option key={r} value={r}>{r === 'All' ? 'All Regions' : r}</option>
          ))}
        </select>
        <select className="filter-select" value={eraFilter} onChange={(e) => setEraFilter(e.target.value)}>
          {eras.map((e) => (
            <option key={e} value={e}>{e === 'All' ? 'All Eras' : e}</option>
          ))}
        </select>
        <select className="filter-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          {types.map((t) => (
            <option key={t} value={t}>{t === 'All' ? 'All Types' : t}</option>
          ))}
        </select>
      </div>

      <div className="monuments-grid">
        {filtered.length > 0 ? (
          filtered.map((m) => (
            <div className="monument-card" key={m.id}>
              <div className="monument-card-image">
                <img src={m.image} alt={m.name} crossOrigin="anonymous" />
                <div className="monument-card-overlay">
                  {user && (
                    <button
                      className={`fav-btn ${isFavorite(m.id) ? 'active' : ''}`}
                      onClick={() => toggleFavorite(m.id)}
                      aria-label={isFavorite(m.id) ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      {isFavorite(m.id) ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                      )}
                    </button>
                  )}
                </div>
              </div>
              <div className="monument-card-body">
                <h3>{m.name}</h3>
                <div className="monument-location">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  {m.location}
                </div>
                <p>{m.shortDesc}</p>
                <div className="monument-card-tags">
                  <span className="tag-region">{m.region}</span>
                  <span className="tag-era">{m.era}</span>
                  <span style={{
                    background: 'rgba(212, 175, 55, 0.12)',
                    color: 'var(--gold)'
                  }}>{m.type}</span>
                </div>
                <div className="monument-card-footer">
                  <span style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>{m.year}</span>
                  <Link to={`/monument/${m.id}`} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <h3>No monuments found</h3>
            <p>Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}