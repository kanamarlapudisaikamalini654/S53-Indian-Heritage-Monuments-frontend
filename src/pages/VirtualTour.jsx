import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import "../styles/pages.css";

export default function VirtualTour() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fallbackTours = [
    {
      id: 2,
      name: "Taj Mahal",
      short_desc: "A symbol of eternal love and architectural perfection.",
      location: "Agra, Uttar Pradesh",
      era: "Mughal",
      year: "1632",
      tour_url:
        "https://www.google.com/maps/embed?pb=!4v1712314567890!6m8!1m7!1sCAoSLEFGMVFpcE4z...!2d78.0421"
    },
    {
      id: 5,
      name: "Brihadisvara Temple",
      short_desc: "The pinnacle of Chola dynasty architecture.",
      location: "Thanjavur, Tamil Nadu",
      era: "Chola",
      year: "1010",
      tour_url:
        "https://www.google.com/maps/embed?pb=!4v1712314567891!6m8!1m7!1sCAoSLEFGMVFpcE96...!2d79.1318"
    }
  ];

  useEffect(() => {
    API.get("/api/monuments")
      .then((response) => {
        const availableTours = response.data.filter(
          (m) => m.tour_url && m.tour_url !== ""
        );

        setTours(availableTours.length > 0 ? availableTours : fallbackTours);
        setLoading(false);
      })
      .catch(() => {
        setTours(fallbackTours);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loader">Loading Virtual Tours...</div>;

  return (
    <div className="vt-wrapper">
      <h2>Immersive Virtual Experiences</h2>

      <div className="vt-grid">
        {tours.map((tour) => (
          <div className="vt-card" key={tour.id}>
            <h3>{tour.name}</h3>

            <iframe
              src={tour.tour_url}
              width="100%"
              height="300"
              style={{ border: 0 }}
              loading="lazy"
              title={tour.name}
            />

            <p>{tour.location}</p>
            <p>
              {tour.era} | {tour.year}
            </p>

            <button onClick={() => navigate(`/monument/${tour.id}`)}>
              Explore More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}