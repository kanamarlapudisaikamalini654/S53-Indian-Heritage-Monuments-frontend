import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { monuments, blogs, virtualTours, quizQuestions } from '../data/mockData.js';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const { user, favorites } = useAuth();

  if (!user) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-login-required" style={{ paddingTop: '160px' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--saffron)" strokeWidth="2" style={{ margin: '0 auto 16px', display: 'block' }}>
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <h2>Login Required</h2>
          <p>Please login to access your dashboard.</p>
          <Link to="/login" className="btn btn-primary">Login</Link>
        </div>
      </div>
    );
  }

  const favoriteMonuments = monuments.filter((m) => favorites.includes(m.id));

  const getRoleBadgeStyle = () => {
    switch (user.role) {
      case 'Admin': return { background: 'rgba(139,0,0,0.15)', color: 'var(--deep-red)' };
      case 'Cultural Enthusiast': return { background: 'rgba(19,136,8,0.15)', color: 'var(--green)' };
      case 'Content Creator': return { background: 'rgba(255,153,51,0.15)', color: 'var(--saffron-dark)' };
      case 'Tour Guide': return { background: 'rgba(212,175,55,0.15)', color: 'var(--gold)' };
      default: return { background: 'var(--light-gray)', color: 'var(--gray)' };
    }
  };

  return (
    <div className="dashboard-page">
      {/* Hero */}
      <section className="dashboard-hero">
        <h1>Dashboard</h1>
        <div className="decorative-bar"></div>
        <p className="user-greeting">Welcome back, {user.username}!</p>
        <span className="role-badge" style={getRoleBadgeStyle()}>
          {user.role}
        </span>
      </section>

      <div className="dashboard-content">
        {/* Render based on role */}
        {user.role === 'Admin' && <AdminDashboard favoriteMonuments={favoriteMonuments} />}
        {user.role === 'Cultural Enthusiast' && <EnthusiastDashboard favoriteMonuments={favoriteMonuments} />}
        {user.role === 'Content Creator' && <CreatorDashboard favoriteMonuments={favoriteMonuments} />}
        {user.role === 'Tour Guide' && <GuideDashboard favoriteMonuments={favoriteMonuments} />}
      </div>
    </div>
  );
}

