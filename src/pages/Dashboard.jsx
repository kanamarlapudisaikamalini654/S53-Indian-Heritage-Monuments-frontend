import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const { user, favorites, toggleFavorite } = useAuth();
  const [monuments, setMonuments] = useState([]);
  const navigate = useNavigate();

  // Dynamic user info
  const displayName = user?.name || localStorage.getItem("userName") || "Kamalini";
  const displayEmail = user?.email || localStorage.getItem("userEmail") || "";
  const displayRole = user?.role || localStorage.getItem("userRole") || "Student";

  // Admin check
  const isAdmin = displayEmail === 'kamalini@gmail.com' || displayRole === 'ADMIN';

  useEffect(() => {
    if (user && !isAdmin) {
      axios.get("https://s53-indian-heritage-monument-backend-3.onrender.com/api/monuments")
        .then(res => {
          const uniqueMap = new Map();

          res.data.forEach(item => {
            if (item.name) uniqueMap.set(item.name, item);
          });

          const uniqueData = Array.from(uniqueMap.values());
          const favData = uniqueData.filter(m => favorites.includes(m.id));

          setMonuments(favData);
        })
        .catch(err => {
          console.error("API Error:", err);
          setMonuments([]); // ✅ safe fallback
        });
    }
  }, [favorites, user, isAdmin]);

  if (!user && !localStorage.getItem("userName")) {
    return (
      <div className="dashboard-login-required">
        <h2>Access Denied</h2>
        <p>Please login to view your personal dashboard.</p>
        <button onClick={() => navigate('/login')} className="login-btn">
          Login Now
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-page">

      {/* HERO SECTION */}
      <section className="dashboard-hero">
        <h1>{isAdmin ? "Admin Dashboard" : "User Dashboard"}</h1>
        <p className="user-greeting">Welcome back, {displayName}</p>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '10px' }}>
          <span className="role-badge">
            {displayRole}
          </span>

          {isAdmin && (
            <Link to="/admin" className="admin-btn">
              VIEW QUIZ RESULTS
            </Link>
          )}
        </div>
      </section>

      {/* CONTENT */}
      <div className="dashboard-content">

        {/* STATS */}
        <div className="dash-stats">
          {isAdmin ? (
            <>
              <div className="dash-stat-card">
                <span className="stat-number">Live</span>
                <span className="stat-label">System Status</span>
              </div>
              <div className="dash-stat-card">
                <span className="stat-number">MySQL</span>
                <span className="stat-label">Database Connected</span>
              </div>
            </>
          ) : (
            <>
              <div className="dash-stat-card">
                <span className="stat-number">{favorites.length}</span>
                <span className="stat-label">Favorites</span>
              </div>
              <div className="dash-stat-card">
                <span className="stat-number">Active</span>
                <span className="stat-label">Status</span>
              </div>
            </>
          )}
        </div>

        {/* MAIN SECTION */}
        <section className="dash-section">

          {isAdmin ? (
            <div className="admin-welcome-box">
              <h3>Administrative Overview</h3>
              <p>Hello Admin! You have full access to manage the portal.</p>
              <p>Click “View Quiz Results” to see student data.</p>

              <img
                src="https://img.icons8.com/color/96/admin-settings-male.png"
                alt="admin"
              />
            </div>

          ) : (
            <>
              <div className="dash-section-header">
                <h2>Your Saved Monuments</h2>
              </div>

              {monuments.length > 0 ? (
                <div className="fav-grid">
                  {monuments.map(m => (
                    <div key={m.id} className="fav-card">

                      <div className="fav-card-image-wrapper">
                        <img
                          src={m.image_url || m.imageUrl}
                          alt={m.name}
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1548013146-72479768bbaa?q=80&w=400";
                          }}
                        />
                      </div>

                      <div className="fav-card-body">
                        <h4>{m.name}</h4>
                        <p>{m.location}</p>
                        <button
                          className="remove-btn"
                          onClick={() => toggleFavorite(m.id)}
                        >
                          Remove
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <h3>No Favorites Yet</h3>
                  <Link to="/monuments" className="explore-link">
                    Explore Monuments
                  </Link>
                </div>
              )}

            </>
          )}

        </section>
      </div>
    </div>
  );
}