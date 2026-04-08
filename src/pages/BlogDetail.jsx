import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8081/api/monuments/${id}`)
      .then(res => setPost(res.data))
      .catch(err => console.error("Error:", err));
  }, [id]);

  if (!post) return <div className="loader">Loading Story...</div>;

  return (
    <div style={{ backgroundColor: '#fcf9f5', minHeight: '100vh', padding: '80px 20px' }}>
      <button onClick={() => navigate('/blog')} style={{ marginBottom: '20px', cursor: 'pointer' }}>← Back</button>
      <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', borderRadius: '20px', overflow: 'hidden' }}>
        <img src={post.image_url} alt={post.name} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
        <div style={{ padding: '40px' }}>
          <h1>{post.name}</h1>
          <p style={{ color: '#ff9800', fontWeight: 'bold' }}>{post.location}</p>
          <hr />
          <p style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>{post.description}</p>
        </div>
      </div>
    </div>
  );
}