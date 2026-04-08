import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Blog.css';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Using your working port (likely 8081)
    axios.get('http://localhost:8081/api/monuments')
      .then(res => setBlogs(res.data))
      .catch(err => console.error("Fetch Error:", err));
  }, []);

  return (
    <div className="blog-page-wrapper">
      <div className="blog-header-section">
        <h1>Cultural Insights</h1>
        <p>Explore the hidden stories behind India's greatest heritage sites.</p>
      </div>

      <div className="blog-grid-container">
        {blogs.map((post) => (
          <div key={post.id} className="heritage-story-card">
            <div className="story-image-wrapper">
              <img 
                src={post.image_url || 'https://images.unsplash.com/photo-1548013146-72479768b921'} 
                alt={post.name} 
                className="story-img"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da'; }} 
              />
              <div className="story-badge">{post.era || "Historic"}</div>
            </div>

            <div className="story-content">
              <h3>{post.name}</h3>
              <p className="story-excerpt">{post.short_desc}</p>
              
              <div className="story-footer">
                <span className="story-year">{post.year || "Ancient"}</span>
                <button 
                  className="story-btn" 
                  onClick={() => navigate(`/blog/${post.id}`)}
                >
                  Read Story
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;