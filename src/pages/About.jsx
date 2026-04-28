import React, { useState } from 'react';
import axios from 'axios';
import BASE_URL from '../api';
import '../styles/About.css';

const About = () => {
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const team = [
    { 
      name: 'K. Sai Kamalini', 
      role: 'Project Admin & Lead Architect', 
      id: '2400032031',
      details: 'Managing system security, role-based access, and full-stack integration.'
    },
    { 
      name: 'A. Divya Sri', 
      role: 'Cultural Enthusiast & UI Designer', 
      id: 'Team Member',
      details: 'Designing aesthetic interfaces and researching historical monument data.'
    },
    { 
      name: 'Zafeer', 
      role: 'Content Curator & Backend Specialist', 
      id: 'Team Member',
      details: 'Organizing digital heritage content and managing API mail services.'
    }
  ];

  const handleContact = async (e) => {
    e.preventDefault();
    setStatus("Sending message...");

    try {
      const response = await axios.post(
        `${BASE_URL}/api/mail/send-query`,
        formData
      );

      if (response.status === 200) {
        setStatus("Success! Your message has reached the Heritage Team.");
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("Connection Error:", error);
      setStatus("Error: Could not connect to the mail server.");
    }
  };

  return (
    <div className="about-page">

      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1>Preserving Indian Heritage</h1>
          <div className="decorative-bar"></div>
          <p>Our mission is to digitize and celebrate India's architectural legacy.</p>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2 className="section-title">The Visionaries</h2>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-avatar-placeholder">
                  {member.name.charAt(0)}
                </div>
                <h3>{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <p className="member-details" style={{fontSize: '0.85rem', color: '#636e72', margin: '10px 0'}}>
                  {member.details}
                </p>
                <small className="member-id">{member.id}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <h2 className="section-title">Contact Us</h2>
          <p className="contact-subtext">Have questions about monuments? Reach out to the team!</p>

          <div className="contact-card">
            <form className="contact-form" onSubmit={handleContact}>
              
              <div className="form-group">
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required 
                />
              </div>

              <div className="form-group">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required 
                />
              </div>

              <div className="form-group">
                <textarea 
                  placeholder="Your Message" 
                  rows="5" 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">Send Message</button>
            </form>

            {status && (
              <p 
                className={`status-message ${status.includes("Success") ? "success" : "error"}`} 
                style={{
                  marginTop: '20px',
                  color: status.includes("Success") ? '#138808' : '#d63031',
                  fontWeight: 'bold'
                }}
              >
                {status}
              </p>
            )}

          </div>
        </div>
      </section>

    </div>
  );
};

export default About;