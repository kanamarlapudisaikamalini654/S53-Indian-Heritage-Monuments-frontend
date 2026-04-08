import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const { user, favorites, toggleFavorite } = useAuth();
  const [monuments, setMonuments] = useState([]);
  const navigate = useNavigate();

  // 1. DYNAMIC NAME LOGIC: Priority: State > LocalStorage > Default
  const displayName = user?.name || localStorage.getItem("userName") || "Kamalini";
  const displayEmail = user?.email || localStorage.getItem("userEmail") || "";
  const displayRole = user?.role || localStorage.getItem("userRole") || "Student";

  // 2. ADMIN DETECTION
  const isAdmin = displayEmail === 'kamalini@gmail.com' || displayRole === 'ADMIN';

  useEffect(() => {
    // Only fetch favorite details if the user is a Student (to show their favorites list)
    if (user && !isAdmin) {
      axios.get("http://localhost:8081/api/monuments")
        .then(res => {
          const uniqueMap = new Map();
          res.data.forEach(item => {
            if (item.name) uniqueMap.set(item.name, item);
          });
          const uniqueData = Array.from(uniqueMap.values());
          const favData = uniqueData.filter(m => favorites.includes(m.id));
          setMonuments(favData);
        })
        .catch(err => console.error("API Error:", err));
    }
  }, [favorites, user, isAdmin]);

  if (!user && !localStorage.getItem("userName")) {
    return (
      <div className="dashboard-login-required">
        <h2>Access Denied</h2>
        <p>Please login to view your personal dashboard.</p>
        <button onClick={() => navigate('/login')} className="login-btn">Login Now</button>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <section className="dashboard-hero">
        <h1>{isAdmin ? "Admin Dashboard" : "User Dashboard"}</h1>
        {/* FIX: Using the dynamic displayName variable */}
        <p className="user-greeting">Welcome back, {displayName}</p>
        
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '10px' }}>
          <span className="role-badge" style={{ backgroundColor: '#ff9933', color: '#fff', padding: '5px 15px', borderRadius: '20px' }}>
            {displayRole}
          </span>

          {isAdmin && (
            <Link to="/admin" className="admin-btn" style={{ 
              backgroundColor: '#e67e22', 
              color: 'white', 
              padding: '5px 15px', 
              borderRadius: '20px', 
              textDecoration: 'none',
              fontWeight: 'bold' 
            }}>
              VIEW QUIZ RESULTS
            </Link>
          )}
        </div>
      </section>

      <div className="dashboard-content">
        {/* STATS SECTION */}
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

        {/* MAIN CONTENT SECTION */}
        <section className="dash-section">
          {isAdmin ? (
            <div className="admin-welcome-box" style={{ 
              textAlign: 'center', 
              padding: '40px', 
              background: '#fff', 
              borderRadius: '10px', 
              boxShadow: '0 4px 10px rgba(0,0,0,0.05)' 
            }}>
              <h3>Administrative Overview</h3>
              <p>Hello Admin! You have full access to manage the Heritage India portal.</p>
              <p>Click the <b>"View Quiz Results"</b> button above to see student performance.</p>
              <img src="https://img.icons8.com/color/96/admin-settings-male.png" alt="admin-icon" style={{ marginTop: '20px' }} />
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
                          src={m.image_url || m.imageUrl || m.imageURL} 
                          alt={m.name} 
                          onError={(e) => { e.target.src = `https://images.unsplash.com/photo-1548013146-72479768bbaa?q=80&w=400`; }} 
                        />
                      </div>
                      <div className="fav-card-body">
                        <h4>{m.name}</h4>
                        <p>{m.location}</p>
                        <button className="remove-btn" onClick={() => toggleFavorite(m.id)}>Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <h3>No Favorites Yet</h3>
                  <Link to="/monuments" className="explore-link">Explore Monuments</Link>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}