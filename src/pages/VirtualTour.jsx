import React from "react";
import "../styles/pages.css";

const tours = [
  {
    title: "Taj Mahal Virtual Experience",
    description:
      "Walk through the magnificent gardens, explore the intricate marble work, and witness the beauty of Taj Mahal from every angle in this immersive virtual tour.",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523",
    place: "Main Gateway",
    info: "The grand red sandstone gateway that frames the first view of the Taj Mahal."
  },
  {
    title: "Red Fort Heritage Walk",
    description:
      "Explore the magnificent Red Fort, Delhi, walking through its grand halls, beautiful gardens, and historic structures that witnessed the rise and fall of empires.",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5",
    place: "Lahori Gate",
    info: "The main entrance to the Red Fort, facing the old city of Delhi."
  },
  {
    title: "Hampi Ruins Explorer",
    description:
      "Journey through the magnificent ruins of the Vijayanagara Empire, from towering gopurams to intricate stone carvings that tell tales of a glorious past.",
    image: "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16",
    place: "Virupaksha Temple",
    info: "The main temple of Hampi dedicated to Lord Shiva."
  }
];

export default function VirtualTour() {
  return (
    <div className="vt-wrapper">

      <p className="vt-subtitle">
        Explore India's magnificent monuments from the comfort of your home with our immersive virtual tours.
      </p>

      <div className="vt-container">
        <div className="vt-grid">

          {tours.map((tour, index) => (
            <div className="vt-card" key={index}>

              <div className="vt-card-header">
                <h3>{tour.title}</h3>
                <p>{tour.description}</p>
              </div>

              <img src={tour.image} alt={tour.title} />

              <div className="vt-card-body">
                <div className="vt-place-title">{tour.place}</div>
                <div className="vt-place-desc">{tour.info}</div>

                <div className="vt-controls">
                  <button className="vt-btn">Previous</button>

                  <div className="vt-dots">
                    <span className="vt-dot active"></span>
                    <span className="vt-dot"></span>
                    <span className="vt-dot"></span>
                  </div>

                  <button className="vt-btn">Next</button>
                </div>
              </div>

            </div>
          ))}

        </div>
      </div>

    </div>
  );
}