import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/pages.css";

export default function VirtualTour() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // --- HARDCODED FALLBACK DATA ---
  // If your backend (8081) is down, this data ensures the page isn't empty.
  const fallbackTours = [
    {
      id: 2,
      name: "Taj Mahal",
      short_desc: "A symbol of eternal love and architectural perfection.",
      location: "Agra, Uttar Pradesh",
      era: "Mughal",
      year: "1632",
      tour_url: "https://www.google.com/maps/embed?pb=!4v1712314567890!6m8!1m7!1sCAoSLEFGMVFpcE4zTjBfX3pXdlpXdlpXdlpXdlpXdlpXdlpXdlpXdlpXdlpX!2m2!1d27.1751!2d78.0421!3f0!4f0!5f0.7820865974627469"
    },
    {
      id: 5,
      name: "Brihadisvara Temple",
      short_desc: "The pinnacle of Chola dynasty architecture.",
      location: "Thanjavur, Tamil Nadu",
      era: "Chola",
      year: "1010",
      tour_url: "https://www.google.com/maps/embed?pb=!4v1712314567891!6m8!1m7!1sCAoSLEFGMVFpcE96ZlpXdlpXdlpXdlpXdlpXdlpXdlpXdlpXdlpXdlpX!2m2!1d10.7828!2d79.1318!3f0!4f0!5f0.7820865974627469"
    }
  ];

  useEffect(() => {
    axios.get("http://localhost:8081/api/monuments")
      .then((response) => {
        const availableTours = response.data.filter(m => m.tour_url !== null && m.tour_url !== "");
        // If DB has data, use it. If not, use fallback.
        setTours(availableTours.length > 0 ? availableTours : fallbackTours);
        setLoading(false);
      })
      .catch((error) => {
        console.warn("Backend down, using local fallback data.");
        setTours(fallbackTours); // Use the backup data immediately on error
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loader">Opening the gates to India's Heritage...</div>;

  return (
    <div className="vt-wrapper">
      <h2 className="vt-title">Immersive Virtual Experiences</h2>
      <p className="vt-subtitle">Step inside India's magnificent monuments from the comfort of your home.</p>

      <div className="vt-container">
        <div className="vt-grid">
          {tours.map((tour) => (
            <div className="vt-card" key={tour.id}>
              <div className="vt-card-header">
                <h3>{tour.name} Experience</h3>
                <p>{tour.short_desc}</p>
              </div>

              <div className="vt-iframe-wrapper">
                <iframe
                  src={tour.tour_url}
                  width="100%"
                  height="300px"
                  style={{ border: 0, borderRadius: '10px' }}
                  allowFullScreen=""
                  loading="lazy"
                  title={`${tour.name} 360 Tour`}
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <div className="vt-card-body">
                <div className="vt-place-title">📍 {tour.location}</div>
                <div className="vt-place-desc">
                  <strong>Era:</strong> {tour.era} | <strong>Built:</strong> {tour.year}
                </div>

                <div className="vt-controls">
                  <button 
                    className="vt-btn primary" 
                    onClick={() => navigate(`/monument/${tour.id}`)}
                  >
                    Explore More
                  </button>
                  <button className="vt-btn secondary">Share</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}