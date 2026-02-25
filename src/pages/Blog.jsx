import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Blog.css'; 
import { blogs } from '../data/mockData'; 

const Blog = () => {
  const navigate = useNavigate();

  return (
    <div className="blog-page-wrapper">
      <div className="blog-posts-container">
        {blogs.map((post) => (
          <div key={post.id} className="blog-card-item">
            {/* Main Image Container */}
            <div className="blog-card-img">
              <img 
                src={post.image} 
                alt={post.title} 
                // Fix: if image fails, this prevents a broken icon/blank space
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80'; }} 
              />
            </div>
            
            <div className="blog-card-content">
              <span className="blog-card-tag">{post.category}</span>
              <h2 className="blog-card-title">{post.title}</h2>
              <p className="blog-card-excerpt">{post.excerpt}</p>
              
              <div className="blog-card-footer">
                <span>By {post.author}</span>
                <span>{post.date}</span>
              </div>

              <button 
                className="blog-card-btn" 
                onClick={() => navigate(`/monument/${post.id}`)}
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;