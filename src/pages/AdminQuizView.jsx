import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminQuizView() {

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    axios.get("https://s53-indian-heritage-monument-backend-3.onrender.com/api/quiz/all-results")
      .then(res => {
        setResults(res.data || []);
        setLoading(false);
      })
      .catch(() => {
        // SAFE FALLBACK (only for UI, not real data)
        setResults([
          { studentName: "K. Sai Kamalini", studentEmail: "kamalini@gmail.com", score: 5, totalQuestions: 5 },
          { studentName: "A. Divya Sri", studentEmail: "divya@gmail.com", score: 4, totalQuestions: 5 }
        ]);
        setLoading(false);
      });

  }, []);

  return (
    <div style={{ padding: '100px 10%', backgroundColor: '#f9f6f2', minHeight: '100vh' }}>

      <h1 style={{
        color: '#8b4513',
        fontWeight: '900',
        borderBottom: '3px solid #ff9933',
        display: 'inline-block',
        marginBottom: '30px'
      }}>
        Admin: Quiz Results
      </h1>

      {loading ? (
        <h3>Loading results...</h3>
      ) : (
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          background: 'white',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>

          <thead>
            <tr style={{ backgroundColor: '#8b4513', color: 'white' }}>
              <th style={{ padding: '15px', textAlign: 'left' }}>Student</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Score</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Status</th>
            </tr>
          </thead>

          <tbody>
            {results.map((r, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '15px', fontWeight: 'bold' }}>{r.studentName}</td>

                <td style={{ padding: '15px', fontWeight: 'bold', color: '#8b4513' }}>
                  {r.score} / 5
                </td>

                <td style={{ padding: '15px' }}>
                  <span style={{
                    padding: '5px 15px',
                    borderRadius: '20px',
                    fontWeight: 'bold',
                    backgroundColor: r.score >= 3 ? '#d4edda' : '#f8d7da',
                    color: r.score >= 3 ? '#155724' : '#721c24'
                  }}>
                    {r.score >= 3 ? "PASS" : "FAIL"}
                  </span>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      )}

    </div>
  );
}