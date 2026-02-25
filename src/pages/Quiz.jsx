import React, { useState } from 'react';
import { quizQuestions } from '../data/mockData';
import '../styles/Quiz.css';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerClick = (selectedOptionIndex) => {
    if (selectedOptionIndex === quizQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  return (
    <div className="quiz-container">
      {showScore ? (
        <div className="score-section">
          <h2>You scored {score} out of {quizQuestions.length}</h2>
          <button className="reset-btn" onClick={resetQuiz}>Try Again</button>
        </div>
      ) : (
        <div className="question-section">
          <div className="question-count">
            <span>Question {currentQuestion + 1}</span>/{quizQuestions.length}
          </div>
          <div className="question-text">
            {quizQuestions[currentQuestion].question}
          </div>
          <div className="answer-options">
            {quizQuestions[currentQuestion].options.map((option, index) => (
              <button 
                key={index} 
                className="option-btn"
                onClick={() => handleAnswerClick(index)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;