import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from "../api";
import "../styles/pages.css";

export default function MonumentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [monument, setMonument] = useState(null);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Monument
    axios.get(`${BASE_URL}/api/monuments/${id}`)
      .then(res => setMonument(res.data))
      .catch(err => console.error("Error fetching monument:", err));

    // Comments
    axios.get(`${BASE_URL}/api/comments/monument/${id}`)
      .then(res => setComments(res.data))
      .catch(() => console.warn("Comments not available"));
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post(`${BASE_URL}/api/comments`, {
        monumentId: id,
        username: "Cultural_Enthusiast",
        text: newComment,
        timestamp: new Date().toISOString()
      });

      setComments([response.data, ...comments]);
      setNewComment("");
    } catch (err) {
      alert("Comment failed. Check backend.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!monument) return <div className="loader">Opening the Archives...</div>;

  return (
    <div className="details-wrapper">

      <div className="details-hero" style={{ backgroundImage: `url(${monument.image_url})` }}>
        <div className="hero-overlay">
          <h1>{monument.name}</h1>
          <p>{monument.location} | {monument.era}</p>

          <button className="jump-tour-btn" onClick={() => navigate('/virtual-tour')}>
            🎥 Launch 360° Tour
          </button>
        </div>
      </div>

      <div className="details-container">

        <section className="info-section">
          <h2>About the Monument</h2>
          <p>{monument.description}</p>
        </section>

        <section className="discussion-board">
          <h3>🏛️ Cultural Discussion</h3>

          <div className="comment-input-area">
            <textarea
              placeholder="Share your thoughts..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={handleCommentSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Posting..." : "Post Insight"}
            </button>
          </div>

          <div className="comments-list">
            {comments.length > 0 ? (
              comments.map((c) => (
                <div key={c.id} className="comment-item">
                  <strong>@{c.username}</strong>
                  <p>{c.text}</p>
                </div>
              ))
            ) : (
              <p>No discussions yet.</p>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}