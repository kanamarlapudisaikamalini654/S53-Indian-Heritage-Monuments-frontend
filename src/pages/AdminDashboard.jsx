import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';

export default function AdminDashboard() {

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    axios.get("https://s53-indian-heritage-monument-backend-3.onrender.com/api/quiz/admin/results")
      .then(res => {
        setResults(res.data || []);   // safety fix ✔
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setError("Failed to load results. Check backend or API.");
        setLoading(false);
      });

  }, []);

  return (
    <div className="dashboard-page admin-results-view">

      <section className="dashboard-hero">
        <h1>Student Quiz Results</h1>
        <p>Overview of all heritage knowledge submissions</p>
      </section>

      <div className="dashboard-content" style={{ padding: '20px' }}>

        {loading ? (
          <div className="loading-state"><h3>Loading results...</h3></div>
        ) : error ? (
          <div className="error-state" style={{ color: 'red' }}>
            <h3>{error}</h3>
          </div>
        ) : (
          <div className="results-table-container"
            style={{
              background: '#fff',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
            }}
          >

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>

              <thead style={{ background: '#1a1a2e', color: '#fff' }}>
                <tr>
                  <th style={{ padding: '15px' }}>Student Name</th>
                  <th style={{ padding: '15px' }}>Email</th>
                  <th style={{ padding: '15px' }}>Score</th>
                  <th style={{ padding: '15px' }}>Total Questions</th>
                </tr>
              </thead>

              <tbody>
                {results.length > 0 ? (
                  results.map((r, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '15px' }}>{r.studentName}</td>
                      <td style={{ padding: '15px' }}>{r.studentEmail}</td>
                      <td style={{ padding: '15px', fontWeight: 'bold', color: '#ff9933' }}>
                        {r.score}
                      </td>
                      <td style={{ padding: '15px' }}>{r.totalQuestions}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ padding: '30px', textAlign: 'center' }}>
                      No results found in database.
                    </td>
                  </tr>
                )}
              </tbody>

            </table>

          </div>
        )}

      </div>
    </div>
  );
}