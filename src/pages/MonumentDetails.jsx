import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/pages.css";

export default function MonumentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [monument, setMonument] = useState(null);
  
  // --- New State for Discussions ---
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fetch Monument Data
    axios.get(`http://localhost:8081/api/monuments/${id}`)
      .then(res => setMonument(res.data))
      .catch(err => console.error("Error fetching monument:", err));

    // Fetch Existing Comments (Assuming your endpoint is /api/comments/monument/{id})
    axios.get(`http://localhost:8081/api/comments/monument/${id}`)
      .then(res => setComments(res.data))
      .catch(err => console.warn("Comments endpoint not ready or empty."));
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post("http://localhost:8081/api/comments", {
        monumentId: id,
        username: "Cultural_Enthusiast", // Placeholder for logged-in user
        text: newComment,
        timestamp: new Date().toISOString()
      });
      
      setComments([response.data, ...comments]); // Add new comment to top of list
      setNewComment("");
    } catch (err) {
      console.error("Failed to post comment:", err);
      alert("Could not post comment. Ensure backend is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!monument) return <div className="loader">Opening the Archives...</div>;

  return (
    <div className="details-wrapper">
      {/* Hero Section */}
      <div className="details-hero" style={{ backgroundImage: `url(${monument.image_url})` }}>
        <div className="hero-overlay">
          <h1>{monument.name}</h1>
          <p>{monument.location} | {monument.era} Architecture</p>
          
          <button className="jump-tour-btn" onClick={() => navigate('/virtual-tour')}>
            🎥 Launch 360° Tour
          </button>
        </div>
      </div>

      <div className="details-container">
        {/* About Section */}
        <section className="info-section">
          <h2>About the Monument</h2>
          <p>{monument.description}</p>
        </section>

        {/* Tour Guide Insights */}
        <section className="guide-insights">
          <div className="guide-header">
            <span>🕵️ Tour Guide's Perspective</span>
          </div>
          <div className="guide-content">
            <p>
              <strong>Did you know?</strong> This monument was built using {monument.type} techniques 
              and reflects the peak of the {monument.era} era. While on the virtual tour, 
              look closely at the {monument.short_desc} to see the intricate craftsmanship.
            </p>
          </div>
        </section>

        {/* Quick Facts */}
        <section className="quick-facts">
          <h3>Quick Information</h3>
          <ul>
            <li><strong>Built Around:</strong> {monument.year}</li>
            <li><strong>Historical Era:</strong> {monument.era}</li>
            <li><strong>Region:</strong> {monument.region}</li>
          </ul>
        </section>

        <hr className="section-divider" />

        {/* NEW: Cultural Discussion (Enthusiast Role) */}
        <section className="discussion-board">
          <h3>🏛️ Cultural Discussion</h3>
          <p className="discussion-subtitle">Join other enthusiasts in sharing insights about {monument.name}.</p>
          
          <div className="comment-input-area">
            <textarea 
              placeholder="Share your thoughts or ask a question about this monument..." 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <button 
              className="vt-btn" 
              onClick={handleCommentSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Posting..." : "Post Insight"}
            </button>
          </div>

          <div className="comments-list">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <div className="comment-meta">
                    <strong>@{comment.username}</strong>
                    <span className="comment-date">
                      {new Date(comment.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="comment-text">{comment.text}</p>
                </div>
              ))
            ) : (
              <p className="no-comments">No discussions yet. Be the first to start the conversation!</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}