function AdminDashboard({ favoriteMonuments }) {
  return (
    <>
      <div className="dash-stats">
        <div className="dash-stat-card">
          <span className="stat-number" style={{ color: 'var(--saffron)' }}>{monuments.length}</span>
          <span className="stat-label">Total Monuments</span>
        </div>
        <div className="dash-stat-card">
          <span className="stat-number" style={{ color: 'var(--green)' }}>{blogs.length}</span>
          <span className="stat-label">Blog Posts</span>
        </div>
        <div className="dash-stat-card">
          <span className="stat-number" style={{ color: 'var(--gold)' }}>{virtualTours.length}</span>
          <span className="stat-label">Virtual Tours</span>
        </div>
        <div className="dash-stat-card">
          <span className="stat-number" style={{ color: 'var(--deep-red)' }}>4</span>
          <span className="stat-label">Active Users</span>
        </div>
      </div>

      {/* Manage Monuments */}
      <div className="dash-section">
        <div className="dash-section-header">
          <h2>Manage Monuments</h2>
          <Link to="/monuments" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
            View All
          </Link>
        </div>
        <div className="dash-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Region</th>
                <th>Type</th>
                <th>Era</th>
              </tr>
            </thead>
            <tbody>
              {monuments.map((m) => (
                <tr key={m.id}>
                  <td><strong>{m.name}</strong></td>
                  <td>{m.location}</td>
                  <td>{m.region}</td>
                  <td>{m.type}</td>
                  <td>{m.era}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manage Blog Posts */}
      <div className="dash-section">
        <div className="dash-section-header">
          <h2>Manage Blog Posts</h2>
          <Link to="/blog" className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
            View Blog
          </Link>
        </div>
        <div className="dash-table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((b) => (
                <tr key={b.id}>
                  <td><strong>{b.title}</strong></td>
                  <td>{b.author}</td>
                  <td>{b.category}</td>
                  <td>{new Date(b.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function EnthusiastDashboard({ favoriteMonuments }) {
  return (
    <>
      <div className="dash-stats">
        <div className="dash-stat-card">
          <span className="stat-number" style={{ color: 'var(--saffron)' }}>{favoriteMonuments.length}</span>
          <span className="stat-label">Favorites</span>
        </div>
        <div className="dash-stat-card">
          <span className="stat-number" style={{ color: 'var(--green)' }}>{quizQuestions.length}</span>
          <span className="stat-label">Quiz Questions</span>
        </div>
        <div className="dash-stat-card">
          <span className="stat-number" style={{ color: 'var(--gold)' }}>{monuments.length}</span>
          <span className="stat-label">Monuments to Explore</span>
        </div>
        <div className="dash-stat-card">
          <span className="stat-number" style={{ color: 'var(--deep-red)' }}>{blogs.length}</span>
          <span className="stat-label">Articles to Read</span>
        </div>
      </div>

      {/* Favorites */}
      <div className="dash-section">
        <div className="dash-section-header">
          <h2>Your Favorites</h2>
          <Link to="/monuments" className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
            Browse More
          </Link>
        </div>
        {favoriteMonuments.length > 0 ? (
          <div className="fav-grid">
            {favoriteMonuments.map((m) => (
              <Link to={`/monument/${m.id}`} key={m.id} className="fav-card">
                <img src={m.image} alt={m.name} crossOrigin="anonymous" />
                <div className="fav-card-body">
                  <h4>{m.name}</h4>
                  <p>{m.location}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No favorites yet</h3>
            <p>Browse monuments and click the heart icon to add favorites.</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="dash-section">
        <h2 style={{ marginBottom: '20px' }}>Quick Actions</h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Link to="/quiz" className="btn btn-primary">Take a Quiz</Link>
          <Link to="/virtual-tour" className="btn btn-green">Start Virtual Tour</Link>
          <Link to="/blog" className="btn btn-gold">Read Articles</Link>
        </div>
      </div>
    </>
  );
}

function CreatorDashboard({ favoriteMonuments }) {
  return (
    <>
      <div className="dash-stats">
        <div className="dash-stat-card">
          <span className="stat-number" style={{ color: 'var(--saffron)' }}>{blogs.length}</span>
          <span className="stat-label">Published Articles</span>
        </div>
        <div className="dash-stat-card">
          <span className="stat-number" style={{ color: 'var(--green)' }}>4</span>
          <span className="stat-label">Categories</span>
        </div>
        <div className="dash-stat-card">
          <span className="stat-number" style={{ color: 'var(--gold)' }}>{monuments.length}</span>
          <span className="stat-label">Monument References</span>
        </div>
        <div className="dash-stat-card">
          <span className="stat-number" style={{ color: 'var(--deep-red)' }}>{favoriteMonuments.length}</span>
          <span className="stat-label">Your Favorites</span>
        </div>
      </div>

      {/* Manage Articles */}
      <div className="dash-section">
        <div className="dash-section-header">
          <h2>Your Articles</h2>
          <Link to="/blog" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
            + Write New
          </Link>
        </div>
        <div className="dash-table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((b) => (
                <tr key={b.id}>
                  <td><strong>{b.title}</strong></td>
                  <td>{b.category}</td>
                  <td>{new Date(b.date).toLocaleDateString()}</td>
                  <td>
                    <span style={{
                      padding: '3px 10px',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      background: 'rgba(19,136,8,0.12)',
                      color: 'var(--green)'
                    }}>Published</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function GuideDashboard({ favoriteMonuments }) {
  return (
    <>
      <div className="dash-stats">
        <div className="dash-stat-card">
          <span className="stat-number" style={{ color: 'var(--saffron)' }}>{virtualTours.length}</span>
          <span className="stat-label">Virtual Tours</span>
        </div>
        <div className="dash-stat-card">
          <span className="stat-number" style={{ color: 'var(--green)' }}>
            {virtualTours.reduce((sum, t) => sum + t.stops.length, 0)}
          </span>
          <span className="stat-label">Tour Stops</span>
        </div>
        <div className="dash-stat-card">
          <span className="stat-number" style={{ color: 'var(--gold)' }}>{monuments.length}</span>
          <span className="stat-label">Monuments</span>
        </div>
        <div className="dash-stat-card">
          <span className="stat-number" style={{ color: 'var(--deep-red)' }}>{favoriteMonuments.length}</span>
          <span className="stat-label">Favorites</span>
        </div>
      </div>

      {/* Manage Tours */}
      <div className="dash-section">
        <div className="dash-section-header">
          <h2>Your Virtual Tours</h2>
          <Link to="/virtual-tour" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
            Manage Tours
          </Link>
        </div>
        <div className="dash-table">
          <table>
            <thead>
              <tr>
                <th>Tour Name</th>
                <th>Stops</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {virtualTours.map((t) => (
                <tr key={t.id}>
                  <td><strong>{t.name}</strong></td>
                  <td>{t.stops.length} stops</td>
                  <td>
                    <span style={{
                      padding: '3px 10px',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      background: 'rgba(19,136,8,0.12)',
                      color: 'var(--green)'
                    }}>Active</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tip */}
      <div className="dash-section">
        <div style={{
          background: 'rgba(255,153,51,0.08)',
          border: '1px solid rgba(255,153,51,0.2)',
          borderRadius: 'var(--radius)',
          padding: '24px',
          display: 'flex',
          gap: '16px',
          alignItems: 'flex-start'
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--saffron)" strokeWidth="2" style={{ flexShrink: 0, marginTop: '2px' }}>
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
          <div>
            <strong style={{ color: 'var(--saffron-dark)' }}>Tour Guide Tip</strong>
            <p style={{ color: 'var(--gray)', fontSize: '0.9rem', marginTop: '4px', lineHeight: '1.6' }}>
              Visit the Virtual Tour page to edit tour descriptions for each stop. Your changes help visitors
              understand and appreciate the historical significance of each monument.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}