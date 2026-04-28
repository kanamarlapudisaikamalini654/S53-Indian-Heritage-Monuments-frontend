import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BASE_URL from "../api";
import '../styles/Quiz.css';

export default function Quiz() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(60);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    { id: 1, question: "Which Mughal Emperor built the Taj Mahal?", options: ["Akbar", "Shah Jahan", "Humayun", "Aurangzeb"], answer: "Shah Jahan" },
    { id: 2, question: "Hawa Mahal is located in which city?", options: ["Jaipur", "Udaipur", "Jodhpur", "Ajmer"], answer: "Jaipur" },
    { id: 3, question: "The Konark Sun Temple is in which state?", options: ["Bihar", "Odisha", "Gujarat", "MP"], answer: "Odisha" },
    { id: 4, question: "Which monument is also known as the 'Victory Tower'?", options: ["Qutub Minar", "Vijay Stambha", "Charminar", "India Gate"], answer: "Vijay Stambha" },
    { id: 5, question: "In which year was the Red Fort designated a UNESCO World Heritage Site?", options: ["2001", "2005", "2007", "2010"], answer: "2007" }
  ];

  useEffect(() => {
    if (timeLeft > 0 && !isFinished) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isFinished) {
      handleSubmit();
    }
  }, [timeLeft, isFinished]);

  const handleSubmit = async () => {
    let finalScore = 0;

    questions.forEach(q => {
      if (answers[q.id] === q.answer) finalScore += 1;
    });

    setScore(finalScore);

    try {
      await axios.post(`${BASE_URL}/api/quiz/submit`, {
        studentName: localStorage.getItem("userName") || "Student",
        score: finalScore,
        totalQuestions: questions.length
      });

      setIsFinished(true);
    } catch (error) {
      console.error("Quiz submit error:", error);
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="quiz-result-screen">
        <div className="result-card-bold">
          <h1>Quiz Completed!</h1>

          <div className="score-circle-bold">
            {score} / {questions.length}
          </div>

          <p>Great Job, {localStorage.getItem("userName") || "Student"}!</p>

          <button onClick={() => navigate('/dashboard')} className="btn-dash">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page-layout">
      <div className="quiz-header">
        <span className="logo">Heritage India</span>
        <div className={`timer ${timeLeft < 10 ? 'urgent' : ''}`}>
          Time: {timeLeft}s
        </div>
      </div>

      <div className="quiz-container-centered">
        {questions.map((q, index) => (
          <div key={q.id} className="q-card">
            <h3>{index + 1}. {q.question}</h3>

            <div className="options-grid">
              {q.options.map(opt => (
                <label
                  key={opt}
                  className={`opt-box ${answers[q.id] === opt ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name={`q${q.id}`}
                    value={opt}
                    onChange={() =>
                      setAnswers({ ...answers, [q.id]: opt })
                    }
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}

        <button onClick={handleSubmit} className="submit-pop-button">
          FINISH & SUBMIT
        </button>
      </div>
    </div>
  );
}